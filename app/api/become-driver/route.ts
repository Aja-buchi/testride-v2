import { NextRequest, NextResponse } from 'next/server';
import { getDriversTable } from '@/lib/airtable';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullName, email, phone, city, postcode, licenceDuration,
      vehicleAccess, vehicleMakeModel, learnerInsurance,
      availability, preferredCentres, previousExperience, motivation,
    } = body;

    if (!fullName || !email || !phone || !city || !postcode) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await getDriversTable().create([
      {
        fields: {
          'Full Name':             String(fullName),
          'Email':                 String(email),
          'Phone':                 String(phone),
          'City':                  String(city),
          'Postcode':              String(postcode),
          'Licence Duration':      String(licenceDuration ?? ''),
          'Vehicle Access':        String(vehicleAccess ?? ''),
          'Vehicle Make & Model':  String(vehicleMakeModel ?? ''),
          'Learner Insurance':     String(learnerInsurance ?? ''),
          'Availability':          Array.isArray(availability) ? availability.join(', ') : '',
          'Preferred Test Centres': String(preferredCentres ?? ''),
          'Previous Experience':   String(previousExperience ?? ''),
          'Motivation':            String(motivation ?? ''),
          'Submitted At':          new Date().toISOString(),
          'Status':                'New Application',
        },
      },
    ]);

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[become-driver] Airtable error:', message);
    if (typeof err === 'object' && err !== null && 'statusCode' in err) {
      console.error('[become-driver] Status code:', (err as { statusCode: number }).statusCode);
    }
    return NextResponse.json(
      { error: 'Failed to save application. Please try again.', detail: message },
      { status: 500 },
    );
  }
}
