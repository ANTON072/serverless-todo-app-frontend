import {
  ActionFunctionArgs,
  AppLoadContext,
  json,
} from "@remix-run/cloudflare";
import { createActionHandler } from "~/libs";
import { CfImageDirectUploadResponse } from "~/types";

const handlePost = async (request: Request, context: AppLoadContext) => {
  const body = await request.formData();
  const meta = body.get("meta");

  const CF_ACCOUNT_ID = context.cloudflare.env.CLOUDFLARE_ACCOUNT_ID;
  const CF_API_TOKEN = context.cloudflare.env.CLOUDFLARE_IMAGES_API_TOKEN;

  const formData = new FormData();
  formData.append("metadata", meta ?? "");

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

const handleDelete = async (request: Request, context: AppLoadContext) => {
  const CF_ACCOUNT_ID = context.cloudflare.env.CLOUDFLARE_ACCOUNT_ID;
  const CF_API_TOKEN = context.cloudflare.env.CLOUDFLARE_IMAGES_API_TOKEN;
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const imageId = searchParams.get("imageId");
  if (!imageId) {
    return json({ error: "Image ID is required" }, { status: 400 });
  }

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/images/v1/${imageId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${CF_API_TOKEN}`,
      },
    },
  );
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    return json(
      { error: "Failed to delete", details: errorData },
      { status: response.status },
    );
  }
  return json({ success: true }, { status: 200 });
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  return createActionHandler(request, {
    post: () => handlePost(request, context),
    delete: () => handleDelete(request, context),
  });
};
