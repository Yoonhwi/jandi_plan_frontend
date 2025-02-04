import { createContext, useContext } from "react";

export const DarkModeContext = createContext({
  toggleDarkMode: () => {},
});

export const useDarkModeContext = () => {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error(
      "useDarkModeContext 는 DarkModeProvider 내부에서 사용되어야 합니다."
    );
  }

  return context;
};
