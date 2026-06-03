import mongoose from 'mongoose';
import { baseSchemaFields, baseSchemaOptions } from '../../base/BaseModel.js';

const transactionSchema = new mongoose.Schema({
  ...baseSchemaFields,
  tutar: {
    type: Number,
    required: [true, 'Tutar zorunludur'],
    min: [0.01, 'Tutar 0\'dan büyük olmalıdır'],
  },
  tur: {
    type: String,
    enum: ['gelir', 'gider'],
    required: [true, 'Tür zorunludur'],
  },
  kategori: {
    type: String,
    required: [true, 'Kategori zorunludur'],
    trim: true,
  },
  tarih: {
    type: Date,
    required: [true, 'Tarih zorunludur'],
    index: true,
  },
  not: {
    type: String,
    default: '',
    maxlength: 500,
  },
  kullanici_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
}, baseSchemaOptions);

transactionSchema.index({ kullanici_id: 1, silindi_mi: 1 });

const TransactionModel = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
export default TransactionModel;
