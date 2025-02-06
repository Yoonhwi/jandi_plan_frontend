import { createContext, useContext } from "react";

/**
 * @callback CreateToastCallback
 * @param {{ type: "error"|"success", text: string }} params
 * @returns {void}
 */

/**
 * @typedef {Object} Toast
 * @property {string} id
 * @property {"error"|"success"} type
 * @property {string} text
 */

/**
 * @typedef {Object} ToastContextType
 * @property {CreateToastCallback} createToast
 * @property {Toast[]} toasts
 */

/**
 * @type {React.Context<ToastContextType>}
 */
export const ToastContext = createContext(
  /** @type {ToastContextType} */ {
    createToast: () => {},
    toasts: [],
  }
);

export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToastContext 는 ToastProvider 내부에서 사용되어야 합니다."
    );
  }

  return context;
};
