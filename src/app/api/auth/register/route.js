import { NextResponse } from 'next/server';
import { connectDB } from '../../../../core/db.js';
import { AuthService } from '../../../../features/auth/auth.service.js';
import { RegisterDTO } from '../../../../features/auth/auth.dto.js';
import { handleApiError } from '../../../../lib/errorHandler.js';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    console.log('[REGISTER] Gelen istek:', JSON.stringify({ ...body, sifre: '[HIDDEN]' }));
    const validatedData = RegisterDTO.parse(body);
    console.log('[REGISTER] Doğrulanan veri:', JSON.stringify({ ...validatedData, sifre: '[HIDDEN]' }));
    const result = await AuthService.register(validatedData);
    console.log('[REGISTER] Başarılı:', result.kullanici.email);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('[REGISTER] HATA:', error.message, error.stack);
    const { status, body } = handleApiError(error);
    return NextResponse.json(body, { status });
  }
}
