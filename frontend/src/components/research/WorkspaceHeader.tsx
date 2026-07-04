"use client";

import * as React from "react";
import { motion } from "framer-motion";

/**
 * WorkspaceHeader establishes the context and professional tone of the research space.
 * Uses a staggered layout fade-in to present a premium and calm opening experience.
 */
export function WorkspaceHeader() {
  // Stagger children animations for a subtle, step-by-step introduction
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  // Restrained, fast spring ease-out animation for individual elements
  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.header
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full text-left flex flex-col items-start max-w-4xl"
    >
      {/* 1. Context Label / Badge */}
      <motion.span
        variants={itemVariants}
        className="text-label tracking-widest font-semibold text-[rgb(var(--text-tertiary))] uppercase mb-3"
      >
        AI Research Workspace
      </motion.span>

      {/* 2. Primary Heading */}
      <motion.h1
        variants={itemVariants}
        className="text-headline md:text-display font-extrabold tracking-tight text-[rgb(var(--text-primary))] mb-4"
      >
        Research
      </motion.h1>

      {/* 3. Oriented Subtitle Statement */}
      <motion.p
        variants={itemVariants}
        className="text-body md:text-title font-normal text-[rgb(var(--text-secondary))] leading-relaxed max-w-2xl"
      >
        Research companies using a coordinated network of specialized AI agents. Enter a company name or ticker symbol to begin.
      </motion.p>
    </motion.header>
  );
}

WorkspaceHeader.displayName = "WorkspaceHeader";
