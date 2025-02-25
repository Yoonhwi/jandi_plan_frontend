import { formatPrice } from "@/utils";
import styles from "./Reserved.module.css";

const Reserved = ({ reserved }) => {
  const flattendReserve = (({ transportation, accommodation, etc }) => ({
    transportation,
    accommodation,
    etc,
  }))(reserved);

  return (
    <div className={styles.container}>
      {Object.keys(flattendReserve).map((key) => {
        const capitalized = key.charAt(0).toUpperCase() + key.slice(1);

        return (
          <div key={key} className={styles.des_item}>
            <p className={styles.des_title}>{capitalized}</p>
            {flattendReserve[key].data.map((item) => (
              <div key={item.id} className={styles.des_item_row}>
                <p>{item.title}</p>
                <p>{formatPrice(item.cost)}원</p>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Reserved;
