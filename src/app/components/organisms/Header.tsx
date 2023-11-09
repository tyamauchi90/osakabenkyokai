"use client";
import Link from "next/link";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import useAuthCurrentUser from "../auth/useAuthCurrentUser";
import { Button } from "../shadcn/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/ui/dialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../shadcn/ui/navigation-menu";

const Header = () => {
  const user = useAuthCurrentUser();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white w-full h-20">
        <div className="flex items-center justify-end m-2 p-4">
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

              {/* サークル */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-base">
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
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* お問合せ */}
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} text-base`}
                  >
                    お問合せ
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* マイページ */}
              <NavigationMenuItem className="text-base">
                {!user ? (
                  <>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">サインアップ</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
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
                        <Button variant="outline">サインイン</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
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
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
    </>
  );
};

export default Header;
