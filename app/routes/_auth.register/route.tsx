/* eslint-disable jsx-a11y/label-has-associated-control */

import { Link, Navigate } from "@remix-run/react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";

import { InputText } from "~/components";
import { useAuthState, useSnackbar } from "~/hooks";

import { useHandleError } from "../_auth/hooks/useHandleError";

export default function RegisterPage() {
  const auth = getAuth();
  const authState = useAuthState();
  const { openSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResendEmail, setIsResendEmail] = useState(false);
  const { handleError } = useHandleError();

  const registerHandleError = (error: unknown) => {
    return handleError(error, (errorCode) => {
      if (errorCode === "auth/email-already-in-use") {
        setIsResendEmail(true);
      }
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    const form = event.currentTarget as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // 確認メールの送信
      await sendEmailVerification(auth.currentUser!);
      openSnackbar({
        message: "確認メールを送信しました",
        type: "info",
      });
    } catch (error: unknown) {
      registerHandleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendEmail = async () => {
    try {
      setIsSubmitting(true);
      await sendEmailVerification(auth.currentUser!);
      openSnackbar({
        message: "確認メールを再送信しました",
        type: "info",
      });
    } catch (error: unknown) {
      registerHandleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authState.status === "login") {
    return <Navigate to="/" />;
  }

  if (isResendEmail) {
    return (
      <div>
        <h2 className="font-bold text-xl mb-3">新規登録</h2>
        <button
          onClick={handleResendEmail}
          className="btn btn-primary w-full mt-8"
          disabled={isSubmitting}
        >
          確認メールを再送信する
        </button>
        <div className="mt-5 grid text-center">
          <Link to="/login" className="link link-primary">
            ログインはこちら
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-3">
        <h2 className="font-bold text-xl">新規登録</h2>
        <InputText label="メールアドレス" name="email" type="email" required />
        <InputText
          label="パスワード"
          name="password"
          type="password"
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary w-full mt-8"
        disabled={isSubmitting}
      >
        新規登録
      </button>
      <div className="mt-5 grid text-center">
        <Link to="/login" className="link link-primary">
          ログインはこちら
        </Link>
      </div>
    </form>
  );
}
