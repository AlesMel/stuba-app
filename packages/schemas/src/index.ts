import { z } from "zod";

export const ChatRequestSchema = z.object({
  query: z.string().min(1, "Query is required")
});

export const CitationSchema = z.object({
  doc_id: z.string(),
  title: z.string(),
  snippet: z.string(),
  score: z.number()
});

export const ChatResponseSchema = z.object({
  answer: z.string(),
  citations: z.array(CitationSchema),
  latency_ms: z.number()
});

export type ChatRequest = z.infer<typeof ChatRequestSchema>;
export type ChatResponse = z.infer<typeof ChatResponseSchema>;
export type Citation = z.infer<typeof CitationSchema>;
