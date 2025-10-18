import React from 'react';

interface HeroProps {
  onRegister: () => void;
}

const Hero: React.FC<HeroProps> = ({ onRegister }) => {
  return (
    <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* The background is now inherited from App.tsx's style */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      <div className="relative z-10 p-8">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-serif uppercase tracking-wider leading-tight">
          <span className="text-brand-gold drop-shadow-lg">Đẳng Cấp</span>
          <br />
          <span className="text-white drop-shadow-md">Thượng Lưu</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
          Trải nghiệm đỉnh cao của poker trực tuyến. Nơi sự sang trọng gặp gỡ di sản, và các nhà vô địch được tạo nên.
        </p>
        <div className="mt-10">
          <button
            onClick={onRegister}
            className="inline-block bg-brand-gold text-brand-dark font-bold text-lg px-12 py-4 rounded-full uppercase tracking-widest
                       transform hover:scale-105 hover:bg-brand-gold-dark transition-all duration-300 shadow-gold"
          >
            Chơi Ngay
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;