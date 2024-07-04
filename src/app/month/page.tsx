'use client'
import { useEffect } from 'react'
import LineChartComponent from '@/components/LineChartComponent'
import Statistics from '@/components/Statistics'
import { useAuth } from '@/hooks/useAuth'
import { usePackages } from '@/hooks/usePackages'
import { useSearchParams } from 'next/navigation'

export default function Month() {
  const searchParams = useSearchParams()
  const month = searchParams.get('month')

  const { user } = useAuth()
  const { data, average, total, fetchDataByMonth } = usePackages(user)

  useEffect(() => {
    if (month && user) {
      fetchDataByMonth(month)
    }
  }, [month, user, fetchDataByMonth])

  return (
    <main className='my-5 mx-5 md:-ml-0'>
      <div className='bg-[#EEEEF0] p-4 rounded-lg'>
        <p className='text-black'>
          Hi, {user?.name}. <br />
          <span className='text-[#797B86]'>
            Here you have the statistics from {month}.
          </span>
        </p>
        <LineChartComponent data={data} />
      </div>
      <Statistics average={average} total={total} />
    </main>
  )
}
