export interface DocArticle {
  id: string;
  categoryId: string;
  title: string;
  subtitle: string;
  content: string;
  codeSnippets?: {
    ts: string;
    python: string;
    curl: string;
  };
  paramTable?: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
}

export interface DocCategory {
  id: string;
  title: string;
  iconName: string;
  articles: DocArticle[];
}
