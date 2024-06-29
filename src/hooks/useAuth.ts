import { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import { User } from '@/utils/types'

export const useAuth = () => {
  const [user, setUser] = useState<User | undefined>(undefined)

  useEffect(() => {
    if (typeof window !== undefined) {
      const userEncrypted = localStorage.getItem('userStatistic')
      const userDecrypted = jwt.decode(userEncrypted as string) as any
      setUser(userDecrypted?.user)
    }
  }, [])

  const logout = () => {
    if (typeof window !== undefined) {
      localStorage.removeItem('userStatistic')
      window.location.reload()
    }
  }

  return { user, logout }
}
