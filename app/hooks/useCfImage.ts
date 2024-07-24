import { CfImageDirectUploadResponse, CfImageUploadResponse } from "~/types";
import { useRootLoader } from "./useRootLoader";

export const useCfImage = () => {
  const { cloudflareConfig } = useRootLoader();

  const uploadImage = async (file: File, place: string = "") => {
    const formData = new FormData();
    formData.append("meta", JSON.stringify({ place }));
    const directUploadResponse = await fetch("/api/cf-images", {
      method: "POST",
      body: formData,
    });
    if (!directUploadResponse.ok) {
      throw new Error("Failed to upload image");
    }
    const directUpload =
      (await directUploadResponse.json()) as CfImageDirectUploadResponse;
    if (!directUpload.success) {
      throw new Error("Failed to upload image");
    }

    const formFileData = new FormData();
    formFileData.append("file", file);
    const uploadResponse = await fetch(directUpload.result.uploadURL, {
      method: "POST",
      body: formFileData,
    });
    if (!uploadResponse.ok) {
      throw new Error("Failed to upload image");
    }
    return uploadResponse.json() as Promise<CfImageUploadResponse>;
  };

  const deleteImage = async (imageId: string) => {
    const params = new URLSearchParams({
      imageId,
    });
    const response = await fetch(`/api/cf-images?${params}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete image");
    }
    return response.json();
  };

  const getImage = (imageId: string, variant: string) => {
    return `${cloudflareConfig.imageUrl}/${imageId}/${variant}`;
  };

  return { uploadImage, deleteImage, getImage };
};
