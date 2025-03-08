import { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Tooltip.module.css";

const Tooltip = ({ children, text, ...props }) => {
  const [visible, setVisible] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setVisible(false);
  }, []);

  const tooltipVariants = useMemo(() => {
    return {
      hidden: { opacity: 0, y: -5, x: "-50%" },
      visible: { opacity: 1, y: 0, x: "-50%" },
    };
  }, []);

  return (
    <div
      className={styles.tooltip}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.p
            className={styles.tooltip_text}
            variants={tooltipVariants}
            animate="visible"
            initial="hidden"
            exit="hidden"
            transition={{ duration: 0.2 }}
          >
            {text}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
