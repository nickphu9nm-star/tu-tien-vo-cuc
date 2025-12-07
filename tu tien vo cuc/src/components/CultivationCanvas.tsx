import React, { useRef, useEffect } from 'react';

interface Props { realmIdx: number; isCultivating: boolean; }

const CultivationCanvas: React.FC<Props> = ({ realmIdx, isCultivating }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const width = 300; const height = 250; const scale = 2;
    canvas.width = width * scale; canvas.height = height * scale; ctx.scale(scale, scale);

    let animationFrameId: number;
    let particles: { x: number; y: number; r: number; speed: number; angle: number; color: string }[] = [];
    let time = 0;

    const getColors = (idx: number) => {
        if (idx <= 2) return { main: '#10b981', aura: 'rgba(16, 185, 129, 0.2)', particle: '#34d399' }; 
        if (idx <= 5) return { main: '#3b82f6', aura: 'rgba(59, 130, 246, 0.3)', particle: '#60a5fa' }; 
        if (idx <= 8) return { main: '#8b5cf6', aura: 'rgba(139, 92, 246, 0.4)', particle: '#a78bfa' }; 
        return { main: '#ef4444', aura: 'rgba(239, 68, 68, 0.5)', particle: '#fcd34d' }; 
    };
    const colors = getColors(realmIdx);
    const particleCount = 30 + realmIdx * 5;
    for(let i=0; i<particleCount; i++) {
      particles.push({ x: Math.random()*width, y: Math.random()*height, r: Math.random()*2+1, speed: Math.random()*1+0.5, angle: Math.random()*Math.PI*2, color: colors.particle });
    }

    const render = () => {
      time += 0.02; ctx.clearRect(0, 0, width, height);
      const cx = width / 2; const cy = height - 50;
      const gradient = ctx.createRadialGradient(cx, cy - 40, 10, cx, cy - 40, 150);
      gradient.addColorStop(0, colors.aura); gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, width, height);

      if (realmIdx >= 3) {
          ctx.save(); ctx.translate(cx, cy - 40); ctx.rotate(time * 0.5); ctx.beginPath(); ctx.strokeStyle = colors.main; ctx.lineWidth = 1; ctx.globalAlpha = 0.3;
          ctx.arc(0, 0, 80, 0, Math.PI * 2); if (realmIdx >= 6) { ctx.moveTo(70, 0); ctx.arc(0, 0, 70, 0, Math.PI * 2); }
          ctx.stroke(); ctx.restore();
      }

      const pulse = Math.sin(time * 2) * 5; const auraRadius = 50 + realmIdx * 3 + pulse;
      ctx.beginPath(); ctx.arc(cx, cy - 40, auraRadius, 0, Math.PI * 2); ctx.fillStyle = colors.aura; ctx.fill();

      ctx.fillStyle = "#0a0a0a"; ctx.strokeStyle = colors.main; ctx.lineWidth = 2; ctx.shadowBlur = 10; ctx.shadowColor = colors.main;
      ctx.beginPath(); ctx.arc(cx, cy - 60, 15, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx-15, cy-45); ctx.lineTo(cx+15, cy-45); ctx.lineTo(cx+25, cy); ctx.lineTo(cx-25, cy); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx-25, cy); ctx.quadraticCurveTo(cx-40, cy+20, cx, cy+15); ctx.quadraticCurveTo(cx+40, cy+20, cx+25, cy); ctx.stroke(); ctx.fill();
      ctx.shadowBlur = 0; 

      if (isCultivating) {
        particles.forEach(p => {
            const targetY = cy - 30; let dx = cx - p.x; let dy = targetY - p.y; let dist = Math.sqrt(dx*dx + dy*dy);
            p.x += (dx/dist) * p.speed * (1 + realmIdx * 0.1); p.y += (dy/dist) * p.speed * (1 + realmIdx * 0.1);
            if (dist < 20) { const angle = Math.random() * Math.PI * 2; const distance = 120; p.x = cx + Math.cos(angle) * distance; p.y = (cy - 40) + Math.sin(angle) * distance; }
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.fill();
        });
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [realmIdx, isCultivating]);

  return (<div className="w-full flex justify-center bg-void-800 rounded-t-lg border-b border-void-700 overflow-hidden"><canvas ref={canvasRef} className="rounded-t-lg" style={{ width: 300, height: 250 }} /></div>);
};
export default CultivationCanvas;
