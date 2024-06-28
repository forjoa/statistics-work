import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

export default function Button({ value, ...props }: ButtonProps) {
  return (
    <button className='bg-[#3D63DD] p-2 rounded-lg text-white' {...props}>
      {value}
    </button>
  )
}
