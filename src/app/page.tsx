'use client'
import { useAuth } from '@/hooks/useAuth'
import { usePackages } from '@/hooks/usePackages'
import Navbar from '@/components/Navbar'
import Statistics from '@/components/Statistics'
import AddDayModal from '@/components/AddDayModal'
import LineChartComponent from '@/components/LineChartComponent'
import { useState } from 'react'
import { toast, Toaster } from 'sonner'
import Login from '@/components/Login'

export default function Home() {
  const { user, logout } = useAuth()
  const { data, average, total } = usePackages(user)
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleSubmit = async (date: string, amount: number) => {
    try {
      const result = await fetch('/api/newday', {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify({
          newDate: date,
          newAmount: amount,
          id: user?.id,
        }),
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
    <div className='grid grid-cols-1 md:grid-cols-[0.5fr_1.5fr] grid-rows-[auto_1fr] md:grid-rows-1 gap-0 h-screen'>
      <Toaster position='top-center' richColors />
      <Navbar onAddDay={() => setShowModal(true)} onLogout={logout} />
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
      {showModal && (
        <AddDayModal
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}
