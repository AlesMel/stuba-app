export type ChatRequest = {
  query: string;
};

export type Citation = {
  doc_id: string;
  title: string;
  snippet: string;
  score: number;
};

export type ChatResponse = {
  answer: string;
  citations: Citation[];
  latency_ms: number;
};
