import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { WhileInChildrenVariants } from "../(pages)/variants";

type PropsType = {
  className?: string;
};

export const WhileInWorry = ({ className }: PropsType) => {
  const controls = useAnimation();
  const textControls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      Promise.all([controls.start("enter"), textControls.start("visible")]);
    }
  }, [controls, inView, textControls]);

  const spanVariants = {
    hidden: { opacity: 0, y: 50, rotate: 60 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 5,
        duration: 3,
      },
    },
  };

  return (
    <motion.div
      className={className}
      ref={ref}
      initial="start"
      animate={controls}
      variants={WhileInChildrenVariants}
    >
      <motion.div className="min-w-[400px]" variants={WhileInChildrenVariants}>
        <div className="bg-gray-100 p-7 rounded">
          <p className="leading-loose text-center">
            もっと
            <motion.span
              ref={ref}
              initial="hidden"
              animate={textControls}
              variants={spanVariants}
              className="inline-block text-2xl text-yellow-500 mx-1"
            >
              視野
            </motion.span>
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
            <motion.span
              ref={ref}
              initial="hidden"
              animate={textControls}
              variants={spanVariants}
              className="inline-block text-2xl text-yellow-500 mx-1"
            >
              交流
            </motion.span>
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
            <motion.span
              ref={ref}
              initial="hidden"
              animate={textControls}
              variants={spanVariants}
              className="inline-block text-2xl text-yellow-500 mx-1"
            >
              きっかけ
            </motion.span>
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
