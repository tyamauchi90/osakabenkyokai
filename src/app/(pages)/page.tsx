"use client";
import { Suspense } from "react";
// import MainVisual from "./Mainvisual";
import Slideshow from "./Slideshow";
// import YoyoSample from "./YoyoSample";
import Image from "next/image";
import { WhileInDiv } from "../components/WhileInDiv";
import { WhileInWorry } from "../components/WhileInWorry";
import FacebookCarousel from "./circle/schedule/FacebookCarousel";
import LatestEvent from "./circle/schedule/LatestEvent";
import ContactPage from "./contact/page";

export default function Home() {
  const startYear = 2010;
  const currentYear = new Date().getFullYear();
  const establish = currentYear - startYear;

  return (
    <>
      {/* <YoyoSample /> */}
      {/* <MainVisual /> */}

      <Slideshow />
      {/* <section>
          <div className="relative py-10">
            <div className="bg-[url('/img/top/gradient_blue.svg')] bg-cover bg-fixed pt-[60%] z-[-100]"></div>
          </div>
        </section> */}

      <section>
        <WhileInDiv className="container flex flex-col items-center py-28 space-y-10">
          <h2 className="pb-1 text-xl text-yellow-500 tracking-[.25em] font-medium border-b-2 border-yellow-500">
            きっかけを探しているあなたへ
          </h2>
          <p className="py-5 text-4xl">こんな悩みはありませんか？</p>
          <WhileInWorry className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3" />
        </WhileInDiv>
      </section>

      <section className="relative w-screen py-28 bg-yellow-50">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[150px] border-l-transparent border-r-[150px] border-r-transparent border-t-[100px] border-t-white"></div>

        <WhileInDiv className="container pt-20 flex flex-col items-center space-y-10">
          <span className="relative -mb-5 py-2 px-10 rounded-full bg-gray-800 text-base tracking-[.25em] text-white">
            そのお悩み
            <span className="absolute w-0 h-0 border-r-[24px] border-l-2 border-t-[20px] border-t-gray-800 border-x-transparent -bottom-2 left-1/2 transform -translate-x-1/2"></span>
          </span>
          <strong className="text-2xl leading-loose">
            <span className="text-5xl tracking-widest">おおさか勉強会</span>
            が
            <br />
            <span className="tracking-widest">全て解決します！</span>
          </strong>

          <div className="flex p-10">
            <div className=" relative w-[250px]">
              <Image
                fill
                className=" object-contain"
                src="/img/top/1163.png"
                alt="おおさか勉強会について"
              />
            </div>
            <div className="flex flex-col items-center">
              <div className="border-2 border-customYellow">
                <p className="inline-block p-4 text-center bg-white">
                  おおさか勉強会について
                </p>
              </div>
              <div className="p-8 bg-white">
                <dl>
                  <dt>２０１０年に発足</dt>
                  <dd>多くのメンバーに支えられ、現在で{establish}年</dd>
                  <dt>主な活動</dt>
                  <dd>毎月１回大阪で勉強会を開催</dd>
                  <dt>勉強会について</dt>
                  <dd>
                    <dl>
                      <dt>男女比</dt>
                      <dd>ほぼ１：１</dd>
                      <dt>参加者層</dt>
                      <dd>２０代〜３０代の青年層</dd>
                      <dt>参加人数</dt>
                      <dd>２０人〜３０人</dd>
                      <dt>特徴</dt>
                      <dd>
                        名刺交換や飲み会で終わるセミナーとは異なり、
                        アットホームで和やかな雰囲気の中、まじめに楽しく学べる環境と仲間が得られます
                      </dd>
                      <dt>対象者</dt>
                      <dd>
                        <p>向上心のある方</p>
                        <p>好奇心旺盛な方</p>
                        <p>知的な仲間を見つけたい方</p>
                        <p>人生を真面目に考えている方</p>
                      </dd>
                    </dl>
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="flex p-10">
            <div className="bg-[url('/img/top/gradient.svg')] bg-cover w-[500px] h-[500px]"></div>
            <div className="relative w-[250px] h-[250px]">
              <Image
                fill
                className="object-cover"
                src="/img/top/1166.png"
                alt="対象者"
              />
            </div>
          </div>
        </WhileInDiv>
      </section>

      <section>
        <WhileInDiv className="py-10">
          <h2 className="text-center text-5xl font-semibold py-20">
            こんな発表がありました!
          </h2>
          <FacebookCarousel />
        </WhileInDiv>
      </section>

      <section>{/* 参加時の手順 */}</section>

      <section>
        <WhileInDiv className="py-10 flex">
          <Suspense
            fallback={<p className="mt-4">最新スケジュール　Loading...</p>}
          >
            <div className="bg-[url('/img/top/gradient.svg')] bg-cover w-[500px] h-[500px]"></div>
            <LatestEvent />
          </Suspense>
        </WhileInDiv>
      </section>

      <section>
        <ContactPage />
      </section>
    </>
  );
}
