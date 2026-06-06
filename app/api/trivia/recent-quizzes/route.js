import pool from "@/lib/db";
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const query = `
      SELECT code, name, createdat, 
             (LENGTH(questionids) - LENGTH(REPLACE(questionids, ',', '')) + 1) as question_count
      FROM customquizzes 
      WHERE questionids != ''
      ORDER BY createdat DESC 
      LIMIT 10
    `;

    const { rows } = await pool.query(query);

    return NextResponse.json({
      quizzes: rows
    });

  } catch (error) {
    console.error('Recent Quizzes Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent quizzes' },
      { status: 500 }
    );
  }
}