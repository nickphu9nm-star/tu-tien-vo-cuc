import React from 'react';

export interface PlayerStats {
  hp: number; atk: number; def: number; speed: number; breakthroughChance?: number;
}

export enum ItemType { RESOURCE = 'resource', EQUIPMENT = 'equipment' }
export enum ItemRarity { GREY = 'grey', GREEN = 'green', BLUE = 'blue', PURPLE = 'purple', GOLD = 'gold', ORANGE = 'orange', RED = 'red' }
export enum EquipSlot { WEAPON = 'weapon', HEAD = 'head', BODY = 'body', RING = 'ring', FEET = 'feet', AMULET = 'amulet' }

export interface ItemStats {
  hp?: number; atk?: number; def?: number; speed?: number; breakthroughChance?: number;
  hpPercent?: number; atkPercent?: number; defPercent?: number;
}

export interface StatLine { code: string; value: number; isMain: boolean; }

export interface Item {
  id: string; name: string; type: ItemType; rarity: ItemRarity; description: string; value: number;
  slot?: EquipSlot; stats?: ItemStats; statLines?: StatLine[]; enhancementLevel?: number;
}

export interface InventoryItem extends Item { count: number; }

export interface SecretRealm { id: number; name: string; minRealmIdx: number; description: string; dropRate: number; }

export type EquipmentState = { [key in EquipSlot]?: Item; };

export interface Player {
  id: string; username: string; password?: string;
  majorRealmIdx: number; minorRealmIdx: number;
  qi: number; maxQi: number; potential: number; breakthroughFailCount: number;
  stats: PlayerStats; equipment: EquipmentState; inventory: InventoryItem[];
  name?: string; money: number; lastSaveTime: number;
}

export interface LogEntry {
  id: string; message: string; type: 'normal' | 'success' | 'fail' | 'info' | 'item' | 'combat'; timestamp: string;
}

export enum TabType { SMITHING = 'smithing', INVENTORY = 'inventory', FEATURES = 'features', LEADERBOARD = 'leaderboard', MARKET = 'market', BOSS = 'boss' }

export interface LeaderboardEntry {
  rank: number; name: string; realm: string; power: number;
  equipment: EquipmentState; stats: PlayerStats; isPlayer?: boolean; 
}

export interface MarketListing {
  id: string; sellerName: string; sellerId: string; item: Item; price: number; timestamp: number;
}

export interface WorldBoss {
  id: string; name: string; description: string; currentHp: number; maxHp: number; level: number;
  status: 'alive' | 'dead'; respawnTime?: number;
}

export interface ChatMessage {
  id: string; sender: string; content: string; isSystem: boolean; timestamp: string;
}

export interface Fighter {
  id: string; name: string; maxHp: number; currentHp: number; atk: number; def: number; speed: number;
  avatar?: React.ReactNode; isPlayer: boolean;
}

export interface CombatLog {
  turn: number; attacker: string; defender: string; damage: number; isCrit: boolean; timestamp: number;
}

export enum AuthStatus { CHECKING = 'checking', LOGGED_OUT = 'logged_out', LOGGED_IN = 'logged_in' }

export interface ServerState {
  market: MarketListing[]; bosses: WorldBoss[]; chat: ChatMessage[]; leaderboard: LeaderboardEntry[];
}
