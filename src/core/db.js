import mongoose from 'mongoose';
import config from './config.js';

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
    const options = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      ...(config.app.nodeEnv === 'production' && {
        tls: true,
        tlsAllowInvalidCertificates: false,
      }),
    };
    cached.promise = mongoose.connect(config.mongodb.uri, options);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
