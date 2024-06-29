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

type LineChartComponentProps = {
  data: any
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({ data }) => {
  return (
    <div className='bg-[#EEEEF0] p-4 rounded-lg'>
      <Line data={data} />
    </div>
  )
}

export default LineChartComponent
