import { NextRequest, NextResponse } from 'next/server';
import { getEnquiriesTable } from '@/lib/airtable';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await getEnquiriesTable().create([
      {
        fields: {
          'Full Name':    String(fullName),
          'Email':        String(email),
          'Phone':        String(phone),
          'Submitted At': new Date().toISOString(),
        },
      },
    ]);

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[enquiry] Airtable error:', message);
    if (typeof err === 'object' && err !== null && 'statusCode' in err) {
      console.error('[enquiry] Status code:', (err as { statusCode: number }).statusCode);
    }
    return NextResponse.json(
      { error: 'Failed to send enquiry. Please try again.', detail: message },
      { status: 500 },
    );
  }
}
