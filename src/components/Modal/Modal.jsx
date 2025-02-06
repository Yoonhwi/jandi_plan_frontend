import { cloneElement, useCallback, useState } from "react";
import styles from "./Modal.module.css";
import { ModalContext, useModal } from "./ModalContext";
import { Button } from "@/components";
import { AnimatePresence} from "framer-motion";

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

  const variants = {
    hidden: {
      x: "-100%",
      opacity: 0.5,
    },
    visible: {
      x: "0",
      opacity: 1,
    },
  };

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
            <Button
              onClick={closeModal}
              variant="solid"
              style={{ position: "absolute", top: "1rem", right: "1rem" }}
            >
              Close
            </Button>
            {children}
          </div>
        </>
      )}
    </>
  );
};

export { Modal, ModalTrigger, ModalContent };
