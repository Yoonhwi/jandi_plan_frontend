import { useDarkMode } from "@/hooks";
import { DarkModeContext } from "./DarkmodeContext";

const DarkModeProvider = ({ children }) => {
  const { toggleDarkMode, isDarkMode } = useDarkMode();

  return (
    <DarkModeContext.Provider value={{ toggleDarkMode, isDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
