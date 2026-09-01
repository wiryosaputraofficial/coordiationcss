import { Pool, type PoolClient, type QueryResultRow } from "pg";

let pool: Pool | undefined;

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

export function getDatabase() {
  const connectionString = process.env.DATABASE_URL || "postgresql://coordiation:coordiation@127.0.0.1:5432/coordiation_discussions";
  pool ??= new Pool({ connectionString, max: 10, idleTimeoutMillis: 30_000 });
  return pool;
}

export async function query<T extends QueryResultRow>(text: string, values: unknown[] = []) {
  return getDatabase().query<T>(text, values);
}

export async function transaction<T>(run: (client: PoolClient) => Promise<T>) {
  const client = await getDatabase().connect();
  try {
    await client.query("BEGIN");
    const result = await run(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
