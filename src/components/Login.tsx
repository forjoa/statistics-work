import { FormEvent, useState } from 'react'
import Button from './ui/Button'
import Input from './ui/Input'
import { toast, Toaster } from 'sonner'

export default function Login() {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()

      console.log(result)

      if (!result.success) {
        toast.error(result.message)
      } else {
        if (typeof window !== undefined) {
          localStorage.setItem('userStatistic', result.token)
          window.location.reload()
        }
      }
    } catch (err: any) {
      toast.error(err)
    }
  }

  return (
    <div className='absolute h-screen w-screen grid place-items-center top-0'>
      <Toaster richColors position='top-center' />
      <form
        className='bg-[#EEEEF0] md:w-1/2 max-w-[500px] m-auto rounded-lg p-6 flex flex-col gap-3'
        onSubmit={handleSubmit}
      >
        <p className='text-black text-2xl font-semibold'>Login</p>
        <Input
          type='text'
          spellCheck='false'
          placeholder='Email'
          autoComplete='none'
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type='password'
          autoComplete='none'
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button value='Send' type='submit' />
      </form>
    </div>
  )
}
