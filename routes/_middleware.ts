import { allowCorsFor } from "deco/mod.ts";
import { FreshContext } from "$fresh/server.ts";

export default async function handler(req: Request, ctx: FreshContext) {
  const resp = await ctx.next();

  // Allow Cors
  Object.entries(allowCorsFor(req)).map(([name, value]) => {
    resp.headers.set(name, value);
  });

  return resp;
}
