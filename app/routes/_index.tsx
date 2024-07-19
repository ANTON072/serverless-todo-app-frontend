import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix on Cloudflare!",
    },
  ];
};

export default function Index() {
  return (
    <div className="prose">
      <h1>Home</h1>
      <ul>
        <li>
          <Link to="/register">新規登録</Link>
        </li>
        <li>
          <Link to="/login">ログイン</Link>
        </li>
        <li>
          <Link to="/reset-password">パスワード再発行</Link>
        </li>
      </ul>
    </div>
  );
}
