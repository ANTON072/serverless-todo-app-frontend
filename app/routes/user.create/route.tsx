import { InputText } from "~/components";

export default function UserCreatePage() {
  return (
    <div>
      <h2 className="font-bold text-3xl my-[3rem]">ユーザー登録</h2>
      <form>
        <div className="flex flex-col space-y-3">
          <InputText label="ユーザーID" name="userId" type="text" />
          <InputText label="名前" name="name" type="text" />
        </div>
        <button type="submit" className="btn btn-primary w-full mt-8">
          新規登録
        </button>
      </form>
    </div>
  );
}
