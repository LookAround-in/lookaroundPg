"use client";

import {motion, AnimatePresence, Variants} from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

const PageTransition = ({children}: {children:React.ReactNode}) => {
  const pathname = usePathname();

  const variants: Variants = {
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
        },
    },
    exit: {
        opacity: 0,
        y: 50,
        transition: {
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
        }
    }
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <motion.div
        key={pathname}
        variants={variants}
        initial="exit"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;