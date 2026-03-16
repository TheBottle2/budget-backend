import { TransactionRepo }    from './transaction.repo.js';
import { TransactionManager } from './transaction.manager.js';

const transactionManager = new TransactionManager(new TransactionRepo());

export const TransactionService = {
  async getIslemler(params) {
    return await transactionManager.kullanicininIslemleri(params);
  },

  async addIslem(kullanici_id, data) {
    return await transactionManager.islemEkle(kullanici_id, data);
  },

  async patchIslem(id, kullanici_id, data) {
    return await transactionManager.islemGuncelle(id, kullanici_id, data);
  },

  async deleteIslem(id, kullanici_id, rol) {
    return await transactionManager.islemSil(id, kullanici_id, rol);
  },
};