import { useTheme } from "@/shared/context/ThemeContext";

import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

export default function ThemeBtn() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      size="icon"
      onClick={toggleTheme}
      className="fixed right-10 bottom-10 size-12"
    >
      {theme === "dark" ? (
        <Sun className="size-6" />
      ) : (
        <Moon className="size-6" />
      )}
    </Button>
  );
}
