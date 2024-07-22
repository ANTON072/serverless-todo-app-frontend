import { InputText } from "~/components";

import { Thumbnail } from "../user/components/Thumbnail";

export default function UserCreatePage() {
  return (
    <div>
      <h2 className="font-bold text-3xl my-[3rem]">ユーザー登録</h2>
      <form>
        <div className="flex flex-col space-y-3">
          <div>
            <Thumbnail />
          </div>
          <InputText label="ユーザーID" name="userId" type="text" required />
          <InputText label="名前" name="name" type="text" required />
        </div>
        <button type="submit" className="btn btn-primary w-full mt-8">
          新規登録
        </button>
      </form>
    </div>
  );
}
