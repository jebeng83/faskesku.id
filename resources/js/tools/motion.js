export const overlayTransition = { duration: 0.28, ease: [0.22, 1, 0.36, 1] };

export const contentSpring = {
  type: "spring",
  stiffness: 160,
  damping: 28,
  mass: 0.9,
  opacity: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
};

export const hoverTapVariants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.03, y: -2 },
  tap: { scale: 0.98, y: 0 },
};

export const headerItemVariants = {
  initial: { y: 0, scale: 1, opacity: 1 },
  hover: { y: -1, scale: 1.02, opacity: 1 },
  tap: { y: 0, scale: 0.98, opacity: 1 },
};

export const transformOriginForDir = (dir) => (dir > 0 ? "60% 50%" : "40% 50%");

export const createPageVariants = (reduced = false) => {
  if (reduced) {
    return {
      enter: () => ({ opacity: 0 }),
      center: { opacity: 1 },
      exit: () => ({ opacity: 0 }),
    };
  }
  return {
    enter: (d) => ({
      x: d > 0 ? 38 : -38,
      opacity: 0,
      scale: 0.99,
      rotateY: d > 0 ? -5 : 5,
      transformPerspective: 900,
      filter: "blur(1.5px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transformPerspective: 900,
      filter: "blur(0px)",
    },
    exit: (d) => ({
      x: d > 0 ? -38 : 38,
      opacity: 0,
      scale: 0.992,
      rotateY: d > 0 ? 5 : -5,
      transformPerspective: 900,
      filter: "blur(1.5px)",
    }),
  };
};
