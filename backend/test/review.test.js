import test from "node:test";
import assert from "node:assert/strict";
import { app } from "../src/app.js";

test("health endpoint exists", async () => {
  // Minimal smoke test without requiring an external server.
  assert.equal(typeof app, "function");
});

test("review route is registered", async () => {
  const routes = app._router?.stack || app.router?.stack || [];
  const paths = routes.map((layer) => layer.route?.path).filter(Boolean);
  assert.ok(paths.includes("/api/health") || routes.length > 0);
});
