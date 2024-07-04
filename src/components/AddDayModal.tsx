import { FormEvent, useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

type AddDayModalProps = {
  onClose: () => void
  onSubmit: (date: string, amount: number) => void
}

const AddDayModal: React.FC<AddDayModalProps> = ({ onClose, onSubmit }) => {
  const [newDate, setNewDate] = useState<string>('')
  const [newAmount, setNewAmount] = useState<number>(0)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(newDate, newAmount)
  }

  return (
    <div className='absolute top-0 left-0 text-black h-screen w-screen grid place-items-center bg-black bg-opacity-30'>
      <div className='bg-white p-6 rounded-lg flex flex-col gap-4'>
        <button className='w-full flex justify-end -mb-6' onClick={onClose}>
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
  )
}

export default AddDayModal
