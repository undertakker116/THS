module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            animation: {
                'cursor-blink': 'blink 1.5s steps(2, start) infinite',
                'slow-pulse': 'pulse 3s ease-in-out infinite',
            },
            keyframes: {
                blink: {
                    '0%, 50%': { opacity: 1 },
                    '50.01%, 100%': { opacity: 0 },
                },
            },
        },
    },
    plugins: [],
};
