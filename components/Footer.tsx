import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark/95 backdrop-blur-sm border-t border-brand-gray/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="text-3xl font-serif font-bold tracking-wider">
              <span className="text-white">DUBAI</span>
              <span className="text-brand-gold">79</span>
            </a>
            <p className="mt-4 text-sm text-gray-400">
              Điểm đến hàng đầu cho poker trực tuyến sang trọng.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Liên Kết Nhanh</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-base text-gray-400 hover:text-brand-gold">Trò Chơi</a></li>
              <li><a href="#" className="text-base text-gray-400 hover:text-brand-gold">Giải Đấu</a></li>
              <li><a href="#" className="text-base text-gray-400 hover:text-brand-gold">Khuyến Mãi</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Hỗ Trợ</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-base text-gray-400 hover:text-brand-gold">Câu Hỏi Thường Gặp</a></li>
              <li><a href="#" className="text-base text-gray-400 hover:text-brand-gold">Liên Hệ</a></li>
              <li><a href="#" className="text-base text-gray-400 hover:text-brand-gold">Chơi Công Bằng</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Pháp Lý</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-base text-gray-400 hover:text-brand-gold">Điều Khoản Dịch Vụ</a></li>
              <li><a href="#" className="text-base text-gray-400 hover:text-brand-gold">Chính Sách Bảo Mật</a></li>
              <li><a href="#" className="text-base text-gray-400 hover:text-brand-gold">Chơi Có Trách Nhiệm</a></li>
            </ul>
          </div>
          
        </div>

        <div className="mt-12 border-t border-brand-gray/50 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} DUBAI79. Bảo lưu mọi quyền.
          </p>
          {/* Social Icons would go here */}
          <div className="flex space-x-6 mt-4 md:mt-0">
             <p className="text-xs text-gray-600">Chỉ dành cho người chơi 18+. Vui lòng chơi có trách nhiệm.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;