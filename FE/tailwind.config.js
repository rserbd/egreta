module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      primary: "Hind Siliguri",
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        lg: "30px",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1170px",
    },
    extend: {
      colors: {
        dark: "#000000",
        light: "#BDBDBD",
        accent: "#000000",
        accentHover: "#808080",
        grey: "#F5F5F5",
      },
    },
  },
  plugins: [],
};
