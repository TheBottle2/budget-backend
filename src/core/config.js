const config = {
  mongodb: {
    uri: process.env.MONGODB_URI,
  },
  jwt: {
    secret:     process.env.JWT_SECRET,
    expiresIn:  '7d',
  },
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
  },
};

// Zorunlu değişkenleri kontrol et
const zorunluDegiskenler = ['MONGODB_URI', 'JWT_SECRET'];

zorunluDegiskenler.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Zorunlu ortam değişkeni eksik: ${key}`);
  }
});

export default config;