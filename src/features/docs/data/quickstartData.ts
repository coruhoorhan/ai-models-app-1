import { DocCategory } from '../../../types';

export const quickstartCategory: DocCategory = {
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
};
