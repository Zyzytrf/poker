
import React from 'react';
import { BEGINNER_ROOMS, VIP_ROOMS } from '../constants';
import type { LobbyOption, Room } from '../types';
import RoomRow from './RoomRow';

interface RoomListProps {
  lobby: LobbyOption;
  onBack: () => void;
  onJoinRoom: (room: Room) => void;
}

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);


const RoomList: React.FC<RoomListProps> = ({ lobby, onBack, onJoinRoom }) => {
  const rooms: Room[] = lobby.id === 'beginner' ? BEGINNER_ROOMS : VIP_ROOMS;

  return (
    <section className="py-16 bg-brand-dark min-h-[calc(100vh-10rem)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between mb-12">
            <div>
                 <button onClick={onBack} className="flex items-center text-sm text-gray-400 hover:text-brand-gold transition-colors duration-300 mb-2">
                    <BackArrowIcon />
                    Quay lại Sảnh chờ
                </button>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
                    Sảnh <span className="text-brand-gold">{lobby.title}</span>
                </h1>
                <p className="mt-2 text-lg text-gray-400">Chọn một bàn để bắt đầu.</p>
            </div>
        </div>
        
        <div className="bg-brand-gray rounded-lg overflow-hidden shadow-lg">
            <div className="hidden md:grid md:grid-cols-12 gap-4 items-center px-6 py-4 border-b border-brand-dark/50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <div className="col-span-4">Tên Bàn</div>
                <div className="col-span-2 text-left">Loại Game</div>
                <div className="col-span-2 text-right">Mức Cược</div>
                <div className="col-span-2 text-center">Người Chơi</div>
                <div className="col-span-2 text-center">Hành Động</div>
            </div>
             <div className="divide-y divide-brand-dark/50">
                {rooms.map((room) => (
                    <RoomRow key={room.id} room={room} onJoin={onJoinRoom} />
                ))}
             </div>
        </div>
      </div>
    </section>
  );
};

export default RoomList;
