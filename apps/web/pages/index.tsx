import { useState } from "react";
import { chat } from "@stuba/api-client";
import { ChatResponse } from "@stuba/contracts";

export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<ChatResponse | null>(null);

  const submit = async () => {
    setError(null);
    setResponse(null);
    setLoading(true);
    try {
      const data = await chat(query);
      setResponse(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem", fontFamily: "Inter, system-ui, sans-serif" }}>
      <h1>RAG Chat (Web)</h1>
      <p style={{ color: "#555" }}>Talk to the stubbed RAG backend and see citations.</p>
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
        <input
          style={{ flex: 1, padding: "0.75rem", fontSize: "1rem", border: "1px solid #ccc", borderRadius: 6 }}
          placeholder="Type your question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
        />
        <button onClick={submit} disabled={loading || !query.trim()} style={{ padding: "0.75rem 1.25rem", fontSize: "1rem" }}>
          {loading ? "Asking..." : "Ask"}
        </button>
      </div>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      {response && (
        <section style={{ marginTop: "2rem" }}>
          <h2>Answer</h2>
          <p>{response.answer}</p>
          <p style={{ color: "#777" }}>Latency: {response.latency_ms.toFixed(1)} ms</p>

          <h3>Citations</h3>
          <ul style={{ paddingLeft: 0, listStyle: "none", display: "grid", gap: "0.75rem" }}>
            {response.citations.map((c) => (
              <li key={c.doc_id} style={{ border: "1px solid #e2e2e2", borderRadius: 8, padding: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>{c.title}</strong>
                  <span style={{ color: "#999" }}>Score: {c.score.toFixed(3)}</span>
                </div>
                <div style={{ color: "#666", marginTop: "0.35rem" }}>{c.snippet}</div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
