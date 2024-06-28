import { db } from '@/utils/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { newDate, newAmount, id } = body

    const result = await db.execute({
      sql: 'INSERT INTO delivered_packages(timestamp, quantity, userId) VALUES (?,?,?)',
      args: [newDate, newAmount, id],
    })

    if (result.rowsAffected === 0) {
      return NextResponse.json({
        success: false,
        message: 'Something went wrong and the info was not saved',
      })
    }

    return NextResponse.json({
      success: true,
      message: 'New day uploaded correctly!',
    })
  } catch {
    return NextResponse.json({
      success: false,
      message: 'Unexpected error while uploading the new info',
    })
  }
}
