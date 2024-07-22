import { useRef, useState } from "react";

import { InputText, Modal } from "~/components";
import useImageCropper from "~/hooks/useImageCropper/index.client";

import { Thumbnail } from "../Thumbnail";

export const UserForm = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const [croppedFile, setCroppedFile] = useState<Blob>();

  const croppedFileUrl = croppedFile ? URL.createObjectURL(croppedFile) : "";

  const [isLoading, setIsLoading] = useState(false);

  const { setInputObjectURL, cropperComponent, onGenerateCroppedImage } =
    useImageCropper({
      cropOptions: {
        cropShape: "round",
        aspect: 1,
        cropSize: {
          width: 300,
          height: 300,
        },
      },
      resizeOptions: {
        max: 500,
      },
    });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files?.[0];
    const objectURL = URL.createObjectURL(file);
    setInputObjectURL(objectURL);
    modalRef.current?.showModal();
  };

  const handleCropComplete = async () => {
    setIsLoading(true);
    const blob = (await onGenerateCroppedImage()) as Blob;
    setCroppedFile(blob);
    modalRef.current?.close();
    setIsLoading(false);
  };

  return (
    <>
      <form>
        <div className="flex flex-col space-y-3">
          <div className="self-center">
            <Thumbnail
              onChange={handleFileChange}
              url={croppedFileUrl}
              onClear={() => {
                setCroppedFile(undefined);
              }}
            />
          </div>
          <InputText label="ユーザーID" name="userId" type="text" required />
          <InputText label="名前" name="name" type="text" required />
        </div>
        <button type="submit" className="btn btn-primary w-full mt-8">
          新規登録
        </button>
      </form>
      <Modal ref={modalRef}>
        <div className="relative w-xl h-[400px]">{cropperComponent}</div>
        <div className="modal-action">
          <button
            className="btn"
            onClick={() => modalRef.current?.close()}
            disabled={isLoading}
          >
            キャンセル
          </button>
          <button
            className="btn btn-primary"
            onClick={handleCropComplete}
            disabled={isLoading}
          >
            切り抜き
          </button>
        </div>
      </Modal>
    </>
  );
};
