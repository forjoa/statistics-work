import { InputHTMLAttributes } from 'react'

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className='bg-transparent py-2 px-4 text-black rounded-lg outline-none border border-[#B2B3BD]'
    />
  )
}
