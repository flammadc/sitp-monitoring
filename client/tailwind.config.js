module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-blue": "#0D8BFF",
        "border-main-color": "#DCDBDB",
        "border-sec-color": "#DBDBDB",
        "font-sec": "#404557",
        "thead-color": "#143894",
        "white-sec": "#F7F7FC",
        "thead-text": "#5550bd",
        "overlay-color": "rgba(50,50,50,0.3)",
        struktur: "rgba(64, 69, 87, 0.7)",
      },
      backgroundImage: {
        "box-tahun":
          "linear-gradient(180deg, #6100FF 0%, rgba(194, 204, 237, 0.97) 100%)",
        "box-bulan":
          "linear-gradient(360deg, #F8D0FF 0%, #FA04FF 87.51%, #FA03FF 89.37%, #FA00FF 89.38%, #FA00FF 89.38%)",
      },
      height: {
        87: "87vh",
        120: "120px",
        "chart-container": "50vh",
        "box-container": "10vh",
      },

      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Lato: ["Lato", "sans-serif"],
        Mulish: ["Mulish", "sans-serif"],
        Quicksand: ["Quicksand", "sans-serif"],
        Opensans: ["Open Sans", "sans-serif"],
      },
      translate: {
        "50-": "-50%",
      },
    },
  },
  plugins: [],
};
