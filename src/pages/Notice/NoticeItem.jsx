import { useState } from "react";
import styles from "./NoticeItem.module.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import { IoAlertCircleSharp } from "react-icons/io5";
import { ViewEditorContent } from "@/components";

const NoticeItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const formmatDate = format(new Date(item.createdAt), "yy. MM. dd");

  return (
    <div className={styles.container}>
      <div
        className={styles.header_container}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.header}>
          <div className={styles.header_left}>
            <IoAlertCircleSharp size={24} className={styles.icon} />
            <p className={styles.title}>{item.title}</p>
          </div>

          <div className={styles.header_right}>
            <p className={styles.created_at}>{formmatDate}</p>
            {isOpen ? (
              <IoMdArrowDropup size={24} />
            ) : (
              <IoMdArrowDropdown size={24} />
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "fit-content", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.2 },
              opacity: { duration: 0 },
            }}
            style={{ overflow: "hidden" }}
          >
            <ViewEditorContent
              content={item.content}
              style={{
                padding: "1rem 4rem",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NoticeItem;
