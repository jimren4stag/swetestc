import word_list from "./word_list.json";
import { json } from "@sveltejs/kit";
const word_amount = 24;
export async function GET() {
  let to_return = [];
  let current_word = "";
  while (to_return.length < word_amount) {
    current_word = word_list[Math.floor(Math.random() * word_list.length)];
    if (!to_return.includes(current_word)) to_return.push(current_word);
  }

  return json(to_return);
}
