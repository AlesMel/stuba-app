import { ChatRequest, ChatResponse } from "@stuba/contracts";

const defaultBaseUrl = "http://localhost:4000";

const resolveBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.EXPO_PUBLIC_API_URL ||
  process.env.API_URL ||
  defaultBaseUrl;

export async function chat(query: string): Promise<ChatResponse> {
  const baseUrl = resolveBaseUrl();
  const payload: ChatRequest = { query };

  const response = await fetch(`${baseUrl}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error ${response.status}: ${text}`);
  }

  const data = (await response.json()) as ChatResponse;
  return data;
}
