'use client';

import { useEffect, useState, useCallback } from 'react'

interface UseAsyncState<T> {
  data: T | null
  isLoading: boolean
  error: Error | null
}

/**
 * Hook for handling async operations with loading and error states
 */
export function useAsync<T>(asyncFunction: () => Promise<T>, immediate = true) {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    isLoading: immediate,
    error: null,
  })

  const execute = useCallback(async () => {
    setState({ data: null, isLoading: true, error: null })
    try {
      const response = await asyncFunction()
      setState({ data: response, isLoading: false, error: null })
      return response
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      setState({ data: null, isLoading: false, error })
      throw error
    }
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { ...state, execute }
}
