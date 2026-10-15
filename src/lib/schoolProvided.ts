import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { hasCoveredStudent } from '@/lib/accessGate'
import type { Student } from '@/lib/students'

/**
 * Accounts a school provides for are never offered anything to buy: no plan
 * picker, no trial countdown, no seat or prep purchase. The answer comes from
 * the database (my_school_provided, migration 0037), the same one the paid
 * routes refuse on, never from a flag in this browser tab.
 *
 *   platform_admin   a PathwayEd platform admin
 *   school_staff     an active member of a school's staff
 *   covered_student  owns a school-covered student
 *   school_domain    an address at a school's domain
 */
export type SchoolProvidedReason = 'platform_admin' | 'school_staff' | 'covered_student' | 'school_domain'

export const SCHOOL_PROVIDED_TITLE = 'Your school provides PathwayEd'
export const SCHOOL_PROVIDED_BODY = 'There is nothing to buy or renew on this account.'

const cache = new Map<string, Promise<SchoolProvidedReason | null>>()

/**
 * The reason for the signed-in account, or null when it may buy. A failed read
 * counts as school-provided, so a hiccup never shows a school account a price;
 * the server refuses such a sale either way.
 */
export function loadSchoolProvided(userId: string): Promise<SchoolProvidedReason | null> {
  let p = cache.get(userId)
  if (!p) {
    p = Promise.resolve(supabase.rpc('my_school_provided')).then(({ data, error }) => {
      if (error) {
        console.error('my_school_provided failed', error)
        cache.delete(userId)
        return 'school_domain' as const
      }
      return (data as SchoolProvidedReason | null) ?? null
    })
    cache.set(userId, p)
  }
  return p
}

/** undefined while loading; then the reason, or null. */
export function useSchoolProvided(userId: string | null | undefined): SchoolProvidedReason | null | undefined {
  const [reason, setReason] = useState<SchoolProvidedReason | null | undefined>(undefined)
  useEffect(() => {
    if (!userId) return
    let active = true
    loadSchoolProvided(userId).then((r) => {
      if (active) setReason(r)
    })
    return () => {
      active = false
    }
  }, [userId])
  return userId ? reason : null
}

/**
 * What a billing surface may show. 'wait' until the answer is in (never flash a
 * price), 'school' for a school-provided account or one that owns a covered
 * student, 'sell' otherwise.
 */
export function billingOffer(
  reason: SchoolProvidedReason | null | undefined,
  students: Pick<Student, 'school_covered'>[],
): 'wait' | 'school' | 'sell' {
  if (hasCoveredStudent(students as Student[])) return 'school'
  if (reason === undefined) return 'wait'
  return reason ? 'school' : 'sell'
}
