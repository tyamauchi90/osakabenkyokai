import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { WhileInChildrenVariants } from "./variants";

type WorryCardType = {
  text1: string | React.ReactNode;
  text2: string | React.ReactNode;
  text3: string | React.ReactNode;
  text4: string | React.ReactNode;
  src: string;
  alt: string;
};

const WorryCard: React.FC<WorryCardType> = ({
  text1,
  text2,
  text3,
  text4,
  src,
  alt,
}) => {
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
        delay: 0.5,
        duration: 2,
      },
    },
  };

  return (
    <motion.div
      // className="min-w-[400px]"
      className="w-[clamp(20rem,18.171rem+7.805vw,25rem)]"
      ref={ref}
      variants={WhileInChildrenVariants}
    >
      <div className="bg-gray-100 p-7 rounded">
        <p className="leading-loose text-center">
          {text1}
          <motion.span
            ref={ref}
            initial="hidden"
            animate={textControls}
            variants={spanVariants}
            className="inline-block text-2xl text-yellow-500 mx-1"
          >
            {text2}
          </motion.span>
          {text3}
          <br />
          {text4}
        </p>
      </div>
      <div className="relative w-full min-h-[400px]">
        <Image
          fill
          className="w-full object-cover"
          src={src}
          alt={alt}
          sizes="100vw"
        />
      </div>
    </motion.div>
  );
};

export default WorryCard;
