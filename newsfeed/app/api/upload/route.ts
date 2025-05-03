// app/api/upload/route.ts
import { writeFile } from 'fs/promises';
import path from 'path';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return new Response(JSON.stringify({ error: 'No file uploaded' }), {
      status: 400,
    });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join('public/uploads', file.name);
  await writeFile(filePath, buffer);

  return new Response(
    JSON.stringify({ filePath: `/uploads/${file.name}` }),
    { status: 200 }
  );
}
