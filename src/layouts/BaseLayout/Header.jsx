import { useDarkModeContext } from "@/contexts";
import styles from "./Header.module.css";
import { LuUserRound } from "react-icons/lu";
import { LuLogIn } from "react-icons/lu";
import { LuMoonStar } from "react-icons/lu";
import { Button } from "@/components";

const Header = () => {
  const { toggleDarkMode } = useDarkModeContext();

  return (
    <header className={styles.container}>
      <p className={styles.title}>JUST PLAN IT !</p>
      <nav className={styles.nav_container}>
        <div>여행 계획</div>
        <div>게시판</div>
        <div>공지사항</div>
        <div className={styles.icon_container}>
          <Button variant="none" size="sm">
            <LuUserRound size={20} />
          </Button>

          <Button variant="none" size="sm">
            <LuLogIn size={20} />
          </Button>

          <Button variant="none" size="sm">
            <LuMoonStar size={20} onClick={toggleDarkMode} />
          </Button>
        </div>
        <Button>테스트</Button>
      </nav>
    </header>
  );
};

export default Header;
