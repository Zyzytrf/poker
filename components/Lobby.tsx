
import React from 'react';
import { LOBBY_OPTIONS } from '../constants';
import LobbyCard from './LobbyCard';
import type { LobbyOption } from '../types';

interface LobbyProps {
    onLobbySelect: (lobby: LobbyOption) => void;
}

const Lobby: React.FC<LobbyProps> = ({ onLobbySelect }) => {
  return (
    <section className="py-20 bg-brand-dark min-h-[calc(100vh-10rem)] flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white">
            Chào Mừng Đến Sảnh Chờ
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            Chọn đấu trường và khẳng định đẳng cấp của bạn.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {LOBBY_OPTIONS.map((option) => (
            <LobbyCard key={option.title} option={option} onSelect={onLobbySelect} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Lobby;
