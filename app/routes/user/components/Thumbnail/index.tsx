/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRef } from "react";

import { Button } from "./Button";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  url?: string;
  onClear: () => void;
}

export const Thumbnail = ({ onChange, onClear, url }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label className="block rounded-full size-36 bg-slate-300 cursor-pointer relative">
        {url && (
          <img
            src={url}
            alt=""
            className="absolute rounded-full object-cover"
          />
        )}
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={onChange}
        />
        <Button
          type={url ? "remove" : "add"}
          onClick={() => {
            if (url) {
              onClear();
            } else {
              inputRef.current?.click();
            }
          }}
        />
      </label>
    </div>
  );
};
