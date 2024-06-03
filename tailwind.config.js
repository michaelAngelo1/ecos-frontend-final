/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        green: '#387d4e',
        orange: '81cd2d',
        blue: '#0057ff',
        white: '#f1f1f1',
        black: '#323232'
      },
      fontFamily: {
        montserratregular: ["Montserrat-Regular", "sans-serif"],
        montserratmedium: ["Montserrat-Medium", "sans-serif"],
        montserratsemibold: ["Montserrat-SemiBold", "sans-serif"],
        montserratbold: ["Montserrat-Bold", "sans-serif"],
      }
    },
  },
  plugins: [],
}

