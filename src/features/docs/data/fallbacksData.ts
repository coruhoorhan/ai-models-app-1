import { DocCategory } from '../../../types';

export const fallbacksCategory: DocCategory = {
  id: 'routing',
  title: 'Routing & Fallbacks',
  iconName: 'GitMerge',
  articles: [
    {
      id: 'fallbacks',
      categoryId: 'routing',
      title: 'Configuring Model Fallbacks',
      subtitle: 'Ensure 99.99% uptime during provider outages.',
      content: `Provider outages happen. When you configure a fallback array in the 'model' or 'models' parameter, OpenRouter will automatically retry the request on the next model in the list if the primary provider returns a 5xx error or rate limits (429) your request. We handle the retry logic transparently; you just receive the final successful response.`,
      codeSnippets: {
        ts: `// Just pass an array of models instead of a single string
const completion = await openai.chat.completions.create({
  model: 'anthropic/claude-3-opus', // Primary target
  models: ['openai/gpt-4o', 'google/gemini-1.5-pro'], // Fallback chain
  messages: [{ role: 'user', content: 'Generate a quarterly report summary.' }]
});`
      },
      paramTable: [
        { name: 'models', type: 'array of strings', required: false, description: 'An array of fallback model IDs to try in sequence if the primary model fails.' },
        { name: 'route', type: 'enum', required: false, description: 'Set to "fallback" to enable strict sequential fallback routing.' }
      ]
    },
    {
      id: 'auto-routing',
      categoryId: 'routing',
      title: 'Auto-Routing for Cost & Speed',
      subtitle: 'Dynamically select models based on your constraints.',
      content: `Instead of hardcoding a model, you can use the special 'openrouter/auto' model identifier. When using this, OpenRouter will analyze the request and select the optimal model based on the active constraints you define (like max cost or minimum speed) in your account settings.`,
      codeSnippets: {
        ts: `const completion = await openai.chat.completions.create({
  model: 'openrouter/auto',
  messages: [{ role: 'user', content: 'What is the capital of France?' }]
});`
      }
    }
  ]
};
