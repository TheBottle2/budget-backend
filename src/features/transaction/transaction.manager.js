import { BaseManager } from '../../base/BaseManager.js';

export class TransactionManager extends BaseManager {
  constructor(transactionRepo) {
    super(transactionRepo);
  }

  async kullanicininIslemleri(params) {
    return await this.repo.getByKullanici(params);
  }

  async islemEkle(kullanici_id, data) {
    const islemData = {
      ...data,
      kullanici_id,
      tarih: data.tarih ? new Date(data.tarih) : new Date(),
    };
    return await this.repo.create(islemData);
  }

  async islemGuncelle(id, kullanici_id, data) {
    const islem = await this.repo.getOne(id);
    if (!islem) throw new Error('İşlem bulunamadı!');
    if (islem.kullanici_id.toString() !== kullanici_id.toString()) {
      throw new Error('Bu işlemi düzenleme yetkiniz yok!');
    }
    const updateData = { ...data };
    if (updateData.tarih) updateData.tarih = new Date(updateData.tarih);
    return await this.repo.patch(id, updateData);
  }

  async islemSil(id, kullanici_id, rol) {
    const islem = await this.repo.getOne(id);
    if (!islem) throw new Error('İşlem bulunamadı!');
    if (rol !== 'admin' && islem.kullanici_id.toString() !== kullanici_id.toString()) {
      throw new Error('Bu işlemi silme yetkiniz yok!');
    }
    return await this.repo.softDelete(id);
  }
}
