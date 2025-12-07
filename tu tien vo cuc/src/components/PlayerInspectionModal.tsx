import React, { useMemo } from 'react';
import { LeaderboardEntry, Item, ItemRarity, EquipSlot } from '../types';
import EquipIcon from './EquipIcon';
import CanvasIcon from './CanvasIcon';

interface Props { entry: LeaderboardEntry | null; onClose: () => void; onInspectItem: (item: Item) => void; onSpar: (entry: LeaderboardEntry) => void; }

const getRarityColor = (rarity: ItemRarity) => { switch (rarity) { case ItemRarity.RED: return 'text-red-600 border-red-600 shadow-[0_0_5px_rgba(220,38,38,0.5)]'; case ItemRarity.ORANGE: return 'text-orange-500 border-orange-500'; case ItemRarity.GOLD: return 'text-yellow-400 font-bold border-yellow-400'; case ItemRarity.PURPLE: return 'text-purple-400 border-purple-400'; case ItemRarity.BLUE: return 'text-blue-400 border-blue-400'; case ItemRarity.GREEN: return 'text-green-400 border-green-400'; default: return 'text-gray-400 border-gray-600'; } };
const getRarityHex = (rarity: ItemRarity) => { switch(rarity) { case ItemRarity.RED: return '#ef4444'; case ItemRarity.ORANGE: return '#f97316'; case ItemRarity.GOLD: return '#facc15'; case ItemRarity.PURPLE: return '#c084fc'; case ItemRarity.BLUE: return '#60a5fa'; case ItemRarity.GREEN: return '#4ade80'; default: return '#9ca3af'; } };

const PlayerInspectionModal: React.FC<Props> = ({ entry, onClose, onInspectItem, onSpar }) => {
  if (!entry) return null;
  const stats = entry.stats;
  const Slot = ({ slot, icon, label }: { slot: EquipSlot, icon: React.ReactNode, label: string }) => {
    const item = entry.equipment[slot];
    return (<div onClick={() => item && onInspectItem(item)} className={`w-14 h-14 bg-void-900 border rounded flex flex-col items-center justify-center relative transition-transform hover:scale-105 cursor-pointer p-2 ${item ? getRarityColor(item.rarity) : 'border-void-600'}`}>{item ? (<><EquipIcon slot={slot} color={getRarityHex(item.rarity)} className="w-full h-full"/><span className="text-[10px] absolute -bottom-1 w-full text-center bg-black/60 truncate px-0.5">{item.name}</span>{item.enhancementLevel ? <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] px-1 rounded-full">+{item.enhancementLevel}</span> : null}</>) : (<div className="opacity-20 flex flex-col items-center justify-center h-full w-full"><EquipIcon slot={slot} className="w-full h-full"/><span className="text-[8px] mt-1 hidden">{label}</span></div>)}</div>);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-void-800 border border-gold-500/30 rounded-lg shadow-2xl max-w-md w-full relative overflow-hidden flex flex-col max-h-[90vh]">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white z-10"><CanvasIcon type="close" size={20}/></button>
        <div className="bg-void-900 p-4 text-center border-b border-void-700 shrink-0"><h2 className="text-xl font-bold text-gold-400">{entry.name}</h2><div className="text-sm text-gray-400">{entry.realm}</div><div className="text-xs text-orange-500 mt-1 font-mono">Lực Chiến: {entry.power.toLocaleString()}</div></div>
        <div className="p-6 overflow-y-auto">
            <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                <div className="bg-void-900 p-2 rounded border border-void-700"><div className="mx-auto mb-1"><CanvasIcon type="heart" color="#ef4444" size={16}/></div><div className="text-xs text-gray-500">Sinh Lực</div><div className="font-bold">{stats.hp.toLocaleString()}</div></div>
                <div className="bg-void-900 p-2 rounded border border-void-700"><div className="mx-auto mb-1"><CanvasIcon type="sword" color="#eab308" size={16}/></div><div className="text-xs text-gray-500">Công Kích</div><div className="font-bold">{stats.atk.toLocaleString()}</div></div>
                <div className="bg-void-900 p-2 rounded border border-void-700"><div className="mx-auto mb-1"><CanvasIcon type="shield" color="#3b82f6" size={16}/></div><div className="text-xs text-gray-500">Phòng Thủ</div><div className="font-bold">{stats.def.toLocaleString()}</div></div>
            </div>
            <h3 className="text-xs uppercase font-bold text-gray-500 mb-2 text-center">Trang Bị Đang Mặc</h3>
            <div className="flex justify-center gap-3 flex-wrap mb-6"><Slot slot={EquipSlot.WEAPON} icon={null} label="Vũ Khí"/><Slot slot={EquipSlot.HEAD} icon={null} label="Nón"/><Slot slot={EquipSlot.BODY} icon={null} label="Áo"/><Slot slot={EquipSlot.RING} icon={null} label="Nhẫn"/><Slot slot={EquipSlot.AMULET} icon={null} label="Ngọc"/><Slot slot={EquipSlot.FEET} icon={null} label="Giày"/></div>
            <button onClick={() => { onSpar(entry); onClose(); }} className="w-full bg-red-900 hover:bg-red-800 border border-red-600 text-white py-3 rounded-lg font-bold shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 group transition-all active:scale-95"><CanvasIcon type="swords" size={20} color="#ffffff" className="group-hover:rotate-12 transition-transform"/>LUẬN ĐẠO (PvP)</button>
            <p className="text-[10px] text-center text-gray-500 mt-2 italic">Tỷ thí võ công, phân định cao thấp</p>
        </div>
      </div>
    </div>
  );
};
export default PlayerInspectionModal;
