import React, { useState } from 'react';

interface FormData {
    email: string;
    password: string;
}

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: FormData) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [loginLabel, setLoginLabel] = useState("Login");

    const handleLoginClick = () => {
        setLoginLabel("Email or Password is incorrect");
        setTimeout(() => {
            setLoginLabel("Login");
        }, 3000);
    };

    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        email: false,
        password: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: false }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setErrors({
            email: true,
            password: true
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="relative z-10 w-full max-w-md bg-gray-800/80 backdrop-blur-md rounded-xl shadow-2xl border border-green-900/30 p-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-400">Sign In</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-400">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full mt-1 px-4 py-2 text-gray-400 bg-gray-700/50 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none`}
                            placeholder="littlewickedsnake@hiss.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full mt-1 mb-4 px-4 py-2 text-gray-400 bg-gray-700/50 border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none`}
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        onClick={handleLoginClick}
                        className="w-full py-2 px-4 font-bold text-gray-900 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg hover:from-green-500 hover:to-blue-500 transition-all duration-300"
                    >
                        {loginLabel}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;
