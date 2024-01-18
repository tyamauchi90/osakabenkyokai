"use client";
import {
  CalendarClock,
  Lock,
  LockKeyhole,
  LogIn,
  Pencil,
  UserPlus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import useAuthCurrentUser from "./auth/useAuthCurrentUser";
import useUserRole from "./auth/useUserRole";
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
        <div className="flex items-center justify-between py-2 px-4">
          {/* トップ */}
          <div className="relative w-12 h-12">
            <Link href="/">
              <Image
                fill
                src="/img/top/logo.png"
                alt="ロゴ"
                className="inline-block w-16 h-16"
              />
            </Link>
          </div>
          <NavigationMenu className="justify-end md:max-w-fit">
            <NavigationMenuList className="space-x-5">
              {/* ブログ */}
              <NavigationMenuItem>
                <Link href="/circle/blog" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} flex items-center gap-2 pr-6`}
                  >
                    <Pencil />
                    ブログ
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* スケジュール */}
              <NavigationMenuItem>
                <Link href="/circle/schedule" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} flex items-center gap-2`}
                  >
                    <CalendarClock />
                    スケジュール
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* マイページ */}
              <NavigationMenuItem className="flex">
                {!user ? (
                  <>
                    <Dialog>
                      <DialogTrigger asChild>
                        <p className="flex items-center gap-2 cursor-pointer py-2 pl-2 pr-5 rounded-md hover:bg-gray-100">
                          <UserPlus />
                          サインアップ
                        </p>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>サインアップ</DialogTitle>
                        </DialogHeader>
                        <SignUp />
                        <DialogFooter className="sm:justify-start">
                          <DialogClose asChild></DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <p className="flex items-center gap-2 cursor-pointer py-2 pl-5 rounded-md hover:bg-gray-100">
                          <LogIn />
                          サインイン
                        </p>
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
                      className={`${navigationMenuTriggerStyle()} flex items-center gap-2`}
                    >
                      <Lock />
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
                      className={`${navigationMenuTriggerStyle()} flex items-center gap-2`}
                    >
                      <LockKeyhole />
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
