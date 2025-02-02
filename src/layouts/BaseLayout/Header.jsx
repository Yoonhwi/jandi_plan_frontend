import styles from "./Header.module.css";
import { LuUserRound } from "react-icons/lu";
import { LuLogIn } from "react-icons/lu";
import { LuMoonStar } from "react-icons/lu";

const Header = () => {
  return (
    <header className={styles.container}>
      <p className={styles.title}>JUST PLAN IT</p>
      <nav className={styles.nav_container}>
        <div>PLAN</div>
        <div>BOARD</div>
        <div>NOTICE</div>
        <div className={styles.icon_container}>
          <LuUserRound size={20} />
          <LuLogIn size={20} />
          <LuMoonStar size={20} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
