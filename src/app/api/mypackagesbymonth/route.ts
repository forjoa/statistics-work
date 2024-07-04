'use server'
import { db } from '@/utils/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, month } = body

    const { rows } = await db.execute({
      sql: `SELECT 
                DATE(timestamp) AS day,
                quantity,
                userId
            FROM 
                delivered_packages
            WHERE 
                strftime('%Y-%m', timestamp) = ?
            AND
                userId = ?
            ORDER BY 
                DATE(timestamp);
            `,
      args: [month, id],
    })

    return NextResponse.json({ rows })
  } catch {
    return NextResponse.json({
      success: false,
      message: 'Error while fetching your packages',
    })
  }
}
