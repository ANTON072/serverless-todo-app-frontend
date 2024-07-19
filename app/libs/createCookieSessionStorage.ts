import { createCookieSessionStorage as createCookieSessionStorageOrg } from "@remix-run/cloudflare";

export const createCookieSessionStorage = (env: Env) => {
  return createCookieSessionStorageOrg({
    cookie: {
      name: "__session",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365 * 10, // 10 years
      httpOnly: true,
      secure: env.ENV === "production",
      secrets: [env.SESSION_SECRET],
    },
  });
};

export type CookieSessionStorage = ReturnType<
  typeof createCookieSessionStorage
>;
