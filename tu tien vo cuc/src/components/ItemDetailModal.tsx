import React, { useState } from 'react';
import { Item, InventoryItem, ItemType, ItemRarity } from '../types';
import EquipIcon from './EquipIcon';
import CanvasIcon, { IconType } from './CanvasIcon';

interface Props { item: Item | InventoryItem | null; onClose: () => void; onEquip?: (item: Item) => void; onUnequip?: (item: Item) => void; onSell?: (item: Item) => void; onDismantle?: (item: Item) => void; onListMarket?: (item: Item, price: number) => void; isEquipped?: boolean; }

const getRarityHex = (rarity: ItemRarity) => { switch(rarity) { case ItemRarity.RED: return '#ef4444'; case ItemRarity.ORANGE: return '#f97316'; case ItemRarity.GOLD: return '#facc15'; case ItemRarity.PURPLE: return '#c084fc'; case ItemRarity.BLUE: return '#60a5fa'; case ItemRarity.GREEN: return '#4ade80'; default: return '#9ca3af'; } };

const ItemDetailModal: React.FC<Props> = ({ item, onClose, onEquip, onUnequip, onListMarket, isEquipped }) => {
  const [isListing, setIsListing] = useState(false);
  const [listingPrice, setListingPrice] = useState<string>('');
  if (!item) return null;
  const handleList = () => { if (!listingPrice || isNaN(Number(listingPrice)) || Number(listingPrice) <= 0) return; onListMarket?.(item, Number(listingPrice)); onClose(); };
  const getRarityTitleColor = (rarity: string) => { switch(rarity) { case 'red': return 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]'; case 'orange': return 'text-orange-400 drop-shadow-[0_0_5px_rgba(251,146,60,0.8)]'; case 'gold': return 'text-yellow-300 drop-shadow-[0_0_5px_rgba(253,224,71,0.8)]'; case 'purple': return 'text-purple-400 drop-shadow-[0_0_5px_rgba(192,132,252,0.6)]'; case 'blue': return 'text-blue-400'; case 'green': return 'text-green-400'; default: return 'text-gray-300'; } };
  const enhancementMultiplier = 1 + ((item.enhancementLevel || 0) * 0.1);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-void-800 border-2 border-void-600 rounded-xl shadow-2xl max-w-sm w-full relative overflow-hidden flex flex-col">
        <div className={`absolute top-0 left-0 w-full h-1 opacity-50 ${item.rarity === 'red' ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,1)]' : item.rarity === 'orange' ? 'bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,1)]' : item.rarity === 'gold' ? 'bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,1)]' : 'bg-gray-600'}`} />
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors bg-black/20 rounded-full p-1"><CanvasIcon type="close" size={16} /></button>
        <div className="p-6">
          <div className="flex flex-col items-center mb-4">
               {item.slot ? (<div className="w-16 h-16 bg-void-900 border border-void-700 rounded-lg p-2 mb-2"><EquipIcon slot={item.slot} color={getRarityHex(item.rarity)} className="w-full h-full drop-shadow-md"/></div>) : null}
              <h3 className={`text-xl font-bold uppercase tracking-wider mb-1 text-center ${getRarityTitleColor(item.rarity)}`}>{item.name} {item.enhancementLevel ? <span className="text-white ml-1">+{item.enhancementLevel}</span> : ''}</h3>
              <p className="text-xs text-gray-400 font-mono uppercase bg-void-900 inline-block px-3 py-1 rounded-full border border-void-700">{item.type === ItemType.EQUIPMENT ? `Trang bị • ${item.slot}` : 'Vật phẩm'}</p>
          </div>
          <div className="space-y-4 text-sm text-gray-200">
            <p className="text-center italic text-gray-400 leading-relaxed border-b border-void-700 pb-3">"{item.description}"</p>
            {item.statLines && item.statLines.length > 0 && (
                <div className="bg-void-900/50 p-3 rounded-lg border border-void-700 space-y-2 max-h-[200px] overflow-y-auto">
                    {item.statLines.map((stat, idx) => {
                        const enhancedValue = Math.floor(stat.value * enhancementMultiplier); const isPercent = stat.code.includes('Percent') || stat.code === 'breakthroughChance';
                        let label = ""; if (stat.code === 'hp') label = "Sinh Lực"; else if (stat.code === 'atk') label = "Công Kích"; else if (stat.code === 'def') label = "Phòng Thủ"; else if (stat.code === 'speed') label = "Tốc Độ"; else if (stat.code === 'hpPercent') label = "Sinh Lực %"; else if (stat.code === 'atkPercent') label = "Công Kích %"; else if (stat.code === 'defPercent') label = "Phòng Thủ %"; else if (stat.code === 'breakthroughChance') label = "Tỷ Lệ Đột Phá";
                        return (<div key={idx} className="flex justify-between items-center group border-b border-void-800 last:border-0 pb-1 last:pb-0"><span className={`capitalize text-xs ${stat.isMain ? 'text-gray-200 font-bold' : 'text-gray-400'}`}>{label}</span><div className="text-right"><span className={`font-mono text-base ${stat.isMain ? "text-gold-400 font-bold" : "text-white"}`}>+{enhancedValue}{isPercent ? '%' : ''}</span>{item.enhancementLevel && item.enhancementLevel > 0 ? (<span className="text-[10px] text-gray-600 ml-1 block">(Gốc: {stat.value}{isPercent ? '%' : ''})</span>) : null}</div></div>);
                    })}
                </div>
            )}
             <div className="flex justify-between items-center bg-void-900 px-3 py-2 rounded border border-void-700"><span className="text-gray-400 text-xs">Giá trị thực</span><span className="text-white font-mono font-bold">{item.value * ((item as InventoryItem).count || 1)} <span className="text-gold-500">Linh Thạch</span></span></div>
          </div>
          <div className="mt-6 pt-4 border-t border-void-700">
            {isListing ? (
                <div className="bg-void-900 p-4 rounded-lg border border-void-600 animate-fadeIn"><label className="text-xs text-gold-400 font-bold block mb-2 uppercase tracking-wide">Nhập giá bán (Linh Thạch)</label><input type="number" value={listingPrice} onChange={(e) => setListingPrice(e.target.value)} className="w-full bg-void-800 border border-void-500 rounded p-2 text-white mb-3 focus:border-gold-500 outline-none font-mono text-lg" placeholder="VD: 10000" autoFocus/><div className="flex gap-3"><button onClick={() => setIsListing(false)} className="flex-1 py-2 text-sm text-gray-400 hover:text-white transition-colors">Hủy Bỏ</button><button onClick={handleList} className="flex-1 py-2 bg-gold-600 hover:bg-gold-500 text-black font-bold rounded shadow-lg shadow-gold-900/20 transition-all active:scale-95">Xác Nhận</button></div></div>
            ) : (<div className="grid grid-cols-2 gap-3">{item.type === ItemType.EQUIPMENT && (<>{isEquipped ? (<button onClick={() => { onUnequip?.(item); onClose(); }} className="col-span-2 bg-red-900 hover:bg-red-800 border border-red-700 text-red-100 py-3 rounded-lg font-bold shadow-lg shadow-red-900/20 transition-all active:scale-95">Tháo Trang Bị</button>) : (<button onClick={() => { onEquip?.(item); onClose(); }} className="col-span-2 bg-green-800 hover:bg-green-700 border border-green-600 text-green-100 py-3 rounded-lg font-bold shadow-lg shadow-green-900/20 transition-all active:scale-95">Trang Bị Ngay</button>)}</>)}{!isEquipped && item.type === ItemType.EQUIPMENT && onListMarket && (<button onClick={() => setIsListing(true)} className="col-span-2 bg-blue-900 hover:bg-blue-800 border border-blue-700 text-blue-100 py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-all active:scale-95"><CanvasIcon type="coins" size={16}/> Bán Chợ</button>)}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemDetailModal;
