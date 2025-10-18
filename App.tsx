import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Games from './components/Games';
import TournamentList from './components/TournamentList';
import WhyUs from './components/WhyUs';
import Footer from './components/Footer';
import Lobby from './components/Lobby';
import RoomList from './components/RoomList';
import PokerTable from './components/PokerTable';
import AuthModal from './components/AuthModal';
import type { LobbyOption, Room } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedLobby, setSelectedLobby] = useState<LobbyOption | null>(null);
  const [joinedRoom, setJoinedRoom] = useState<Room | null>(null);
  const [authModal, setAuthModal] = useState<{isOpen: boolean, mode: 'login' | 'register'}>({
    isOpen: false,
    mode: 'login'
  });


  const handleShowLogin = () => setAuthModal({ isOpen: true, mode: 'login' });
  const handleShowRegister = () => setAuthModal({ isOpen: true, mode: 'register' });
  const handleCloseAuthModal = () => setAuthModal({ isOpen: false, mode: 'login' });

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    handleCloseAuthModal();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedLobby(null);
    setJoinedRoom(null);
  };
  
  const handleLobbySelect = (lobby: LobbyOption) => {
    if (lobby.id === 'beginner' || lobby.id === 'vip') {
        setSelectedLobby(lobby);
    } else {
        alert("Sảnh thi đấu sẽ sớm ra mắt!");
    }
  };

  const handleBackToLobby = () => setSelectedLobby(null);
  const handleJoinRoom = (room: Room) => setJoinedRoom(room);
  const handleLeaveRoom = () => setJoinedRoom(null);

  const renderContent = () => {
    if (!isLoggedIn) {
      return (
        <>
          <Hero onRegister={handleShowRegister} />
          <Games />
          <TournamentList />
          <WhyUs />
        </>
      );
    }
    if (joinedRoom) {
      return <PokerTable room={joinedRoom} onLeaveTable={handleLeaveRoom} />;
    }
    if (selectedLobby) {
      return <RoomList lobby={selectedLobby} onBack={handleBackToLobby} onJoinRoom={handleJoinRoom} />;
    }
    return <Lobby onLobbySelect={handleLobbySelect} />;
  }

  const backgroundStyle = !isLoggedIn ? {
    backgroundImage: `url('https://wc-h5.xpvcd046.com/resource/v8/styles/-default/.main/assets/main_bg_e525716bec6eded9b42fda3c2846e34a.webp')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  } : {};

  return (
    <div 
      className="bg-brand-dark text-white font-sans min-h-screen"
      style={backgroundStyle}
    >
      <Header 
        isLoggedIn={isLoggedIn} 
        onShowLogin={handleShowLogin} 
        onShowRegister={handleShowRegister} 
        onLogout={handleLogout} 
      />
      <main>
        {renderContent()}
      </main>
      
      {!joinedRoom && <Footer />}

      <AuthModal 
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        onClose={handleCloseAuthModal}
        onSwitchMode={(mode) => setAuthModal(prev => ({...prev, mode}))}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default App;