import React, { useState, useEffect, useRef } from 'react';
import { Fighter, CombatLog } from '../types';
import ProgressBar from './ProgressBar';
import CanvasIcon from './CanvasIcon';
import AvatarCanvas from './AvatarCanvas';

interface Props { player: Fighter; enemy: Fighter; onClose: () => void; }

const CombatModal: React.FC<Props> = ({ player: initialPlayer, enemy: initialEnemy, onClose }) => {
  const [player, setPlayer] = useState<Fighter>(initialPlayer);
  const [enemy, setEnemy] = useState<Fighter>(initialEnemy);
  const [logs, setLogs] = useState<CombatLog[]>([]);
  const [turn, setTurn] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (logsEndRef.current) { logsEndRef.current.scrollTop = logsEndRef.current.scrollHeight; } }, [logs]);

  const handleTurn = () => {
    let attacker = player; let defender = enemy;
    if (turn === 0) { if (enemy.speed > player.speed) { attacker = enemy; defender = player; setTurn(1); return; } } 
    else { const playerStarts = player.speed >= enemy.speed; if (playerStarts) { attacker = turn % 2 === 0 ? player : enemy; defender = turn % 2 === 0 ? enemy : player; } else { attacker = turn % 2 !== 0 ? player : enemy; defender = turn % 2 !== 0 ? enemy : player; } }

    const isCrit = Math.random() < 0.1; const critMult = isCrit ? 1.5 : 1.0; const variance = 0.9 + Math.random() * 0.2; 
    let rawDmg = (attacker.atk * 1.5 - defender.def) * variance * critMult; rawDmg = Math.max(Math.ceil(attacker.atk * 0.1), Math.floor(rawDmg)); 
    const newDefenderHp = Math.max(0, defender.currentHp - rawDmg);
    
    if (defender.isPlayer) { setPlayer(prev => ({ ...prev, currentHp: newDefenderHp })); } else { setEnemy(prev => ({ ...prev, currentHp: newDefenderHp })); }
    setLogs(prev => [...prev, { turn: turn + 1, attacker: attacker.name, defender: defender.name, damage: Math.floor(rawDmg), isCrit, timestamp: Date.now() }]);

    if (newDefenderHp <= 0) { setIsFinished(true); setWinner(attacker.name); } else { setTurn(prev => prev + 1); }
  };

  useEffect(() => { if (isFinished) return; const combatTimer = setTimeout(() => { handleTurn(); }, 800); return () => clearTimeout(combatTimer); }, [turn, isFinished]);

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-void-900 border border-void-600 rounded-lg flex flex-col h-[600px]">
        <div className="bg-void-800 p-3 border-b border-void-700 flex justify-between items-center shrink-0"><h2 className="text-lg font-bold text-gray-200 uppercase tracking-widest">Luận Đạo</h2><button onClick={onClose} className="text-gray-400 hover:text-white"><CanvasIcon type="close" size={16}/></button></div>
        <div className="p-6 grid grid-cols-2 gap-8 items-center bg-void-900">
            <div className="flex flex-col items-center"><div className="w-20 h-20 rounded bg-blue-900/10 border border-blue-600 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(37,99,235,0.2)]"><AvatarCanvas isPlayer={true} size={70} /></div><div className="font-bold text-blue-400 mb-1">{player.name}</div><div className="w-full"><ProgressBar current={player.currentHp} max={player.maxHp} colorClass="bg-blue-600" /></div></div>
            <div className="flex flex-col items-center"><div className="w-20 h-20 rounded bg-red-900/10 border border-red-600 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(220,38,38,0.2)]"><AvatarCanvas isPlayer={false} size={70} /></div><div className="font-bold text-red-400 mb-1">{enemy.name}</div><div className="w-full"><ProgressBar current={enemy.currentHp} max={enemy.maxHp} colorClass="bg-red-600" /></div></div>
        </div>
        <div className="flex-1 bg-black/20 border-t border-void-700 p-4 font-mono text-xs overflow-y-auto" ref={logsEndRef}>{logs.length === 0 && <div className="text-center text-gray-600">Chuẩn bị giao đấu...</div>}{logs.map((log, idx) => (<div key={idx} className="mb-1 border-b border-void-800 pb-1 last:border-0"><span className="text-gray-500">[{log.turn}]</span> <span className={log.attacker === player.name ? "text-blue-300" : "text-red-300"}>{log.attacker}</span> đánh <span className="text-white font-bold">{Math.floor(log.damage)}</span> ST {log.isCrit ? '(Chí Mạng)' : ''}</div>))}{isFinished && (<div className="mt-4 text-center py-2 bg-void-800 border border-void-700 rounded text-gold-400 font-bold uppercase">Kết thúc: {winner} Thắng!</div>)}</div>
        {isFinished && (<div className="p-4 border-t border-void-700 bg-void-800 text-center"><button onClick={onClose} className="bg-gold-600 hover:bg-gold-500 text-black font-bold py-2 px-6 rounded">Đóng</button></div>)}
      </div>
    </div>
  );
};
export default CombatModal;
