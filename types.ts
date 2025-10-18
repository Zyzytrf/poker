
// FIX: Import React to use React.ReactNode type.
import React from 'react';

export interface Game {
  name: string;
  description: string;
  icon: React.ReactNode;
}

export interface Tournament {
  name: string;
  prizePool: string;
  buyIn: string;
  startTime: string;
  status: 'Upcoming' | 'Live' | 'Finished';
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export type LobbyType = 'beginner' | 'vip' | 'tournament';

export interface LobbyOption {
  id: LobbyType;
  title: string;
  description: string;
  icon: React.ReactNode;
  cta: string;
}

export interface Room {
  id: string;
  name: string;
  stakes: string;
  gameType: "No-Limit Hold'em" | "Pot-Limit Omaha";
  players: number;
  maxPlayers: number;
}

export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs' | ' ';
export type Rank = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2' | ' ';

export interface CardType {
  rank: Rank;
  suit: Suit;
}

export interface Player {
    id: number;
    name: string;
    stack: number;
    avatar: string;
    seat: number; // 1-9
    isHero: boolean;
    status: 'playing' | 'folded' | 'sitting_out';
    cards: CardType[];
}
