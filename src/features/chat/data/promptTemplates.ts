import { PromptTemplate } from '../types';

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: '1',
    title: 'TypeScript Throttle & Debounce',
    category: 'Coding',
    description: 'Generates type-safe throttling/debouncing utility functions with edge case handling.',
    prompt: 'Write type-safe throttle and debounce utility functions in TypeScript. Include clear comments and edge case handling for context binding.'
  },
  {
    id: '2',
    title: 'SQL Index & Query Optimizer',
    category: 'Analysis',
    description: 'Analyzes slow queries and recommends composite indexes and execution plan fixes.',
    prompt: 'I have a slow PostgreSQL query performing a full table scan on 10 million rows. Analyze index requirements and suggest execution plan optimizations.'
  },
  {
    id: '3',
    title: 'API Rate Limiting Architecture',
    category: 'Architecture',
    description: 'Designs sliding window counter rate limiter using Redis and Express middleware.',
    prompt: 'Design a distributed rate limiter architecture using Redis sliding windows. Provide pseudo-code for Express middleware.'
  },
  {
    id: '4',
    title: 'React Re-render Audit & Refactor',
    category: 'Refactoring',
    description: 'Identifies unnecessary React re-renders and applies memoization patterns.',
    prompt: 'Review this React component structure for unnecessary re-renders. Explain how to optimize state placement and memoization.'
  },
  {
    id: '5',
    title: 'Zero-Trust Security Checklist',
    category: 'Analysis',
    description: 'Generates OWASP top 10 audit rules for REST and GraphQL APIs.',
    prompt: 'Generate a comprehensive security audit checklist for microservices handling LLM API key proxying and JWT authentication.'
  }
];
