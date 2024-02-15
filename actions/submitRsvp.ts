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

    // Lista de convidados: viwhOXwNV31YMr6ss
    // Confirmados: viwjTprU7jnuNvjNV
    // https://airtable.com/developers/web/api/list-records

    const guestsUrl =
      `https://api.airtable.com/v0/${ctx.airtableBase}/tblBwp1MowAqOH9y3`;

    const subscribesUrl =
      `https://api.airtable.com/v0/${ctx.airtableBase}/tbllIA3LVVvcgy94h`;

    const [getGuests, getSubscribes] = await Promise.all([
      fetchData(guestsUrl, "GET", ctx, undefined),
      fetchData(subscribesUrl, "GET", ctx, undefined),
    ]);

    const emailsGuests = getGuests.records.map((record: any) =>
      record.fields.Email
    );
    const emailsSubscribes = getSubscribes.records.map((record: any) =>
      record.fields.Email
    );

    if (emailsGuests.includes(email)) {
      if (emailsSubscribes.includes(email)) {
        // evita duplicação de emails na tabela
        const createRecord = await fetchData(subscribesUrl, "POST", ctx, {
          "records": [
            {
              "fields": {
                "Email": email,
                "Waitlist": "False",
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
      }
      return {
        ok: true,
        status: "subscribe",
      };
    } else {
      if (emailsSubscribes.includes(email)) {
        // evita duplicação de emails na tabela
        const createRecord = await fetchData(subscribesUrl, "POST", ctx, {
          "records": [
            {
              "fields": {
                "Email": email,
                "Waitlist": "True",
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
      }

      return {
        ok: true,
        status: "waiting-list",
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