import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Şifre en az 8 karakter olmalıdır')
  .regex(/[A-Z]/, 'Şifre en az bir büyük harf içermelidir')
  .regex(/[a-z]/, 'Şifre en az bir küçük harf içermelidir')
  .regex(/[0-9]/, 'Şifre en az bir rakam içermelidir')
  .regex(/[^A-Za-z0-9]/, 'Şifre en az bir özel karakter içermelidir');

export const RegisterDTO = z.object({
  ad: z.string().min(2, 'Ad en az 2 karakter olmalıdır').max(50),
  email: z.string().email('Geçersiz e-posta formatı').toLowerCase().trim(),
  sifre: passwordSchema,
});

export const LoginDTO = z.object({
  email: z.string().email('Geçersiz e-posta formatı').toLowerCase().trim(),
  sifre: z.string().min(1, 'Şifre boş olamaz'),
});

export const toUserResponseDTO = (user) => ({
  id: user._id,
  ad: user.ad,
  email: user.email,
  rol: user.rol,
  olusturulma_tarihi: user.olusturulma_tarihi,
});
