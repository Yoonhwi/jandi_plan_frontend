import { useState } from "react";
import Plan from "./Plan";
import styles from "./TripManagement.module.css";
import City from "./City";
import { AnimatePresence, motion } from "framer-motion";

const TripManagement = () => {
  const [isCity, setIsCity] = useState(false);

  return (
    <div className={styles.container} id="trips">
      <AnimatePresence mode="wait">
        <motion.div
          key={isCity}
          initial={{ opacity: 0, x: isCity ? 70 : -70 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isCity ? 70 : -70 }}
          transition={{ duration: 0.5 }}
          style={{ height: "100%" }}
        >
          {isCity ? <City set={setIsCity} /> : <Plan set={setIsCity} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TripManagement;
