import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { WhileInChildrenVariants } from "../variants";

type PropsType = {
  className?: string;
};

export const WhileInWorry = ({ className }: PropsType) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("enter");
    }
  }, [controls, inView]);

  return (
    <motion.div
      className={className}
      ref={ref}
      variants={WhileInChildrenVariants}
      initial="start"
      animate={controls}
    >
      <motion.div className="min-w-[400px]" variants={WhileInChildrenVariants}>
        <div className="bg-gray-100 p-7 rounded">
          <p className="leading-loose text-center">
            もっと
            <span className="text-2xl text-yellow-500 mx-1">視野</span>
            を広げたい
            <br />
            幅広い教養を身につけたい
          </p>
        </div>
        <div className="relative w-full min-h-[400px]">
          <Image
            fill
            className="max-full object-cover"
            src="/img/top/1368.png"
            alt="お悩み"
          />
        </div>
      </motion.div>
      <motion.div variants={WhileInChildrenVariants}>
        <div className="bg-gray-100 p-7 rounded">
          <p className="leading-loose text-center">
            異業種の人と
            <span className="text-2xl text-yellow-500 mx-1">交流</span>
            したい
            <br />
            コミュニケーション力を磨きたい
          </p>
        </div>
        <div className="relative w-full min-h-[400px]">
          <Image
            fill
            className="max-full object-cover"
            src="/img/top/1417.png"
            alt="お悩み"
          />
        </div>
      </motion.div>
      <motion.div variants={WhileInChildrenVariants}>
        <div className="bg-gray-100 p-7 rounded">
          <p className="leading-loose text-center">
            このままでいいのか・・・
            <br />
            人生を変える
            <span className="text-2xl text-yellow-500 mx-1">きっかけ</span>
            が欲しい
          </p>
        </div>
        <div className="relative w-full min-h-[400px]">
          <Image
            fill
            className="max-full object-cover"
            src="/img/top/871.png"
            alt="お悩み"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
