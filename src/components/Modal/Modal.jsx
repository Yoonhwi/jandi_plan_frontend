import { cloneElement, useCallback, useState } from "react";
import styles from "./Modal.module.css";
import { ModalContext, useModal } from "./ModalContext";
import { Button } from "@/components";
import { MdClose } from "react-icons/md";

const Modal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
      }}
    >
      <>{children}</>
    </ModalContext.Provider>
  );
};

const ModalTrigger = ({ children }) => {
  const { openModal } = useModal();

  return cloneElement(children, {
    onClick: (event) => {
      if (children.props.onClick) {
        children.props.onClick(event);
      }
      openModal();
    },
  });
};

const ModalContent = ({ children }) => {
  const { isOpen, closeModal } = useModal();

  return (
    <>
      {isOpen && (
        <>
          <div
            className={styles.backdrop}
            onClick={closeModal}
          />
          <div
            className={styles.container}
          >
            <div className={styles.modal_header}>
            <MdClose
              onClick={closeModal}
              style={{ position: "absolute", top: "1rem", right: "1rem", cursor: "pointer" }}
            />
            </div>
            <div>
              {children}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export { Modal, ModalTrigger, ModalContent };
