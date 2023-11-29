import Link from "next/link";
import EventList from "./articles/new/EventList";

export default async function Home() {
  // const [signInUser, setSignInUser] = useState<string | null>(null);

  return (
    <>
      <section>
        <div className="bg-yellow-50 p-10">
          <Link href="/articles/new">記事を書く</Link>
          <br />
          <EventList />
        </div>
      </section>

      <section>
        <div className="relative py-10">
          <div className="bg-[url('/image1.jpg')] bg-cover bg-fixed blur-[2px] pt-[35%] z-[-100]"></div>
          <div className="absolute z-10 inset-32">
            <div className="bg-white bg-opacity-50 w-max p-8">
              <h1>社会人サークルおおさか勉強会</h1>
              <p>【次回】</p>
              <p>日時：10/19(日) 9:40 〜 11:40</p>
              <p>開催場所：うめだ総合生涯学習センター5階 第3研修室</p>
              <p>参加費：1,000円</p>
              <p>勉強会後に希望者はランチに行きます！</p>
              <button>今すぐ申し込む</button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="p-10">
          <h2>こんな悩みはありませんか？</h2>
          <div className="grid grid-cols-2 grid-rows-4">
            <div>
              <p>もっと視野を広げたい！</p>
            </div>
            <div>
              <p>異業種の人と交流したい！</p>
            </div>
            <div>
              <p>コミュニケーション能力を磨きたい！</p>
            </div>
            <div>
              <p>幅広い教養を身につけたい！</p>
            </div>
            <div>
              <p>後悔しない人生を送るにはどうすれば？</p>
            </div>
            <div>
              <p>今の人生を変えるきっかけが欲しい！</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="p-10">
          <h2>そんなお悩みを 全て解決します！</h2>
          <p>
            おおさか勉強会は、２０１０年に発足して以来、毎月１回大阪で
            <br />
            勉強会を開催しています。
            <br />
            男女比はほぼ１：１。２０代〜３０代の青年層が参加しています。
            <br />
            参加者人数は３０人〜４０人です。
            <br />
            名刺交換や飲み会で終わるセミナーとは異なり、
            <br />
            アットホームな和やかな雰囲気の中、みんなでまじめに学べる環境があります。
            <br />
            ぜひ一度お越し下さい☆
          </p>
        </div>
      </section>

      <section>
        <div className="p-10">
          <h2>こんな方が対象です</h2>
          <div>
            <p>向上心のある方</p>
          </div>
          <div>
            <p>好奇心旺盛な方</p>
          </div>
          <div>
            <p>人生を真面目に考えている方</p>
          </div>
          <div>
            <p>知的な仲間を見つけたい方</p>
          </div>
        </div>
      </section>
    </>
  );
}
