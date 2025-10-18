import React from 'react';
import type { Game, Tournament, Feature, LobbyOption, Room } from './types';

// Icons using Heroicons syntax
const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-brand-gold">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM18 13.5a3.375 3.375 0 00-3.375-3.375h-.008a3.375 3.375 0 00-3.375 3.375v.008a3.375 3.375 0 003.375 3.375h.008a3.375 3.375 0 003.375-3.375v-.008z" />
    </svg>
);

const TrophyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-brand-gold">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 011.316-5.033L12 5.25l4.184 8.467a9.75 9.75 0 011.316 5.033z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a9 9 0 00-9 0m9 0a9 9 0 01-9 0m9 0v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V18.75m-9-4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18.75m14.25-4.875c0-.621-.504-1.125-1.125-1.125h-2.25c-.621 0-1.125.504-1.125 1.125V18.75" />
    </svg>
);

const ShieldCheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-brand-gold">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
    </svg>
);

const CubeTransparentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-brand-gold">
       <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
);

const GraduationCapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-brand-gold">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l15.482 0m-15.482 0a50.57 50.57 0 01-2.658-.813m2.658.814a60.437 60.437 0 01-2.122 6.732" />
    </svg>
);

const CrownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-brand-gold">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 018.638 5.214l2.12-2.122a.5.5 0 01.708 0l2.12 2.122zM12 6a3.75 3.75 0 110-7.5 3.75 3.75 0 010 7.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M12 21v-3.375c0-.621-.504-1.125-1.125-1.125H8.625c-.621 0-1.125.504-1.125 1.125V21" />
    </svg>
);


export const GAMES: Game[] = [
    {
        name: "Texas Hold'em",
        description: "Trò chơi kinh điển. Hai lá bài riêng, năm lá bài chung. Chinh phục vòng river và gom tẩy.",
        icon: <SparklesIcon />,
    },
    {
        name: "Pot Limit Omaha",
        description: "Bốn lá bài riêng, hành động đỉnh cao. Trò chơi của những tay bài lớn và những cú hốt đậm.",
        icon: <TrophyIcon />,
    },
    {
        name: "Short Deck",
        description: "Một biến thể hiện đại với bộ bài 36 lá. Nhiều hành động hơn, bài lớn hơn, và cảm giác mạnh không ngừng.",
        icon: <CubeTransparentIcon />,
    },
];

export const TOURNAMENTS: Tournament[] = [
    {
        name: "The Dubai Dazzler",
        prizePool: "25 Tỷ",
        buyIn: "25 Triệu",
        startTime: "Hôm nay, 8:00 Tối",
        status: 'Upcoming'
    },
    {
        name: "Midnight Millions",
        prizePool: "12.5 Tỷ",
        buyIn: "12.5 Triệu",
        startTime: "Hôm nay, 11:00 Tối",
        status: 'Upcoming'
    },
    {
        name: "The Oasis Weekly",
        prizePool: "6 Tỷ",
        buyIn: "5 Triệu",
        startTime: "Đang diễn ra",
        status: 'Live'
    },
    {
        name: "Sands of Fortune",
        prizePool: "3.5 Tỷ",
        buyIn: "2.5 Triệu",
        startTime: "Hôm qua",
        status: 'Finished'
    },
];


export const FEATURES: Feature[] = [
    {
        title: "Đảm Bảo Công Bằng",
        description: "Hệ thống chia bài ngẫu nhiên (RNG) được chứng nhận và các biện pháp chống gian lận đảm bảo một môi trường công bằng.",
        icon: <ShieldCheckIcon />,
    },
    {
        title: "Giải Đấu Đỉnh Cao",
        description: "Tranh tài trong các giải đấu hàng ngày, hàng tuần và các sự kiện lớn với tổng giải thưởng khổng lồ.",
        icon: <TrophyIcon />,
    },
    {
        title: "Trải Nghiệm Mượt Mà",
        description: "Tận hưởng giao diện đẹp mắt, trực quan trên mọi thiết bị—máy tính hoặc di động—cho trải nghiệm poker đỉnh cao.",
        icon: <CubeTransparentIcon />,
    },
    {
        title: "Đặc Quyền VIP",
        description: "Đội ngũ hỗ trợ tận tâm và chương trình phần thưởng độc quyền khiến mọi người chơi đều cảm thấy như một tay chơi lớn.",
        icon: <SparklesIcon />,
    },
];

export const LOBBY_OPTIONS: LobbyOption[] = [
    {
        id: "beginner",
        title: "Tập sự",
        description: "Nơi hoàn hảo để mài giũa kỹ năng, chơi với mức cược thấp và tận hưởng niềm vui.",
        icon: <GraduationCapIcon />,
        cta: "Vào Bàn",
    },
    {
        id: "vip",
        title: "VIP",
        description: "Dành cho các tay chơi đẳng cấp. Trải nghiệm giới hạn cược cao và các đặc quyền độc quyền.",
        icon: <CrownIcon />,
        cta: "Vào Sảnh VIP",
    },
    {
        id: "tournament",
        title: "Thi đấu",
        description: "Tranh tài trong các giải đấu lớn, đối đầu với những người giỏi nhất để giành vinh quang và giải thưởng lớn.",
        icon: <TrophyIcon />,
        cta: "Xem Giải Đấu",
    },
];

export const BEGINNER_ROOMS: Room[] = [
    { id: 'b1', name: 'Bàn Tập Sự 1', stakes: '100/200', gameType: "No-Limit Hold'em", players: 4, maxPlayers: 9 },
    { id: 'b2', name: 'Bàn Tập Sự 2', stakes: '100/200', gameType: "No-Limit Hold'em", players: 7, maxPlayers: 9 },
    { id: 'b3', name: 'Tẩy Nhẹ 1', stakes: '200/400', gameType: "No-Limit Hold'em", players: 9, maxPlayers: 9 },
    { id: 'b4', name: 'Tẩy Nhẹ 2', stakes: '200/400', gameType: "No-Limit Hold'em", players: 3, maxPlayers: 6 },
    { id: 'b5', name: 'Omaha Vui Vẻ', stakes: '100/200', gameType: "Pot-Limit Omaha", players: 5, maxPlayers: 6 },
];

export const VIP_ROOMS: Room[] = [
    { id: 'v1', name: 'Thiên Đường VIP', stakes: '10K/20K', gameType: "No-Limit Hold'em", players: 5, maxPlayers: 6 },
    { id: 'v2', name: 'The Penthouse', stakes: '10K/20K', gameType: "No-Limit Hold'em", players: 3, maxPlayers: 6 },
    { id: 'v3', name: 'Đại Gia Hội Tụ', stakes: '25K/50K', gameType: "No-Limit Hold'em", players: 6, maxPlayers: 6 },
    { id: 'v4', name: 'Omaha Đỉnh Cao', stakes: '25K/50K', gameType: "Pot-Limit Omaha", players: 4, maxPlayers: 6 },
];