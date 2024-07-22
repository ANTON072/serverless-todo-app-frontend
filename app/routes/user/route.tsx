import { Outlet } from "@remix-run/react";

import { SiteFooter, SiteHeader } from "~/components";

export default function AuthCommon() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-dvh">
      <SiteHeader />
      <div className="w-full max-w-lg mx-auto">
        <Outlet />
      </div>
      <SiteFooter />
    </div>
  );
}
