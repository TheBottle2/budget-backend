import mongoose from 'mongoose';

const knownErrors = {
  'Bu e-posta adresi zaten kayıtlı!': 409,
  'E-posta veya şifre hatalı!': 401,
  'Bu işlemi düzenleme yetkiniz yok!': 403,
  'Bu işlemi silme yetkiniz yok!': 403,
  'İşlem bulunamadı!': 404,
  'Kayıt bulunamadı!': 404,
  'Geçersiz token!': 401,
  'Yetkisiz erişim!': 401,
  'Bu işlem için yetkiniz yok!': 403,
};

export function handleApiError(error) {
  if (process.env.NODE_ENV !== 'test') {
    console.error('[API Error]', error.message || error);
  }

  if (error.name === 'ZodError') {
    return { status: 400, body: { hatalar: error.errors } };
  }

  if (error.name === 'CastError' || error.kind === 'ObjectId') {
    return { status: 400, body: { mesaj: 'Geçersiz ID formatı!' } };
  }

  if (error.code === 11000) {
    return { status: 409, body: { mesaj: 'Bu kayıt zaten mevcut!' } };
  }

  if (error instanceof SyntaxError && error.status === 400) {
    return { status: 400, body: { mesaj: 'Geçersiz JSON formatı!' } };
  }

  if (knownErrors[error.message] !== undefined) {
    return { status: knownErrors[error.message], body: { mesaj: error.message } };
  }

  return {
    status: 500,
    body: { mesaj: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.' },
  };
}
