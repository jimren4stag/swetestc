import { json } from "@sveltejs/kit";

export async function POST({ request, cookies }) {
  const request_body = await request.json();
  let cookie_name = request_body.name;
  let cookie_value = request_body.value;
  console.log(cookie_name);
  console.log(cookie_value);
  if (cookies.get(cookie_name) == null) {
    cookies.set(cookie_name, JSON.stringify(cookie_value), {
      path: "/",
    });
  } else {
    cookies.set(
      cookie_name,
      JSON.stringify(
        JSON.parse(cookies.get(cookie_name), { path: "/" }) + cookie_value
      )
    );
  }

  return json({ status: 201 });
}

export async function GET({ url, cookies }) {
  const cookie_name = url.searchParams.keys().next().value;
  if (cookies.get(cookie_name) == null) return json({ status: 404 });
  return json({ body: JSON.parse(cookies.get(cookie_name)), status: 200 });
}
