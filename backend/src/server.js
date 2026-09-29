import { app } from "./app.js";
import { env } from "./config/env.js";

app.listen(env.port, () => {
  console.log(`Code Review Agent API running on http://localhost:${env.port}`);
});
