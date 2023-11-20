import { query } from "$lib/server/db.js";
import { json } from "@sveltejs/kit";

export async function POST({ request, cookies }) {
  const command = await request.json();
}
