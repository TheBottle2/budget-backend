import { z } from 'zod';

const sanitize = (str) => str.replace(/[<>'"&]/g, (c) => ({
  '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;', '&': '&amp;',
}[c]));

export const TransactionCreateDTO = z.object({
  ad: z.string().min(1, 'Başlık zorunludur').max(100).transform(sanitize),
  tutar: z.number().positive('Tutar 0\'dan büyük olmalıdır'),
  tur: z.enum(['gelir', 'gider']),
  kategori: z.string().min(1, 'Kategori zorunludur').max(50).transform(sanitize),
  tarih: z.string().min(1, 'Tarih zorunludur').regex(/^\d{4}-\d{2}-\d{2}$/, 'Tarih YYYY-AA-GG formatında olmalıdır'),
  not: z.string().max(500, 'Not en fazla 500 karakter olabilir').optional().transform((v) => v ? sanitize(v) : ''),
});

export const TransactionPatchDTO = z.object({
  ad: z.string().min(1).max(100).optional().transform((v) => v ? sanitize(v) : v),
  tutar: z.number().positive().optional(),
  tur: z.enum(['gelir', 'gider']).optional(),
  kategori: z.string().min(1).max(50).optional().transform((v) => v ? sanitize(v) : v),
  tarih: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Tarih YYYY-AA-GG formatında olmalıdır').optional(),
  not: z.string().max(500).optional().transform((v) => v ? sanitize(v) : v),
});
