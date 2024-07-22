import { forwardRef } from "react";

interface Props {
  children: React.ReactNode;
}

export const Modal = forwardRef<HTMLDialogElement, Props>(
  function ModalComponent(props, ref) {
    return (
      <dialog id="my_modal_1" className="modal" ref={ref}>
        <div className="modal-box">{props.children}</div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    );
  },
);
