
import React from 'react';
import type { Game } from '../types';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <div className="bg-brand-dark rounded-lg p-8 group transition-all duration-300 hover:shadow-gold hover:-translate-y-2 border border-brand-gray hover:border-brand-gold/50">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-gray group-hover:bg-brand-gold/10 mb-6 transition-colors duration-300">
        {game.icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">{game.name}</h3>
      <p className="text-gray-400">{game.description}</p>
    </div>
  );
};

export default GameCard;
