import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    console.log('[DEBUG 1] Received quiz code request:', code);

    if (!code) {
      return NextResponse.json(
        { error: 'Quiz code is required' },
        { status: 400 }
      );
    }

    // Get the quiz
    const quizQuery = `
      SELECT * FROM customquizzes 
      WHERE code = '${code.toUpperCase()}'
    `;

    console.log('[DEBUG 2] Running quiz query:', quizQuery);

    const { rows: quizRows } = await sql.query(quizQuery);

    console.log('[DEBUG 3] Quiz query results:', quizRows.length, 'rows');

    if (quizRows.length === 0) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      );
    }

    const quiz = quizRows[0];
    console.log('[DEBUG 4] Quiz data:', {
      code: quiz.code,
      name: quiz.name,
      questionids: quiz.questionids,
      customquestions: quiz.customquestions ? 'HAS CUSTOM DATA' : 'NULL'
    });

    // Get database questions (if any)
    let dbQuestions = [];
    if (quiz.questionids && quiz.questionids.trim() !== '') {
      const questionIds = quiz.questionids.split(',').map(id => id.trim());
      console.log('[DEBUG 5] Fetching database questions with IDs:', questionIds);
      
      const questionsQuery = `
        SELECT * FROM triviaquestions 
        WHERE id IN (${questionIds.join(',')})
      `;

      console.log('[DEBUG 6] Database questions query:', questionsQuery);

      const { rows: questions } = await sql.query(questionsQuery);
      dbQuestions = questions;
      console.log('[DEBUG 7] Found', dbQuestions.length, 'database questions');
    }

    // Get custom questions (if any)
    let customQuestions = [];
    if (quiz.customquestions) {
      console.log('[DEBUG 8] Parsing custom questions JSON...');
      console.log('[DEBUG 9] Raw custom questions data:', quiz.customquestions);
      try {
        customQuestions = JSON.parse(quiz.customquestions);
        console.log('[DEBUG 10] Parsed', customQuestions.length, 'custom questions');
        console.log('[DEBUG 11] Custom questions:', customQuestions);
      } catch (e) {
        console.error('[DEBUG ERROR] Failed to parse custom questions:', e);
      }
    } else {
      console.log('[DEBUG 8] No custom questions for this quiz');
    }

    // Combine both types of questions
    const allQuestions = [
      ...dbQuestions.map(dbq => ({
        id: dbq.id,
        question: dbq.question,
        options: dbq.options,
        correctindex: dbq.correctindex,
        category: dbq.category || 'General'  // Add this mapping
      })),
      ...customQuestions.map(cq => ({
        id: cq.id,
        question: cq.question,
        options: cq.options,
        correctindex: cq.correctindex,
        category: cq.category || 'Custom'
      }))
    ];

    console.log('[DEBUG 12] Total questions combined:', allQuestions.length);
    console.log('[DEBUG 13] Final questions array:', allQuestions);

    // Return quiz with all questions
    return NextResponse.json({
      code: quiz.code,
      name: quiz.name,
      createdBy: quiz.createdby,
      createdAt: quiz.createdat,
      questions: allQuestions
    });

  } catch (error) {
    console.error('[DEBUG FATAL ERROR] Get Quiz Error:', error);
    console.error('[DEBUG FATAL STACK]', error.stack);
    return NextResponse.json(
      { error: 'Failed to fetch quiz', details: error.message },
      { status: 500 }
    );
  }
}