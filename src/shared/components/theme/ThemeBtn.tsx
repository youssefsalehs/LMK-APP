import { Button } from "@/components/ui/button";
import { useTheme } from "@/shared/context/ThemeContext";

import { Moon, Sun } from "lucide-react";

export default function ThemeBtn() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      size="icon"
      onClick={toggleTheme}
      variant={"secondary"}
      className="fixed right-5 bottom-5 cursor-pointer size-12 z-50 rounded-2xl "
    >
      {theme === "dark" ? (
        <Sun className="size-6" />
      ) : (
        <Moon className="size-6" />
      )}
    </Button>
  );
}
