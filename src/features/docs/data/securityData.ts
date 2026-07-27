import { DocCategory } from '../../../types';

export const securityCategory: DocCategory = {
  id: 'security',
  title: 'Security & Enterprise',
  iconName: 'Shield',
  articles: [
    {
      id: 'data-privacy',
      categoryId: 'security',
      title: 'Data Privacy & SOC2',
      content: `Security is a core pillar. We are SOC2 Type II compliant. We do not train on your data, nor do the enterprise API endpoints of our upstream providers. Your prompts and completions are encrypted in transit (TLS 1.3) and at rest (AES-256). For strict requirements, you can opt-out of all logging by setting Data Sharing to false in your settings.`
    }
  ]
};
