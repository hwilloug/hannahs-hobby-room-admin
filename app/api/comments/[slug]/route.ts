import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        timestamp,
        body,
        article_slug,
        username,
        parent_id
      FROM comments 
      WHERE article_slug = $1
      ORDER BY timestamp DESC
    `, [params.slug])

    return NextResponse.json({
      comments: result.rows
    })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
} 