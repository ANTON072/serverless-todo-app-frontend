import { useState, useSyncExternalStore } from "react";
import { FirebaseApp, initializeApp } from "firebase/app";

import { useRootLoader } from "./useRootLoader";
import { AuthState } from "~/types";
import { getAuth, getIdToken, onAuthStateChanged, User } from "firebase/auth";

export const authInitialState: AuthState = {
  status: "loading",
  user: null,
};

const getStore = (app: FirebaseApp) => {
  let state: AuthState = authInitialState;

  const handleLogout = async (user: User | null) => {
    try {
      const response = await fetch("/api/id-token", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to delete ID token");
      }
      await response.json();
    } catch (error) {
      console.error(error);
    } finally {
      state = {
        status: "logout",
        user,
      };
    }
  };

  return {
    getSnapshot: () => state,
    getServerSnapshot: () => authInitialState,
    subscribe: (callback: () => void) => {
      const auth = getAuth(app);
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        // メアドが認可されていないときはログアウト扱い
        if (user && user.emailVerified) {
          try {
            // idTokenを取得
            const idToken = await getIdToken(user);
            // Remix側でCookieをセットする
            const formData = new FormData();
            formData.append("idToken", idToken);
            const response = await fetch("/api/id-token", {
              method: "POST",
              body: formData,
            });
            if (!response.ok) {
              throw new Error("Failed to set ID token");
            }
            await response.json();
          } catch (error) {
            console.error("Failed to get ID token:", error);
            await handleLogout(user);
          } finally {
            state = {
              status: "login",
              user,
            };
          }
        } else {
          await handleLogout(user);
        }
        // Reactの再レンダーを実行
        callback();
      });

      return () => {
        unsubscribe();
      };
    },
  };
};

export const useFirebaseAuthState = () => {
  const { firebaseConfig } = useRootLoader();
  const app = initializeApp(firebaseConfig);
  // コンポーネントが最初にレンダリングされる時に一度だけ実行される
  const [store] = useState(() => getStore(app));

  // ストアの状態を同期
  const state = useSyncExternalStore<AuthState>(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );

  return state;
};
