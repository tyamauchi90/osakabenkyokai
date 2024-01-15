"use client";
import {
  CalendarClock,
  Facebook,
  Home,
  Lock,
  LockKeyhole,
  Mail,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import BackToTopBtn from "./BackToTopBtn";
import useAuthCurrentUser from "./auth/useAuthCurrentUser";
import useUserRole from "./auth/useUserRole";

const Footer = () => {
  const user = useAuthCurrentUser();
  const userRole = useUserRole(user ? user.uid : null);

  return (
    <>
      <BackToTopBtn />

      {/* フッター　テスト */}
      <footer className="relative bg-gray-100 pt-12 pb-6 dark:bg-black tracking-wider">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-center lg:text-left">
            <div className="w-full mb-8 lg:w-6/12">
              <div className="lg:mx-[6vw] pb-4 lg:pb-0 lg:inline-block border-b lg:border-none border-white">
                <p className="text-base sm:text-lg mb-2">
                  学び、成長、交流、&quot;きっかけ&ldquo;がここに。
                </p>
                <h4 className="text-2xl sm:text-3xl fonat-semibold">
                  おおさか勉強会
                </h4>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex items-top mb-6">
                <div className="flex flex-wrap items-center justify-evenly w-full px-4 ml-auto gap-8">
                  <ul className="list-unstyled space-y-4">
                    <li>
                      <Link href="/" className="flex items-center gap-2">
                        <Home />
                        トップ
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/circle/blog"
                        className="flex items-center gap-2"
                      >
                        <Pencil />
                        ブログ
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/circle/schedule"
                        className="flex items-center gap-2"
                      >
                        <CalendarClock />
                        スケジュール
                      </Link>
                    </li>
                    {user && (
                      <li>
                        <Link
                          href="/user/mypage"
                          className="flex items-center gap-2"
                        >
                          <Lock />
                          マイページ
                        </Link>
                      </li>
                    )}
                    {(userRole === "admin" || userRole === "master") && (
                      <li>
                        <Link href="/admin" className="flex items-center gap-2">
                          <LockKeyhole />
                          管理者ページ
                        </Link>
                      </li>
                    )}
                  </ul>
                  <div className="flex items-center gap-4">
                    <Link
                      href="https://www.facebook.com/p/社会人サークル-おおさか勉強会-100064844221955/?paipv=0&eav=AfYozu38gdjZb906RlubCPn20m0e4qEPRkWO8EG0cdsB4pPBF3eD3RVGnpz9PUUA3LE&_rdr"
                      target="_blank"
                    >
                      <div className="flex flex-col items-center justify-center gap-1 m-auto bg-facebookColor text-white w-28 h-28 p-4 rounded-md">
                        <Facebook />
                        <span>Facebook</span>
                      </div>
                    </Link>
                    <Link href="/contact">
                      <div className="flex flex-col items-center justify-center gap-1 m-auto bg-yellow-500 text-white w-28 h-28 p-4 rounded-md">
                        <Mail />
                        <span>Contact</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-600" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                © <span>2023 </span>
                <span className="">おおさか勉強会</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
