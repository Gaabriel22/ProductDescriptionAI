import { useState } from "react"

export const useApi = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const callApi = async <T>(
    apiCall: () => Promise<T>,
    options?: {
      onSuccess?: () => void
      onError?: (message: string) => void
      errorMessageFallback?: string
    }
  ): Promise<T | null> => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const result = await apiCall()
      setSuccess(true)
      options?.onSuccess?.()
      return result
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : options?.errorMessageFallback || "Erro desconhecido"
      setError(message)
      options?.onError?.(message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const resetError = () => setError(null)

  return { loading, error, success, callApi, resetError }
}
