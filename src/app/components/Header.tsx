"use client";
import Link from "next/link";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import useAuthCurrentUser from "./auth/useAuthCurrentUser";
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
import { ModeToggle } from "./theme/ModeToggle";

const Header = () => {
  const user = useAuthCurrentUser();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white w-full h-20 dark:bg-black">
        <div className="flex items-center justify-end p-4">
          <NavigationMenu className="justify-end max-w-fit">
            <NavigationMenuList>
              {/* トップ */}
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} text-base`}
                  >
                    おおさか勉強会トップ
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* サンプル */}
              <NavigationMenuItem>
                <Link href="/circle/sample" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} text-base`}
                  >
                    サンプル
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* ブログ */}
              <NavigationMenuItem>
                <Link href="/circle/blog" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} text-base`}
                  >
                    ブログ
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* スケジュール */}
              <NavigationMenuItem>
                <Link href="/circle/schedule" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} text-base`}
                  >
                    スケジュール
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* サークル */}
              {/* <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm">
                  サークル
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-4">
                  <Link href="/circle/about" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} text-base`}
                    >
                      サークル紹介
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/circle/blog" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} text-base`}
                    >
                      ブログ
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/circle/schedule" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} text-base`}
                    >
                      スケジュール
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/circle/voice" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} text-base`}
                    >
                      参加者の声
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuContent>
              </NavigationMenuItem> */}

              {/* マイページ */}
              <NavigationMenuItem className="text-base">
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
                          {/* <DialogDescription>
                    （サインインをします）
                  </DialogDescription> */}
                        </DialogHeader>
                        <SignIn />
                        <DialogFooter className="sm:justify-start">
                          <DialogClose asChild>
                            {/* <Button type="button" variant="secondary">
                      Close
                    </Button> */}
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </>
                ) : (
                  <Link href="/user/mypage" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} text-base`}
                    >
                      マイページ
                    </NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>

              {/* Darkモード */}
              <NavigationMenuItem className="">
                <ModeToggle />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
    </>
  );
};

export default Header;
