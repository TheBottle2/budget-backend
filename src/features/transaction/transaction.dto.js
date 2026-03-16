import { z } from 'zod';

export const TransactionCreateDTO = z.object({
  ad:       z.string().min(1, 'Başlık zorunludur'),
  tutar:    z.number().positive('Tutar 0\'dan büyük olmalıdır'),
  tur:      z.enum(['gelir', 'gider']),
  kategori: z.string().min(1, 'Kategori zorunludur'),
  tarih:    z.string().min(1, 'Tarih zorunludur'),
  not:      z.string().optional(),
});

export const TransactionPatchDTO = z.object({
  ad:       z.string().min(1).optional(),
  tutar:    z.number().positive().optional(),
  tur:      z.enum(['gelir', 'gider']).optional(),
  kategori: z.string().min(1).optional(),
  tarih:    z.string().optional(),
  not:      z.string().optional(),
});