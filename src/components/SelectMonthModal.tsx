import { useState } from 'react'
import Input from './ui/Input'
import Button from './ui/Button'
import { useRouter } from 'next/navigation'

type SelectMonthProps = {
  onClose: () => void
}

export default function SelectMonthModal({ onClose }: SelectMonthProps) {
  const [month, setMonth] = useState<string>()
  const router = useRouter()

  const seeMonth = () => {
    router.push(`/month?month=${month}`)
    onClose()
  }

  return (
    <div className='absolute top-0 left-0 text-black h-screen w-screen grid place-items-center bg-black bg-opacity-30'>
      <div className='bg-white p-6 rounded-lg flex flex-col gap-4'>
        <button className='w-full flex justify-end -mb-6' onClick={onClose}>
          &times;
        </button>
        <p>Select a month</p>
        <Input
          type='month'
          name='date'
          id='date'
          onChange={(e) => setMonth(e.target.value)}
        />
        <Button
          disabled={month ? false : true}
          value='See'
          onClick={seeMonth}
        />
      </div>
    </div>
  )
}
