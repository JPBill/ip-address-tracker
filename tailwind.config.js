module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
  theme: {
    fontFamily: {
      rubik: ["Rubik", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        header: "url('./assets/images/pattern-bg-desktop.png')",
      },
      colors: {
        verydarkgray: "#2b2b2b",
        darkgray: "#969696",
      },
    },
  },
  plugins: [],
};
