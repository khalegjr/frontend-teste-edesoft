import React, { FC } from "react";
import ReactDOM from "react-dom";

type IModal = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  children: React.ReactNode;
};

const Modal: FC<IModal> = ({ openModal, setOpenModal, children }) => {
  if (!openModal) return null;

  return ReactDOM.createPortal(
    <>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,.5)] z-[1000]"
        onClick={() => setOpenModal(false)}
      ></div>
      <div className="max-w-lg w-full rounded-md fixed top-0 xl:top-[10%] left-1/2 -translate-x-1/2 bg-white z-[1001] p-6">
        {children}
      </div>
    </>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
