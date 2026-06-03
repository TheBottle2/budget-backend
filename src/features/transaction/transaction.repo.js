import { BaseRepo } from '../../base/BaseRepo.js';
import TransactionModel from './transaction.model.js';

const ALLOWED_SORT_FIELDS = ['tarih', 'tutar', 'kategori', 'ad', 'olusturulma_tarihi'];

export class TransactionRepo extends BaseRepo {
  constructor() {
    super(TransactionModel);
  }

  async getByKullanici({ kullanici_id, tur, kategori, sortBy = 'tarih', sortOrder = -1, page = 1, limit = 10 }) {
    const filter = { kullanici_id, silindi_mi: false };
    if (tur) filter.tur = tur;
    if (kategori) filter.kategori = kategori;

    const safeSortBy = ALLOWED_SORT_FIELDS.includes(sortBy) ? sortBy : 'tarih';
    const safeLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);
    const safePage = Math.max(Number(page) || 1, 1);
    const skip = (safePage - 1) * safeLimit;

    const [data, total] = await Promise.all([
      TransactionModel.find(filter).sort({ [safeSortBy]: sortOrder }).skip(skip).limit(safeLimit),
      TransactionModel.countDocuments(filter),
    ]);

    return { data, total, page: safePage, limit: safeLimit, totalPages: Math.ceil(total / safeLimit) };
  }

  async getByAy(kullanici_id, yil, ay) {
    const safeYil = String(yil).replace(/[^0-9]/g, '');
    const safeAy = String(ay).replace(/[^0-9]/g, '').padStart(2, '0');
    const startDate = new Date(`${safeYil}-${safeAy}-01T00:00:00.000Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    return await TransactionModel.find({
      kullanici_id,
      tarih: { $gte: startDate, $lt: endDate },
      silindi_mi: false,
    });
  }
}
