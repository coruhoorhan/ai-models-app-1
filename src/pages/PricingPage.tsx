import React, { useState } from 'react';
import { TopNav } from '../features/landing/components/TopNav';
import { Footer } from '../shared/ui/Footer';
import { motion } from 'motion/react';
import { cn } from '../shared/lib/cn';
import { CostSimulatorCard } from '../features/rankings/components/CostSimulatorCard';
import { BackgroundGrid } from '../shared/ui/BackgroundGrid';
import { PricingTierCard } from '../features/pricing/components/PricingTierCard';
import { PayAsYouGoTable } from '../features/pricing/components/PayAsYouGoTable';
import { TIERS, PAYG_MODELS } from '../features/pricing/data/pricingData';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans flex flex-col relative overflow-hidden">
      <BackgroundGrid />

      <div className="relative z-10 flex flex-col min-h-screen">
        <TopNav />
        
        <main className="flex-1 w-full flex flex-col items-center">
          <div className="w-full max-w-[1440px] flex flex-col px-md lg:px-xl py-xxl gap-[96px]">
            {/* Header */}
            <div className="w-full flex flex-col items-center text-center gap-lg mt-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-md"
              >
                <span className="text-label text-ink">PRICING PLANS</span>
                <h1 className="text-[64px] lg:text-[72px] leading-[1.05] font-extrabold tracking-tight text-ink max-w-[800px]">
                  Pay only for what you use.
                </h1>
                <p className="text-body-lg text-muted max-w-[600px] mt-sm">
                  Simple, transparent token-based pricing across all top-tier models. No hidden fees. Switch models anytime.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col items-center gap-xs mt-md"
              >
                <div className="flex bg-surface-sunken p-1 rounded-sm border border-hairline">
                  <button 
                    onClick={() => setIsAnnual(false)}
                    className={cn("px-md py-xs text-body-sm font-medium rounded-sm transition-all", !isAnnual ? "bg-canvas border border-hairline shadow-sm text-ink" : "text-muted hover:text-ink border border-transparent")}
                  >
                    Monthly
                  </button>
                  <button 
                    onClick={() => setIsAnnual(true)}
                    className={cn("px-md py-xs text-body-sm font-medium rounded-sm transition-all flex items-center gap-2", isAnnual ? "bg-canvas border border-hairline shadow-sm text-ink" : "text-muted hover:text-ink border border-transparent")}
                  >
                    Annually
                    <span className="text-[10px] uppercase px-1.5 py-[1px] rounded-xs bg-live/10 text-live border border-live/20 leading-none">SAVE 20%</span>
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Pricing Cards */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="w-full grid grid-cols-1 lg:grid-cols-3 gap-lg"
            >
              {TIERS.map((tier) => (
                <PricingTierCard key={tier.name} tier={tier} isAnnual={isAnnual} itemVariants={itemVariants} />
              ))}
            </motion.div>

            {/* Bottom Section: Pay-as-you-go & Simulator */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="w-full flex flex-col lg:flex-row items-start gap-xl pb-xxl"
            >
              <motion.div variants={itemVariants} className="w-full lg:w-2/3 flex flex-col gap-md">
                <div className="flex flex-col gap-xs">
                  <h2 className="text-heading-sm text-ink">Pay-as-you-go Rates</h2>
                  <p className="text-body-sm text-muted">Prices are per 1 million tokens. Billed to the exact token count.</p>
                </div>
                <PayAsYouGoTable models={PAYG_MODELS} />
              </motion.div>

              <motion.div variants={itemVariants} className="w-full lg:w-1/3 flex flex-col gap-md">
                <div className="flex flex-col gap-xs">
                  <h2 className="text-heading-sm text-ink">Estimate Costs</h2>
                  <p className="text-body-sm text-muted">See how your volume scales.</p>
                </div>
                <CostSimulatorCard className="h-full" />
              </motion.div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
