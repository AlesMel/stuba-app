import Fastify from "fastify";
import cors from "@fastify/cors";
import fetch from "node-fetch";
import { ChatResponse } from "@stuba/contracts";
import { ChatRequestSchema } from "@stuba/schemas";

const PORT = Number(process.env.PORT || 4000);
const AI_URL = process.env.AI_URL || "http://localhost:8000";

async function buildServer() {
  const app = Fastify({ logger: true });

  await app.register(cors, {
    origin: (_origin, cb) => cb(null, true),
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
  });

  app.post("/chat", async (request, reply) => {
    const parseResult = ChatRequestSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({ error: "Invalid body", issues: parseResult.error.format() });
    }

    const body = parseResult.data;

    const aiResponse = await fetch(`${AI_URL}/rag/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!aiResponse.ok) {
      const text = await aiResponse.text();
      request.log.error({ status: aiResponse.status, text }, "AI service error");
      return reply.status(502).send({ error: "AI upstream error", status: aiResponse.status, detail: text });
    }

    const data = (await aiResponse.json()) as ChatResponse;
    return data;
  });

  return app;
}

buildServer()
  .then((app) => app.listen({ port: PORT, host: "0.0.0.0" }))
  .then(() => {
    console.log(`API server listening on http://localhost:${PORT}`);
    console.log(`Proxying AI requests to ${AI_URL}`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
