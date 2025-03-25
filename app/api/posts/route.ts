import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT * FROM articles 
      ORDER BY created_at DESC 
      LIMIT 10
    `)

    const stats = await pool.query(`
      SELECT COUNT(*) as total_posts
      FROM articles
    `)

    return NextResponse.json({
      posts: result.rows,
      stats: stats.rows[0]
    })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
} 