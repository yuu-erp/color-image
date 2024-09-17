import { FiSun } from "react-icons/fi";
import { RiMoonClearLine } from "react-icons/ri";
import { Theme, useTheme } from "remix-themes";
import { Button } from "./ui/button";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  };

  return (
    <Button
      className="fixed right-4 top-4 rounded-full bg-background p-2 text-foreground hover:bg-black/10 dark:hover:bg-white/20"
      onClick={toggleTheme}
    >
      {theme === Theme.LIGHT ? (
        <FiSun size={24} />
      ) : (
        <RiMoonClearLine size={24} />
      )}
    </Button>
  );
};

export default ThemeSwitcher;
