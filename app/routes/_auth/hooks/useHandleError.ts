import { FirebaseError } from "firebase/app";

import { translateFirebaseError } from "~/libs";
import { useSnackbar } from "~/hooks";

export const useHandleError = () => {
  const { openSnackbar } = useSnackbar();

  const handleError = (
    error: unknown,
    callback?: (errorCode: string) => void,
  ) => {
    if (error instanceof FirebaseError) {
      openSnackbar({
        message: translateFirebaseError(error.code),
        type: "error",
      });
      if (callback) {
        callback(error.code);
      }
    } else {
      openSnackbar({
        message: "原因不明のエラーが発生しました",
        type: "error",
      });
    }
  };

  return {
    handleError,
  };
};
