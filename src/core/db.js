import mongoose from 'mongoose';
import config from './config.js';

console.log('[DB] MONGODB_URI:', config.mongodb.uri);

if (!config.mongodb.uri) {
  throw new Error('MONGODB_URI ortam değişkeni tanımlanmamış!');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    console.log('[DB] MongoDB bağlantısı başlatılıyor...');
    const options = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      ...(config.app.nodeEnv === 'production' && {
        tls: true,
        tlsAllowInvalidCertificates: false,
      }),
    };
    cached.promise = mongoose.connect(config.mongodb.uri, options)
      .then(() => console.log('[DB] MongoDB bağlantısı başarılı!'))
      .catch(err => {
        console.error('[DB] MongoDB bağlantı HATASI:', err.message);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
