"use client";
import Link from "next/link";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import useAuthCurrentUser from "./auth/useAuthCurrentUser";
import useUserRole from "./auth/useUserRole";
import { Button } from "./shadcn/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./shadcn/ui/dialog";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./shadcn/ui/navigation-menu";

const Header = () => {
  const user = useAuthCurrentUser();
  const userRole = useUserRole(user ? user.uid : null);
  
  return (
    <>
      <header className="hidden md:block sticky top-0 z-50 bg-white w-full dark:bg-black">
        <div className="flex items-center justify-between px-4">
          {/* トップ */}
          <div>
            <Link href="/">
              <img
                src="/img/top/logo.png"
                alt="ロゴ"
                className="inline-block w-16 h-16"
              />
              {/* <span>おおさか勉強会</span> */}
            </Link>
          </div>
          <NavigationMenu className="justify-end md:max-w-fit">
            <NavigationMenuList>
              {/* ブログ */}
              <NavigationMenuItem>
                <Link href="/circle/blog" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} `}
                  >
                    ブログ
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* スケジュール */}
              <NavigationMenuItem>
                <Link href="/circle/schedule" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} `}
                  >
                    スケジュール
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* マイページ */}
              <NavigationMenuItem className="">
                {!user ? (
                  <>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="mr-3 px-2">
                          サインアップ
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>サインアップ</DialogTitle>
                          {/* <DialogDescription>
                      （サインインをします）
                    </DialogDescription> */}
                        </DialogHeader>
                        <SignUp />
                        <DialogFooter className="sm:justify-start">
                          <DialogClose asChild>
                            {/* <Button type="button" variant="secondary">
                        Close
                      </Button> */}
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="px-2">
                          サインイン
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>サインイン</DialogTitle>
                        </DialogHeader>
                        <SignIn />
                        <DialogFooter className="sm:justify-start">
                          <DialogClose asChild></DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </>
                ) : (
                  <Link href="/user/mypage" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} `}
                    >
                      マイページ
                    </NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>

              {/* 管理者ページ */}
              {(userRole === "admin" || userRole === "master") && (
                <NavigationMenuItem>
                  <Link href="/admin" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} `}
                    >
                      管理者ページ
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
              {/* Darkモード */}
              {/* <NavigationMenuItem>
                <ModeToggle />
              </NavigationMenuItem> */}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
    </>
  );
};

export default Header;
