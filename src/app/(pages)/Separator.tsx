import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type SeparatorType = {
  text: string;
};

const Separator = ({ text }: SeparatorType) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start({ width: "100%", transition: { duration: 1 } });
    }
  }, [controls, inView]);

  return (
    <div className="relative w-full md:max-w-[780px] flex items-center justify-center">
      <p className="absolute z-10 text-white tracking-widest px-6 py-2 bg-customYellow rounded-full">
        {text}
      </p>
      <motion.hr
        ref={ref}
        initial={{ width: 0 }}
        animate={controls}
        className="absolute border-customYellow"
      />
    </div>
  );
};

export default Separator;

// type SeparatorType = {
//   text: string;
// };

// const Separator = ({ text }: SeparatorType) => {
//   return (
//     <div className="relative w-full max-w-[780px] flex items-center justify-center">
//       <p className="absolute z-10 text-white tracking-widest px-6 py-2 bg-customYellow rounded-full">
//         {text}
//       </p>
//       <hr className="absolute w-full border-customYellow" />
//     </div>
//   );
// };

// export default Separator;
