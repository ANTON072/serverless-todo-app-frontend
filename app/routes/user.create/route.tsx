import { ClientOnly } from "remix-utils/client-only";

import { UserForm } from "../user/components/UserForm";
import { action } from "../user/action";

export default function UserCreatePage() {
  return (
    <div>
      <h2 className="font-bold text-3xl my-[3rem]">ユーザー登録</h2>
      <ClientOnly>{() => <UserForm />}</ClientOnly>
    </div>
  );
}

export { action };
