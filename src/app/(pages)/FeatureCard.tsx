import { motion, useAnimation } from "framer-motion";
import React, { ReactNode, useEffect } from "react";
import { useInView } from "react-intersection-observer";

type FeatureCardType = {
  num: string | ReactNode;
  unit: string;
  title: string;
  description: string;
};

const FeatureCard: React.FC<FeatureCardType> = ({
  num,
  unit,
  title,
  description,
}) => {
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

  const numVariants = {
    hidden: { opacity: 0, y: 100, rotate: 60 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 5,
        duration: 2,
      },
    },
  };

  return (
    <div className="w-[320px] h-[320px] flex justify-center items-center p-8 bg-white shadow-lg">
      <dl className="flex flex-col items-center">
        <dt className="pb-6">
          <motion.span
            ref={ref}
            className="inline-block text-7xl font-medium text-customYellow tracking-[-0.05em]"
            initial="hidden"
            animate={controls}
            variants={numVariants}
          >
            {num}
          </motion.span>
          <span className="pl-6">{unit}</span>
        </dt>
        <dd className="text-center leading-loose">
          <p className="text-3xl tracking-widest mb-4">{title}</p>
          <p className="tracking-wider  text-gray-400">{description}</p>
        </dd>
      </dl>
    </div>
  );
};

export default FeatureCard;
