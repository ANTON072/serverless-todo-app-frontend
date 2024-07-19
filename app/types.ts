import type { User } from "firebase/auth";

export interface AuthState {
  status: "loading" | "login" | "logout";
  user: User | null;
}
