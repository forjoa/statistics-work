'use server'

import { db } from '@/utils/db'
import { User } from '@/utils/types'
import { NextRequest, NextResponse } from 'next/server'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

const secretKey = 'my_secret_key'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, password } = body

  try {
    const { rows } = await db.execute({
      sql: 'SELECT * FROM users WHERE email = ? LIMIT 1',
      args: [email],
    })

    if (rows.length !== 1) {
      return NextResponse.json({
        success: false,
        message: 'Account does not exist',
      })
    }

    const user: User = rows[0] as unknown as User

    if (!(await compare(password, user.password as string))) {
      return NextResponse.json({
        success: false,
        message: 'Incorrect password',
      })
    }

    const token = jwt.sign({ user }, secretKey)

    return NextResponse.json({ success: true, token })
  } catch {
    return NextResponse.json({
      success: false,
      message: 'Error fetching the data',
    })
  }
}
