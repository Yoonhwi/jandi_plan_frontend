import { formatPrice } from "@/utils";
import styles from "./Reserved.module.css";

const Reserved = ({ reserved }) => {
  const { data } = reserved;
  const order = ["TRANSPORTATION", "ACCOMMODATION", "ETC"];
  return (
    <div className={styles.container}>
      {Object.keys(data)
        .sort((a, b) => order.indexOf(a) - order.indexOf(b))
        .map((key) => {
          return (
            <div key={key} className={styles.des_item}>
              <p className={styles.des_title}>{key}</p>
              {data[key].map((item) => (
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
