import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const floatVariants = {
  float: {
    y: ["5px", "-5px"],
    transition: {
      y: {
        yoyo: Infinity,
        duration: 1,
      },
    },
  },
};

const listItemVariants = {
  visible: (i) => ({
    opacity: 1,
    transition: {
      delay: i * 0.3,
    },
  }),
  hidden: { opacity: 0 },
};

const items = [
  "２０１０年に発足",
  "多くのメンバーに支えられ、現在で13年",
  "主な活動",
  "毎月１回大阪で勉強会を開催",
  "勉強会について",
  "男女比",
  "ほぼ１：１",
  "参加者層",
];

const YoyoSample = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start((i) => listItemVariants.visible(i));
    }
  }, [controls, inView]);

  return (
    <dl>
      <motion.dt initial="float" animate="float" variants={floatVariants}>
        [ヨーヨーサンプル]
      </motion.dt>
      {items.map((item, i) => (
        <motion.dd
          ref={ref}
          custom={i}
          initial="hidden"
          animate={controls}
          variants={listItemVariants}
          key={i}
        >
          {item}
        </motion.dd>
      ))}
    </dl>
  );
};

export default YoyoSample;
