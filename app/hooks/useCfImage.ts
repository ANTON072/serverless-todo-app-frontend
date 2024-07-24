import { CfImageDirectUploadResponse, CfImageUploadResponse } from "~/types";

export const useCfImage = () => {
  const uploadImage = async (file: File, place: string = "") => {
    const directUploadResponse = await fetch("/api/direct-upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        meta: {
          place,
        },
      }),
    });
    if (!directUploadResponse.ok) {
      throw new Error("Failed to upload image");
    }
    const directUpload =
      (await directUploadResponse.json()) as CfImageDirectUploadResponse;
    if (!directUpload.success) {
      throw new Error("Failed to upload image");
    }

    const formData = new FormData();
    formData.append("file", file);
    const uploadResponse = await fetch(directUpload.result.uploadURL, {
      method: "POST",
      body: formData,
    });
    if (!uploadResponse.ok) {
      throw new Error("Failed to upload image");
    }
    return uploadResponse.json() as Promise<CfImageUploadResponse>;
  };

  const deleteImage = async () => {};

  return { uploadImage, deleteImage };
};
