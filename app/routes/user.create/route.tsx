import { ClientOnly } from "remix-utils/client-only";

import { json } from "@remix-run/react";
import { ActionFunctionArgs } from "@remix-run/cloudflare";

import { UserForm } from "../user/components/UserForm";

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  console.log(body);

  return json({ message: "Token saved" });
}

export default function UserCreatePage() {
  return (
    <div>
      <h2 className="font-bold text-3xl my-[3rem]">ユーザー登録</h2>
      <ClientOnly>{() => <UserForm />}</ClientOnly>
    </div>
  );
}
