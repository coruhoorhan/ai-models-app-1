import React from 'react';
import { cn } from '../../../shared/lib/cn';
import { motion } from 'motion/react';
import { PodiumCard } from './PodiumCard';

export interface PodiumModel {
  id: string;
  rank: number;
  name: string;
  developer: string;
  score: number;
}

interface RankingsPodiumProps {
  topModels: PodiumModel[];
  className?: string;
}

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

export function RankingsPodium({ topModels, className }: RankingsPodiumProps) {
  if (topModels.length < 3) return null;

  const [first, second, third] = topModels;

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className={cn("w-full flex flex-col lg:flex-row items-center lg:items-end justify-center gap-md py-xl", className)}
    >
      <PodiumCard model={second} place={2} itemVariants={item} />
      <PodiumCard model={first} place={1} itemVariants={item} />
      <PodiumCard model={third} place={3} itemVariants={item} />
    </motion.div>
  );
}
