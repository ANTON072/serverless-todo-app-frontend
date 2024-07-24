import type { User } from "firebase/auth";

export interface AuthState {
  status: "loading" | "login" | "logout";
  user: User | null;
}

// See: https://developers.cloudflare.com/api/operations/cloudflare-images-create-authenticated-direct-upload-url-v-2
export interface CfImageDirectUploadResponse {
  result: {
    id: string;
    uploadURL: string;
  };
  errors: unknown[];
  messages: unknown[];
  success: boolean;
}

// See: https://developers.cloudflare.com/api/operations/cloudflare-images-upload-an-image-via-url
export interface CfImageUploadResponse {
  errors: unknown[];
  messages: unknown[];
  result: {
    filename: string;
    id: string;
    meta: {
      [key: string]: string;
    };
    requireSignedURLs: boolean;
    uploaded: string;
    variants: string[];
  };
  success: boolean;
}
