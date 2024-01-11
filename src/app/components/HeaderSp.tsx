"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarClock,
  Lock,
  LockKeyhole,
  LogIn,
  Pencil,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { ReactElement, useState } from "react";
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

const HeaderSp = () => {
  const user = useAuthCurrentUser();
  const userRole = useUserRole(user ? user.uid : null);
  const [isOpen, setIsOpen] = useState(false);

  const NavItem = ({
    href,
    icon,
    text,
  }: {
    href: string;
    icon: ReactElement;
    text: string;
  }) => {
    return (
      <motion.li variants={itemVariants} className="p-5">
        <Link
          href={href}
          className="flex items-center gap-8"
          onClick={() => setIsOpen(!isOpen)}
        >
          {icon}
          {text}
        </Link>
      </motion.li>
    );
  };

  const sideVariants = {
    open: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: 1,
        delayChildren: 0.35,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
    },
    closed: {
      opacity: 0,
    },
  };

  return (
    <>
      <header className="block md:hidden sticky top-0 z-50 bg-white w-full dark:bg-black">
        <motion.div
          animate={isOpen ? "open" : "closed"}
          className="relative flex justify-between items-center w-full px-2"
        >
          {/* トップ */}
          <Link href="/" onClick={() => setIsOpen(false)}>
            <img
              src="/img/top/logo.png"
              alt="ロゴ"
              className="inline-block w-16 h-16"
            />
          </Link>
          <button
            className="flex justify-center items-center w-8 h-8"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <motion.path
                fill="transparent"
                strokeWidth="3"
                stroke="hsl(0, 0%, 18%)"
                strokeLinecap="round"
                variants={{
                  closed: { d: "M 2 1.5 L 26 1.5" },
                  open: { d: "M 2 18 L 20 1.5" },
                }}
              ></motion.path>
              <motion.path
                fill="transparent"
                strokeWidth="3"
                stroke="hsl(0, 0%, 18%)"
                strokeLinecap="round"
                d="M 2 10 L 26 10"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
              ></motion.path>
              <motion.path
                fill="transparent"
                strokeWidth="3"
                stroke="hsl(0, 0%, 18%)"
                strokeLinecap="round"
                variants={{
                  closed: { d: "M 2 18 L 26 18" },
                  open: { d: "M 2 1.5 L 20 18" },
                }}
              ></motion.path>
            </svg>
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {isOpen && (
            <>
              {/* オーバーレイ */}
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-40 z-10"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.8, 1],
                  scaleY: [0, 1],
                  transformOrigin: "top",
                  transition: { duration: 0.5, ease: "easeIn" },
                }}
                exit={{
                  opacity: [1, 0.8],
                  scaleY: [1, 0],
                  transformOrigin: "top",
                  transition: { delay: 0.5, duration: 0.5, ease: "easeOut" },
                }}
              ></motion.div>

              {/* メニュー */}
              <motion.div
                className="w-60 absolute right-0 z-50"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.8, 1],
                  scaleY: [0, 1],
                  transformOrigin: "top",
                  transition: { duration: 0.5, ease: "easeIn" },
                }}
                exit={{
                  opacity: [1, 0.8],
                  scaleY: [1, 0],
                  transformOrigin: "top",
                  transition: { delay: 0.5, duration: 0.5, ease: "easeOut" },
                }}
              >
                <motion.div
                  className="bg-customYellow rounded-3xl"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={sideVariants}
                >
                  <nav className="list-none divide-y divide-white p-[10%]">
                    {/* ブログ */}
                    <NavItem
                      href="/circle/blog"
                      icon={<Pencil />}
                      text="ブログ"
                    />
                    {/* スケジュール */}
                    <NavItem
                      href="/circle/schedule"
                      icon={<CalendarClock />}
                      text="スケジュール"
                    />

                    {/* マイページ */}
                    {!user ? (
                      <>
                        <motion.li variants={itemVariants} className="p-5 ">
                          <Dialog>
                            <DialogTrigger asChild>
                              <p className="flex items-center gap-8">
                                <UserPlus />
                                サインアップ
                              </p>
                            </DialogTrigger>
                            <DialogContent className="h-[90%] my-[5%] overflow-scroll sm:max-w-lg">
                              <DialogHeader>
                                <DialogTitle>サインアップ</DialogTitle>
                              </DialogHeader>
                              <SignUp />
                              <DialogFooter className="sm:justify-start">
                                <DialogClose asChild></DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </motion.li>
                        <motion.li variants={itemVariants} className="p-5 ">
                          <Dialog>
                            <DialogTrigger asChild>
                              <p className="flex items-center gap-8">
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
                        </motion.li>
                      </>
                    ) : (
                      <NavItem
                        href="/user/mypage"
                        icon={<Lock />}
                        text="マイページ"
                      />
                    )}

                    {/* 管理者ページ */}
                    {(userRole === "admin" || userRole === "master") && (
                      <NavItem
                        href="/admin"
                        icon={<LockKeyhole />}
                        text="管理者ページ"
                      />
                    )}
                  </nav>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default HeaderSp;
