import { useTheme } from "next-themes";
import { SunIcon } from "@radix-ui/react-icons";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <SunIcon />
    </button>
  );
}
