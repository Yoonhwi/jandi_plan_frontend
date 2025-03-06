import { useState } from "react";
import Plan from "./Plan";
import styles from "./TripManagement.module.css";
import City from "./City";
import Country from "./Country";
import { AnimatePresence, motion } from "framer-motion";

const TripManagement = () => {
  const [view, setView] = useState("plan");

  const getXDirection = (next) => {
    const order = ["plan", "city", "country"];
    const currentIndex = order.indexOf(view);
    const nextIndex = order.indexOf(next);
    return nextIndex > currentIndex ? 70 : -70;
  };

  return (
    <div className={styles.container} id="trips">
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, x: getXDirection(view) }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x:getXDirection(view) }}
          transition={{ duration: 0.5 }}
          style={{ height: "100%" }}
        >
          {view === "plan" && <Plan setView={setView} />}
          {view === "city" && <City setView={setView} />}
          {view === "country" && <Country setView={setView} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TripManagement;
