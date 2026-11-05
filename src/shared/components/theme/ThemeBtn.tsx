import { Button } from "@/components/ui/button";
import { useTheme } from "@/shared/context/ThemeContext";

import { Moon, Sun } from "lucide-react";

export default function ThemeBtn() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      size="icon"
      onClick={toggleTheme}
      className="fixed cursor-pointer right-10 bottom-10 size-12 z-50"
    >
      {theme === "dark" ? (
        <Sun className="size-6" />
      ) : (
        <Moon className="size-6" />
      )}
    </Button>
  );
}
