import Fastify from "fastify";
import dotenv from "dotenv";
import eventsRoute from "./routes/events.js";
import insightsRoute from "./routes/insights.js";

dotenv.config();

const app = Fastify({ logger: true });

app.addHook("preHandler", async (req, res) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.code(401).send({ error: "Unauthorized" });
  }
});

app.register(eventsRoute, { prefix: "/v1/events" });
app.register(insightsRoute, { prefix: "/v1/insights" });

app.listen({ port: 3001 }, err => {
  if (err) throw err;
  console.log("🚀 API running on http://localhost:3001");
});