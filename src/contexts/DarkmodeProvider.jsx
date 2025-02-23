import { useDarkMode } from "@/hooks";
import { DarkmodeContext } from "./DarkmodeContext";

const DarkmodeProvider = ({ children }) => {
  const { toggleDarkMode, isDarkMode } = useDarkMode();

  return (
    <DarkmodeContext.Provider value={{ toggleDarkMode, isDarkMode }}>
      {children}
    </DarkmodeContext.Provider>
  );
};

export default DarkmodeProvider;
