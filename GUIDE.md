- Two options to fetch and mutable data

+ To read data : Using useFetch hook (Simplest)
import { useFetch } from '../hooks/useFetch'
import { API_ENDPOINTS } from '../lib/api'

export default function UserList() {
  const { data, loading, error } = useFetch(API_ENDPOINTS.USERS.LIST)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

+ To mutable : Use api service 
import { useState, useEffect } from 'react'
import { apiService } from '../services/apiService'
import { API_ENDPOINTS } from '../lib/api'

export default function UserList() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiService.get(API_ENDPOINTS.USERS.LIST)
        setData(response.data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return <ul>{/* render data */}</ul>
}