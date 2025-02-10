import { useState } from "react";
import styles from "./AddUser.module.css";
import {Input, Button} from "@/components";
import { useModal } from "@/components/Modal/ModalContext";
import { destinationItems } from "./constants";


const AddDestination = ({onConfirm}) => {
  const [destination, setDestination] = useState("");
  const { closeModal } = useModal();

  const handleConfirmClick = () => {
    onConfirm(userNames); 
    closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>여행지 선택하기</div>
      <div className={styles.destination_container}>
        <div className={styles.preference_container}>
          <div className={styles.sub_title}>선호 여행지</div>
        </div>
        {destinationItems.map((continent) => (
          <div className={styles.destination_container}>
              <div className={styles.sub_title}>{continent.title}</div>
              {continent.data.map((destination) => (
                <div
                key={destination.name}
                className={`${styles.destination} ${isSelected ? styles.selected : ""}`}
                onClick={() => setDestination(destination.name)}
              >
                <img
                  src={destination.imgSrc}
                  alt={destination.name}
                  className={styles.dest_img}
                />
                <div className={styles.dest_text}>
                  {isSelected ? `✔ ${destination.name}` : destination.name}
                </div>
              </div>
              ))}
            <div className={styles.sub_title}></div>
          </div>           
        ))}
      </div>
    </div>
  );
};

export default AddDestination;