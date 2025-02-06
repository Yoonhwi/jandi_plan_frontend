import { createContext, useContext } from "react";

export const ModalContext = createContext({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "useModal 반드시 ModalProvider 내부에서 사용되어야 합니다."
    );
  }

  return context;
};
