/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useInterval, useSnackbar } from "~/hooks";

export const Snackbar = () => {
  const { snackbarState, closeSnackbar } = useSnackbar();

  const getAlertClass = () => {
    switch (snackbarState.type) {
      case "success":
        return "alert-success";
      case "error":
        return "alert-error";
      case "warning":
        return "alert-warning";
      default:
        return "alert-info";
    }
  };

  useInterval(() => {
    closeSnackbar();
  }, 10000);

  if (!snackbarState.message) {
    return null;
  }

  return (
    <div className="toast toast-center">
      <div
        className={`alert ${getAlertClass()}`}
        onClick={() => closeSnackbar()}
      >
        <span>{snackbarState.message}</span>
      </div>
    </div>
  );
};
