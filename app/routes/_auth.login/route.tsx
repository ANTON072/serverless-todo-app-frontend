/* eslint-disable jsx-a11y/label-has-associated-control */

import { Link, Navigate } from "@remix-run/react";
import { FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

import { InputText } from "~/components";
import { useAuthState, useSnackbar } from "~/hooks";
import { translateFirebaseError } from "~/libs";

export default function LoginPage() {
  const auth = getAuth();
  const authState = useAuthState();
  const { openSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    const form = event.currentTarget as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      openSnackbar({
        message: "ログインしました",
        type: "success",
      });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        openSnackbar({
          message: translateFirebaseError(error.code),
          type: "error",
        });
      } else {
        openSnackbar({
          message: "原因不明のエラーが発生しました",
          type: "error",
        });
      }
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
        <InputText label="メールアドレス" name="email" type="email" />
        <InputText label="パスワード" name="password" type="password" />
      </div>
      <button
        type="submit"
        className="btn btn-primary w-full mt-8"
        disabled={isSubmitting}
      >
        ログイン
      </button>
      <div className="mt-5 flex justify-center gap-x-5">
        <Link to="/register" className="link link-primary">
          新規登録はこちら
        </Link>
        <Link to="/reset-password" className="link link-primary">
          パスワード再発行はこちら
        </Link>
      </div>
    </form>
  );
}
