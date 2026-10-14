import { useCallback, useRef } from 'react'

/**
 * The answer writes a page has started and not yet seen finish.
 *
 * Each answer is recorded the moment it is tapped and never awaited there, so a
 * child who quits mid-set still has every answer saved. At the end of a Practice
 * set or a placement run, the page asks the database to score the answers it
 * recorded (migration 0031), so it first waits for these writes to land.
 * `recordedIds` resolves to the ids of the rows that were written.
 */
export function useAnswerWrites() {
  const pending = useRef<Promise<string | null>[]>([])

  const track = useCallback((write: Promise<string | null>) => {
    pending.current.push(write)
  }, [])

  const recordedIds = useCallback(async (): Promise<string[]> => {
    const ids = await Promise.all(pending.current)
    return ids.filter((id): id is string => !!id)
  }, [])

  return { track, recordedIds }
}
