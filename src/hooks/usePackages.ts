import { User } from '@/utils/types'
import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'

export const usePackages = (user: User | undefined) => {
  const [data, setData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  })
  const [average, setAverage] = useState<number>()
  const [total, setTotal] = useState<number>()

  const fetchData = useCallback(async () => {
    if (!user) return

    try {
      const response = await fetch('/api/mypackages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id }),
      })

      if (!response.ok) {
        toast.error('Failed to fetch data')
        return
      }

      const { rows } = await response.json()
      const packageData = rows.map((r: any) => r.quantity)

      setData((prevData) => ({
        ...prevData,
        datasets: [{ ...prevData.datasets[0], data: packageData }],
      }))

      const subtotal = packageData.reduce(
        (acc: number, curr: number) => acc + curr,
        0
      )
      setAverage(
        (subtotal / packageData.length).toFixed(1) as unknown as number
      )
      setTotal(subtotal)
    } catch (error) {
      toast.error('Error fetching package data: ' + error)
    }
  }, [user])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, average, total }
}
