import React from 'react';
import { TOURNAMENTS } from '../constants';
import type { Tournament } from '../types';

const getStatusClass = (status: Tournament['status']) => {
  switch (status) {
    case 'Live':
      return 'text-red-500 animate-pulse';
    case 'Upcoming':
      return 'text-green-400';
    case 'Finished':
      return 'text-gray-500';
    default:
      return 'text-gray-400';
  }
};

const TournamentList: React.FC = () => {
  return (
    <section className="py-20 bg-brand-dark/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-white">Các Giải Đấu Lớn</h2>
          <p className="mt-2 text-lg text-gray-400">Cơ hội của bạn để giành vinh quang và những giải thưởng thay đổi cuộc đời.</p>
        </div>
        <div className="bg-brand-gray rounded-lg overflow-hidden shadow-lg">
          <div className="hidden md:grid md:grid-cols-12 gap-4 items-center px-6 py-4 border-b border-brand-dark/50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <div className="col-span-4">Giải Đấu</div>
            <div className="col-span-2 text-right">Tổng Giải Thưởng</div>
            <div className="col-span-2 text-right">Phí Tham Gia</div>
            <div className="col-span-2 text-right">Bắt Đầu</div>
            <div className="col-span-2 text-center">Hành Động</div>
          </div>
          <div className="divide-y divide-brand-dark/50">
            {TOURNAMENTS.map((tournament) => (
              <div key={tournament.name} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-6 py-5 hover:bg-brand-dark/30 transition-colors duration-200">
                <div className="col-span-1 md:col-span-4">
                  <p className="font-bold text-white text-lg">{tournament.name}</p>
                  <p className={`font-semibold ${getStatusClass(tournament.status)}`}>{tournament.status === 'Live' ? 'Đang diễn ra' : tournament.status === 'Upcoming' ? 'Sắp diễn ra' : 'Đã kết thúc'}</p>
                </div>
                <div className="col-span-1 md:col-span-2 text-left md:text-right font-bold text-brand-gold text-xl">
                  <span className="md:hidden text-gray-400 text-sm font-normal">Giải thưởng: </span>
                  {tournament.prizePool}
                </div>
                <div className="col-span-1 md:col-span-2 text-left md:text-right text-white">
                  <span className="md:hidden text-gray-400 text-sm font-normal">Phí vào: </span>
                  {tournament.buyIn}
                </div>
                <div className="col-span-1 md:col-span-2 text-left md:text-right text-gray-300">
                  <span className="md:hidden text-gray-400 text-sm font-normal">Bắt đầu: </span>
                  {tournament.startTime}
                </div>
                <div className="col-span-1 md:col-span-2 text-center mt-4 md:mt-0">
                  {tournament.status !== 'Finished' && (
                    <button className="w-full bg-brand-gold text-brand-dark font-bold py-2 px-4 rounded-md hover:bg-brand-gold-dark transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                     disabled={tournament.status === 'Live'}>
                      {tournament.status === 'Live' ? 'Đang Chơi' : 'Đăng Ký'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TournamentList;