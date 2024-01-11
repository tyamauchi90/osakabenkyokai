export const WhileInVariants = {
  start: {
    y: 20,
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

export const WhileInChildrenVariants = {
  start: {
    opacity: 0,
    scale: 0.99,
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      when: "beforeChildren",
      // delayChildren: 0.6,
      staggerChildren: 0.6,
      duration: 0.3,
    },
  },
};

export const WhileInListsVariants = {
  start: {
    opacity: 0,
    scale: 0.99,
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      when: "beforeChildren",
      delayChildren: 0.5,
      staggerChildren: 0.5,
      duration: 0.6,
    },
  },
};
