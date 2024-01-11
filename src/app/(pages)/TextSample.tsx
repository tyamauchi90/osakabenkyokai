import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const TextSample = () => {
  const words = "おおさか勉強会";
  const wordArray = words.split("");

  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       delay: 0.5,
  //       staggerChildren: 0.3,
  //     },
  //   },
  // };

  // const visibleVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       type: "spring",
  //       damping: 10,
  //       stiffness: 100,
  //     },
  //   },
  // };

  // const containerVariants = {
  //   hidden: { opacity: 0, x: -50 },
  //   visible: {
  //     opacity: 1,
  //     x: 0,
  //     transition: {
  //       type: "spring",
  //       damping: 10,
  //       stiffness: 100,
  //       delay: 0.5,
  //       staggerChildren: 0.2,
  //     },
  //   },
  // };

  // const visibleVariants = {
  //   hidden: { opacity: 0, rotateY: 180 },
  //   visible: {
  //     opacity: 1,
  //     rotateY: 0,
  //     transition: {
  //       type: "spring",
  //       damping: 10,
  //       stiffness: 100,
  //     },
  //   },
  // };

  const getRandomDirection = () => {
    return Math.random() > 0.5 ? Math.random() * 50 : -Math.random() * 50;
  };

  const getRandomRotation = () => {
    return Math.random() * 180;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      backgroundColor: "#fff",
      transition: {
        duration: 1,
        delay: 0.5,
        staggerChildren: 0.15,
      },
    },
  };

  const visibleVariants = {
    hidden: {
      opacity: 0,
      x: getRandomDirection(),
      y: getRandomDirection(),
      rotate: getRandomRotation(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        duration: 2,
        damping: 10,
        stiffness: 100,
      },
    },
  };

  // const wordVariants = {
  //   start: {
  //     y: 10,
  //     opacity: 0,
  //     transition: {
  //       duration: 10,
  //       ease: "easeInOut",
  //     },
  //   },
  //   enter: {
  //     y: 0,
  //     opacity: 1,
  //     transition: {
  //       duration: 10,
  //       ease: "easeInOut",
  //     },
  //   },
  //   loop: (i: number) => ({
  //     y: 0,
  //     opacity: 1,
  //     transition: {
  //       type: "spring",
  //       damping: 1,
  //       bounce: 0.1,
  //       stiffness: 10,
  //       velocity: 10,
  //       repeat: Infinity,
  //       repeatType: "mirror",
  //       repeatDelay: 0.1,
  //       duration: 10,
  //       ease: "easeInOut",
  //       delay: i * 0.2,
  //     },
  //   }),
  // };

  return (
    <>
      <motion.div
        className="bounce flex text-customFirstView font-bold tracking-[0.1em] text-justify"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {wordArray.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={visibleVariants}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
      {/* <motion.div className="bounce flex text-customFirstView font-bold tracking-[0.2em] text-justify">
        {wordArray.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={wordVariants as Variants}
            initial="start"
            animate="loop"
            custom={i}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
      <motion.div className="bounce flex text-customFirstView font-bold tracking-[0.2em] text-justify">
        {wordArray.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ y: 0 }}
            animate={{
              y: [0, 5, 20, 5, 0],
              // scale: [1, 0.9, 0.95, 0.9, 1],
              rotate: [5, 10, -10, 5, 0],
            }}
            transition={{
              type: "spring",
              damping: 1,
              bounce: 0.1,
              stiffness: 10,
              velocity: 10,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 1,
              duration: 5,
              ease: "easeInOut",
              delay: i * 0.075,
            }}
            custom={i}
          >
            {word}
          </motion.span>
        ))}
      </motion.div> */}
    </>
  );
};

export default TextSample;
