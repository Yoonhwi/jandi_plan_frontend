import { Button } from "@/components";
import { formatDate } from "date-fns";
import styles from "./MyInfo.module.css";
import PasswordForm from "./passwordForm";

const MyInfo = ({ user }) => {
  const formatted = formatDate(user.updatedAt, "yyyy-MM-dd");

  return (
    <div className={styles.container}>
      <div className={styles.basic_info_container}>
        <p className={styles.title}>기본 정보</p>
        <div className={styles.info_box}>
          <div className={styles.user_photo_box}>
            <img
              src={user.profileImageUrl}
              alt="profile_img"
              className={styles.user_photo}
            />
            <Button variant="ghost" size="sm">
              이미지 변경
            </Button>
          </div>

          <div className={styles.basic_info_box}>
            <div className={styles.basic_info}>
              <p className={styles.info_name}>Name</p>
              <p className={styles.info_value}>
                {user.firstName}
                {user.lastName}
              </p>
            </div>
            <div className={styles.basic_info}>
              <p className={styles.info_name}>Email</p>
              <p className={styles.info_value}>{user.email}</p>
            </div>
            <div className={styles.basic_info}>
              <p className={styles.info_name}>Create_At</p>
              <p className={styles.info_value}>{formatted}</p>
            </div>
            <div className={styles.basic_info}>
              <p className={styles.info_name}>Nickname</p>
              <p className={styles.info_value}>{user.username}</p>
            </div>
          </div>
        </div>
      </div>

      <PasswordForm />
    </div>
  );
};

export default MyInfo;
