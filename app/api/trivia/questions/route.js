import pool from "@/lib/db";
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit')) || 20;
    const offset = parseInt(searchParams.get('offset')) || 0;

    // Build query dynamically
    let whereConditions = [];
    
    // Filter by category
    if (category && category !== 'all') {
      whereConditions.push(`Category = '${category}'`);
    }

    // Search in question text
    if (search && search.trim() !== '') {
      whereConditions.push(`Question ILIKE '%${search}%'`);
    }

    const whereClause = whereConditions.length > 0 
      ? 'WHERE ' + whereConditions.join(' AND ')
      : '';

    // Get questions with pagination
    const questionsQuery = `
      SELECT * FROM TriviaQuestions 
      ${whereClause}
      ORDER BY DateAdded DESC 
      LIMIT ${limit} OFFSET ${offset}
    `;

    const { rows: questions } = await pool.query(questionsQuery);

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as count FROM TriviaQuestions
      ${whereClause}
    `;

    const { rows: countRows } = await pool.query(countQuery);
    const totalCount = parseInt(countRows[0].count);

    return NextResponse.json({
      questions: questions,
      total: totalCount,
      hasMore: offset + limit < totalCount
    });

  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions', details: error.message },
      { status: 500 }
    );
  }
}