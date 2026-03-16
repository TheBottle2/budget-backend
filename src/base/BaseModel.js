import mongoose from 'mongoose';

export const baseSchemaFields = {
  ad: {
    type:     String,
    required: [true, 'Ad alanı zorunludur'],
    trim:     true,
  },
  kisa_ad: {
    type:  String,
    trim:  true,
    index: true,
  },
  aciklama: {
    type: String,
    trim: true,
  },
  etiketler: {
    type:    [String],
    default: [],
  },
  aktif_mi: {
    type:    Boolean,
    default: true,
  },
  silindi_mi: {
    type:    Boolean,
    default: false,
    index:   true,
  },
};

export const baseSchemaOptions = {
  timestamps: {
    createdAt: 'olusturulma_tarihi',
    updatedAt: 'degistirilme_tarihi',
  },
};

// Soft delete'i otomatik filtreleyen yardımcı fonksiyon
export const addSoftDeleteFilter = (filter = {}) => ({
  ...filter,
  silindi_mi: false,
});