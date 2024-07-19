import { useRouteLoaderData } from "@remix-run/react";

import { loader as rootLoader } from "~/root";

export const useRootLoader = () => {
  const data = useRouteLoaderData<typeof rootLoader>("root");

  if (!data) {
    throw new Error("No data found for root loader");
  }

  return data;
};
