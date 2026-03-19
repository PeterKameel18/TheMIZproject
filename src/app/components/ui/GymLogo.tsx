import React from "react";
import logoImg from "../../../assets/logo.jpg";

interface GymLogoProps {
  /** Optional image URL — overrides the default logo */
  src?: string;
  /** Pixel size of the logo container (default: 56) */
  size?: 40 | 48 | 56 | 64;
  /** Show the "The MIZ Gym" wordmark beneath the badge */
  showWordmark?: boolean;
  /** Additional CSS classes on the outer wrapper */
  className?: string;
  /** Optional CSS classes for the wordmark */
  wordmarkClassName?: string;
}

const sizeClasses: Record<
  number,
  { container: string; text: string; img: string }
> = {
  40: {
    container: "size-10 rounded-xl",
    text: "text-[14px]",
    img: "size-10 rounded-xl",
  },
  48: {
    container: "size-12 rounded-[14px]",
    text: "text-[16px]",
    img: "size-12 rounded-[14px]",
  },
  56: {
    container: "size-14 rounded-2xl",
    text: "text-[18px]",
    img: "size-14 rounded-2xl",
  },
  64: {
    container: "size-16 rounded-2xl",
    text: "text-[20px]",
    img: "size-16 rounded-2xl",
  },
};

export function GymLogo({
  src,
  size = 56,
  showWordmark = false,
  className = "",
  wordmarkClassName = "",
}: GymLogoProps) {
  const s = sizeClasses[size];
  const logoSrc = src ?? logoImg;

  return (
    <div
      className={`flex flex-col items-center gap-3 ${className}`}
    >
      {logoSrc ? (
        <img
          src={logoSrc}
          alt="The MIZ Gym logo"
          className={`${s.img} object-cover`}
        />
      ) : (
        <div
          className={`${s.container} flex items-center justify-center bg-gradient-to-b from-[#D4AF37] via-[#C49B2C] to-[#A37E1F] text-black font-heading tracking-wider select-none btn-glow-gold ${s.text}`}
          role="img"
          aria-label="The MIZ Gym logo"
        >
          MIZ
        </div>
      )}

      {showWordmark && (
        <span className={`font-heading text-[20px] text-gold tracking-[0.2em] uppercase select-none ${wordmarkClassName}`}>
          The MIZ Gym
        </span>
      )}
    </div>
  );
}
