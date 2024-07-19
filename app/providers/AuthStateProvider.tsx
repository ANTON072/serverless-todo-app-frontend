import { createContext } from "react";

import { authInitialState } from "~/hooks";
import { AuthState } from "~/types";

interface Props {
  children: React.ReactNode;
  authState: AuthState;
}

export const AuthStateContext = createContext(authInitialState);

export const AuthStateProvider = ({ children, authState }: Props) => {
  return (
    <AuthStateContext.Provider value={authState}>
      {children}
    </AuthStateContext.Provider>
  );
};
