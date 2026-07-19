import { useEffect, useRef } from "react";
import { MotionValue } from "framer-motion";

interface ScrollSequenceProps {
  scrollYProgress: MotionValue<number>;
  className?: string;
}

export default function ScrollSequence({ scrollYProgress, className = "" }: ScrollSequenceProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sincroniza a posição do scroll com a linha do tempo (timeline) do vídeo
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number;
    
    const handleLoadedMetadata = () => {
      video.pause(); // Garante que o vídeo não toque sozinho
    };
    
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    const updateVideoTime = () => {
      if (video.readyState >= 1 && video.duration) {
        // Pega o valor do scroll (de 0.0 a 1.0) e multiplica pela duração total do vídeo
        const targetTime = scrollYProgress.get() * video.duration;
        video.currentTime = targetTime;
      }
      animationFrameId = requestAnimationFrame(updateVideoTime);
    };

    // Inicia o loop de renderização (mais suave que eventos normais do React)
    updateVideoTime();

    return () => {
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [scrollYProgress]);

  return (
    <video
      ref={videoRef}
      src="/video_site1.mp4"
      className={`w-full h-full object-cover ${className}`}
      playsInline
      muted
      preload="auto"
    />
  );
}
