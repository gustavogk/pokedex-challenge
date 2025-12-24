// vite.config.js
export default {
  base:
    process.env.NODE_ENV === "production"
      ? "/pokedex-challenge/" // ⚠️ SUBSTITUA pelo nome do SEU repositório
      : "/",
  server: {
    host: true,
  },
};
