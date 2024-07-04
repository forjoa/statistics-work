'use client'
import { useAuth } from '@/hooks/useAuth'
import { usePackages } from '@/hooks/usePackages'
import Statistics from '@/components/Statistics'
import LineChartComponent from '@/components/LineChartComponent'
import Login from '@/components/Login'

export default function Home() {
  const { user } = useAuth()
  const { data, average, total } = usePackages(user)

  if (!user) {
    return <Login />
  }

  return (
    <main className='my-5 mx-5 md:-ml-0'>
      <div className='bg-[#EEEEF0] p-4 rounded-lg'>
        <p className='text-black'>
          Hi, {user.name}. <br />
          <span className='text-[#797B86]'>
            Here you have the statistics from this month.
          </span>
        </p>
        <LineChartComponent data={data} />
      </div>
      <Statistics average={average} total={total} />
    </main>
  )
}
