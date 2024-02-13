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
export default (props: Props, _req: Request, _ctx: AppContext) => {
  const emailInput = props.email;

  if (!isEmail(emailInput)) {
    return {
      ok: false,
      message: "Invalid input",
    };
  }

  // try {
  setTimeout(() => {
    console.log("Sending email to", emailInput);
  }, 20000);
  // const airtableToken = await ctx.airtableKey.get();

  // await fetch(
  //   `https://api.airtable.com/v0/${ctx.airtableBase}/${ctx.airtableTable}`,
  //   {
  //     method: "POST",
  //     body: JSON.stringify({
  //       "records": [
  //         {
  //           "fields": {
  //             "Email": emailInput,
  //           },
  //         },
  //       ],
  //     }),
  //     headers: {
  //       "Authorization": `Bearer ${airtableToken}`,
  //       "content-type": "application/json",
  //     },
  //   },
  // )
  //   .then((response) => response.json());
  if (emailInput === "espera@gmail.com") {
    return {
      ok: true,
      status: "waiting-list",
    };
  } else {
    return {
      ok: true,
      status: "subscribe",
    };
  }
  // } catch (_e) {
  //   // TODO: How to log to Hyperdx?

  //   return {
  //     ok: false,
  //   };
  // }
};