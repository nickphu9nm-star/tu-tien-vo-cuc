import React, { useRef, useEffect } from 'react';

export type IconType = 'heart' | 'sword' | 'shield' | 'zap' | 'hammer' | 'bag' | 'market' | 'book' | 'skull' | 'trophy' | 'crown' | 'medal' | 'clock' | 'gift' | 'send' | 'close' | 'swords' | 'coins' | 'settings' | 'sound_on' | 'sound_off' | 'logout' | 'trash';

interface Props { type: IconType; size?: number; color?: string; className?: string; }

const CanvasIcon: React.FC<Props> = ({ type, size = 16, color = '#9ca3af', className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const scale = 2; canvas.width = size * scale; canvas.height = size * scale; ctx.scale(scale, scale);
    ctx.clearRect(0, 0, size, size); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 1.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const cx = size / 2; const cy = size / 2; ctx.beginPath();

    switch (type) {
        case 'heart': ctx.moveTo(cx, cy + size*0.35); ctx.bezierCurveTo(cx+size*0.4, cy, cx+size*0.4, cy-size*0.4, cx, cy-size*0.2); ctx.bezierCurveTo(cx-size*0.4, cy-size*0.4, cx-size*0.4, cy, cx, cy+size*0.35); ctx.fill(); break;
        case 'sword': ctx.moveTo(cx-2, cy+2); ctx.lineTo(cx-5, cy+5); ctx.moveTo(cx, cy); ctx.lineTo(cx+6, cy-6); ctx.moveTo(cx+2, cy-2); ctx.lineTo(cx+5, cy+1); ctx.moveTo(cx-1, cy+1); ctx.lineTo(cx-2, cy-2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(size*0.2, size*0.8); ctx.lineTo(size*0.8, size*0.2); ctx.moveTo(size*0.6, size*0.6); ctx.lineTo(size*0.8, size*0.8); ctx.stroke(); break;
        case 'shield': ctx.moveTo(size*0.2, size*0.2); ctx.lineTo(size*0.8, size*0.2); ctx.quadraticCurveTo(size*0.8, size*0.6, cx, size*0.9); ctx.quadraticCurveTo(size*0.2, size*0.6, size*0.2, size*0.2); ctx.stroke(); break;
        case 'zap': ctx.moveTo(cx+2, size*0.1); ctx.lineTo(size*0.3, cy+2); ctx.lineTo(cx, cy+2); ctx.lineTo(size*0.4, size*0.9); ctx.lineTo(size*0.7, cy-2); ctx.lineTo(cx, cy-2); ctx.lineTo(cx+2, size*0.1); ctx.fill(); break;
        case 'hammer': ctx.rect(size*0.3, size*0.2, size*0.4, size*0.3); ctx.fill(); ctx.beginPath(); ctx.moveTo(cx, size*0.5); ctx.lineTo(cx, size*0.9); ctx.stroke(); break;
        case 'bag': ctx.rect(size*0.2, size*0.35, size*0.6, size*0.5); ctx.moveTo(size*0.35, size*0.35); ctx.bezierCurveTo(size*0.35, size*0.15, size*0.65, size*0.15, size*0.65, size*0.35); ctx.stroke(); break;
        case 'market': ctx.moveTo(size*0.1, size*0.4); ctx.lineTo(cx, size*0.15); ctx.lineTo(size*0.9, size*0.4); ctx.lineTo(size*0.8, size*0.4); ctx.lineTo(size*0.8, size*0.9); ctx.lineTo(size*0.2, size*0.9); ctx.lineTo(size*0.2, size*0.4); ctx.stroke(); ctx.beginPath(); ctx.moveTo(size*0.4, size*0.9); ctx.lineTo(size*0.4, size*0.6); ctx.lineTo(size*0.6, size*0.6); ctx.lineTo(size*0.6, size*0.9); ctx.stroke(); break;
        case 'book': ctx.rect(size*0.25, size*0.15, size*0.5, size*0.7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(size*0.35, size*0.3); ctx.lineTo(size*0.65, size*0.3); ctx.moveTo(size*0.35, size*0.45); ctx.lineTo(size*0.65, size*0.45); ctx.stroke(); break;
        case 'skull': ctx.arc(cx, size*0.4, size*0.25, 0, Math.PI*2); ctx.moveTo(size*0.4, size*0.75); ctx.lineTo(size*0.4, size*0.85); ctx.moveTo(size*0.5, size*0.75); ctx.lineTo(size*0.5, size*0.85); ctx.moveTo(size*0.6, size*0.75); ctx.lineTo(size*0.6, size*0.85); ctx.stroke(); ctx.beginPath(); ctx.arc(cx-3, size*0.4, 1.5, 0, Math.PI*2); ctx.arc(cx+3, size*0.4, 1.5, 0, Math.PI*2); ctx.fill(); break;
        case 'trophy': ctx.moveTo(size*0.2, size*0.25); ctx.lineTo(size*0.8, size*0.25); ctx.quadraticCurveTo(size*0.7, size*0.6, cx, size*0.7); ctx.quadraticCurveTo(size*0.3, size*0.6, size*0.2, size*0.25); ctx.moveTo(cx, size*0.7); ctx.lineTo(cx, size*0.9); ctx.moveTo(size*0.3, size*0.9); ctx.lineTo(size*0.7, size*0.9); ctx.stroke(); break;
        case 'crown': ctx.moveTo(size*0.2, size*0.7); ctx.lineTo(size*0.2, size*0.4); ctx.lineTo(size*0.35, size*0.6); ctx.lineTo(cx, size*0.3); ctx.lineTo(size*0.65, size*0.6); ctx.lineTo(size*0.8, size*0.4); ctx.lineTo(size*0.8, size*0.7); ctx.closePath(); ctx.fill(); break;
        case 'medal': ctx.arc(cx, size*0.7, size*0.2, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.moveTo(cx, size*0.7); ctx.lineTo(size*0.3, size*0.1); ctx.lineTo(size*0.7, size*0.1); ctx.closePath(); ctx.stroke(); break;
        case 'clock': ctx.arc(cx, cy, size*0.4, 0, Math.PI*2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, size*0.3); ctx.moveTo(cx, cy); ctx.lineTo(size*0.7, cy); ctx.stroke(); break;
        case 'gift': ctx.rect(size*0.2, size*0.4, size*0.6, size*0.4); ctx.stroke(); ctx.beginPath(); ctx.moveTo(size*0.5, size*0.4); ctx.lineTo(size*0.5, size*0.8); ctx.moveTo(size*0.2, size*0.6); ctx.lineTo(size*0.8, size*0.6); ctx.stroke(); ctx.beginPath(); ctx.moveTo(size*0.5, size*0.4); ctx.quadraticCurveTo(size*0.3, size*0.2, size*0.5, size*0.2); ctx.quadraticCurveTo(size*0.7, size*0.2, size*0.5, size*0.4); ctx.stroke(); break;
        case 'send': ctx.moveTo(size*0.1, size*0.9); ctx.lineTo(size*0.9, size*0.5); ctx.lineTo(size*0.1, size*0.1); ctx.lineTo(size*0.1, size*0.9); ctx.fill(); break;
        case 'close': ctx.moveTo(size*0.2, size*0.2); ctx.lineTo(size*0.8, size*0.8); ctx.moveTo(size*0.8, size*0.2); ctx.lineTo(size*0.2, size*0.8); ctx.stroke(); break;
        case 'swords': ctx.save(); ctx.translate(cx, cy); ctx.rotate(Math.PI/4); ctx.beginPath(); ctx.moveTo(0, -size*0.3); ctx.lineTo(0, size*0.3); ctx.stroke(); ctx.moveTo(-2, 0); ctx.lineTo(2, 0); ctx.stroke(); ctx.rotate(Math.PI/2); ctx.beginPath(); ctx.moveTo(0, -size*0.3); ctx.lineTo(0, size*0.3); ctx.stroke(); ctx.moveTo(-2, 0); ctx.lineTo(2, 0); ctx.stroke(); ctx.restore(); break;
        case 'coins': ctx.arc(size*0.4, size*0.5, size*0.2, 0, Math.PI*2); ctx.stroke(); ctx.beginPath(); ctx.arc(size*0.7, size*0.5, size*0.2, 0, Math.PI*2); ctx.fill(); break;
        case 'settings': ctx.arc(cx, cy, size*0.2, 0, Math.PI*2); ctx.stroke(); for(let i=0; i<8; i++) { const ang = (i/8)*Math.PI*2; ctx.moveTo(cx+Math.cos(ang)*size*0.2, cy+Math.sin(ang)*size*0.2); ctx.lineTo(cx+Math.cos(ang)*size*0.4, cy+Math.sin(ang)*size*0.4); ctx.stroke(); } break;
        case 'sound_on': ctx.moveTo(size*0.2, size*0.4); ctx.lineTo(size*0.4, size*0.4); ctx.lineTo(size*0.6, size*0.2); ctx.lineTo(size*0.6, size*0.8); ctx.lineTo(size*0.4, size*0.6); ctx.lineTo(size*0.2, size*0.6); ctx.fill(); ctx.beginPath(); ctx.arc(size*0.6, cy, size*0.3, -Math.PI/3, Math.PI/3); ctx.stroke(); break;
        case 'sound_off': ctx.moveTo(size*0.2, size*0.4); ctx.lineTo(size*0.4, size*0.4); ctx.lineTo(size*0.6, size*0.2); ctx.lineTo(size*0.6, size*0.8); ctx.lineTo(size*0.4, size*0.6); ctx.lineTo(size*0.2, size*0.6); ctx.fill(); ctx.beginPath(); ctx.moveTo(size*0.7, size*0.4); ctx.lineTo(size*0.9, size*0.6); ctx.moveTo(size*0.9, size*0.4); ctx.lineTo(size*0.7, size*0.6); ctx.stroke(); break;
        case 'logout': ctx.moveTo(size*0.5, size*0.2); ctx.lineTo(size*0.5, size*0.8); ctx.stroke(); ctx.beginPath(); ctx.arc(cx, cy, size*0.3, -Math.PI/2+0.5, -Math.PI/2-0.5, true); ctx.stroke(); break;
        case 'trash': ctx.rect(size*0.3, size*0.3, size*0.4, size*0.5); ctx.stroke(); ctx.beginPath(); ctx.moveTo(size*0.25, size*0.3); ctx.lineTo(size*0.75, size*0.3); ctx.moveTo(size*0.4, size*0.3); ctx.lineTo(size*0.4, size*0.2); ctx.lineTo(size*0.6, size*0.2); ctx.lineTo(size*0.6, size*0.3); ctx.stroke(); break;
        default: ctx.arc(cx, cy, size*0.4, 0, Math.PI*2); ctx.stroke();
    }
  }, [type, size, color]);
  return <canvas ref={canvasRef} className={className} style={{ width: size, height: size }} />;
};
export default CanvasIcon;
