"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import ThemeSwitcher from "@/components/shared/theme";
import LanguageSwitcher from "@/components/shared/language-switcher";
import { useLanguage } from "@/components/shared/language";
import { useSession, signOut } from "next-auth/react";
import { SignIn } from "../llm-login";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const zhComponents: { title: string; href: string; description: string }[] = [
  {
    title: "工廠 🏭",
    href: "?ask=%E5%8F%B0%E7%81%A3%E6%9C%89%E5%93%AA%E4%BA%9B%E5%B7%A5%E5%BB%A0%EF%BC%8C%E5%AE%83%E5%80%91%E4%BD%8D%E6%96%BC%E4%BD%95%E8%99%95%EF%BC%9F",
    description: "台灣有哪些工廠，它們位於何處？",
  },
  {
    title: "空氣污染 🌬️",
    href: "?ask=%E5%B7%A5%E6%A5%AD%E7%94%9F%E7%94%A2%E5%92%8C%E5%B7%A5%E5%BB%A0%E5%A6%82%E4%BD%95%E5%BD%B1%E9%9F%BF%E5%8F%B0%E7%81%A3%E5%90%84%E5%9C%B0%E7%9A%84%E7%A9%BA%E6%B0%A3%E6%B1%A1%E6%9F%93%EF%BC%9F",
    description: "工業生產和工廠如何影響台灣各地的空氣污染？",
  },
  {
    title: "水污染 💦",
    href: "?ask=%E5%B7%A5%E6%A5%AD%E7%94%9F%E7%94%A2%E5%A6%82%E4%BD%95%E5%BD%B1%E9%9F%BF%E5%8F%B0%E7%81%A3%E5%90%84%E5%9C%B0%E7%9A%84%E6%B0%B4%E6%B1%A1%E6%9F%93%EF%BC%9F",
    description: "工業生產如何影響台灣各地的水污染？",
  },
  {
    title: "土壤污染 🍂",
    href: "?ask=%E5%B7%A5%E6%A5%AD%E7%94%9F%E7%94%A2%E5%A6%82%E4%BD%95%E5%BD%B1%E9%9F%BF%E5%8F%B0%E7%81%A3%E5%90%84%E5%9C%B0%E7%9A%84%E5%9C%9F%E5%A3%A4%E6%B1%A1%E6%9F%93%EF%BC%9F",
    description: "工業生產如何影響台灣各地的土壤污染？",
  },
  {
    title: "氣候改變 🌏",
    href: "?ask=%E6%88%91%E4%BD%BF%E7%94%A8%E9%87%91%E9%8C%A2%E8%B3%BC%E7%89%A9%E3%80%81%E5%84%B2%E8%93%84%E5%92%8C%E6%8A%95%E8%B3%87%E7%9A%84%E6%96%B9%E5%BC%8F%E5%A6%82%E4%BD%95%E5%BD%B1%E9%9F%BF%E7%92%B0%E5%A2%83%E5%92%8C%E6%B0%A3%E5%80%99%E8%AE%8A%E9%81%B7%EF%BC%9F",
    description: "我使用金錢購物、儲蓄和投資的方式如何影響環境和氣候變遷？",
  },
  {
    title: "分析股票歷史 💰",
    href: "?ask=%E5%88%86%E6%9E%90%E8%82%A1%E7%A5%A8%E6%AD%B7%E5%8F%B2%EF%BC%8C%E6%88%91%E7%9A%84%E8%82%A1%E7%A5%A8%E7%9A%84%E8%B2%A1%E5%8B%99%E5%92%8C%E5%8F%AF%E6%8C%81%E7%BA%8C%E8%A1%A8%E7%8F%BE%E5%A6%82%E4%BD%95%EF%BC%9F",
    description: "我的股票的財務和可持續表現如何？",
  },
];

const enComponents: { title: string; href: string; description: string }[] = [
  {
    title: "Factories 🏭",
    href: "?ask=What%20factories%20are%20in%20Taiwan%2C%20and%20where%20are%20they%3F",
    description: "What factories are in Taiwan and where are they?",
  },
  {
    title: "Air Pollution 🌬️",
    href: "?ask=How%20do%20industrial%20production%20and%20factories%20affect%20air%20pollution%20across%20Taiwan%3F",
    description:
      "How do industrial production and factories affect air pollution across Taiwan?",
  },
  {
    title: "Water Pollution 💦",
    href: "?ask=How%20does%20industrial%20production%20affect%20water%20pollution%20across%20Taiwan%3F",
    description: "How does industrial production affect water pollution in Taiwan?",
  },
  {
    title: "Soil Pollution 🍂",
    href: "?ask=How%20does%20industrial%20production%20affect%20soil%20pollution%20across%20Taiwan%3F",
    description: "How does industrial production affect soil pollution in Taiwan?",
  },
  {
    title: "Climate Change 🌏",
    href: "?ask=How%20do%20my%20shopping%2C%20saving%2C%20and%20investing%20habits%20affect%20the%20environment%20and%20climate%20change%3F",
    description:
      "How do my shopping, saving and investing affect the environment and climate change?",
  },
  {
    title: "Analyze Stock History 💰",
    href: "?ask=Analyze%20stock%20history%3A%20What%20are%20the%20financial%20and%20sustainability%20performance%20of%20my%20stocks%3F",
    description:
      "What are the financial and sustainability performance of my stocks?",
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function Header() {
  const session = useSession();
  const { lang, t } = useLanguage();
  const items = lang === "en" ? enComponents : zhComponents;
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between w-full px-4 border-b h-8 shrink-0 text-white bg-gradient-to-br from-pink-500 to-orange-400 font-medium text-sm text-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {t("Green Filter Assistant", "綠濾助手")}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        {t("Green Filter Assistant", "綠濾助手")}
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Shop, save and invest with your mind at ease from
                        climate anxiety 😊 Green Filter helps you see your money
                        through the lens of sustainability
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem
                  href="https://www.greenfilter.app/"
                  title={t("Thesis", "論文")}
                  target="_blank"
                >
                  {t(
                    "From consumer to investor: designing a financial AI companion for young adults to help sustainable shopping, saving and investing",
                    "從消費者到投資者的旅程：為年輕成人設計一個財務人工智慧夥伴，幫助他們進行可持續購物、儲蓄和投資"
                  )}
                </ListItem>
                <ListItem
                  href="https://chromewebstore.google.com/detail/%E7%B6%A0%E6%BF%BE-green-filter/jmpnmeefjlcbpmoklhhljcigffdmmjeg"
                  title="Chrome Extension"
                  target="_blank"
                >
                  Install the 綠濾 Green Filter Chrome Extension
                </ListItem>
                <li>
                  <ThemeSwitcher />
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {t("What am I supporting with my spending?", "我花錢去支持了啥物呢？")}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[500px] ">
                {items.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex space-x-4 mr-6 items-center">
        <LanguageSwitcher />
        <DropdownMenu>
          <DropdownMenuTrigger>
            {session?.data?.user?.name ?? t("Sign in", "登入")}
          </DropdownMenuTrigger>
          {session?.data?.user?.name ? (
            <DropdownMenuContent className="mr-6">
              <DropdownMenuLabel>{t("My account", "我的帳戶")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button onClick={() => signOut()}>{t("Sign out", "登出")}</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          ) : (
            <DropdownMenuContent className="mr-6">
              <DropdownMenuItem>
                <SignIn />
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
    </div>
  );
}
