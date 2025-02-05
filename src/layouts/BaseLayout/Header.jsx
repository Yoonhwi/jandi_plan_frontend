import { useDarkModeContext } from "@/contexts";
import styles from "./Header.module.css";
import { LuUserRound } from "react-icons/lu";
import { LuLogIn } from "react-icons/lu";
import { LuMoonStar } from "react-icons/lu";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  Tooltip,
} from "@/components";
import { RiSearchLine } from "react-icons/ri";
import { LuMenu } from "react-icons/lu";

const Header = () => {
  const { toggleDarkMode, isDarkMode } = useDarkModeContext();

  const tooltips = [
    {
      text: "마이페이지",
      icon: <LuUserRound size={20} />,
    },
    {
      text: "로그인",
      icon: <LuLogIn size={20} />,
    },
    {
      text: isDarkMode ? "밝게" : "어둡게",
      icon: <LuMoonStar size={20} onClick={toggleDarkMode} />,
    },
    {
      text: "검색",
      icon: <RiSearchLine size={20} />,
    },
  ];

  const menus = [
    {
      text: "여행 계획",
    },
    {
      text: "게시판",
    },
    {
      text: "공지사항",
    },
  ];

  return (
    <header className={styles.container}>
      <p className={styles.title}>JUST PLAN IT !</p>

      {/** web */}
      <nav className={styles.nav_container}>
        {menus.map((menu, index) => (
          <p key={index} className={styles.nav_item}>
            {menu.text}
          </p>
        ))}

        <div className={styles.icon_container}>
          {tooltips.map((tooltip, index) => (
            <Tooltip key={index} text={tooltip.text}>
              <Button variant="none" size="sm">
                {tooltip.icon}
              </Button>
            </Tooltip>
          ))}
        </div>
      </nav>

      {/* mobile */}
      <nav className={styles.mobile_nav_container}>
        <Drawer>
          <DrawerTrigger>
            <LuMenu size={28} className={styles.icon_menu} />
          </DrawerTrigger>
          <DrawerContent>
            <div className={styles.sidebar_container}>
              {menus.map((menu, index) => (
                <p key={index} className={styles.nav_item}>
                  {menu.text}
                </p>
              ))}

              <div className={styles.sidebar_icons_box}>
                {tooltips.map((tooltip, index) => (
                  <Tooltip key={index} text={tooltip.text}>
                    <Button variant="solid" size="sm">
                      {tooltip.icon}
                    </Button>
                  </Tooltip>
                ))}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </nav>
    </header>
  );
};

export default Header;
