import { NextResponse } from 'next/server';
import { connectDB } from '../../../../core/db.js';
import { yetkiKontrol } from '../../../../core/withAuth.js';
import { TransactionService } from '../../../../features/transaction/transaction.service.js';
import { TransactionPatchDTO } from '../../../../features/transaction/transaction.dto.js';
import { handleApiError } from '../../../../lib/errorHandler.js';

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { kullanici, hata } = yetkiKontrol(request);
    if (hata) return hata;

    const { id } = await params;
    const body = await request.json();
    const validatedData = TransactionPatchDTO.parse(body);
    const islem = await TransactionService.patchIslem(id, kullanici.id, validatedData);

    return NextResponse.json(islem, { status: 200 });
  } catch (error) {
    const { status, body } = handleApiError(error);
    return NextResponse.json(body, { status });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { kullanici, hata } = yetkiKontrol(request);
    if (hata) return hata;

    const { id } = await params;

    await TransactionService.deleteIslem(id, kullanici.id, kullanici.rol);
    return NextResponse.json({ mesaj: 'İşlem silindi.' }, { status: 200 });
  } catch (error) {
    const { status, body } = handleApiError(error);
    return NextResponse.json(body, { status });
  }
}
