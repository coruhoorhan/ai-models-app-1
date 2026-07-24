import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Sparkles } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';
import { LaserEffect } from '../../../shared/ui/LaserEffect';
import { PodiumModel } from './RankingsPodium';

interface PodiumCardProps {
  model: PodiumModel;
  place: 1 | 2 | 3;
  itemVariants: any;
}

export function PodiumCard({ model, place, itemVariants }: PodiumCardProps) {
  if (place === 1) {
    return (
      <motion.div variants={itemVariants} className="flex-1 w-full flex flex-col items-center gap-sm order-1 md:order-2 z-10 relative md:-top-xl">
        <div className="flex flex-col items-center gap-xs">
          <motion.div 
            animate={{ 
              y: [0, -8, 0],
              filter: ["drop-shadow(0px 0px 0px rgba(235,93,28,0))", "drop-shadow(0px 4px 12px rgba(235,93,28,0.5))", "drop-shadow(0px 0px 0px rgba(235,93,28,0))"]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <Trophy className="w-10 h-10 text-chart-orange" />
            <motion.div 
              animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1 -right-2"
            >
              <Sparkles className="w-4 h-4 text-chart-yellow" />
            </motion.div>
          </motion.div>
          <span className="text-label text-chart-orange bg-chart-orange/10 px-2 py-0.5 rounded-sm border border-chart-orange/20 flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-chart-orange animate-pulse" />
            #1 WINNER
          </span>
        </div>
        <motion.div 
          whileHover={{ y: -8, scale: 1.02 }}
          className="w-full relative"
        >
          <motion.div 
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-0.5 bg-gradient-to-r from-chart-orange via-chart-yellow to-chart-orange rounded-md blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"
            style={{ backgroundSize: "200% 200%" }}
          />
          <Card className="w-full flex flex-col items-center justify-center gap-xs border-chart-orange border bg-canvas shadow-xl p-xl text-center pb-xxl relative overflow-hidden group">
            <LaserEffect color="var(--color-chart-orange)" glowColor="rgba(235, 93, 28, 0.5)" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-chart-orange/10 via-transparent to-transparent opacity-50" />
            
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="text-heading-sm text-ink relative z-10"
            >
              {model.name}
            </motion.span>
            <span className="text-body-sm text-muted relative z-10">{model.developer}</span>
            <div className="mt-auto flex items-baseline gap-1 bg-chart-orange/10 px-md py-sm rounded-sm mt-md relative z-10 border border-chart-orange/20 backdrop-blur-sm">
              <span className="text-heading-md text-chart-orange">{model.score}</span>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    );
  }

  const isSecond = place === 2;

  return (
    <motion.div 
      variants={itemVariants} 
      className={`flex-1 w-full flex flex-col items-center gap-sm ${
        isSecond ? "order-2 md:order-1" : "order-3 md:order-3 relative md:top-md"
      }`}
    >
      <div className="flex flex-col items-center gap-xs">
        <motion.div whileHover={{ rotate: isSecond ? -15 : 15, scale: 1.1 }}>
          <Medal className={`w-6 h-6 ${isSecond ? "text-subtle" : "text-chart-teal/60"}`} />
        </motion.div>
        <span className={`text-label ${isSecond ? "text-subtle" : "text-chart-teal/60"}`}>
          #{place} RANK
        </span>
      </div>
      <motion.div whileHover={{ y: -5 }} className="w-full">
        <Card className="w-full flex flex-col items-center justify-center gap-xs border-hairline bg-surface p-xl text-center pb-xxl relative overflow-hidden group transition-colors hover:border-chart-teal/50">
          <div className="absolute inset-0 bg-gradient-to-t from-chart-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="text-body-lg-bold text-ink relative z-10">{model.name}</span>
          <span className="text-body-sm text-muted relative z-10">{model.developer}</span>
          <div className="mt-auto flex items-baseline gap-1 pt-md relative z-10">
            <span className="text-heading-sm text-ink">{model.score}</span>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
