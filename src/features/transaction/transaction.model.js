import mongoose from 'mongoose';
import { baseSchemaFields, baseSchemaOptions } from '../../base/BaseModel.js';

const transactionSchema = new mongoose.Schema({
  ...baseSchemaFields,
  tutar: {
    type:     Number,
    required: [true, 'Tutar zorunludur'],
    min:      [0, 'Tutar 0\'dan küçük olamaz'],
  },
  tur: {
    type:     String,
    enum:     ['gelir', 'gider'],
    required: [true, 'Tür zorunludur'],
  },
  kategori: {
    type:     String,
    required: [true, 'Kategori zorunludur'],
  },
  tarih: {
    type:     String,
    required: [true, 'Tarih zorunludur'],
  },
  not: {
    type:    String,
    default: '',
  },
  kullanici_id: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'User',
    required: true,
    index:    true,
  },
}, baseSchemaOptions);

const TransactionModel = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
export default TransactionModel;