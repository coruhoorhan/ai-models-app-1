export interface StreamOptions {
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
  model: string;
  systemPrompt?: string;
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  onChunk: (data: { text?: string; ttftMs?: number; tps?: number; tokens?: number }) => void;
  onDone?: (data: { ttftMs?: number; tps?: number; totalTokens?: number }) => void;
  onError?: (err: string) => void;
}

export async function streamChatCompletion(options: StreamOptions): Promise<void> {
  const { messages, model, systemPrompt, temperature, topP, maxTokens, onChunk, onDone, onError } = options;

  try {
    const res = await fetch('/api/chat/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, model, systemPrompt, temperature, topP, maxTokens })
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({ error: 'Stream request failed' }));
      throw new Error(errJson.error || `HTTP ${res.status}`);
    }

    if (!res.body) {
      throw new Error('Response body is null');
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const raw = line.slice(6).trim();
          if (!raw) continue;
          try {
            const parsed = JSON.parse(raw);
            if (parsed.error) {
              if (onError) onError(parsed.error);
              return;
            }
            if (parsed.done) {
              if (onDone) onDone(parsed);
            } else {
              onChunk(parsed);
            }
          } catch {
            // Ignore partial parse failures
          }
        }
      }
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Connection error';
    if (onError) onError(msg);
  }
}

export interface ArenaBattlePayload {
  prompt: string;
  modelA: string;
  modelB: string;
  temperature?: number;
  topP?: number;
  maxTokens?: number;
}

export interface ArenaBattleResult {
  resultA: { text: string; ttft: number; tps: number; tokens: number; totalTimeMs: number };
  resultB: { text: string; ttft: number; tps: number; tokens: number; totalTimeMs: number };
}

export async function runArenaBattleApi(payload: ArenaBattlePayload): Promise<ArenaBattleResult> {
  const res = await fetch('/api/arena/battle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({ error: 'Battle failed' }));
    throw new Error(errorJson.error || 'Arena request failed');
  }

  return res.json();
}
