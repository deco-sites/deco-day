import { AppContext } from "deco-sites/deco-day/apps/site.ts";

export type Props = {
  email: string;
};

const isEmail = (emailInput: string) => {
  // Regular expression for validating an email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(emailInput);
};

// TODO: Implement rate-limiter or captcha
export default async (props: Props, _req: Request, ctx: AppContext) => {
  const emailInput = props.email;

  if (!isEmail(emailInput)) {
    return {
      ok: false,
      message: "Invalid input",
    };
  }

  try {
    const airtableToken = await ctx.airtableKey.get();

    await fetch(
      `https://api.airtable.com/v0/${ctx.airtableBase}/${ctx.airtableTable}`,
      {
        method: "POST",
        body: JSON.stringify({
          "records": [
            {
              "fields": {
                "Email": emailInput,
              },
            },
          ],
        }),
        headers: {
          "Authorization": `Bearer ${airtableToken}`,
          "content-type": "application/json",
        },
      },
    )
      .then((response) => response.json());

    return {
      ok: true,
    };
  } catch (e) {
    // TODO: How to log to Hyperdx?

    return {
      ok: false,
    };
  }
};
