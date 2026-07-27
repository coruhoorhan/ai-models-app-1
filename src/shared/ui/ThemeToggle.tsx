import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../app/providers/ThemeProvider';
import { cn } from '../lib/cn';
import { motion, AnimatePresence } from 'motion/react';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={cn("flex items-center justify-center w-8 h-8 rounded-full text-muted hover:text-ink transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink", className)}
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <AnimatePresence mode="popLayout" initial={false}>
          {theme === 'dark' ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sun className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Moon className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
