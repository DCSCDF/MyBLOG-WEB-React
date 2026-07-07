"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TopBlur } from "@/components/ui/edge-blur";

import {
  toggleTheme,
  subscribeTheme,
  getThemeSnapshot,
  getThemeServerSnapshot,
} from "@/lib/utils";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  }
];

export default function Header() {
  const router = useRouter();
  const theme = React.useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    router.push(href);
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };
  return (
    <>
      <TopBlur height={100} bgColor="var(--background)" />
      <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className=" mx-auto flex h-14 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Link href="/" className="text-lg font-semibold">
              <div className="flex flex-wrap items-center gap-2 md:flex-row">
                  {/*<Button size="icon-lg"  variant="ghost" >*/}
                  {/*    <svg className="icon" height={"24"} p-id="1320" d="1777084112424" version="1.1" viewBox="0 0 1024 1024" width="30" xmlns="http://www.w3.org/2000/svg" data-v-00d6f774=""><path d="M447.7 62H94.1C76.4 62 62 74.6 62 90.1v478.1c0 15.5 14.4 28.1 32.1 28.1h353.6c17.8 0 32.1-12.6 32.1-28.1V90.1c0.1-15.5-14.3-28.1-32.1-28.1z m-32.1 478.1H126.3V118.3h289.3v421.8z" fill="#37B1C9" p-id="1321" data-v-00d6f774=""></path><path d="M447.7 652.6H94.1c-17.8 0-32.1 12.6-32.1 28.1v253.1c0 15.5 14.4 28.1 32.1 28.1h353.6c17.8 0 32.1-12.6 32.1-28.1v-253c0.1-15.6-14.3-28.2-32.1-28.2z m-32.1 253.2H126.3V708.9h289.3v196.9zM929.9 62H576.3c-17.8 0-32.1 12.6-32.1 28.1v253.1c0 15.5 14.4 28.1 32.1 28.1h353.6c17.8 0 32.1-12.6 32.1-28.1V90.1c0-15.5-14.4-28.1-32.1-28.1z m-32.2 253.1H608.4V118.3h289.3v196.8z" fill="#9BD8E4" p-id="1322" data-v-00d6f774=""></path><path d="M929.9 427.6H576.3c-17.8 0-32.1 12.6-32.1 28.1v478.1c0 15.5 14.4 28.1 32.1 28.1h353.6c17.8 0 32.1-12.6 32.1-28.1v-478c0-15.6-14.4-28.2-32.1-28.2z m-32.2 478.2H608.4V483.9h289.3v421.9z" fill="#37B1C9" p-id="1323" data-v-00d6f774=""></path></svg>*/}
                  {/*</Button>*/}
                  <svg  d="1783371395993"  height={"24"}  className="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="1786" >
                      <path
                          d="M840.533 209.067L610.133 76.8c-59.733-34.133-136.533-34.133-192 0L183.467 209.067c-29.867 17.066-29.867 55.466 0 72.533L469.333 448c25.6 17.067 59.734 17.067 85.334 0l285.866-166.4c25.6-12.8 25.6-55.467 0-72.533z m-657.066 601.6l230.4 132.266c29.866 17.067 64-4.266 64-38.4V576c0-29.867-17.067-59.733-42.667-72.533L149.333 345.6c-25.6-17.067-64 4.267-64 34.133v264.534c0 72.533 38.4 132.266 98.134 166.4z m691.2-465.067L588.8 507.733c-25.6 17.067-42.667 42.667-42.667 72.534V908.8c0 34.133 34.134 55.467 64 38.4l230.4-132.267C900.267 780.8 934.4 716.8 934.4 648.533v-268.8c4.267-29.866-34.133-51.2-59.733-34.133z m-38.4 196.267l-110.934 64c-17.066 8.533-38.4 4.266-46.933-12.8s-4.267-38.4 12.8-46.934l110.933-64c17.067-8.533 38.4-4.266 46.934 12.8s4.266 38.4-12.8 46.934z"
                          fill={theme === "dark" ? "#e5e5e5" : "#333333"} p-id="1787"></path>
                  </svg>
              </div>

          </Link>
            <div className="mx-6">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                href="/"
                                onClick={(e) => handleNav(e, "/")}
                                className={navigationMenuTriggerStyle()}
                            >
                                主页
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                <NavigationMenuItem className="hidden md:flex">
                  <NavigationMenuTrigger>我的博客</NavigationMenuTrigger>
                  <NavigationMenuContent>
                      <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
                      {components.map((component) => (
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
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/docs"
                    onClick={(e) => handleNav(e, "/docs")}
                    className={navigationMenuTriggerStyle()}
                  >
                    其他文章
                  </NavigationMenuLink>
                </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                href="/links"
                                onClick={(e) => handleNav(e, "/docs")}
                                className={navigationMenuTriggerStyle()}
                            >
                                友情链接
                            </NavigationMenuLink>
                        </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <nav className="flex items-center gap-4">

            <Input type="search" placeholder="搜索..." />

            <div className={"h-4 border"}></div>

            <Button variant="outline" size="icon" aria-label="Toggle theme" onClick={handleThemeToggle}>
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <div className={"h-4 border"}></div>

            <Button>
                <Link href="/login">登入</Link>
            </Button>
        </nav>
      </div>
    </header>
    </>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <li {...props}>
      <NavigationMenuLink href={href} onClick={handleClick}>
        <div className="flex flex-col gap-1 text-sm">
          <div className="leading-none font-medium">{title}</div>
          <div className="line-clamp-2 text-muted-foreground">{children}</div>
        </div>
      </NavigationMenuLink>
    </li>
  );
}



