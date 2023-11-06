/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                dark: {
                    // For background colours
                    main: '#181718',
                    secondary: '#222124',
                },
                danger: '#C55B5B',
                status: {
                    // For status colours
                    green: '#00FF47',
                    blue: '#000AFF',
                    orange: '#FF9900',
                    white: '#FFFFFF',
                    yellow: '#EBFF00',
                    gray: '#9A9A9A',
                },
                green: {
                    main: '#376F40',
                    active: '#34844A',
                },
                slate: {
                    gray: '#CDCDCD', // For main text colour
                    blue: '#374D6F', // For borders
                },
            },
            borderRadius: {
                max: '20px', // Max border radius
                mid: '12px', // Mid border radius
                low: '8px', // Low border radius
            },
            fontFamily: {
                barlow: ['Barlow', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
