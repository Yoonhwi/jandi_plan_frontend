import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { ToastContext } from "./ToastContext";

const MAX_TOASTS_LENGTH = 3;

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({}); // 메모리누수 방지를 위해 clearTimeout을 사용하기 위한 ref입니다.

  const deleteToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));

    /** 메모리 누수 방지를 위한 clearTimeout */
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
  }, []);

  const createToast = useCallback(
    (params) => {
      const id = Date.now();
      const toast = {
        id,
        ...params,
      };

      setToasts((prevToasts) => {
        const newToast = [...prevToasts, toast];
        if (newToast.length > MAX_TOASTS_LENGTH) {
          const [first] = newToast;
          deleteToast(first.id);
        }

        return newToast;
      });

      const timer = setTimeout(() => {
        deleteToast(id);
      }, 1000);

      timersRef.current[id] = timer;
    },
    [deleteToast]
  );

  useEffect(() => {
    const timers = timersRef.current;

    return () => {
      Object.values(timers).forEach(clearTimeout);
    };
  }, []);

  const value = useMemo(() => ({ createToast, toasts }), [createToast, toasts]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export default ToastProvider;
