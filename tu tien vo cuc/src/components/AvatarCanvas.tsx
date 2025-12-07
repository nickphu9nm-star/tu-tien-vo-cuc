import React, { useRef, useEffect } from 'react';

interface AvatarCanvasProps {
  isPlayer: boolean;
  size?: number;
}

const AvatarCanvas: React.FC<AvatarCanvasProps> = ({ isPlayer, size = 80 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina scaling
    const scale = 2;
    canvas.width = size * scale;
    canvas.height = size * scale;
    ctx.scale(scale, scale);

    const cx = size / 2;
    const cy = size / 2;

    const gradient = ctx.createRadialGradient(cx, cy, size * 0.2, cx, cy, size * 0.5);
    if (isPlayer) {
      gradient.addColorStop(0, 'rgba(16, 185, 129, 0.4)'); 
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else {
      gradient.addColorStop(0, 'rgba(239, 68, 68, 0.4)'); 
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    ctx.save();
    
    if (!isPlayer) {
        ctx.translate(size, 0);
        ctx.scale(-1, 1);
    }

    ctx.fillStyle = isPlayer ? '#0f172a' : '#1a0b0b'; 
    ctx.strokeStyle = isPlayer ? '#ffd700' : '#ef4444'; 
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(cx - size * 0.25, cy + size * 0.4);
    ctx.quadraticCurveTo(cx - size * 0.3, cy + size * 0.1, cx, cy + size * 0.1); 
    ctx.quadraticCurveTo(cx + size * 0.3, cy + size * 0.1, cx + size * 0.25, cy + size * 0.4); 
    ctx.lineTo(cx + size * 0.2, cy + size * 0.5);
    ctx.lineTo(cx - size * 0.2, cy + size * 0.5);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy - size * 0.15, size * 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if (isPlayer) {
        ctx.beginPath();
        ctx.moveTo(cx - size * 0.14, cy - size * 0.2);
        ctx.lineTo(cx + size * 0.12, cy - size * 0.2);
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 3;
        ctx.stroke();
    } else {
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(cx + size * 0.05, cy - size * 0.15, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();

  }, [isPlayer, size]);

  return <canvas ref={canvasRef} style={{ width: size, height: size }} />;
};

export default AvatarCanvas;
