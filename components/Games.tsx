import React from 'react';
import { GAMES } from '../constants';
import GameCard from './GameCard';

const Games: React.FC = () => {
  return (
    <section className="py-20 bg-brand-gray/90 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-white">Tìm Trò Chơi Của Bạn</h2>
          <p className="mt-2 text-lg text-gray-400">Từ những trò kinh điển đến các biến thể hiện đại.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GAMES.map((game) => (
            <GameCard key={game.name} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Games;