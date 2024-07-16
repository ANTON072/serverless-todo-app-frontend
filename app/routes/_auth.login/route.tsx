/* eslint-disable jsx-a11y/label-has-associated-control */

import { Link } from "@remix-run/react";

export default function LoginPage() {
  return (
    <form>
      <h2 className="font-bold text-xl">ログイン</h2>
      <label className="form-control w-full mt-3">
        <div className="label">
          <span className="label-text">メールアドレス</span>
        </div>
        <input type="text" className="input input-bordered w-full" />
      </label>
      <label className="form-control w-full mt-3">
        <div className="label">
          <span className="label-text">パスワード</span>
        </div>
        <input type="password" className="input input-bordered w-full" />
      </label>
      <button type="submit" className="btn btn-primary w-full mt-5">
        ログイン
      </button>
      <div className="mt-5 flex justify-center gap-x-5">
        <Link to="/register" className="link link-primary">
          新規登録はこちら
        </Link>
        <Link to="/reset-password" className="link link-primary">
          パスワード再発行はこちら
        </Link>
      </div>
    </form>
  );
}
