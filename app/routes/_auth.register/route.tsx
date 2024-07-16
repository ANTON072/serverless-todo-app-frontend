/* eslint-disable jsx-a11y/label-has-associated-control */

import { Link } from "@remix-run/react";

export default function RegisterPage() {
  return (
    <form>
      <h2 className="font-bold text-xl">新規登録</h2>
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
        新規登録
      </button>
      <div className="mt-5 text-right">
        <Link to="/login" className="link link-primary">
          ログインはこちら
        </Link>
      </div>
    </form>
  );
}
