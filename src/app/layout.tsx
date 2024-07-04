'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster, toast } from 'sonner'
import Navbar from '@/components/Navbar'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import AddDayModal from '@/components/AddDayModal'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user, logout } = useAuth()
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

  return (
    <html lang='en'>
      <head>
        <title>Statistics Work</title>
      </head>
      <body className={inter.className}>
        <div className='grid grid-cols-1 md:grid-cols-[0.5fr_1.5fr] grid-rows-[auto_1fr] md:grid-rows-1 gap-0 h-screen'>
          <Toaster position='top-center' richColors />
          <Navbar onAddDay={() => setShowModal(true)} onLogout={logout} />
          {children}
        </div>
        {showModal && (
          <AddDayModal
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmit}
          />
        )}
      </body>
    </html>
  )
}
