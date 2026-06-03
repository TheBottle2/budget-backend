const knownErrors = [
  'Bu e-posta adresi zaten kayıtlı!',
  'E-posta veya şifre hatalı!',
  'Bu işlem için yetkiniz yok!',
  'İşlem bulunamadı!',
  'Geçersiz token!',
  'Yetkisiz erişim!',
];

export function handleApiError(error) {
  console.error('[API Error]', error);

  if (error.name === 'ZodError') {
    return { status: 400, body: { hatalar: error.errors } };
  }

  if (knownErrors.includes(error.message)) {
    return { status: 400, body: { mesaj: error.message } };
  }

  return {
    status: 500,
    body: { mesaj: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.' },
  };
}
