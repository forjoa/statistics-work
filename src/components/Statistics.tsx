import { IconCurrencyEuro, IconPackage } from '@tabler/icons-react'

interface StatisticsProps {
  average: number | undefined
  total: number | undefined
}

export default function Statistics({ average, total }: StatisticsProps) {
  return (
    <div className='text-black flex flex-col md:flex-row md:gap-5 w-full'>
      <div className='mt-5 bg-[#EEEEF0] p-4 rounded-lg md:w-1/2'>
        <p>Average</p>
        <p className='text-8xl flex w-full justify-center'>
          {average}
          <IconPackage stroke={1.5} color='#3D63DD' size={95} />
        </p>
      </div>
      <div className='mt-5 bg-[#EEEEF0] p-4 rounded-lg md:w-1/2'>
        <p>Total amount</p>
        <p className='text-8xl flex w-full justify-center'>
          {total}
          <IconPackage stroke={1.5} color='#3D63DD' size={95} />
        </p>
      </div>
      <div className='mt-5 bg-[#EEEEF0] p-4 rounded-lg md:w-1/2'>
        <p>Earnings</p>
        <p className='text-8xl flex w-full justify-center'>
          {total && total / 2}
          <IconCurrencyEuro stroke={1.5} color='#3D63DD' size={95} />
        </p>
      </div>
    </div>
  )
}
