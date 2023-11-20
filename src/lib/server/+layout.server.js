//import * as db from (database);

export async function load({ cookies }) {
  const seesionid = cookies.get("sessionid");

  return {
    user: await db.getUser(sessionid),
  };
}
