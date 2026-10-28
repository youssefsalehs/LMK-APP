import { useTheme } from "@/shared/context/ThemeContext";
import { Button } from "@base-ui/react/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeBtn() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="fixed  right-10 bottom-10">
      <Button onClick={toggleTheme}>
        {theme === "dark" ? <Sun /> : <Moon />}
      </Button>
    </div>
  );
}
