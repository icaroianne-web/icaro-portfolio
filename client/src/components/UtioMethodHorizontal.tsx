/* ============================================================
   DESIGN: "Deep Space Broadcast" — Método UTIO
   Animação horizontal inspirada na Trajetória: apenas U · T · I · O
   Sem revelar o método — sem descrições, sem cartões.
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const NODES = [
  { letter: "U", color: "#00D4FF", glow: "rgba(0,212,255,0.6)"  },
  { letter: "T", color: "#C9A84C", glow: "rgba(201,168,76,0.6)" },
  { letter: "I", color: "#00D4FF", glow: "rgba(0,212,255,0.6)"  },
  { letter: "O", color: "#FF6B35", glow: "rgba(255,107,53,0.6)" },
];

export default function UtioMethodHorizontal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [autoIdx, setAutoIdx] = useState(0);

  // Auto-cycle through nodes when in view
  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => {
      setAutoIdx((prev) => (prev + 1) % NODES.length);
    }, 1800);
    return () => clearInterval(id);
  }, [isInView]);

  const focusedIdx = activeNode !== null ? activeNode : autoIdx;

  return (
    <div
      ref={containerRef}
      className="w-full my-6 px-4 py-8 relative select-none"
      onMouseLeave={() => setActiveNode(null)}
    >
      {/* Ambient glow backdrop */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 1 }}
        style={{
          background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${NODES[focusedIdx].glow.replace("0.6", "0.04")} 0%, transparent 70%)`,
        }}
      />

      {/* Label above */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-center mb-8"
      >
        <span className="font-mono-tech text-[0.6rem] tracking-[0.3em] uppercase text-[#8892A4]">
          MÉTODO PROPRIETÁRIO
        </span>
      </motion.div>

      {/* Main horizontal row: nodes + connectors */}
      <div className="relative flex items-center justify-center gap-0">
        {NODES.map((node, idx) => {
          const isActive = focusedIdx === idx;
          const isLast = idx === NODES.length - 1;

          return (
            <div key={node.letter} className="flex items-center">
              {/* NODE */}
              <motion.div
                className="relative flex flex-col items-center cursor-pointer group"
                onMouseEnter={() => setActiveNode(idx)}
                onMouseLeave={() => setActiveNode(null)}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + idx * 0.15,
                  type: "spring",
                  stiffness: 200,
                  damping: 18,
                }}
              >
                {/* Outer pulse ring (active only) */}
                {isActive && (
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      width: 72,
                      height: 72,
                      borderColor: node.color,
                      border: `1px solid ${node.color}`,
                      top: "50%",
                      left: "50%",
                      translateX: "-50%",
                      translateY: "-50%",
                    }}
                    initial={{ scale: 0.8, opacity: 0.8 }}
                    animate={{ scale: 1.6, opacity: 0 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                  />
                )}

                {/* Second pulse ring (staggered) */}
                {isActive && (
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      width: 72,
                      height: 72,
                      borderColor: node.color,
                      border: `1px solid ${node.color}`,
                      top: "50%",
                      left: "50%",
                      translateX: "-50%",
                      translateY: "-50%",
                    }}
                    initial={{ scale: 0.8, opacity: 0.6 }}
                    animate={{ scale: 2.0, opacity: 0 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
                  />
                )}

                {/* Dot node circle */}
                <motion.div
                  className="relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center"
                  animate={{
                    borderColor: isActive ? node.color : `${node.color}50`,
                    backgroundColor: isActive ? `${node.color}20` : "rgba(15,22,35,0.8)",
                    boxShadow: isActive
                      ? `0 0 24px ${node.glow}, 0 0 8px ${node.glow}`
                      : "none",
                    scale: isActive ? 1.12 : 1,
                  }}
                  transition={{ duration: 0.35, type: "spring", stiffness: 300, damping: 22 }}
                >
                  <motion.span
                    className="font-display font-800 text-lg leading-none"
                    animate={{ color: isActive ? node.color : `${node.color}80` }}
                    transition={{ duration: 0.3 }}
                  >
                    {node.letter}
                  </motion.span>
                </motion.div>

                {/* Label below */}
                <motion.div
                  className="mt-3 font-mono-tech text-[0.55rem] tracking-[0.2em] uppercase"
                  animate={{ color: isActive ? node.color : "rgba(136,146,164,0.5)" }}
                  transition={{ duration: 0.3 }}
                >
                  {node.letter}
                </motion.div>
              </motion.div>

              {/* CONNECTOR LINE between nodes */}
              {!isLast && (
                <div className="relative mx-2 sm:mx-4 flex items-center" style={{ width: "clamp(40px, 8vw, 100px)" }}>
                  {/* Base line */}
                  <div
                    className="absolute inset-y-0 top-1/2 -translate-y-[1px] w-full h-[2px] rounded-full"
                    style={{ background: "rgba(0,212,255,0.08)" }}
                  />
                  {/* Animated energy pulse along the line */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-[1px] h-[2px] rounded-full"
                    style={{
                      width: "40%",
                      background: `linear-gradient(90deg, transparent, ${NODES[idx].color}, transparent)`,
                    }}
                    animate={{ left: ["-40%", "140%"] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.45,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* UTIO wordmark below */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="text-center mt-8"
      >
        <span
          className="font-display font-800 text-[clamp(1.5rem,5vw,2.8rem)] tracking-[0.5em] uppercase"
          style={{
            background: "linear-gradient(90deg, #00D4FF 0%, #C9A84C 33%, #00D4FF 66%, #FF6B35 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 20px rgba(0,212,255,0.15))",
          }}
        >
          UTIO
        </span>
      </motion.div>
    </div>
  );
}
