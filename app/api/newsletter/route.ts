import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    const stats = await pool.query(`
      SELECT COUNT(*) as total_subscribers
      FROM newsletter
    `)

    return NextResponse.json({
      stats: stats.rows[0]
    })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch newsletter stats' },
      { status: 500 }
    )
  }
} 