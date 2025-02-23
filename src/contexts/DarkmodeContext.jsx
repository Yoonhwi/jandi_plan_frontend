import { createContext, useContext } from "react";

export const DarkmodeContext = createContext({
  toggleDarkMode: () => {},
  isDarkMode: false,
});

export const useDarkmodeContext = () => {
  const context = useContext(DarkmodeContext);

  if (!context) {
    throw new Error(
      "useDarkmodeContext 는 DarkmodeProvider 내부에서 사용되어야 합니다."
    );
  }

  return context;
};
