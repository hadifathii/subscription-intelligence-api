import { store } from "../store.js";

export default async function insightsRoute(app) {
  app.get("/", async () => {
    const subscriptions = store.events.length;

    return {
      total_monthly_cost: 0,
      total_yearly_cost: 0,
      active_subscriptions: subscriptions,
      alerts_summary: {
        high: 0,
        medium: 0,
        low: 0
      }
    };
  });
}