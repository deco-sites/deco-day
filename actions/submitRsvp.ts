import { AppContext } from "deco-sites/deco-day/apps/site.ts";

export type Props = {
  email: string;
};

const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const fetchData = async (
  url: string,
  method: string,
  ctx: AppContext,
  body?: object,
) => {
  const airtableToken = await ctx.airtableKey.get();

  const headers = {
    "Authorization": `Bearer ${airtableToken}`,
    "Content-Type": "application/json",
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  return response.json();
};

// TODO: Implement rate-limiter or captcha
export default async (props: Props, _req: Request, ctx: AppContext) => {
  try {
    const email = props.email.toLowerCase().trim();

    if (!isEmailValid(email)) {
      return {
        ok: false,
        message: "Invalid input",
      };
    }

    const recordsUrl =
      `https://api.airtable.com/v0/${ctx.airtableBase}/${ctx.airtableTable}`;

    const getRecords = await fetchData(recordsUrl, "GET", ctx, undefined);

    const emails = getRecords.records.map((record: any) => record.fields.Email);

    if (emails.includes(email)) {
      return {
        ok: true,
        status: "waiting-list",
      };
    } else {
      const createRecord = await fetchData(recordsUrl, "POST", ctx, {
        "records": [
          {
            "fields": {
              "Email": email,
            },
          },
        ],
      });

      if (createRecord?.error) {
        return {
          ok: false,
          status: "error",
        };
      }

      return {
        ok: true,
        status: "subscribe",
      };
    }
  } catch (error) {
    // TODO: How to log to Hyperdx?
    console.error("error", error);

    return {
      ok: false,
      status: "error",
    };
  }
};
