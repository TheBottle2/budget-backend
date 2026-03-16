import jwt from 'jsonwebtoken';
import config from '../../core/config.js';
import { AuthRepo } from './auth.repo.js';
import { AuthManager } from './auth.manager.js';

const authManager = new AuthManager(new AuthRepo());

export const AuthService = {
  async register(data) {
    const kullanici = await authManager.register(data);
    const token = jwt.sign(
      { id: kullanici.id, rol: kullanici.rol },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );
    return { kullanici, token };
  },

  async login(data) {
    const kullanici = await authManager.login(data);
    const token = jwt.sign(
      { id: kullanici.id, rol: kullanici.rol },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );
    return { kullanici, token };
  },

  verifyToken(token) {
    return jwt.verify(token, config.jwt.secret);
  },
};