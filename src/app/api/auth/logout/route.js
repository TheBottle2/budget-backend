import { NextResponse } from 'next/server';

export async function POST() {
  // JWT stateless — sunucu token'ı tutmaz, istemci siler
  return NextResponse.json({ mesaj: 'Başarıyla çıkış yapıldı.' }, { status: 200 });
}