import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/prisma';

// データベースからデータを取得する
export const POST = async (req: Request) => {
  const { email } = await req.json();

  try {
    // await connect();
    const data = await prisma.user.findUnique({
      where: { email: email },
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
