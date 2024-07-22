/* eslint-disable jsx-a11y/label-has-associated-control */
import { Navigate } from "@remix-run/react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { InputText } from "~/components";
import { useAuthState, useSnackbar } from "~/hooks";
import { useHandleError } from "../_auth/hooks/useHandleError";

export default function ResetPassword() {
  const auth = getAuth();

  const authState = useAuthState();
  const { openSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleError } = useHandleError();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const email = form.email.value;
    setIsSubmitting(true);
    try {
      await sendPasswordResetEmail(auth, email);
      openSnackbar({
        message: "パスワード再設定用のメールを送信しました",
        type: "info",
      });
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authState.status === "login") {
    return <Navigate to={`/`} />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-3">
        <h2 className="font-bold text-xl">ログイン</h2>
        <InputText label="メールアドレス" name="email" type="email" required />
      </div>
      <button
        type="submit"
        className="btn btn-primary w-full mt-5"
        disabled={isSubmitting}
      >
        再発行
      </button>
    </form>
  );
}
