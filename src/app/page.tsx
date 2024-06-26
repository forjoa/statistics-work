'use client'
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { generateLabels } from '@/utils/lib'
import { Line } from 'react-chartjs-2'
import { useEffect, useState } from 'react'
import { User } from '@/utils/types'
import jwt from 'jsonwebtoken'
import Login from '@/components/Login'

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const data = {
  labels: generateLabels(),
  datasets: [
    {
      label: 'Package delivered',
      data: [65, 59, 80, 81, 56, 55, 40, 0],
      fill: false,
      backgroundColor: 'rgb(75, 192, 192)',
      borderColor: 'rgba(75, 192, 192, 0.2)',
    },
  ],
}

export default function LineChart() {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    if (typeof window !== undefined) {
      const userEncrypted = localStorage.getItem('userStatistic')
      setUser(jwt.decode(userEncrypted as string) as unknown as User)
    }
  }, [])

  if (!user) {
    return <Login />
  }

  return (
    <div>
      {user && <p className='text-black'>Hi, {user.user.name}</p>}
      <Line data={data} />
    </div>
  )
}
