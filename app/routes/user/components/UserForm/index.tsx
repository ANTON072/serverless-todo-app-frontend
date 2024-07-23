import { useRef, useState } from "react";
import { Form, useSubmit } from "@remix-run/react";

import { InputText, Modal } from "~/components";
import useImageCropper from "~/hooks/useImageCropper/index.client";

import { Thumbnail } from "../Thumbnail";

export const UserForm = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const [croppedFile, setCroppedFile] = useState<Blob>();

  const croppedFileUrl = croppedFile ? URL.createObjectURL(croppedFile) : "";

  const [isLoading, setIsLoading] = useState(false);

  const submit = useSubmit();

  const {
    setInputObjectURL,
    cropperComponent,
    onGenerateCroppedImage,
    onCropReset,
  } = useImageCropper({
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
    onCropReset();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (croppedFile) {
      formData.append("avatar", croppedFile, "avatar.jpg");
    }

    submit(formData, { method: "post" });
  };

  return (
    <>
      <Form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex flex-col space-y-3">
          <div className="self-center">
            <Thumbnail
              onChange={handleFileChange}
              url={croppedFileUrl}
              onClear={() => {
                setCroppedFile(undefined);
                onCropReset();
              }}
            />
          </div>
          <InputText label="ユーザーID" name="userId" type="text" required />
          <InputText label="名前" name="name" type="text" required />
        </div>
        <button type="submit" className="btn btn-primary w-full mt-8">
          新規登録
        </button>
      </Form>
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
