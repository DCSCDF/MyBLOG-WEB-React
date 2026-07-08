"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export function BackgroundText({ text }: { text: string }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 z-0 opacity-40">
      <motion.div
        className="absolute top-[24%] w-full"
        style={{ y: scrollY * 0.6 }}
      >
        <div className="mx-[-20%] sm:mx-0 h-[120px]">
          <TextHoverEffect text={text} />
        </div>
      </motion.div>
    </div>
  );
}