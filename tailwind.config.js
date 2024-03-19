export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-bg-color": "#2c2d37",
        "secondary-bg-color": "#3a3b46",
        "main-lighter": "#737485",
        "main-lighter-2": "#555764",
        "main-darker": "#21222c",
        "main-font-color": "#fff",
        "main-border": "#6a6c76",
        "task-bck": "#434550",
        "task-lighter": "#8c8f9f",
        "merit-credits-color": "#ffcc00",
        "terminal-color": "#3a3b46",
      },
      screens: {
        xlg: "1440px",
      },
    },
  },
  plugins: [],
};
