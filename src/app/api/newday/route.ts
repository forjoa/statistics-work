import { db } from '@/utils/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { newDate, newAmount } = body

    
  } catch {
    return NextResponse.json({
      success: false,
      message: 'Unexpected error while uploading the new info',
    })
  }
}
