const PORT = Number(process.env.PORT) || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/url_short';
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

module.exports = {
  PORT,
  MONGO_URI,
  BASE_URL,
};
