import "dotenv/config";
import { getClient } from "./client";

async function main() {
  const client = getClient();
  await client.connect();
}

void main();
