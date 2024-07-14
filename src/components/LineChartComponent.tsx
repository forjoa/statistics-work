import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface LineChartComponentProps {
  data: any
}

interface DataI {
  name: string
  quantity: number
}

export default function LineChartComponent({ data }: LineChartComponentProps) {
  const [dataModified, setDataModified] = useState<DataI[]>([])

  useEffect(() => {
    const modifiedData = data.map((element: any) => {
      const { day, quantity } = element
      return {
        name: (day + '').substring(5),
        quantity: parseFloat(quantity), 
      }
    })

    setDataModified(modifiedData)
  }, [data])

  return (
    <div className='bg-[#EEEEF0] rounded-lg text-black'>
      {dataModified.length > 0 ? (
        <ResponsiveContainer width='100%' height={400}>
          <LineChart data={dataModified}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' color='black' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type='monotone'
              dataKey='quantity'
              stroke='#3D63DD'
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className='text-black'>Loading data...</p>
      )}
    </div>
  )
}
