import React, { useEffect, useRef } from 'react';

interface WaterRippleProps {
  color?: string; // hex color
  damping?: number;
  strength?: number;
  radius?: number;
  scale?: number;
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 6, g: 182, b: 212 }; // Default cyan
}

const WaterRippleBackground: React.FC<WaterRippleProps> = ({
  color = '#06B6D4',
  damping = 0.96,
  strength = 20,
  radius = 3,
  scale = 3
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    let W = Math.floor(width / scale);
    let H = Math.floor(height / scale);

    canvas.width = W;
    canvas.height = H;

    let buf1 = new Float32Array(W * H);
    let buf2 = new Float32Array(W * H);

    let imageData = ctx.createImageData(W, H);
    let data = imageData.data;

    const { r, g, b } = hexToRgb(color);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      W = Math.floor(width / scale);
      H = Math.floor(height / scale);
      canvas.width = W;
      canvas.height = H;
      buf1 = new Float32Array(W * H);
      buf2 = new Float32Array(W * H);
      imageData = ctx.createImageData(W, H);
      data = imageData.data;
    };

    window.addEventListener('resize', handleResize);

    function addDrop(x: number, y: number, rSize: number, str: number) {
      const scaledX = Math.floor(x / scale);
      const scaledY = Math.floor(y / scale);

      for (let dy = -rSize; dy <= rSize; dy++) {
        for (let dx = -rSize; dx <= rSize; dx++) {
          if (Math.sqrt(dx * dx + dy * dy) <= rSize) {
            const py = scaledY + dy;
            const px = scaledX + dx;
            if (px >= 1 && px < W - 1 && py >= 1 && py < H - 1) {
              buf1[py * W + px] += str;
            }
          }
        }
      }
    }

    let isRunning = true;
    let frameCount = 0;
    let animationFrameId: number;

    const render = () => {
      if (!isRunning) return;

      let anyActive = false;
      for (let y = 1; y < H - 1; y++) {
        for (let x = 1; x < W - 1; x++) {
          const i = y * W + x;
          buf2[i] = (buf1[i - 1] + buf1[i + 1] + buf1[i - W] + buf1[i + W]) / 2 - buf2[i];
          buf2[i] *= damping;

          const val = buf2[i];
          if (Math.abs(val) > 0.01) anyActive = true;

          const idx = i * 4;
          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          let alpha = Math.max(0, Math.min(255, Math.abs(val) * 1.5));
          data[idx + 3] = alpha;
        }
      }

      ctx.putImageData(imageData, 0, 0);

      let temp = buf1;
      buf1 = buf2;
      buf2 = temp;

      if (!anyActive) {
        frameCount++;
        if (frameCount > 60) {
          isRunning = false;
        }
      } else {
        frameCount = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const resumeAnimation = () => {
      if (!isRunning) {
        isRunning = true;
        frameCount = 0;
        render();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      addDrop(e.clientX, e.clientY, radius, strength);
      resumeAnimation();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        addDrop(e.touches[0].clientX, e.touches[0].clientY, radius, strength);
        resumeAnimation();
      }
    }

    const handleClick = (e: MouseEvent) => {
      addDrop(e.clientX, e.clientY, radius * 4, strength * 4);
      resumeAnimation();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('click', handleClick);

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, damping, strength, radius, scale]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none mix-blend-screen z-0 opacity-80"
    />
  );
};

export default WaterRippleBackground;
