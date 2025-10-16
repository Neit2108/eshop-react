import { useState, useEffect } from 'react'
import { apiService } from '../services/apiService'
import type { ApiError } from '../types'

interface UseFetchOptions {
  skip?: boolean
  onSuccess?: (data: unknown) => void
  onError?: (error: ApiError) => void
}

export function useFetch<T>(
  endpoint: string,
  options: UseFetchOptions = {}
) {
  const { skip = false, onSuccess, onError } = options
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(!skip)
  const [error, setError] = useState<ApiError | null>(null)

  useEffect(() => {
    if (skip) return

    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await apiService.get<T>(endpoint)
        setData(response.data)
        onSuccess?.(response.data)
      } catch (err) {
        const apiError = err as ApiError
        setError(apiError)
        onError?.(apiError)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [endpoint, skip, onSuccess, onError])

  return { data, loading, error }
}