//ToastList는 전역적으로 한번만 사용되기때문에 Component폴더에 들어가는게 찝찝하긴 하지만,
//넣을만한 곳이 layouts폴더 또는 components폴더 정도인거 같은데 둘중에서는 components폴더에 넣는게 나을거같아서 넣었습니다.
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/contexts";
import { BsExclamationCircleFill } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import styles from "./ToastList.module.css";

const toastVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const ToastList = () => {
  const { toasts } = useToast();

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {toasts.map((toast) => {
          const { id, type, text } = toast;
          const toastStyles = styles[`toast_item_${type}`];
          const icon = {
            success: <FaCircleCheck />,
            error: <BsExclamationCircleFill />,
          };

          return (
            <motion.div
              key={id}
              className={`${styles.toast_item} ${toastStyles}`}
              variants={toastVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className={styles.title}>
                {icon[type]}
                <p>{text}</p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ToastList;
