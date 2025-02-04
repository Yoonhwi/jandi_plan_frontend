import { useDarkMode } from "@/hooks";
import { DarkModeContext } from "./DarkmodeContext";

const DarkmodeProvider = ({ children }) => {
  const { toggleDarkMode } = useDarkMode();

  return (
    <DarkModeContext.Provider value={{ toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkmodeProvider;
