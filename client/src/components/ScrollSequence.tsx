import { useEffect, useRef, useState } from "react";
import { useTransform, useMotionValueEvent, MotionValue } from "framer-motion";

// ==== CONFIGURAÇÃO ====
// Coloque os 96 frames em: public/sequence/frame_001.jpg ... frame_096.jpg
const FRAME_COUNT = 96;
const getFramePath = (index: number) =>
  `/sequence/frame_${String(index).padStart(3, "0")}.jpg`;

interface ScrollSequenceProps {
  scrollYProgress: MotionValue<number>;
  className?: string;
}

export default function ScrollSequence({ scrollYProgress, className = "" }: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Pré-carrega todas as imagens uma vez
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) setImagesLoaded(true);
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[Math.round(index)];
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  // Redesenha o canvas a cada atualização do valor de scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    drawFrame(latest);
  });

  // Ajusta o tamanho do canvas ao carregar e ao redimensionar a janela
  useEffect(() => {
    if (!imagesLoaded) return;

    const resize = () => {
      const canvas = canvasRef.current;
      const firstImg = imagesRef.current[0];
      if (!canvas || !firstImg) return;

      const scale = Math.min(
        canvas.parentElement!.clientWidth / firstImg.naturalWidth,
        canvas.parentElement!.clientHeight / firstImg.naturalHeight
      );

      // Ou simplesmente cobrir (object-cover equivalent in canvas)
      // Mas para manter a proporção da caixa, o CSS de w-full h-full resolve
      // Apenas igualamos aos tamanhos originais no canvas interno
      canvas.width = firstImg.naturalWidth;
      canvas.height = firstImg.naturalHeight;
      drawFrame(frameIndex.get());
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [imagesLoaded]);

  return (
    <canvas ref={canvasRef} className={`w-full h-full object-cover ${className}`} />
  );
}
