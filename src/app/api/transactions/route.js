import { NextResponse } from 'next/server';
import { connectDB } from '../../../core/db.js';
import { yetkiKontrol } from '../../../core/withAuth.js';
import { TransactionService } from '../../../features/transaction/transaction.service.js';
import { TransactionCreateDTO } from '../../../features/transaction/transaction.dto.js';
import { handleApiError } from '../../../lib/errorHandler.js';

export async function GET(request) {
  try {
    await connectDB();
    const { kullanici, hata } = yetkiKontrol(request);
    if (hata) return hata;

    const { searchParams } = new URL(request.url);
    const params = {
      kullanici_id: kullanici.id,
      tur: searchParams.get('tur') || undefined,
      kategori: searchParams.get('kategori') || undefined,
      sortBy: searchParams.get('sortBy') || 'tarih',
      sortOrder: searchParams.get('sortOrder') === 'asc' ? 1 : -1,
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 10,
    };

    const result = await TransactionService.getIslemler(params);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const { status, body } = handleApiError(error);
    return NextResponse.json(body, { status });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const { kullanici, hata } = yetkiKontrol(request);
    if (hata) return hata;

    const body = await request.json();
    const validatedData = TransactionCreateDTO.parse(body);
    const islem = await TransactionService.addIslem(kullanici.id, validatedData);

    return NextResponse.json(islem, { status: 201 });
  } catch (error) {
    const { status, body } = handleApiError(error);
    return NextResponse.json(body, { status });
  }
}
