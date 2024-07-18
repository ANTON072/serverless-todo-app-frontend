import { createContext, useState } from "react";

interface SnackbarState {
  message: string | null;
  type: "info" | "success" | "warning" | "error";
}

interface SnackbarContextProps {
  snackbarState: SnackbarState;
  openSnackbar: (params: SnackbarState) => void;
  closeSnackbar: () => void;
}

export const SnackbarContext = createContext<SnackbarContextProps | null>(null);

interface SnackbarProviderProps {
  children: React.ReactNode;
}

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [snackbarState, setSnackbar] = useState<SnackbarState>({
    message: null,
    type: "info",
  });

  const openSnackbar = (params: SnackbarState) => {
    setSnackbar(params);
  };

  const closeSnackbar = () => {
    setSnackbar({ message: null, type: "info" });
  };

  return (
    <SnackbarContext.Provider
      value={{ snackbarState, openSnackbar, closeSnackbar }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};
