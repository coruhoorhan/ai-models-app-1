import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, BellRing } from 'lucide-react';
import { cn } from '../lib/cn';

export function NotificationBell() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative flex items-center justify-center w-8 h-8 rounded-full text-muted hover:text-ink transition-colors cursor-pointer"
    >
      <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
        <AnimatePresence mode="popLayout" initial={false}>
          {!isHovered ? (
            <motion.div
              key="icon1"
              initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 15, scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 600, damping: 25 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Bell className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="icon2"
              initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 15, scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 600, damping: 25 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <BellRing className="w-5 h-5 text-chart-orange" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 600, damping: 15, delay: 0.1 }}
                className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border-[1.5px] border-canvas"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
