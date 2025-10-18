import React, { useState, useEffect } from 'react';

interface AuthModalProps {
    isOpen: boolean;
    mode: 'login' | 'register';
    onClose: () => void;
    onSwitchMode: (mode: 'login' | 'register') => void;
    onAuthSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, mode, onClose, onSwitchMode, onAuthSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const isLoginMode = mode === 'login';

    useEffect(() => {
        if (isOpen) {
            // Reset form fields when modal opens or mode changes
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setError('');
        }
    }, [isOpen, mode]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (isLoginMode) {
            if (username === '1' && password === '1') {
                onAuthSuccess();
            } else {
                setError('Tên đăng nhập hoặc mật khẩu không đúng.');
            }
        } else {
            // Basic registration validation
            if (!username || !password) {
                setError('Vui lòng điền đầy đủ thông tin.');
                return;
            }
            if (password !== confirmPassword) {
                setError('Mật khẩu xác nhận không khớp.');
                return;
            }
            // Simulate successful registration
            console.log('Registered with:', { username, password });
            onAuthSuccess();
        }
    };


    return (
        <div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                className="relative bg-brand-gray border border-brand-gold/20 rounded-lg shadow-gold-lg p-8 w-full max-w-md m-4 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
                onClick={(e) => e.stopPropagation()}
                style={{animation: 'fade-in-scale 0.3s forwards'}}
            >
                <style>{`
                    @keyframes fade-in-scale {
                        from { opacity: 0; transform: scale(0.95); }
                        to { opacity: 1; transform: scale(1); }
                    }
                `}</style>

                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="text-center mb-6">
                     <h2 className="text-3xl font-serif font-bold text-white">{isLoginMode ? 'Đăng Nhập' : 'Tạo Tài Khoản'}</h2>
                     <p className="text-gray-400 mt-2">{isLoginMode ? 'Chào mừng trở lại!' : 'Bắt đầu hành trình của bạn với chúng tôi.'}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                            {isLoginMode ? 'Tên đăng nhập' : 'Tên đăng nhập'}
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="mt-1 block w-full bg-brand-dark border border-brand-gray rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
                            placeholder={isLoginMode ? 'Nhập "1"' : 'Tên tài khoản của bạn'}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full bg-brand-dark border border-brand-gray rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
                            placeholder={isLoginMode ? 'Nhập "1"' : '••••••••'}
                        />
                    </div>
                    {!isLoginMode && (
                         <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Xác nhận Mật khẩu</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="mt-1 block w-full bg-brand-dark border border-brand-gray rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
                                placeholder="••••••••"
                            />
                        </div>
                    )}
                    
                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                    <div className="pt-2">
                        <button type="submit" className="w-full bg-brand-gold text-brand-dark font-bold py-3 px-4 rounded-md hover:bg-brand-gold-dark transition-colors duration-300 shadow-gold-sm">
                            {isLoginMode ? 'Đăng Nhập' : 'Đăng Ký'}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-400">
                        {isLoginMode ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
                        <button 
                            onClick={() => onSwitchMode(isLoginMode ? 'register' : 'login')}
                            className="font-medium text-brand-gold hover:text-brand-gold-dark underline"
                        >
                            {isLoginMode ? 'Đăng ký ngay' : 'Đăng nhập'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;