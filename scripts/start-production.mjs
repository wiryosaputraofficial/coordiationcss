import { readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import pg from "pg";

const { Pool } = pg;
const databaseUrl = process.env.DATABASE_URL;

if (!process.env.BETTER_AUTH_SECRET || process.env.BETTER_AUTH_SECRET.length < 32) {
  throw new Error("BETTER_AUTH_SECRET must contain at least 32 characters in production");
}

async function migrate() {
  if (!databaseUrl) throw new Error("DATABASE_URL is required in production");
  const schema = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");
  const pool = new Pool({ connectionString: databaseUrl, max: 1 });
  let lastError;
  for (let attempt = 1; attempt <= 20; attempt += 1) {
    try {
      await pool.query(schema);
      await pool.end();
      console.log("Coordiation Discussions database is ready.");
      return;
    } catch (error) {
      lastError = error;
      console.warn(`Database is not ready (attempt ${attempt}/20).`);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  }
  await pool.end();
  throw lastError;
}

await migrate();

const server = spawn(process.execPath, ["node_modules/vinext/dist/cli.js", "start", "--hostname", "0.0.0.0", "--port", process.env.PORT || "3000"], {
  stdio: "inherit",
  env: process.env,
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.kill(signal));
}

server.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 1);
});
