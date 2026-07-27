import { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";

function getAiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

function resolveGeminiModel(modelId?: string): string {
  if (!modelId) return "gemini-2.0-flash";
  const lower = modelId.toLowerCase();
  if (lower.includes("pro") || lower.includes("r1") || lower.includes("gpt-4") || lower.includes("claude")) {
    return "gemini-1.5-pro";
  }
  return "gemini-2.0-flash";
}

export async function handleChatStream(req: Request, res: Response): Promise<void> {
  const { messages, model, systemPrompt, temperature, topP, maxTokens } = req.body || {};
  const ai = getAiClient();

  if (!ai) {
    res.status(400).json({ error: "GEMINI_API_KEY is missing in environment variables." });
    return;
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const resolvedModel = resolveGeminiModel(model);
  const formattedContents = Array.isArray(messages)
    ? messages.map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content || "" }]
      }))
    : [{ role: "user", parts: [{ text: "Hello" }] }];

  const startTime = Date.now();
  let firstChunkTime: number | null = null;
  let totalTokenEstimate = 0;

  try {
    const responseStream = await ai.models.generateContentStream({
      model: resolvedModel,
      contents: formattedContents,
      config: {
        systemInstruction: systemPrompt || "You are a helpful AI engineer.",
        temperature: typeof temperature === "number" ? temperature : 0.7,
        topP: typeof topP === "number" ? topP : 0.95,
        maxOutputTokens: typeof maxTokens === "number" ? maxTokens : 2048,
      }
    });

    for await (const chunk of responseStream) {
      if (firstChunkTime === null) firstChunkTime = Date.now();
      const text = chunk.text || "";
      if (text) {
        totalTokenEstimate += Math.ceil(text.length / 4);
        const ttft = firstChunkTime ? firstChunkTime - startTime : 0;
        const elapsedSec = (Date.now() - startTime) / 1000;
        const tps = elapsedSec > 0 ? Math.round(totalTokenEstimate / elapsedSec) : 0;

        res.write(`data: ${JSON.stringify({ text, ttftMs: ttft, tps, tokens: totalTokenEstimate })}\n\n`);
      }
    }

    const finalTtft = firstChunkTime ? firstChunkTime - startTime : Date.now() - startTime;
    const finalElapsed = (Date.now() - startTime) / 1000;
    const finalTps = finalElapsed > 0 ? Math.round(totalTokenEstimate / finalElapsed) : 0;

    res.write(`data: ${JSON.stringify({ done: true, ttftMs: finalTtft, tps: finalTps, totalTokens: totalTokenEstimate })}\n\n`);
    res.end();
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Stream generation failed";
    res.write(`data: ${JSON.stringify({ error: errMsg })}\n\n`);
    res.end();
  }
}

export async function handleArenaBattle(req: Request, res: Response): Promise<void> {
  const { prompt, modelA, modelB, temperature, topP, maxTokens } = req.body || {};
  const ai = getAiClient();

  if (!ai) {
    res.status(400).json({ error: "GEMINI_API_KEY is missing in environment variables." });
    return;
  }

  const engineA = resolveGeminiModel(modelA);
  const engineB = resolveGeminiModel(modelB) === engineA ? "gemini-1.5-pro" : resolveGeminiModel(modelB);

  const runModel = async (modelName: string) => {
    const start = Date.now();
    let ttft = 0;
    let tokens = 0;
    let textResult = "";

    try {
      const stream = await ai.models.generateContentStream({
        model: modelName,
        contents: [{ role: "user", parts: [{ text: prompt || "Write a benchmark function" }] }],
        config: {
          temperature: typeof temperature === "number" ? temperature : 0.7,
          topP: typeof topP === "number" ? topP : 0.95,
          maxOutputTokens: typeof maxTokens === "number" ? maxTokens : 1024,
        }
      });

      for await (const chunk of stream) {
        if (!ttft) ttft = Date.now() - start;
        const txt = chunk.text || "";
        textResult += txt;
        tokens += Math.ceil(txt.length / 4);
      }

      const durationSec = (Date.now() - start) / 1000;
      const tps = durationSec > 0 ? Math.round(tokens / durationSec) : 0;

      return { text: textResult, ttft, tps, tokens, totalTimeMs: Date.now() - start };
    } catch (e: unknown) {
      const err = e instanceof Error ? e.message : "Error";
      return { text: `Error generating response: ${err}`, ttft: 0, tps: 0, tokens: 0, totalTimeMs: Date.now() - start };
    }
  };

  try {
    const [resultA, resultB] = await Promise.all([runModel(engineA), runModel(engineB)]);
    res.json({ resultA, resultB });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Arena execution failed";
    res.status(500).json({ error: message });
  }
}
