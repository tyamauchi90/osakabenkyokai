import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const CircleName = () => {
  const words = "おおさか勉強会";
  const wordArray = words.split("");

  const controls = useAnimation();
  const { ref, inView } = useInView({
    rootMargin: "-50px",
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        staggerChildren: 0.15,
      },
    },
  };

  const visibleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };

  return (
    <>
      <motion.div
        className="inline-flex text-4xl sm:text-5xl tracking-widest text-justify"
        ref={ref}
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
    </>
  );
};

export default CircleName;
