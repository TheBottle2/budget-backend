import { z } from 'zod';

export const RegisterDTO = z.object({
  ad:    z.string().min(2, 'Ad en az 2 karakter olmalıdır'),
  email: z.string().email('Geçersiz e-posta formatı'),
  sifre: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
});

export const LoginDTO = z.object({
  email: z.string().email('Geçersiz e-posta formatı'),
  sifre: z.string().min(1, 'Şifre boş olamaz'),
});

export const toUserResponseDTO = (user) => ({
  id:                 user._id,
  ad:                 user.ad,
  email:              user.email,
  rol:                user.rol,
  olusturulma_tarihi: user.olusturulma_tarihi,
});