
import React from 'react';
import type { Suit, Rank } from '../types';

interface CardProps {
  suit: Suit;
  rank: Rank;
  size?: 'small' | 'medium' | 'large';
  faceDown?: boolean;
}

const suitSymbols: { [key in Suit]: string } = {
  'spades': '♠',
  'hearts': '♥',
  'diamonds': '♦',
  'clubs': '♣',
  ' ': ''
};

const Card: React.FC<CardProps> = ({ suit, rank, size = 'medium', faceDown = false }) => {
  const isRed = suit === 'hearts' || suit === 'diamonds';
  const colorClass = isRed ? 'text-red-500' : 'text-black';

  const sizeClasses = {
    small: 'w-8 h-12 text-sm',
    medium: 'w-12 h-20 text-xl',
    large: 'w-20 h-28 text-3xl',
  };
  
  const rankSizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-4xl',
  }
  
  const suitSizeClasses = {
    small: 'text-sm',
    medium: 'text-xl',
    large: 'text-3xl',
  }

  if (faceDown) {
    return (
      <div className={`relative rounded-md shadow-md bg-gradient-to-br from-blue-800 to-blue-900 border border-blue-500 ${sizeClasses[size]}`}>
        <div className="absolute inset-1 rounded border border-white/10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500/50"></div>
      </div>
    );
  }

  if (rank === ' ' || suit === ' ') {
    return (
        <div className={`bg-black/20 border-2 border-gray-500/30 rounded-md ${sizeClasses[size]} shadow-inner`}>
        </div>
    );
  }

  return (
    <div className={`relative flex flex-col justify-between p-1 bg-white border border-gray-300 rounded-md shadow-lg ${sizeClasses[size]} ${colorClass}`}>
      <div className="flex flex-col items-start leading-none">
        <span className={`font-bold ${rankSizeClasses[size]}`}>{rank === 'T' ? '10' : rank}</span>
        <span className={`${suitSizeClasses[size]}`}>{suitSymbols[suit]}</span>
      </div>
      <div className="self-center text-4xl leading-none">
        {/* Center suit could go here if needed */}
      </div>
      <div className="flex flex-col items-end leading-none transform rotate-180">
        <span className={`font-bold ${rankSizeClasses[size]}`}>{rank === 'T' ? '10' : rank}</span>
        <span className={`${suitSizeClasses[size]}`}>{suitSymbols[suit]}</span>
      </div>
    </div>
  );
};

export default Card;
