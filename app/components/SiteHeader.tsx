import { Link } from "@remix-run/react";

export const SiteHeader = () => {
  return (
    <header className="p-4 border-b border-b-slate-200">
      <h1 className="text-lg font-bold">
        <Link to="/" className="hover:text-primary">
          Serverless Todo App
        </Link>
      </h1>
    </header>
  );
};
