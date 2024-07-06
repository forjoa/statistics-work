import { Line } from 'react-chartjs-2'
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface LineChartComponentProps {
  data: any
}

export default function LineChartComponent({ data }: LineChartComponentProps) {
  return (
    <div className='bg-[#EEEEF0] p-4 rounded-lg'>
      <Line data={data} />
    </div>
  )
}
