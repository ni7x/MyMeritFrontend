
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {//te kolory sa tak zintwane XD sorry
        'main-bg-color': '#2c2d37',
        'secondary-bg-color': '#3a3b46',
        'main-lighter': '#737485',
        'main-lighter-2': '#555764',
        'main-darker': '#21222c',
        'main-font-color': '#fff',
        'main-border': '#6a6c76',
        'task-bck': '#434550',
        'task-lighter' : '#6b6d7d',
        'merit-credits-color' : '#f7d94b',
        'terminal-color' : '#3a3b46',
        'ide-color': '#34353f',
        'terminal-border': '#555764'
      },
    },

  },
  plugins: [],
}