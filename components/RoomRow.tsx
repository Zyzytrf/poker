
import React from 'react';
import type { Room } from '../types';

interface RoomRowProps {
  room: Room;
  onJoin: (room: Room) => void;
}

const RoomRow: React.FC<RoomRowProps> = ({ room, onJoin }) => {
  const isFull = room.players >= room.maxPlayers;
  const playersPercentage = (room.players / room.maxPlayers) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-6 py-5 hover:bg-brand-dark/30 transition-colors duration-200">
      
      {/* Tên Bàn */}
      <div className="col-span-1 md:col-span-4">
        <p className="font-bold text-white text-lg">{room.name}</p>
        <div className="md:hidden mt-1">
            <p className="text-sm text-gray-400">{room.gameType}</p>
        </div>
      </div>
      
      {/* Loại Game (chỉ hiện trên desktop) */}
       <div className="hidden md:block col-span-2 text-left text-gray-300">
          {room.gameType}
        </div>

      {/* Mức Cược */}
      <div className="col-span-1 md:col-span-2 text-left md:text-right font-semibold text-white">
         <span className="md:hidden text-gray-400 text-sm font-normal">Mức cược: </span>
         {room.stakes}
      </div>

      {/* Người Chơi */}
      <div className="col-span-1 md:col-span-2 text-left md:text-center">
        <span className="md:hidden text-gray-400 text-sm font-normal">Người chơi: </span>
        <span className="font-mono">{`${room.players}/${room.maxPlayers}`}</span>
        <div className="w-full bg-brand-dark/50 rounded-full h-1.5 mt-1 hidden md:block">
            <div className="bg-brand-gold h-1.5 rounded-full" style={{ width: `${playersPercentage}%` }}></div>
        </div>
      </div>
      
      {/* Hành Động */}
      <div className="col-span-1 md:col-span-2 text-center mt-4 md:mt-0">
        <button 
          onClick={() => onJoin(room)}
          className="w-full bg-brand-gold text-brand-dark font-bold py-2 px-4 rounded-md hover:bg-brand-gold-dark transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:text-gray-400"
          disabled={isFull}
        >
          {isFull ? 'Bàn Đầy' : 'Vào Bàn'}
        </button>
      </div>
    </div>
  );
};

export default RoomRow;
