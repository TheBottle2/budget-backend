import { NextResponse } from 'next/server';
import { AuthService } from '../features/auth/auth.service.js';

export const yetkiKontrol = (request, roller = []) => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { hata: NextResponse.json({ mesaj: 'Yetkisiz erişim!' }, { status: 401 }) };
  }

  const token = authHeader.split(' ')[1];
  try {
    const kullanici = AuthService.verifyToken(token);
    if (roller.length > 0 && !roller.includes(kullanici.rol)) {
      return { hata: NextResponse.json({ mesaj: 'Bu işlem için yetkiniz yok!' }, { status: 403 }) };
    }
    return { kullanici };
  } catch {
    return { hata: NextResponse.json({ mesaj: 'Geçersiz token!' }, { status: 401 }) };
  }
};