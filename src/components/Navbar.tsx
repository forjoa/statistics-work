import { useState } from 'react'
import {
  IconSquareRoundedPlus,
  IconChartDots,
  IconLogout,
  IconMenu2,
  IconX,
  IconCalendarMonth,
} from '@tabler/icons-react'

interface NavbarProps {
  onAddDay: () => void
  onLogout: () => void
  onSelectMonth: () => void
}

export default function Navbar({
  onAddDay,
  onLogout,
  onSelectMonth,
}: NavbarProps) {
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <div>
      <div className='md:hidden flex justify-between p-4 bg-[#EEEEF0] text-black'>
        <p className='flex items-center gap-2'>
          Statistics Work <IconChartDots color='#3D63DD' stroke={1.5} />
        </p>
        <button onClick={() => setIsNavOpen(!isNavOpen)}>
          {isNavOpen ? (
            <IconX size={30} color='#3D63DD' />
          ) : (
            <IconMenu2 size={30} color='#3D63DD' />
          )}
        </button>
      </div>
      <nav
        className={`text-black bg-[#EEEEF0] m-5 p-4 rounded-lg flex flex-col justify-between ${
          isNavOpen ? 'block' : 'hidden'
        } md:flex md:h-[96%]`}
      >
        <div className='flex flex-col gap-2'>
          <p className='hidden md:flex gap-2'>
            Statistics Work <IconChartDots color='#3D63DD' stroke={1.5} />
          </p>
          <button
            className='bg-[#e5e5e6] p-4 rounded text-black hover:bg-[#B2B3BD] transition-all flex gap-3'
            onClick={onAddDay}
          >
            <IconSquareRoundedPlus stroke={1.5} color='#3D63DD' />
            Add new day
          </button>
          <button
            className='bg-[#e5e5e6] p-4 rounded text-black hover:bg-[#B2B3BD] transition-all flex gap-3'
            onClick={onSelectMonth}
          >
            <IconCalendarMonth stroke={1.5} color='#3D63DD' />
            See other month
          </button>
        </div>
        <button
          className='bg-red-500 bg-opacity-0 flex p-4 gap-3 text-red-500 rounded transition-all hover:bg-opacity-10'
          onClick={onLogout}
        >
          <IconLogout color='red' stroke={1.5} />
          Log out
        </button>
      </nav>
    </div>
  )
}
