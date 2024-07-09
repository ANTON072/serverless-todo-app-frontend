import { Outlet } from "@remix-run/react";

import { SiteFooter, SiteHeader } from "~/components";

export default function AuthCommon() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-dvh">
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  );
}
