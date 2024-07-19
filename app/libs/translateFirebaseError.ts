// Firebase Authエラーメッセージのマッピング
const errorMessages: { [key: string]: string } = {
  "auth/invalid-email": "無効なメールアドレスです。",
  "auth/user-disabled": "このユーザーアカウントは無効になっています。",
  "auth/user-not-found": "ユーザーが見つかりませんでした。",
  "auth/wrong-password": "パスワードが間違っています。",
  "auth/email-already-in-use": "このメールアドレスは既に使用されています。",
  "auth/operation-not-allowed": "この操作は許可されていません。",
  "auth/weak-password": "パスワードを6文字以上で設定してください。",
  "auth/too-many-requests":
    "リクエストが多すぎます。しばらくしてから再試行してください。",
  "auth/invalid-credential": "ログインに失敗しました。",
};

export const translateFirebaseError = (errorCode: string) => {
  return errorMessages[errorCode] || "不明なエラーが発生しました。";
};
