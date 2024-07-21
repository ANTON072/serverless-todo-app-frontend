import { getAuth, signOut } from "firebase/auth";
import { useSnackbar } from "./useSnackbar";
import { useState } from "react";

export const useLogout = () => {
  const auth = getAuth();
  const { openSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const onLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      openSnackbar({
        message: "ログアウトしました",
        type: "success",
      });
    } catch (error) {
      openSnackbar({
        message: "ログアウトに失敗しました",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onLogout,
    isLoading,
  };
};
