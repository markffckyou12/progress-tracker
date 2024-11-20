// app/api/test-db/route.js

import { NextResponse } from 'next/server';
const db = require('../../../lib/db');

export async function GET() {
  try {
    const result = await db.query('SELECT NOW()');
    return NextResponse.json({ success: true, time: result.rows[0].now });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

