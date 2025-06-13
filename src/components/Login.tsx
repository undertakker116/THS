import React from 'react';

const Login: React.FC = () => {
    return (
        <section className="text-center text-gray-400 mt-6">
            <p className="pt-2 text-xl inline-flex items-center gap-2 justify-center">
                Authorization service under development
                <svg
                    className="w-6 h-6 animate-spin text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M11.3 1.046a1 1 0 00-2.6 0l-.2.81a7.974 7.974 0 00-2.516.936l-.63-.63a1 1 0 00-1.414 1.414l.63.63a7.974 7.974 0 00-.936 2.516l-.81.2a1 1 0 000 2.6l.81.2a7.974 7.974 0 00.936 2.516l-.63.63a1 1 0 001.414 1.414l.63-.63a7.974 7.974 0 002.516.936l.2.81a1 1 0 002.6 0l.2-.81a7.974 7.974 0 002.516-.936l.63.63a1 1 0 001.414-1.414l-.63-.63a7.974 7.974 0 00.936-2.516l.81-.2a1 1 0 000-2.6l-.81-.2a7.974 7.974 0 00-.936-2.516l.63-.63a1 1 0 00-1.414-1.414l-.63.63a7.974 7.974 0 00-2.516-.936l-.2-.81zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                    />
                </svg>
            </p>
        </section>
    );
};

export default Login;
