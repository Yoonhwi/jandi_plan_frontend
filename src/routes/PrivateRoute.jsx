import { useNavigate } from "react-router-dom";
import { BaseLayout } from "@/layouts";
import { useAuth } from "@/contexts";
import styles from "./PrivateRoute.module.css";
import { Button } from "@/components";
import { PageEndPoints } from "@/constants";

const PrivateRoute = ({ children, requireAuth }) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

  if (requireAuth && !isLoggedIn) {
    return (
      <BaseLayout>
        <div className={styles.container}>
          <span className={styles.title}>로그인이 필요한 서비스 입니다.</span>
          <span className={styles.text}>
            해당 서비스를 이용 하시려면 로그인을 해주세요.
          </span>
          <Button variant="outline" size="lg" onClick={() => navigate(PageEndPoints.HOME)}>
            홈으로 돌아가기
          </Button>
        </div>
      </BaseLayout>
    );
  }

  return children;
};

export default PrivateRoute;