import Airtable from 'airtable';

function parseBaseId(raw: string): string {
  // Accept a full Airtable URL — extract just the base ID (starts with "app")
  const match = raw.match(/(app[A-Za-z0-9]{14,})/);
  return match ? match[1] : raw.trim();
}

function getBase() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const rawBaseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey) throw new Error('AIRTABLE_API_KEY is not set. Check your .env.local file.');
  if (!rawBaseId) throw new Error('AIRTABLE_BASE_ID is not set. Check your .env.local file.');

  return new Airtable({ apiKey }).base(parseBaseId(rawBaseId));
}

export function getBookingsTable() {
  return getBase()(process.env.AIRTABLE_BOOKINGS_TABLE ?? 'Bookings');
}

export function getDriversTable() {
  return getBase()(process.env.AIRTABLE_DRIVERS_TABLE ?? 'Drivers');
}

export function getEnquiriesTable() {
  return getBase()(process.env.AIRTABLE_ENQUIRIES_TABLE ?? 'Enquiries');
}

export function getVerificationsTable() {
  return getBase()(process.env.AIRTABLE_VERIFICATIONS_TABLE ?? 'Verifications');
}
