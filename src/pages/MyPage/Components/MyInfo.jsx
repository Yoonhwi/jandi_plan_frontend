import styles from "./MyInfo.module.css";
import { Input, Button } from "@/components";
import { userInfo } from "../constants";
const MyInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.basic_info_container}>
        <p className={styles.title}>기본 정보</p>
        <div className={styles.info_box}>
          <div className={styles.user_photo_box}>
            <img
              src={userInfo.profile_url}
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
              <p className={styles.info_value}>{userInfo.name}</p>
            </div>
            <div className={styles.basic_info}>
              <p className={styles.info_name}>Email</p>
              <p className={styles.info_value}>{userInfo.email}</p>
            </div>
            <div className={styles.basic_info}>
              <p className={styles.info_name}>Create_At</p>
              <p className={styles.info_value}>{userInfo.joinDate}</p>
            </div>
            <div className={styles.basic_info}>
              <p className={styles.info_name}>Nickname</p>
              <p className={styles.info_value}>{userInfo.nickname}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.pw_info_box}>
        <p className={styles.title}>비밀번호 변경</p>
        <div className={styles.plan_columns}>
          <div className={styles.input_name}>현재 비밀번호</div>
          <Input size="md" type="password" style={{ flex: 1 }} />
        </div>
        <div className={styles.plan_columns}>
          <div className={styles.input_name}>새 비밀번호</div>
          <Input size="md" type="password" style={{ flex: 1 }} />
        </div>
        <div className={styles.plan_columns}>
          <div className={styles.input_name}>새 비밀번호 재입력</div>
          <Input size="md" type="password" style={{ flex: 1 }} />
        </div>
      </div>

      <Button
        size="md"
        variant="ghost"
        style={{
          alignSelf: "center",
        }}
      >
        수정완료
      </Button>
    </div>
  );
};

export default MyInfo;
