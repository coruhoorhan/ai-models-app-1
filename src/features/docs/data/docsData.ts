import { DocCategory } from '../types';

export const DOCS_DATA: DocCategory[] = [
  {
    id: 'quickstart',
    title: 'Quickstart & Unified API',
    iconName: 'Zap',
    articles: [
      {
        id: 'overview',
        categoryId: 'quickstart',
        title: 'OpenRouter Unified API Overview',
        subtitle: 'One standardized OpenAI-compatible endpoint for 200+ AI models.',
        content: `OpenRouter provides a single, high-availability edge proxy that routes your requests to Anthropic, OpenAI, Meta, Google, DeepSeek, and open-source models with zero SDK changes required. Replace base URLs in your existing OpenAI SDK setup to instantly access multi-model routing, automatic fallbacks, and cost tracking.`,
        codeSnippets: {
          ts: `import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'https://your-app.com',
    'X-Title': 'My Production App'
  }
});

const completion = await openai.chat.completions.create({
  model: 'anthropic/claude-3.5-sonnet',
  messages: [{ role: 'user', content: 'Explain zero-knowledge proofs in 2 sentences.' }]
});

console.log(completion.choices[0].message.content);`,
          python: `from openai import OpenAI
import os

client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key=os.getenv("OPENROUTER_API_KEY"),
  default_headers={
    "HTTP-Referer": "https://your-app.com",
    "X-Title": "My Production App"
  }
)

completion = client.chat.completions.create(
  model="anthropic/claude-3.5-sonnet",
  messages=[{"role": "user", "content": "Explain zero-knowledge proofs in 2 sentences."}]
)

print(completion.choices[0].message.content)`,
          curl: `curl https://openrouter.ai/api/v1/chat/completions \\
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \\
  -H "HTTP-Referer: https://your-app.com" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "anthropic/claude-3.5-sonnet",
    "messages": [
      {"role": "user", "content": "Explain zero-knowledge proofs in 2 sentences."}
    ]
  }'`
        },
        paramTable: [
          { name: 'model', type: 'string', required: true, description: 'Model ID (e.g. anthropic/claude-3.5-sonnet or openai/gpt-4o).' },
          { name: 'messages', type: 'array', required: true, description: 'Array of chat message objects with role and content.' },
          { name: 'temperature', type: 'number', required: false, description: 'Sampling temperature between 0 and 2. Default: 1.0' },
          { name: 'transforms', type: 'array', required: false, description: 'Array of server-side transforms like ["middle-out"] for context compression.' }
        ]
      }
    ]
  },
  {
    id: 'fallbacks',
    title: 'Model Fallback Chains',
    iconName: 'Shield',
    articles: [
      {
        id: 'fallback-routing',
        categoryId: 'fallbacks',
        title: 'Configuring Automatic Fallbacks',
        subtitle: 'Eliminate 5xx outages and rate limits with dynamic model array routing.',
        content: `Pass an ordered array of model IDs in the "models" property. If your primary model experiences provider downtime, rate limiting, or elevated latency, OpenRouter automatically reroutes your payload to the next model in real time without dropping the connection.`,
        codeSnippets: {
          ts: `const completion = await openai.chat.completions.create({
  // OpenRouter will attempt Claude 3.5 Sonnet first, then GPT-4o, then Llama 3.3
  models: [
    'anthropic/claude-3.5-sonnet',
    'openai/gpt-4o',
    'meta-llama/llama-3.3-70b-instruct'
  ],
  messages: [{ role: 'user', content: 'Generate a TypeScript GraphQL schema for a blog.' }]
} as unknown as object);`,
          python: `completion = client.chat.completions.create(
  extra_body={
    "models": [
      "anthropic/claude-3.5-sonnet",
      "openai/gpt-4o",
      "meta-llama/llama-3.3-70b-instruct"
    ]
  },
  messages=[{"role": "user", "content": "Generate a TypeScript GraphQL schema for a blog."}]
)`,
          curl: `curl https://openrouter.ai/api/v1/chat/completions \\
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "models": [
      "anthropic/claude-3.5-sonnet",
      "openai/gpt-4o",
      "meta-llama/llama-3.3-70b-instruct"
    ],
    "messages": [
      {"role": "user", "content": "Generate a TypeScript GraphQL schema."}
    ]
  }'`
        }
      }
    ]
  },
  {
    id: 'security',
    title: 'Guardrails & Privacy',
    iconName: 'Lock',
    articles: [
      {
        id: 'zero-retention',
        categoryId: 'security',
        title: 'Zero Data Retention & Privacy Settings',
        subtitle: 'Enterprise privacy configuration and SOC2 compliance controls.',
        content: `OpenRouter supports Zero Data Retention (ZDR) routing. By toggling ZDR headers or account security settings, prompts and completions pass directly through memory without being logged to disk or stored by provider endpoints for training.`,
        codeSnippets: {
          ts: `const completion = await openai.chat.completions.create({
  model: 'anthropic/claude-3.5-sonnet',
  messages: [{ role: 'user', content: 'Process sensitive transaction payload.' }]
}, {
  headers: {
    'X-OpenRouter-ZDR': 'true' // Force Zero Data Retention route
  }
});`,
          python: `completion = client.chat.completions.create(
  model="anthropic/claude-3.5-sonnet",
  messages=[{"role": "user", "content": "Process sensitive transaction payload."}],
  extra_headers={"X-OpenRouter-ZDR": "true"}
)`,
          curl: `curl https://openrouter.ai/api/v1/chat/completions \\
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \\
  -H "X-OpenRouter-ZDR: true" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "anthropic/claude-3.5-sonnet",
    "messages": [{"role": "user", "content": "Sensitive payload"}]
  }'`
        }
      }
    ]
  }
];
