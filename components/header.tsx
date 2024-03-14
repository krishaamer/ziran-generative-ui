import {
  HeaderTitle,
} from "@/components/ui/header-title";

export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full px-4 border-b h-10 shrink-0 bg-background backdrop-blur-xl docu-shadow">
      <span></span>
      <HeaderTitle />
      <span></span>
    </header>
  );
}
