import { useContext } from "react";

import { AuthStateContext } from "~/providers";

export const useAuthState = () => {
  return useContext(AuthStateContext);
};
