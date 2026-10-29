
const express = require("express");
const client = require("@prometheus-io/client");

const app = express();
const PORT = process.env.PORT || 3000;

const register = new client.Registry();

register.setDefaultLabels({
  app: "app-monitoring-dashboard",
});

client.collectDefaultMetrics({ register });

const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests received",
  labelNames: ["method", "route", "status"],
  registers: [register],
});

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.05, 0.1, 0.25, 0.5, 1, 2, 5],
  registers: [register],
});

app.use((req, res, next) => {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const route = req.route?.path
      ? req.baseUrl + req.route.path
      : req.path;

    const labels = {
      method: req.method,
      route,
      status: String(res.statusCode),
    };

    httpRequestsTotal.inc(labels);

    const duration =
      Number(process.hrtime.bigint() - start) / 1e9;

    httpRequestDuration.observe(labels, duration);
  });

  next();
});

app.get("/", (req, res) => {
  res.json({
    message: "Application Monitoring Dashboard API",
    status: "running",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    timestamp: new Date().toISOString(),
  });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Application running on port ${PORT}`);
});
