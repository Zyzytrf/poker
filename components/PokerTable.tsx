import React, { useState, useEffect } from 'react';
import type { Room, Player, CardType, Suit, Rank } from '../types';
import Card from './Card';

interface PokerTableProps {
  room: Room;
  onLeaveTable: () => void;
}

const MOCK_COMMUNITY_CARDS: CardType[] = [
    { rank: 'A', suit: 'hearts' },
    { rank: 'Q', suit: 'spades' },
    { rank: 'T', suit: 'clubs' },
    { rank: '5', suit: 'diamonds' },
    { rank: ' ', suit: ' ' },
];

const ExitIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
);

const PlayerSeat: React.FC<{ player: Player; positionClass: string, isActive: boolean }> = ({ player, positionClass, isActive }) => {
    const isFolded = player.status === 'folded';
    const activeClass = isActive && !isFolded ? 'ring-2 ring-brand-gold shadow-gold' : '';

    return (
        <div className={`absolute transform text-center w-36 ${positionClass}`}>
            <div className={`relative w-16 h-16 mx-auto rounded-full border-2 ${player.isHero ? 'border-brand-gold' : 'border-gray-500'} p-1 transition-all duration-300 ${isFolded ? 'opacity-50 grayscale' : ''} ${activeClass}`}>
                <img src={player.avatar} alt={player.name} className="w-full h-full rounded-full object-cover" />
                {player.isHero && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-dark text-xs font-bold px-2 py-0.5 rounded shadow-lg">BẠN</div>}
            </div>
            <div className={`mt-1 bg-black/50 rounded-lg p-1 transition-all duration-300 ${isFolded ? 'opacity-50' : ''}`}>
                <p className={`text-sm font-semibold truncate text-white`}>{player.name}</p>
                <p className={`text-xs font-mono text-brand-gold`}>${player.stack.toLocaleString()}</p>
            </div>
            {player.status !== 'sitting_out' && (
                <div className={`absolute top-[-30px] left-1/2 -translate-x-1/2 flex justify-center space-x-[-20px] transition-all duration-300 ${isFolded ? 'opacity-30' : ''}`}>
                    {player.cards.map((card, index) => (
                        <Card key={index} {...card} size="small" faceDown={!player.isHero} />
                    ))}
                </div>
            )}
        </div>
    );
};

// --- Game Logic Helpers ---
const SUITS: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs'];
const RANKS: Rank[] = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const BOT_NAMES = ["Aria", "Leo", "Zara", "Max", "Chloe", "Kai", "Eva", "Nico"];

const createDeck = (): CardType[] => {
    const deck: CardType[] = [];
    SUITS.forEach(suit => {
        RANKS.forEach(rank => {
            deck.push({ suit, rank });
        });
    });
    return deck;
};

const shuffleDeck = (deck: CardType[]): CardType[] => {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
};

const getSeatConfiguration = (playerCount: number): number[] => {
    // Hero is always first, at physical seat 8. The rest are arranged for visual balance.
    if (playerCount <= 2) return [8, 3]; // Heads-up
    if (playerCount === 3) return [8, 2, 4];
    if (playerCount === 4) return [8, 1, 3, 5]; // 4-handed (cross)
    if (playerCount === 5) return [8, 9, 2, 4, 7];
    if (playerCount <= 6) return [8, 9, 2, 4, 5, 7]; // 6-max
    if (playerCount === 7) return [8, 9, 1, 2, 4, 5, 7];
    if (playerCount === 8) return [8, 9, 1, 2, 3, 4, 5, 7];
    // Default to 9-handed for 9 or more players
    return [8, 9, 1, 2, 3, 4, 5, 6, 7];
};
// --- End Game Logic Helpers ---


const PokerTable: React.FC<PokerTableProps> = ({ room, onLeaveTable }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [pot, setPot] = useState(4500);
  const [betAmount, setBetAmount] = useState(2000);
  const [activeSeat, setActiveSeat] = useState<number | null>(null);

  
  const hero = players.find(p => p.isHero);
  const minBet = 2000;
  const maxBet = hero?.stack || minBet;

  // Setup table on mount or when room changes
  useEffect(() => {
        const deck = shuffleDeck(createDeck());
        const newPlayers: Player[] = [];
        
        // Determine number of players and seat configuration
        const numPlayers = room.players > 9 ? 9 : (room.players < 2 ? 2 : room.players);
        const seatConfig = getSeatConfiguration(numPlayers);

        // 1. Create Hero
        const heroSeat = seatConfig[0];
        const heroPlayer: Player = {
            id: heroSeat, name: "Bạn", stack: 20000, 
            avatar: `https://i.pravatar.cc/150?u=hero`, 
            seat: heroSeat, isHero: true, status: 'playing', 
            cards: deck.splice(0, 2),
        };
        newPlayers.push(heroPlayer);

        // 2. Create Bots
        const shuffledBotNames = [...BOT_NAMES].sort(() => 0.5 - Math.random());
        for (let i = 1; i < numPlayers; i++) {
            const seat = seatConfig[i];
            const name = shuffledBotNames.pop() || `Bot ${i}`;
            const botPlayer: Player = {
                id: seat,
                name: name,
                stack: 10000 + Math.floor(Math.random() * 20000),
                avatar: `https://i.pravatar.cc/150?u=${name.toLowerCase()}`,
                seat: seat,
                isHero: false,
                status: Math.random() > 0.8 ? 'folded' : 'playing',
                cards: deck.splice(0, 2),
            };
            newPlayers.push(botPlayer);
        }
        
        setPlayers(newPlayers);
        // Start action with the player to the "left" of the hero.
        setActiveSeat(seatConfig[1] || seatConfig[0]);
  }, [room.id, room.players]);

  // Game loop simulation to cycle turns
  useEffect(() => {
    if (players.length === 0) return;

    const turnTimer = setInterval(() => {
        setActiveSeat(prevSeat => {
            if (prevSeat === null) return players.find(p => p.status === 'playing')?.seat || null;
            
            const sortedPlayingSeats = players
              .filter(p => p.status === 'playing')
              .map(p => p.seat)
              .sort((a, b) => a - b);
              
            if(sortedPlayingSeats.length === 0) return prevSeat;

            const currentSeatIndex = sortedPlayingSeats.indexOf(prevSeat);

            // If current seat is not in playing list, start from first playing player
            if (currentSeatIndex === -1) {
                return sortedPlayingSeats[0];
            }

            const nextSeatIndex = (currentSeatIndex + 1) % sortedPlayingSeats.length;
            return sortedPlayingSeats[nextSeatIndex];
        });
    }, 3000); // Change turn every 3 seconds

    return () => clearInterval(turnTimer);
  }, [players]);

  useEffect(() => {
    if (betAmount > maxBet) setBetAmount(maxBet);
    if (betAmount < minBet) setBetAmount(minBet);
  }, [betAmount, maxBet]);

  const handleFold = () => {
    setPlayers(prevPlayers => prevPlayers.map(p => p.isHero ? { ...p, status: 'folded' } : p));
  };

  const handleBet = () => {
      if (!hero || hero.status === 'folded' || betAmount <= 0) return;
      
      const newStack = hero.stack - betAmount;
      const newPot = pot + betAmount;

      setPlayers(prevPlayers => prevPlayers.map(p => p.isHero ? { ...p, stack: newStack } : p));
      setPot(newPot);
      setBetAmount(minBet > newStack ? newStack : minBet);
  };
  
  const isHeroTurn = activeSeat === hero?.seat;
  const heroHasFolded = hero?.status === 'folded';

  const seatPositions: { [key: number]: string } = {
    1: 'top-[38%] left-[8%] -translate-x-1/2 -translate-y-1/2',
    2: 'top-[8%] left-[32%] -translate-x-1/2',
    3: 'top-[5%] left-1/2 -translate-x-1/2',
    4: 'top-[8%] right-[32%] translate-x-1/2',
    5: 'top-[38%] right-[8%] translate-x-1/2 -translate-y-1/2',
    6: 'bottom-[38%] right-[8%] translate-x-1/2 translate-y-1/2',
    7: 'bottom-[8%] right-[32%] translate-x-1/2',
    8: 'bottom-[5%] left-1/2 -translate-x-1/2', // Hero Seat
    9: 'bottom-[8%] left-[32%] -translate-x-1/2',
  };

  return (
    <section 
        className="w-full h-screen flex flex-col items-center justify-center p-2 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url('https://wc-h5.xpvcd046.com/resource/v8/games/holdem/styles/-default/assets/game/holdem_gameBg_3188f93ec3c1d8612736af02e16b4b87.webp')` }}
    >
        <div className="absolute top-4 left-4 text-left z-10">
            <h1 className="text-xl font-bold text-white drop-shadow-lg">{room.name}</h1>
            <p className="text-sm text-gray-300 drop-shadow-lg">{room.gameType} - Mức cược: {room.stakes}</p>
        </div>
        <button onClick={onLeaveTable} className="absolute top-4 right-4 flex items-center px-4 py-2 text-sm font-semibold text-white rounded-md bg-red-600/80 hover:bg-red-700 transition-colors duration-300 z-10 backdrop-blur-sm">
           <ExitIcon /> Rời Bàn
        </button>

        <div className="relative w-full max-w-7xl aspect-[16/9] scale-[0.95]">
            <img src="https://wc-h5.xpvcd046.com/resource/v8/games/holdem/styles/-default/assets/game/holdem_table_blue_f8e84fafbba0c1ade9792cf38bf9ae21.webp" 
                 alt="Poker Table" 
                 className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
            
            {players.map(player => (
                <PlayerSeat key={player.id} player={player} positionClass={seatPositions[player.seat]} isActive={activeSeat === player.seat} />
            ))}
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <p className="text-white font-bold text-lg mb-3 px-4 py-1 bg-black/50 rounded-full shadow-lg">Tẩy: <span className="text-brand-gold">${pot.toLocaleString()}</span></p>
                <div className="flex space-x-2">
                    {MOCK_COMMUNITY_CARDS.map((card, index) => (
                        <Card key={index} {...card} size="medium" />
                    ))}
                </div>
            </div>
        </div>

        {/* Action Controls */}
        <div className="absolute bottom-6 right-6 flex items-end space-x-3 z-10">
            { !heroHasFolded && (
            <div className="w-72 bg-black/50 border border-gray-700 rounded-lg p-3 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-bold text-lg">Cược: ${betAmount.toLocaleString()}</span>
                    <input 
                        type="number"
                        value={betAmount}
                        onChange={(e) => setBetAmount(parseInt(e.target.value, 10) || 0)}
                        className="w-28 bg-brand-dark text-white text-right font-mono p-1 rounded border border-gray-600 focus:ring-brand-gold focus:border-brand-gold disabled:cursor-not-allowed"
                        disabled={!isHeroTurn}
                    />
                </div>
                 <input
                    type="range"
                    min={minBet}
                    max={maxBet}
                    step="100"
                    value={betAmount}
                    onChange={(e) => setBetAmount(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-thumb disabled:cursor-not-allowed"
                    disabled={!isHeroTurn}
                />
                <div className="flex justify-between mt-2 space-x-2">
                     <button onClick={() => setBetAmount(Math.round(pot / 2))} className="flex-1 text-xs py-1 bg-gray-600 hover:bg-gray-500 rounded disabled:bg-gray-800 disabled:cursor-not-allowed" disabled={!isHeroTurn}>Nửa Tẩy</button>
                     <button onClick={() => setBetAmount(pot)} className="flex-1 text-xs py-1 bg-gray-600 hover:bg-gray-500 rounded disabled:bg-gray-800 disabled:cursor-not-allowed" disabled={!isHeroTurn}>Tẩy</button>
                     <button onClick={() => setBetAmount(maxBet)} className="flex-1 text-xs py-1 bg-red-700 hover:bg-red-600 rounded disabled:bg-gray-800 disabled:cursor-not-allowed" disabled={!isHeroTurn}>Tất Tay</button>
                </div>
            </div>
            )}
            <div className="flex flex-col space-y-2">
                <button onClick={handleFold} disabled={heroHasFolded || !isHeroTurn} className="px-8 py-3 font-bold text-white text-base uppercase tracking-wider bg-black/50 border-2 border-red-500 rounded-lg shadow-lg hover:bg-red-500/80 transition-all duration-300 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed">Bỏ Bài</button>
                <button disabled={heroHasFolded || !isHeroTurn} className="px-8 py-3 font-bold text-white text-base uppercase tracking-wider bg-black/50 border-2 border-gray-400 rounded-lg shadow-lg hover:bg-gray-500/80 transition-all duration-300 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed">Xem</button>
                <button onClick={handleBet} disabled={heroHasFolded || !isHeroTurn} className="px-8 py-3 font-bold text-brand-dark text-base uppercase tracking-wider bg-brand-gold border-2 border-brand-gold-dark rounded-lg shadow-gold hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">Cược</button>
            </div>
        </div>
    </section>
  );
};

export default PokerTable;
