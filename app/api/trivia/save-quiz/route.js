import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { code, name, questionIds, customQuestions, createdBy } = body;

    // Validate inputs
    if (!code) {
      return NextResponse.json(
        { error: 'Code is required' },
        { status: 400 }
      );
    }

    // Separate database questions from custom questions
    const dbQuestionIds = questionIds.filter(id => typeof id === 'number');
    const customQuestionsData = customQuestions || [];

    // Convert arrays to strings for storage
    const questionIdsString = dbQuestionIds.length > 0 ? dbQuestionIds.join(',') : '';

    // Build the INSERT query
    let query;
    if (customQuestionsData.length > 0) {
      const escapedJson = JSON.stringify(customQuestionsData).replace(/'/g, "''");
      query = `
        INSERT INTO customquizzes (code, name, questionids, customquestions, createdby, createdat)
        VALUES ('${code}', '${name || 'Untitled Quiz'}', '${questionIdsString}', '${escapedJson}', '${createdBy || 'Anonymous'}', NOW())
        RETURNING *
      `;
    } else {
      query = `
        INSERT INTO customquizzes (code, name, questionids, customquestions, createdby, createdat)
        VALUES ('${code}', '${name || 'Untitled Quiz'}', '${questionIdsString}', NULL, '${createdBy || 'Anonymous'}', NOW())
        RETURNING *
      `;
    }

    const { rows } = await sql.query(query);

    return NextResponse.json({
      success: true,
      quiz: rows[0]
    });

  } catch (error) {
    console.error('Save Quiz Error:', error);
    
    // Check if it's a duplicate code error
    if (error.message.includes('duplicate key')) {
      return NextResponse.json(
        { error: 'Quiz code already exists. Please try again.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to save quiz', details: error.message },
      { status: 500 }
    );
  }
}