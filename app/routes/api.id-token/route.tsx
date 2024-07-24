import { ActionFunctionArgs } from "@remix-run/cloudflare";
import { json } from "react-router";

import {
  createCookieSessionStorage,
  CookieSessionStorage,
  createActionHandler,
} from "~/libs";
import { COOKIE_ID_TOKEN } from "~/config";

const handlePost = async (
  request: Request,
  cookieSessionStorage: CookieSessionStorage,
) => {
  const body = await request.formData();
  const idToken = body.get("idToken");
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
  const env = context.cloudflare.env;
  const cookieSessionStorage = createCookieSessionStorage(env);

  return createActionHandler(request, {
    post: () => handlePost(request, cookieSessionStorage),
    delete: () => handleDelete(request, cookieSessionStorage),
  });
};
