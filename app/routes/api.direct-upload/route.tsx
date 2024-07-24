import {
  ActionFunctionArgs,
  AppLoadContext,
  json,
} from "@remix-run/cloudflare";
import invariant from "tiny-invariant";
import { createActionHandler } from "~/libs";
import { CfImageDirectUploadResponse } from "~/types";

const handlePost = async (request: Request, context: AppLoadContext) => {
  if (request.headers.get("Content-Type") !== "application/json") {
    return new Response("Invalid content type", { status: 400 });
  }
  // バリデーション
  const body = (await request.json()) as { meta: Record<string, string> };
  invariant(body, "Body is required");
  invariant(body.meta, "Meta is required");

  const CF_ACCOUNT_ID = context.cloudflare.env.CLOUDFLARE_ACCOUNT_ID;
  const CF_API_TOKEN = context.cloudflare.env.CLOUDFLARE_IMAGES_API_TOKEN;

  const formData = new FormData();
  formData.append("metadata", JSON.stringify(body.meta));

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CF_API_TOKEN}`,
      },
      body: formData,
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    return json(
      { error: "Failed to upload", details: errorData },
      { status: response.status },
    );
  }
  const data = (await response.json()) as CfImageDirectUploadResponse;

  return json(data, { status: 200 });
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  return createActionHandler(request, {
    post: () => handlePost(request, context),
  });
};
