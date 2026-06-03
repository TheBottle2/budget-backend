import { NextResponse } from 'next/server';
import { connectDB } from '../../../../core/db.js';
import { AuthService } from '../../../../features/auth/auth.service.js';
import { RegisterDTO } from '../../../../features/auth/auth.dto.js';
import { handleApiError } from '../../../../lib/errorHandler.js';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const validatedData = RegisterDTO.parse(body);
    const result = await AuthService.register(validatedData);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const { status, body } = handleApiError(error);
    return NextResponse.json(body, { status });
  }
}
