import { ActionFunctionArgs } from "@remix-run/cloudflare";
import { json } from "react-router";

const handlePost = async (request: Request) => {
  const form = await request.formData();
  console.log(form);

  // ここに処理を書く

  return json({ message: "Token saved" });
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const method = request.method.toLowerCase();
  // const env = context.cloudflare.env;

  switch (method) {
    case "post":
      return await handlePost(request);
    // case "delete":
    //   return await handleDelete(request, env);
    default:
      return json({ message: "Method Not Allowed" }, { status: 405 });
  }
};
