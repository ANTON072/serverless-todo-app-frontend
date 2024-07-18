/* eslint-disable jsx-a11y/label-has-associated-control */

import { Link, Navigate } from "@remix-run/react";

import { InputText } from "~/components";
import { useAuthState } from "~/hooks";

export default function RegisterPage() {
  const authState = useAuthState();
  console.log("authState", authState);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  if (authState.status == "login") {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-3">
        <h2 className="font-bold text-xl">新規登録</h2>
        {/* <div className="text-error">パスワードが違います</div> */}
        <InputText label="メールアドレス" name="email" type="email" />
        <InputText label="パスワード" name="password" type="password" />
      </div>
      <button type="submit" className="btn btn-primary w-full mt-8">
        新規登録
      </button>
      <div className="mt-5 grid text-center">
        <Link to="/login" className="link link-primary">
          ログインはこちら
        </Link>
      </div>
    </form>
  );
}
