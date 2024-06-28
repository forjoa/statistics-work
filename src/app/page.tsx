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
import { useEffect, useState, useCallback, FormEvent } from 'react'
import { User } from '@/utils/types'
import jwt from 'jsonwebtoken'
import Login from '@/components/Login'
import {
  IconSquareRoundedPlus,
  IconChartDots,
  IconLogout,
  IconPackage,
} from '@tabler/icons-react'
import { Toaster, toast } from 'sonner'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

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
  const [avarage, setAvarage] = useState<number>()
  const [total, setTotal] = useState<number>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [newDate, setNewDate] = useState<string>()
  const [newAmount, setNewAmount] = useState<number>()

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

      const subtotal = packageData.reduce(
        (acc: number, curr: number) => acc + curr,
        0
      )
      setAvarage(
        (subtotal / packageData.length).toFixed(1) as unknown as number
      )
      setTotal(subtotal)
    } catch (error) {
      toast.error(('Error fetching package data: ' + error) as string)
    }
  }, [user])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const result = await fetch('/api/newday', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({ newDate, newAmount }),
      })

      const { success, message } = await result.json()

      if (success) {
        toast.success(message)
        setTimeout(() => {
          if (typeof window !== undefined) {
            window.location.reload()
          }
        }, 5000)
      } else {
        toast.error(message)
      }
    } catch {
      toast.error('Error while sending the data')
    }
  }

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
          <button
            className='bg-[#e5e5e6] p-4 rounded text-black hover:bg-[#B2B3BD] transition-all flex gap-3'
            onClick={() => setShowModal(true)}
          >
            <IconSquareRoundedPlus stroke={1.5} color='#3D63DD' />
            Add new day
          </button>
        </div>
        <button className='bg-red-500 bg-opacity-0 flex p-4 gap-3 text-red-500 rounded transition-all hover:bg-opacity-10'>
          <IconLogout color='red' stroke={1.5} />
          Log out
        </button>
      </nav>
      <main className='my-5 mr-5'>
        <div className='bg-[#EEEEF0] p-4 rounded-lg'>
          <p className='text-black'>
            Hi, {user.name}. <br />
            <span className='text-[#797B86]'>
              Here you have the statistics from this month.
            </span>
          </p>
          <Line data={data} />
        </div>
        <div className='text-black flex gap-5 w-full'>
          <div className='mt-5 bg-[#EEEEF0] p-4 rounded-lg w-1/2'>
            <p>Avarage</p>
            <p className='text-8xl flex w-full justify-center'>
              {avarage}
              <IconPackage stroke={1.5} color='#3D63DD' size={95} />
            </p>
          </div>
          <div className='mt-5 bg-[#EEEEF0] p-4 rounded-lg w-1/2'>
            <p>Total amount</p>
            <p className='text-8xl flex w-full justify-center'>
              {total}
              <IconPackage stroke={1.5} color='#3D63DD' size={95} />
            </p>
          </div>
        </div>
      </main>
      {showModal && (
        <div className='absolute text-black h-screen w-screen grid place-items-center bg-black bg-opacity-30'>
          <div className='bg-white p-6 rounded-lg flex flex-col gap-4'>
            <button
              className='w-full flex justify-end -mb-6'
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <p>Add new day</p>
            <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
              <div className='flex flex-col'>
                <label htmlFor='date'>Date</label>
                <Input
                  type='date'
                  name='date'
                  id='date'
                  onChange={(e) => setNewDate(e.target.value)}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='amount'>Amount</label>
                <Input
                  type='number'
                  name='amount'
                  id='amount'
                  onChange={(e) =>
                    setNewAmount(e.target.value as unknown as number)
                  }
                />
              </div>
              <Button value='Upload' type='submit'></Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
