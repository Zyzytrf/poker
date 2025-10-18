
import React from 'react';
import type { LobbyOption } from '../types';

interface LobbyCardProps {
  option: LobbyOption;
  onSelect: (lobby: LobbyOption) => void;
}

const LobbyCard: React.FC<LobbyCardProps> = ({ option, onSelect }) => {
  return (
    <div className="bg-brand-gray rounded-lg p-8 group transition-all duration-300 hover:shadow-gold hover:-translate-y-2 border border-transparent hover:border-brand-gold/50 flex flex-col items-center text-center">
      <div className="flex items-center justify-center h-20 w-20 rounded-full bg-brand-dark group-hover:bg-brand-gold/10 mb-6 transition-colors duration-300">
        {option.icon}
      </div>
      <h3 className="text-3xl font-bold font-serif text-white mb-3">
        {option.title}
      </h3>
      <p className="text-gray-400 mb-8 flex-grow">
        {option.description}
      </p>
      <button
        onClick={() => onSelect(option)}
        className="w-full mt-auto bg-brand-gold text-brand-dark font-bold py-3 px-6 rounded-md hover:bg-brand-gold-dark transition-all duration-300 transform group-hover:scale-105"
      >
        {option.cta}
      </button>
    </div>
  );
};

export default LobbyCard;
