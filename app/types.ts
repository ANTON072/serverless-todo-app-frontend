import type { User } from "firebase/auth";

export interface AuthState {
  status: "loading" | "login" | "logout";
  user: User | null;
}

// See: https://developers.cloudflare.com/api/operations/cloudflare-images-create-authenticated-direct-upload-url-v-2
export interface CfDirectUploadResponse {
  result: {
    id: string;
    uploadURL: string;
  };
  errors: {
    code: number;
    message: string;
  }[];
  messages: {
    code: number;
    message: string;
  }[];
  success: boolean;
}
