import { NextRequest, NextResponse } from 'next/server';
import { getBookingsTable } from '@/lib/airtable';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullName, email, phone, testBooked, testDate, testTime,
      testCentre, city, needCar, supportReasons, urgency, notes,
    } = body;

    if (!fullName || !email || !phone || !testDate || !testCentre || !city) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await getBookingsTable().create([
      {
        fields: {
          'Full Name':          String(fullName),
          'Email':              String(email),
          'Phone':              String(phone),
          'Test Already Booked': String(testBooked ?? ''),
          'Test Date':          String(testDate),
          'Test Time':          String(testTime ?? ''),
          'Test Centre':        String(testCentre),
          'City':               String(city),
          'Needs Car':          String(needCar ?? ''),
          'Support Reasons':    Array.isArray(supportReasons) ? supportReasons.join(', ') : '',
          'Urgency':            String(urgency ?? ''),
          'Notes':              String(notes ?? ''),
          'Submitted At':       new Date().toISOString(),
          'Status':             'New',
        },
      },
    ]);

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    // Airtable errors carry extra detail — log them clearly in the terminal
    console.error('[book-driver] Airtable error:', message);
    if (typeof err === 'object' && err !== null && 'statusCode' in err) {
      console.error('[book-driver] Status code:', (err as { statusCode: number }).statusCode);
    }
    return NextResponse.json(
      { error: 'Failed to save booking. Please try again.', detail: message },
      { status: 500 },
    );
  }
}
