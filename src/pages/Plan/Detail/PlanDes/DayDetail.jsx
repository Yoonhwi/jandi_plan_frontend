import { useState } from "react";
import styles from "./DayDetail.module.css";
import { MdRunCircle } from "react-icons/md";
import { formatPrice } from "@/utils";

const DayDetail = ({ data, focus }) => {
  const [dummy, setDummy] = useState(data);

  const s = dummy.find((v) => v.date === focus);
  const { contentData } = s;

  return (
    <div className={styles.container}>
      <div className={styles.inner_wrapper}>
        <div className={styles.container_left}>{}</div>

        <div className={styles.divider}>
          <MdRunCircle size={40} color="var(--color-indigo-400)" />
          <div className={styles.vertical_divider}></div>
        </div>

        <div className={styles.container_right}>
          {contentData.map((v) => {
            return (
              <div key={v.id} className={styles.content_wrapper}>
                <div className={styles.dashed} />
                <div className={styles.content_item}>
                  <div className={styles.content_item_des}>
                    <div className={styles.content_item_time}>{v.time}</div>
                    <div className={styles.content_title}>{v.title}</div>
                  </div>
                  <div className={styles.content_cost}>
                    {formatPrice(v.cost)} 원
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DayDetail;
