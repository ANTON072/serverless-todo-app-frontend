import { ActionFunctionArgs } from "@remix-run/cloudflare";
import { json } from "react-router";

import { createCookieSessionStorage, CookieSessionStorage } from "~/libs";
import { COOKIE_ID_TOKEN } from "~/config";

const handlePost = async (
  request: Request,
  cookieSessionStorage: CookieSessionStorage,
) => {
  const data = await request.json();
  const { idToken } = data as { idToken: string };
  const { getSession, commitSession } = cookieSessionStorage;

  // リクエストからセッションを取得
  const session = await getSession(request.headers.get("Cookie"));
  // セッションにidTokenをセット
  session.set(COOKIE_ID_TOKEN, idToken);
  // セッションをコミットしてレスポンスにセット
  const cookieHeader = await commitSession(session);
  return json(
    { message: "Token saved" },
    {
      headers: {
        "Set-Cookie": cookieHeader,
      },
    },
  );
};

const handleDelete = async (
  request: Request,
  cookieSessionStorage: CookieSessionStorage,
) => {
  const { getSession, commitSession } = cookieSessionStorage;
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has(COOKIE_ID_TOKEN)) {
    return json({ message: "Token not found" }, { status: 200 });
  }
  session.unset(COOKIE_ID_TOKEN);
  const cookieHeader = await commitSession(session);
  return json(
    { message: "Token removed" },
    {
      headers: {
        "Set-Cookie": cookieHeader,
      },
    },
  );
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const method = request.method.toLowerCase();
  const env = context.cloudflare.env;

  const cookieSessionStorage = createCookieSessionStorage(env);

  switch (method) {
    case "post":
      return await handlePost(request, cookieSessionStorage);
    case "delete":
      return await handleDelete(request, cookieSessionStorage);
    default:
      return json(
        { message: "Method not allowed" },
        {
          status: 405,
        },
      );
  }
};
