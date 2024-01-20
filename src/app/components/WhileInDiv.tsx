import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { WhileInVariants } from "../(pages)/variants";

type PropsType = {
  className?: string;
  children?: React.ReactNode;
};

export const WhileInDiv = ({ className, children }: PropsType) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    rootMargin: "-100px",
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("enter");
    }
  }, [controls, inView]);

  return (
    <motion.div
      className={className}
      ref={ref}
      variants={WhileInVariants}
      initial="start"
      animate={controls}
    >
      {children}
    </motion.div>
  );
};
