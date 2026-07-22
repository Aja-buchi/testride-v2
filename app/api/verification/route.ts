import { NextResponse } from 'next/server';
import { getVerificationsTable } from '@/lib/airtable';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const docSummaries: string[] = [];
    Array.from(formData.entries()).forEach(([key, value]) => {
      if (value instanceof File && value.size > 0) {
        const sizeKb = (value.size / 1024).toFixed(1);
        docSummaries.push(`${key}: ${value.name} (${sizeKb} KB, ${value.type || 'unknown type'})`);
      }
    });

    await getVerificationsTable().create({
      'Documents': docSummaries.join('\n'),
      'Submitted At': new Date().toISOString(),
      'Status': 'Pending Review',
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Verification submission error:', err);
    return NextResponse.json({ error: 'Failed to record verification' }, { status: 500 });
  }
}
