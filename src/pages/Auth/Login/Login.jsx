import { Button } from "@/components";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { PageEndPoints } from "@/constants";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.login_box}>
        <div className={styles.logo}>Just Plan It !</div>
        <div className={styles.input_box}>
          <input type="text" placeholder="이메일" />
          <input type="password" placeholder="비밀번호" />
        </div>
        <div className={styles.btn_box}>
          <p>Find ID / PW</p>
          <Button size="md" variant="solid">
            로그인
          </Button>
        </div>
        <div className={styles.divider} />
        <div className={styles.social_login_btns}>
          <img src="/naver_icon.png" className={styles.social_btn} />
          <img src="/kakao_icon.png" className={styles.social_btn} />
          <img src="/google_icon.png" className={styles.social_btn} />
        </div>
      </div>

      <Button
        variant="none"
        style={{
          color: `var(--color-text-dynamic)`,
        }}
        onClick={() => navigate(PageEndPoints.JOIN)}
      >
        새로운 계정을 만들어보세요
      </Button>
    </div>
  );
};

export default LoginPage;
