import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Verifica os arquivos da pasta app
    './components/**/*.{js,ts,jsx,tsx}', // Verifica arquivos da pasta components
    './pages/**/*.{js,ts,jsx,tsx}', // Inclui pages também
    './public/**/*.html', // Verifica conteúdo em arquivos públicos
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a',
        secondary: '#9333ea',
      },
    },
  },
  plugins: [],
};

export default config;
