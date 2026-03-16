import { BaseManager } from '../../base/BaseManager.js';

export class TransactionManager extends BaseManager {
  constructor(transactionRepo) {
    super(transactionRepo);
  }

  async kullanicininIslemleri(params) {
    return await this.repo.getByKullanici(params);
  }

  async islemEkle(kullanici_id, data) {
    return await this.repo.create({ ...data, kullanici_id });
  }

  async islemGuncelle(id, kullanici_id, data) {
    const islem = await this.repo.getOne(id);
    if (!islem) throw new Error('İşlem bulunamadı!');
    if (islem.kullanici_id.toString() !== kullanici_id.toString()) {
      throw new Error('Bu işlemi düzenleme yetkiniz yok!');
    }
    return await this.repo.patch(id, data);
  }

  async islemSil(id, kullanici_id, rol) {
    const islem = await this.repo.getOne(id);
    if (!islem) throw new Error('İşlem bulunamadı!');
    if (rol !== 'admin' && islem.kullanici_id.toString() !== kullanici_id.toString()) {
      throw new Error('Bu işlemi silme yetkiniz yok!');
    }
    return await this.repo.softDelete(id);
  }

  ozetHesapla(islemler) {
    const gelir = islemler.filter((t) => t.tur === 'gelir').reduce((acc, t) => acc + t.tutar, 0);
    const gider = islemler.filter((t) => t.tur === 'gider').reduce((acc, t) => acc + t.tutar, 0);
    return { gelir, gider, bakiye: gelir - gider };
  }
}