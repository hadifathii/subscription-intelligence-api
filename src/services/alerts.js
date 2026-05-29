export function generateAlerts(payload) {
  const alerts = [];

  if (payload.type === "RENEWAL_REMINDER" && payload.days_left <= 7) {
    alerts.push({
      type: "RENEWAL_SOON",
      message: `Renews in ${payload.days_left} days`,
      severity: payload.days_left <= 3 ? "high" : "medium"
    });
  }

  if (payload.type === "PRICE_CHANGE") {
    alerts.push({
      type: "PRICE_INCREASE",
      message: "Subscription price increased",
      severity: "medium"
    });
  }

  if (payload.type === "CANCEL") {
    alerts.push({
      type: "CANCELED",
      message: "Subscription canceled",
      severity: "low"
    });
  }

  return alerts;
}