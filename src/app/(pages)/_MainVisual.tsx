import { useEffect, useState } from "react";
import { Card } from "../components/shadcn/ui/card";

const MainVisual = () => {
  const [texts, setTexts] = useState([
    "こんな悩みはありませんか?",
    "もっと視野を広げたい！",
    "異業種の人と交流したい！",
    "コミュニケーション能力を磨きたい！",
    "幅広い教養を身につけたい！",
    "後悔しない人生を送るにはどうすれば？",
    "今の人生を変えるきっかけが欲しい！",
  ]);
  const [hide, setHide] = useState(false);
  const [displayedTexts, setDisplayedTexts] = useState(
    Array(texts.length).fill("")
  );

  useEffect(() => {
    let animationTimeout;

    const animateText = (index: number, charIndex: number) => {
      setDisplayedTexts((prevTexts) => {
        const newTexts = [...prevTexts];
        newTexts[index] = texts[index].substring(0, charIndex + 1);
        return newTexts;
      });

      if (charIndex < texts[index].length - 1) {
        animationTimeout = setTimeout(() => {
          animateText(index, charIndex + 1);
        }, 50); // 1文字ずつの表示間隔
      } else if (index < texts.length - 1) {
        animationTimeout = setTimeout(() => {
          animateText(index + 1, 0);
        }, 100); // 文ごとの表示間隔
      } else {
        setTimeout(() => {
          setHide(true);
        }, 500); // モーダルクローズ
      }
    };

    animateText(0, 0);

    return () => {
      clearTimeout(animationTimeout);
    };
  }, [texts]);

  return (
    <div
      className={`flex flex-col gap-4 py-10 ${
        hide
          ? "w-full h-full relative z-auto transition-all duration-500 "
          : "w-screen h-screen bg-black fixed top-0 left-0 z-50"
      }`}
    >
      <Card className="p-6 bg-transparent">
        {displayedTexts.map((text, i) => (
          <p
            key={i}
            className={`transition-all duration-500 ${
              hide ? "text-base text-black" : "text-4xl text-white"
            }`}
          >
            {text}
          </p>
        ))}
      </Card>
      {hide && (
        <>
          <Card className="p-6 bg-transparent">
            そんなお悩みを 全て解決します！
            おおさか勉強会は、２０１０年に発足して以来、毎月１回大阪で
            勉強会を開催しています。
            男女比はほぼ１：１。２０代〜３０代の青年層が参加しています。
            参加者人数は３０人〜４０人です。
            名刺交換や飲み会で終わるセミナーとは異なり、
            アットホームな和やかな雰囲気の中、みんなでまじめに学べる環境があります。
            ぜひ一度お越し下さい☆
          </Card>
          <Card className="p-6 bg-transparent">
            こんな方が対象です 向上心のある方 好奇心旺盛な方
            人生を真面目に考えている方 知的な仲間を見つけたい方
          </Card>
        </>
      )}
    </div>
  );
};

export default MainVisual;
