import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { rows } = await sql.query('SELECT * FROM customquizzes');
    return NextResponse.json({ 
      success: true, 
      count: rows.length,
      quizzes: rows 
    });
  } catch (error) {
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 });
  }
}