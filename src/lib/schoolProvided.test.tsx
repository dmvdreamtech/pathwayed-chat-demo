import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import type { Student } from '@/lib/students'

// Who is signed in, as my_school_provided (migration 0037) would answer.
const who = vi.hoisted(() => ({ reason: null as string | null | undefined }))

vi.mock('@/lib/supabase', () => ({ supabase: {} }))
vi.mock('@/lib/profile', () => ({ getSubscription: () => new Promise(() => {}) }))
vi.mock('@/lib/prep/entitlements', async (orig) => ({
  ...(await orig<typeof import('@/lib/prep/entitlements')>()),
  getPrepEntitlements: () => new Promise(() => {}),
  getPrepSettings: () => new Promise(() => {}),
}))
vi.mock('@/lib/schoolProvided', async (orig) => ({
  ...(await orig<typeof import('@/lib/schoolProvided')>()),
  useSchoolProvided: () => who.reason,
}))

import { BillingPanel } from '@/components/BillingPanel'
import { AdmissionsPrepPanel } from '@/components/AdmissionsPrepPanel'
import { billingOffer, SCHOOL_PROVIDED_TITLE } from '@/lib/schoolProvided'

const kid = (school_covered: boolean) => ({ id: 'k1', first_name: 'Ana', grade: '10', active: true, school_covered }) as unknown as Student
const SELLING = /Subscribe|Choose a plan|\$\d|Add a test-prep module|free trial|days left/i

beforeEach(() => {
  who.reason = null
})

describe('billingOffer: the rule every billing surface uses', () => {
  it('staff, covered students, platform admins and school addresses are never sold to', () => {
    for (const r of ['school_staff', 'covered_student', 'platform_admin', 'school_domain'] as const) {
      expect(billingOffer(r, [])).toBe('school')
    }
  })
  it('a covered student in the database list is enough, whatever the tab says', () => {
    expect(billingOffer(null, [kid(true)])).toBe('school')
    expect(billingOffer(undefined, [kid(true)])).toBe('school')
  })
  it('waits for the answer rather than flash a price', () => {
    expect(billingOffer(undefined, [kid(false)])).toBe('wait')
  })
  it('a normal paying parent is offered plans', () => {
    expect(billingOffer(null, [kid(false)])).toBe('sell')
  })
})

describe('what the billing screens show', () => {
  for (const reason of ['school_staff', 'covered_student', 'platform_admin', 'school_domain']) {
    it(`${reason}: the billing panel says the school provides it, and sells nothing`, () => {
      who.reason = reason
      const html = renderToStaticMarkup(<BillingPanel students={[]} userId="u1" />)
      expect(html).toContain(SCHOOL_PROVIDED_TITLE)
      expect(html).not.toMatch(SELLING)
    })
    it(`${reason}: no prep purchase panel at all`, () => {
      who.reason = reason
      expect(renderToStaticMarkup(<AdmissionsPrepPanel students={[kid(false)]} userId="u1" />)).toBe('')
    })
  }

  it('a covered student found in the database list, with no school session in this tab', () => {
    who.reason = null
    const html = renderToStaticMarkup(<BillingPanel students={[kid(true)]} userId="u1" />)
    expect(html).toContain(SCHOOL_PROVIDED_TITLE)
    expect(html).not.toMatch(SELLING)
  })

  it('a normal paying parent still gets the prep purchase panel', () => {
    who.reason = null
    const html = renderToStaticMarkup(<AdmissionsPrepPanel students={[kid(false)]} userId="u1" />)
    expect(html).toContain('Admissions Prep')
    expect(html).toContain('Add a test-prep module')
  })

  it('a normal paying parent never sees the school note', () => {
    who.reason = null
    expect(renderToStaticMarkup(<BillingPanel students={[kid(false)]} userId="u1" />)).not.toContain(SCHOOL_PROVIDED_TITLE)
  })
})
