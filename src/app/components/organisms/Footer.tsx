"use client";
import Link from "next/link";
import useAuthCurrentUser from "../auth/useAuthCurrentUser";

const Footer = () => {
  const user = useAuthCurrentUser();

  return (
    <>
      {/* フッター　テスト */}
      <footer className="relative bg-gray-100 pt-8 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full lg:w-6/12 p-6">
              <h4 className="text-3xl fonat-semibold text-blueGray-700">
                フッター
              </h4>
              <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
                以下にフッターコンテンツが入ります
              </h5>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex items-top mb-6">
                <div className="flex justify-evenly w-full px-4 ml-auto ">
                  <ul className="list-unstyled">
                    <li>
                      <Link href="/">おおさか勉強会トップ</Link>
                    </li>
                    <li>
                      <Link href="/circle/about">サークル紹介</Link>
                    </li>
                    <li>
                      <Link href="/circle/blog">ブログ</Link>
                    </li>
                    <li>
                      <Link href="/circle/schedule">スケジュール</Link>
                    </li>
                    <li>
                      <Link href="/contact">お問合せ</Link>
                    </li>
                    {user && (
                      <li>
                        <Link href="/user/mypage">マイページ</Link>
                      </li>
                    )}
                  </ul>
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        href="https://www.facebook.com/p/社会人サークル-おおさか勉強会-100064844221955/?paipv=0&eav=AfYozu38gdjZb906RlubCPn20m0e4qEPRkWO8EG0cdsB4pPBF3eD3RVGnpz9PUUA3LE&_rdr"
                        target="_blank"
                      >
                        Facebook
                      </Link>
                    </li>
                    <li>
                      <Link href="/">プライバシーポリシー</Link>
                    </li>
                    <li>
                      <Link href="/">サンプル</Link>
                    </li>
                    <li>
                      <Link href="/">サンプル</Link>
                    </li>
                    <li>
                      <Link href="/">サンプル</Link>
                    </li>
                    <li>
                      <Link href="/">サンプル</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-600" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © <span id="get-current-year">2023 </span>
                <span className="text-blueGray-500 hover:text-gray-800">
                  おおさか勉強会
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
