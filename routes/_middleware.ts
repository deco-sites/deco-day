import { allowCorsFor } from "deco/mod.ts";

export default function handler(req: Request, ctx: unknown) {
    // Allow Cors
    Object.entries(allowCorsFor(req)).map(([name, value]) => {
        ctx.response.headers.set(name, value);
    });

    const resp = await ctx.next();

    return resp;
}
