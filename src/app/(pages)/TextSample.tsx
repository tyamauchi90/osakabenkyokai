import { motion } from "framer-motion";

const wordVariants = {
  end: (i: number) => ({
    y: 0,
    transition: {
      type: "spring",
      damping: 1,
      bounce: 0.1,
      stiffness: 10,
      velocity: 10,
      repeat: Infinity,
      repeatType: "mirror",
      repeatDelay: 0.1,
      duration: 10,
      ease: "easeInOut",
      delay: i * 0.2,
    },
  }),
  start: {
    y: 10,
    transition: {
      duration: 10,
      ease: "easeInOut",
    },
  },
};

const TextSample = () => {
  const words = "おおさか勉強会";
  const wordArray = words.split("");

  return (
    <>
      <motion.div className="bounce flex text-customFirstView font-bold tracking-[0.2em] text-justify">
        {wordArray.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={wordVariants}
            initial="start"
            animate="end"
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
      </motion.div>
    </>
  );
};

export default TextSample;
