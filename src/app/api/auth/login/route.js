import { NextResponse } from 'next/server';
import { connectDB }    from '../../../../core/db.js';
import { AuthService }  from '../../../../features/auth/auth.service.js';
import { LoginDTO }     from '../../../../features/auth/auth.dto.js';

export async function POST(request) {
  try {
    await connectDB();
    const body          = await request.json();
    const validatedData = LoginDTO.parse(body);
    const result        = await AuthService.login(validatedData);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ hatalar: error.errors }, { status: 400 });
    }
    return NextResponse.json({ mesaj: error.message }, { status: 401 });
  }
}