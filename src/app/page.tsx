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
import { useEffect, useState, useCallback } from 'react'
import { User } from '@/utils/types'
import jwt from 'jsonwebtoken'
import Login from '@/components/Login'
import {
  IconSquareRoundedPlus,
  IconChartDots,
  IconLogout,
} from '@tabler/icons-react'
import { Toaster, toast } from 'sonner'

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const initialData = {
  labels: generateLabels(),
  datasets: [
    {
      label: 'Package delivered',
      data: [],
      fill: false,
      backgroundColor: 'rgb(61, 99, 221)',
      borderColor: 'rgba(61, 99, 221, 0.4)',
    },
  ],
}

export default function LineChart() {
  const [user, setUser] = useState<User>()
  const [data, setData] = useState(initialData)

  useEffect(() => {
    if (typeof window !== undefined) {
      const userEncrypted = localStorage.getItem('userStatistic')
      const userDecrypted = jwt.decode(userEncrypted as string) as any
      setUser(userDecrypted?.user)
    }
  }, [])

  const fetchData = useCallback(async () => {
    if (!user) return

    try {
      const response = await fetch('/api/mypackages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: user.id }),
      })

      if (!response.ok) {
        toast.error('Failed to fetch data')
      }

      const { rows } = await response.json()

      const packageData = rows.map((r: any) => r.quantity)

      setData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: packageData,
          },
        ],
      }))
    } catch (error) {
      toast.error(('Error fetching package data: ' + error) as string)
    }
  }, [user])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (!user) {
    return <Login />
  }

  return (
    <div className='grid grid-cols-[0.5fr_1.5fr] grid-rows-[1fr] gap-0 h-screen'>
      <Toaster position='top-center' richColors />
      <nav className='text-black bg-[#EEEEF0] m-5 p-4 rounded-lg flex flex-col justify-between'>
        <div className='flex flex-col gap-2'>
          <p className='flex gap-2'>
            Statistics Work <IconChartDots color='#3D63DD' stroke={1.5} />
          </p>
          <button className='bg-[#e5e5e6] p-4 rounded text-black hover:bg-[#B2B3BD] transition-all flex gap-3'>
            <IconSquareRoundedPlus stroke={1.5} color='#3D63DD' />
            Add new day
          </button>
        </div>
        <button className='bg-red-500 bg-opacity-30 flex p-4 gap-3 text-red-500 rounded transition-all hover:bg-opacity-10'>
          <IconLogout color='red' stroke={1.5} />
          Log out
        </button>
      </nav>
      <main className='m-5'>
        <p className='text-black'>
          Hi, {user.name}. <br />
          <span className='text-[#797B86]'>
            Here you have the statistics from this month.
          </span>
        </p>
        <Line data={data} />
      </main>
    </div>
  )
}
