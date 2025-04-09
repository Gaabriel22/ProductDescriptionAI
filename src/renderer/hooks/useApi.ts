import { useState } from "react"

export const useApi = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const callApi = async <T>(apiCall: () => Promise<T>): Promise<T | null> => {
    setLoading(true)
    setError(null)
    try {
      return await apiCall()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido")
      return null
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, callApi }
}
