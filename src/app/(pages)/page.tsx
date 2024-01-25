"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/shadcn/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/AccountAccordion";
import Link from "next/link";
import { Suspense } from "react";
import { WhileInDiv } from "../components/WhileInDiv";
import SignUp from "../components/auth/SignUp";
import useAuthCurrentUser from "../components/auth/useAuthCurrentUser";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/shadcn/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/shadcn/ui/popover";
import CircleName from "./CircleName";
import FeatureCard from "./FeatureCard";
import Flow from "./Flow";
import Mainvisual from "./Mainvisual";
import Separator from "./Separator";
import WorryCard from "./WorryCard";
import FacebookCarousel from "./circle/blog/FacebookCarousel";
import LatestEvent from "./circle/event/LatestEvent";

export default function Home() {
  const startYear = 2010;
  const currentYear = new Date().getFullYear();
  const establish = currentYear - startYear;

  const user = useAuthCurrentUser();

  return (
    <>
      <section>
        <Mainvisual />
      </section>
      <section>
        <WhileInDiv className="container flex flex-col items-center py-28 space-y-10">
          <h2 className="pb-1 text-lg sm:text-xl text-yellow-500 tracking-[.2em] sm:tracking-[.25em] font-medium border-b-2 border-yellow-500">
            きっかけを探しているあなたへ
          </h2>
          <p className="py-2 sm:py-5 text-xl sm:text-2xl md:text-4xl tracking-[.1em]">
            こんな悩みはありませんか？
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <WorryCard
              text1="もっと"
              text2="視野"
              text3="を広げたい"
              text4="幅広い教養を身につけたい"
              src="/img/top/1368.png"
              alt="お悩み"
            />
            <WorryCard
              text1="異業種の人と"
              text2="交流"
              text3="したい"
              text4="コミュニケーション力を磨きたい"
              src="/img/top/1417.png"
              alt="お悩み"
            />
            <WorryCard
              text1={
                <>
                  このままでいいのか・・・
                  <br />
                  人生を変える
                </>
              }
              text2="きっかけ"
              text3="が欲しい"
              text4=""
              src="/img/top/871.png"
              alt="お悩み"
            />
          </div>
        </WhileInDiv>
      </section>
      <section className="relative w-screen py-20 sm:py-28 bg-yellow-50">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[100px] sm:border-l-[150px] border-l-transparent border-r-[100px] sm:border-r-[150px] border-r-transparent border-t-[50px] sm:border-t-[100px] border-t-white"></div>

        <WhileInDiv className="container pt-10 sm:pt-20 flex flex-col items-center space-y-10">
          <span className="relative -mb-5 py-2 px-6 sm:px-10 rounded-full bg-gray-800 text-base tracking-[.15em] sm:tracking-[.25em] text-white">
            そのお悩み
            <span className="absolute w-0 h-0 border-r-[24px] border-l-2 border-t-[20px] border-t-gray-800 border-x-transparent -bottom-2 left-1/2 transform -translate-x-1/2"></span>
          </span>
          <strong className="text-xl sm:text-2xl leading-loose">
            <CircleName />
            <span className="pl-2">が</span>
            <br />
            <span className="tracking-widest">全て解決します！</span>
          </strong>

          <div className="flex">
            <div className="flex flex-col items-center gap-8">
              <p className="mb-10 text-lg text-gray-400 text-center tracking-widest">
                〜 おおさか勉強会について 〜
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                <FeatureCard
                  num={establish}
                  unit="年"
                  title="発足"
                  description="２０１０年に発足して以来、多くのメンバーに支えられています"
                />
                <FeatureCard
                  num="1"
                  unit="回／月"
                  title="活動"
                  description="毎月、うめだ総合生涯学習センターで、勉強会を開催しています"
                />
              </div>

              <p className="m-10 text-lg text-gray-400 text-center tracking-widest">
                〜 勉強会について 〜
              </p>

              <div className="flex flex-wrap justify-center gap-8">
                <FeatureCard
                  num="1：1"
                  unit="程度"
                  title="男女比"
                  description="開催日によって異なります"
                />
                <FeatureCard
                  num="20~30"
                  unit="人"
                  title="参加人数"
                  description="席がなくなる前にご予約ください"
                />
                <FeatureCard
                  num="20~40"
                  unit="代"
                  title="参加者層"
                  description="学生や社会人が参加されます"
                />
              </div>

              <p className="m-10 text-lg text-gray-400 text-center tracking-widest">
                〜 Q&A 〜
              </p>

              <Accordion type="single" collapsible className="w-full max-w-5xl">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    セミナーと何が違うのでしょうか？
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex mx-5 pt-4 text-base md:text-lg text-justify leading-loose">
                      <div className="flex justify-center items-center w-10 h-10 mr-3 text-white bg-customYellow rounded-full">
                        A
                      </div>
                      <p className="mt-1 flex-1">
                        名刺交換や飲み会で終わるセミナーとは異なり、和やかな雰囲気の発表会です。
                        発表を聞く時間と感想シェアやメモを書く時間（インプットとアウトプット）を大切にしたいと考えています。
                        まじめに楽しく学ぶ環境と仲間が得られます。
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    どのような人が参加していますか？
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex mx-5 pt-4 text-base md:text-lg text-justify leading-loose">
                      <div className="flex justify-center items-center w-10 h-10 mr-3 text-white bg-customYellow rounded-full">
                        A
                      </div>
                      <ul className="space-y-2">
                        <li>向上心のある方</li>
                        <li>好奇心のある方</li>
                        <li>知的な仲間を見つけたい方</li>
                        <li>人生を真面目に考えている方</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    どのようなタイムテーブルですか？
                  </AccordionTrigger>
                  <AccordionContent className="overflow-x-scroll w-customAccordion sm:w-full">
                    <div className="flex mx-5 pt-4 text-base md:text-lg text-justify leading-loose">
                      <div className="flex justify-center items-center w-10 h-10 mr-3 text-white bg-customYellow rounded-full">
                        A
                      </div>
                      <p className="mt-1 flex-1">以下のとおりです</p>
                    </div>

                    <Table className="w-[550px] sm:w-full">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[130px] text-center">
                            時間
                          </TableHead>
                          <TableHead className="w-[100px] text-center">
                            内容
                          </TableHead>
                          <TableHead className="sm:text-center">詳細</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="text-right">
                            9:40 〜 9:50
                          </TableCell>
                          <TableCell>趣旨説明</TableCell>
                          <TableCell>
                            おおさか勉強会の趣旨説明・連絡事項をお話します。
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-right">
                            9:50 〜10:00
                          </TableCell>
                          <TableCell>自己紹介</TableCell>
                          <TableCell>
                            各テーブルでQカードを利用して自己紹介をします
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-right">
                            10:00〜10:20
                          </TableCell>
                          <TableCell>発表１</TableCell>
                          <TableCell>約２０分間の発表があります。</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-right">
                            10:30〜10:50
                          </TableCell>
                          <TableCell>発表２</TableCell>
                          <TableCell>
                            約２０分間の発表があります。（発表後に）ランチの希望を確認します。
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-right">
                            11:00〜11:20
                          </TableCell>
                          <TableCell>発表３</TableCell>
                          <TableCell>約２０分間の発表があります。</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-right">
                            11:30〜11:40
                          </TableCell>
                          <TableCell>次回案内</TableCell>
                          <TableCell>
                            次回の予定、その他連絡事項をお伝えします。
                          </TableCell>
                        </TableRow>
                        <TableRow className="text-gray-400">
                          <TableCell className="text-center">
                            11:45〜13:30
                          </TableCell>
                          <TableCell>ランチ</TableCell>
                          <TableCell>希望者はランチに行きます。</TableCell>
                        </TableRow>
                      </TableBody>
                      <TableFooter className="bg-transparent text-gray-400">
                        <TableRow>
                          <TableCell className="text-center">
                            （休憩時間）
                          </TableCell>
                          <TableCell>補足</TableCell>
                          <TableCell>
                            休憩時間は10分です。メモやアンケートを書いたり、感想シェアをします。
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </WhileInDiv>
      </section>

      <section className="relative w-screen py-20 sm:py-28 bg-white">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[100px] sm:border-l-[150px] border-l-transparent border-r-[100px] sm:border-r-[150px] border-r-transparent border-t-[50px] sm:border-t-[100px] border-t-yellow-50"></div>

        <WhileInDiv className="pb-6 sm:pb-10">
          <h2 className="text-center text-2xl sm:text-5xl tracking-widest font-semibold pt-10 sm:pt-20 pb-12 sm:pb-24">
            こんな発表がありました!
          </h2>
          <FacebookCarousel />
        </WhileInDiv>
      </section>

      <section className="relative w-screen py-20 sm:py-28 bg-yellow-50">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[100px] sm:border-l-[150px] border-l-transparent border-r-[100px] sm:border-r-[150px] border-r-transparent border-t-[50px] sm:border-t-[100px] border-t-white"></div>
        <WhileInDiv className="sm:pt-12 px-4 space-y-12 flex flex-col items-center">
          <h2 className="inline-block pb-1 text-xl sm:text-2xl leading-loose text-yellow-500 tracking-[.2em] sm:tracking-[.25em] font-medium border-b-2 border-yellow-500">
            お申込みはこちら
          </h2>
          <p className="py-3 sm:py-5 text-xl sm:text-4xl tracking-widest">
            イベント
          </p>
          <Suspense fallback={<p className="mt-4">最新イベント　Loading...</p>}>
            <LatestEvent />
            {!user && (
              <span className="tracking-wider">
                ※お申し込みには
                <Dialog>
                  <DialogTrigger asChild>
                    <span className="inline-block px-1 text-customYellow cursor-pointer">
                      会員登録
                    </span>
                  </DialogTrigger>
                  <DialogContent className="w-[90vw] h-[90vh] sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>サインアップ</DialogTitle>
                    </DialogHeader>
                    <SignUp />
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild></DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                が必要です
              </span>
            )}
          </Suspense>
        </WhileInDiv>
      </section>

      <section className="relative w-screen py-20 sm:py-28 bg-white">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[100px] sm:border-l-[150px] border-l-transparent border-r-[100px] sm:border-r-[150px] border-r-transparent border-t-[50px] sm:border-t-[100px] border-t-yellow-50"></div>
        <WhileInDiv className="container flex flex-col items-center pt-20 sm:pt-28 space-y-16 sm:space-y-20">
          <h2 className="pb-1 text-xl sm:text-2xl leading-loose text-yellow-500 tracking-[.2em] sm:tracking-[.25em] font-medium border-b-2 border-yellow-500">
            参加を検討している方へ
          </h2>
          <p className="py-3 sm:py-5 text-xl sm:text-4xl tracking-widest">
            参加までの流れを紹介します
          </p>

          {/* 勉強会予約 */}
          <Separator text="ステップ1" />
          <Flow
            src="/img/top/462.png"
            alt="予約"
            title="予約"
            description={
              <>
                <p>
                  勉強会を予約します。本サイトで会員登録をされた方は
                  <Popover>
                    <PopoverTrigger>
                      <span className="text-customYellow">こちら</span>
                    </PopoverTrigger>
                    <PopoverContent className="min-w-[375px]">
                      <LatestEvent className="border-none shadow-none" />
                    </PopoverContent>
                  </Popover>
                  からお申込みください。
                </p>
              </>
            }
          />

          {/* 参加者名簿記入 */}
          <Separator text="ステップ2" />
          <Flow
            src="/img/top/139.png"
            alt="参加者名簿記入"
            title="参加者名簿記入"
            description={
              <>
                <p>参加者名簿に名前を記入し、参加費を納めます。</p>
                <p>自分の席を確保していただきます。</p>
              </>
            }
          />

          {/* 発表 */}
          <Separator text="ステップ3" />
          <Flow
            src="/img/top/1150.png"
            alt="発表"
            title="発表内容"
            description={
              <>
                <p>3名から発表（20分×3）があります。</p>
                <p>
                  仕事の経験や専門知識、本や趣味などで得た&quot;学び&ldquo;をシェアします。
                </p>
              </>
            }
          />

          {/* 感想シェア */}
          <Separator text="ステップ4" />
          <Flow
            src="/img/top/1414.png"
            alt="勉強会中"
            title="勉強会中"
            description={
              <>
                <p>
                  発表中にメモを取っていただいても構いません。用紙をお配りします。
                </p>
                <p>
                  休憩時間に感想シェアをしたり、アンケートを書いたりします。
                </p>
              </>
            }
          />

          {/* 食事 */}
          <Separator text="ステップ5" />
          <Flow
            src="/img/top/983.png"
            alt="食事"
            title="食事"
            description={
              <>
                <p>終了後、希望者は食事へ行きます。</p>
                <p>
                  同じテーブルの方とも他のテーブルの方とも交流していただけます。
                </p>
              </>
            }
          />

          {/* 撮影 */}
          <Separator text="注意1" />
          <Flow
            className="sm:flex-row-reverse"
            src="/img/top/679.png"
            alt="撮影"
            title="撮影"
            description={
              <>
                <p>スタッフが発表の様子を撮影します。</p>
                <p>
                  参加者のプライバシーに配慮しネットに掲載する場合は顔を隠して使用しますのでご安心ください。
                </p>
                <p>
                  様子を知りたい方は
                  <Link href={"/circle/blog/"} className="text-customYellow">
                    こちら
                  </Link>
                  を御覧ください。
                </p>
              </>
            }
          />

          {/* 禁止事項 */}
          <Separator text="注意2" />
          <Flow
            className="sm:flex-row-reverse"
            src="/img/top/1479.png"
            alt="禁止行為"
            title="禁止行為"
            description={
              <>
                <strong>なお、以下の行為は固くご遠慮いただいています</strong>
                <ul className="list-disc pl-[1.5em]">
                  <li>ネットワークビジネスへの勧誘</li>
                  <li>ナンパ目的の参加</li>
                </ul>
                <p>ご理解、ご協力をお願いいたします。</p>
              </>
            }
          />
          <hr className="w-full md:max-w-[780px] mx-auto sm:my-7 border-customYellow" />
        </WhileInDiv>
      </section>
      {/* <section>
        <ContactPage />
      </section> */}
    </>
  );
}
