import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET() {
  const secret = process.env.CUBEJS_API_SECRET;

  console.log('[CubeJS Token] Secret:', secret ? '✅ Loaded' : '❌ Not Set');

  if (!secret) {
    return NextResponse.json(
      { error: 'CUBEJS_API_SECRET not set in environment variables' },
      { status: 500 }
    );
  }

  try {
    const token = jwt.sign({}, secret, { expiresIn: '1h' });
    return NextResponse.json({ token });
  } catch (err) {
    console.error('Token generation error:', err);
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    );
  }
}
