"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const pageTransitionVariants = {
  start: {
    opacity: 0,
    transition: {
      type: "easeIn",
      duration: 0.8,
    },
  },
  enter: {
    opacity: 1,
    transition: {
      type: "easeIn",
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    // transition: {
    //   duration: 1,
    // },
  },
};

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        layout
        key={pathname}
        variants={pageTransitionVariants}
        initial="start"
        animate="enter"
        // exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
