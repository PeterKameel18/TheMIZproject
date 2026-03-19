import React from "react";
import { motion } from "motion/react";
import { Button } from "./Button";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-7 py-20 px-6 text-center"
      role="status"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        className="relative flex items-center justify-center size-[88px] rounded-2xl bg-gradient-to-b from-surface-hover to-surface border border-white/[0.07] text-muted-foreground/30 card-glow"
        aria-hidden="true"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.45, ease: "easeOut" }}
      >
        {/* Subtle glow behind icon */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="relative">{icon}</div>
      </motion.div>
      <motion.div
        className="flex flex-col gap-2.5"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.35 }}
      >
        <h3 className="text-white">{title}</h3>
        <p className="text-[14px] text-muted-foreground/60 max-w-[280px] mx-auto leading-relaxed">
          {description}
        </p>
      </motion.div>
      {actionLabel && onAction && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.35 }}
        >
          <Button variant="primary" size="md" onClick={onAction}>
            {actionLabel}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
