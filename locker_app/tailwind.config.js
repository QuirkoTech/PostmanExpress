/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            borderRadius: {
                max: "20px", // Max border radius
                mid: "12px", // Mid border radius
                low: "8px", // Low border radius
            },
            fontFamily: {
                barlow: ["Barlow", "sans-serif"],
            },
        },
    },
    plugins: [],
};
