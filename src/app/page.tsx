'use client'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js'
import { eachDayOfInterval, format, startOfMonth, endOfMonth } from 'date-fns'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// Función para generar etiquetas para todos los días del mes actual
const generateLabels = () => {
  const now = new Date()
  const days = eachDayOfInterval({
    start: startOfMonth(now),
    end: endOfMonth(now),
  })
  return days.map((day) => format(day, 'dd/MM'))
}

const labels = generateLabels()

const data = {
  labels: labels,
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: 'rgb(75, 192, 192)',
      borderColor: 'rgba(75, 192, 192, 0.2)',
    },
  ],
}

const options: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
}

export default function LineChart() {
  return <Line data={data} options={options} />
}
