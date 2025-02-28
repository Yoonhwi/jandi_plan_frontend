import styles from "./PlanCard.module.css";
import { FaUserCircle } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { TiHeartFullOutline } from "react-icons/ti";

const PlanCard = ({ item }) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.img_container}
        style={{
          backgroundImage: `url(${item.cityImageUrl})`,
        }}
      />
      <div className={styles.content_container}>
        <div className={styles.content_header}>
          <div className={styles.header_title}>
            <img
              src={item.user.profile_url ?? "/user2.jpg"}
              className={styles.user_img}
            />
            <div className={styles.user_info}>
              <div className={styles.user_name}>
                <FaUserCircle size={20} />
                <p>{item.user.userName}</p>
              </div>
              <div className={styles.create_at}>
                <MdDateRange size={20} />
                <p>{item.startDate} ~ </p>
              </div>
            </div>
          </div>

          <div className={styles.header_stats}>
            <div className={styles.header_like}>
              <TiHeartFullOutline size={20} color="var(--color-red-500)" />
              <p>{item.likeCount}</p>
            </div>
          </div>
        </div>

        <div className={styles.plan_container}>
          <div className={styles.plan_title}>
            <p className={styles.title}>{item.title}</p>
            {item.description && (
              <p className={styles.description}>{item.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
