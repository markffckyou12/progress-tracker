// app/api/progress/route.js

import { NextResponse } from 'next/server';
const db = require('../../../lib/db');

export async function GET() {
  try {
    const result = await db.query('SELECT * FROM progress_entries ORDER BY created_at DESC');
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { progress } = await request.json();
    const result = await db.query(
      'INSERT INTO progress_entries (entry) VALUES ($1) RETURNING *',
      [progress]
    );
    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

