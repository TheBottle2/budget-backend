import { BaseRepo } from '../../base/BaseRepo.js';
import TransactionModel from './transaction.model.js';

export class TransactionRepo extends BaseRepo {
  constructor() {
    super(TransactionModel);
  }

  async getByKullanici({ kullanici_id, tur, kategori, sortBy = 'tarih', sortOrder = -1, page = 1, limit = 10 }) {
    const filter = { kullanici_id, silindi_mi: false };
    if (tur)      filter.tur      = tur;
    if (kategori) filter.kategori = kategori;

    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      TransactionModel.find(filter).sort({ [sortBy]: sortOrder }).skip(skip).limit(Number(limit)),
      TransactionModel.countDocuments(filter),
    ]);

    return { data, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) };
  }

  async getByAy(kullanici_id, yil, ay) {
    const ayStr   = String(ay).padStart(2, '0');
    const pattern = `${yil}-${ayStr}`;
    return await TransactionModel.find({
      kullanici_id,
      tarih:      { $regex: `^${pattern}` },
      silindi_mi: false,
    });
  }
}