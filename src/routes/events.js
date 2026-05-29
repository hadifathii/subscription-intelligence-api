import { store } from "../store.js";
import { verifySignedEvent } from "../services/verify.js";
import { generateAlerts } from "../services/alerts.js";

export default async function eventsRoute(app) {
  app.post("/", async (req, res) => {
    const { signed_event } = req.body;

    if (!signed_event) {
      return res.code(400).send({ error: "Missing signed_event" });
    }

    try {
      // MVP: publicKey ثابت (بعداً dynamic)
      const PUBLIC_KEY = Buffer.from(
        process.env.PUBLIC_KEY,
        "base64"
      );

      verifySignedEvent(signed_event, PUBLIC_KEY);

      store.events.push(signed_event);

      const alerts = generateAlerts(signed_event.payload);

      return {
        alerts,
        metrics: {
          monthly_cost: signed_event.payload.price || 0
        }
      };
    } catch (err) {
      return res.code(400).send({ error: err.message });
    }
  });
}