import { IconPackage } from '@tabler/icons-react'

type StatisticsProps = {
  average: number | undefined
  total: number | undefined
}

const Statistics: React.FC<StatisticsProps> = ({ average, total }) => {
  return (
    <div className='text-black flex flex-col md:flex-row md:gap-5 w-full'>
      <div className='mt-5 bg-[#EEEEF0] p-4 rounded-lg md:w-1/2'>
        <p>Avarage</p>
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
    </div>
  )
}

export default Statistics
