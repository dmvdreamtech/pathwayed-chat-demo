import { describe, it, expect, vi } from 'vitest'

vi.mock('@/lib/supabase', () => ({ supabase: {} }))

import { checkStaffInput, normalizeRole, parseCsv, previewCsv, savedMessage, type StaffMember } from './staffAdmin'

const current: StaffMember[] = [
  { id: '1', email: 'teach@pallottihs.info', fullName: 'Pat Teach', role: 'teacher', active: true, linked: true },
  { id: '2', email: 'gone@pallottihs.info', fullName: 'Old Timer', role: 'teacher', active: false, linked: false },
  { id: '3', email: 'same@pallottihs.info', fullName: 'Sam E', role: 'guidance', active: true, linked: false },
]
const DOMAINS = ['pallottihs.info']

describe('CSV reading', () => {
  it('handles quotes, commas in quotes, doubled quotes, CRLF, a BOM and blank lines', () => {
    expect(parseCsv('﻿email,full_name,role\r\n"a@x.org","Lee, Jr.",teacher\r\n\r\nb@x.org,"Say ""Hi""",admin\n')).toEqual([
      ['email', 'full_name', 'role'],
      ['a@x.org', 'Lee, Jr.', 'teacher'],
      ['b@x.org', 'Say "Hi"', 'admin'],
    ])
  })
  it('keeps a last line with no newline', () => {
    expect(parseCsv('a,b\nc,d')).toEqual([['a', 'b'], ['c', 'd']])
  })
})

describe('row checks (the same ones the database runs)', () => {
  it('reads roles the way people write them', () => {
    expect(normalizeRole('Academic Dean')).toBe('academic_dean')
    expect(normalizeRole(' TEACHER ')).toBe('teacher')
    expect(normalizeRole('academic-dean')).toBe('academic_dean')
    expect(normalizeRole('principal')).toBeNull()
  })
  it('flags each problem in plain words', () => {
    expect(checkStaffInput('nope', '', 'boss')).toEqual([
      'nope is not an email address',
      'Name is missing',
      '"boss" is not a role (teacher, guidance, admin, academic dean)',
    ])
    expect(checkStaffInput('Ok@School.org', 'Ok Person', 'guidance')).toEqual([])
  })
})

describe('CSV preview', () => {
  const csv = [
    'Role,Email,Full Name',
    'teacher,new@pallottihs.info,New Person',
    'guidance,teach@pallottihs.info,Pat Teach',
    'teacher,gone@pallottihs.info,Old Timer',
    'guidance,same@pallottihs.info,Sam E',
    'principal,bad@pallottihs.info,Bad Role',
    'teacher,NEW@pallottihs.info,Dupe',
    'admin,owner@dmvdream.org,Owner',
  ].join('\n')
  const p = previewCsv(csv, current, DOMAINS)

  it('says what each line will do, columns in any order', () => {
    expect(p.fileError).toBeNull()
    expect(p.rows.map((r) => [r.line, r.status])).toEqual([
      [2, 'new'],
      [3, 'update'],
      [4, 'reactivate'],
      [5, 'unchanged'],
      [6, 'error'],
      [7, 'error'],
      [8, 'new'],
    ])
    expect(p.counts).toEqual({ new: 2, update: 1, reactivate: 1, unchanged: 1, error: 2 })
  })

  it('flags bad rows with the reason, including a repeated email', () => {
    expect(p.rows[4].problems[0]).toMatch(/not a role/)
    expect(p.rows[5].problems).toEqual(['Same email as line 2'])
  })

  it('warns, without refusing, when someone is not at a school address', () => {
    expect(p.rows[6].warnings[0]).toMatch(/Not a school address/)
    expect(p.rows[6].status).toBe('new')
  })

  it('saves only the clean rows that change something, normalized', () => {
    expect(p.toSave).toEqual([
      { email: 'new@pallottihs.info', full_name: 'New Person', role: 'teacher' },
      { email: 'teach@pallottihs.info', full_name: 'Pat Teach', role: 'guidance' },
      { email: 'gone@pallottihs.info', full_name: 'Old Timer', role: 'teacher' },
      { email: 'owner@dmvdream.org', full_name: 'Owner', role: 'admin' },
    ])
  })

  it('explains a file it cannot read', () => {
    expect(previewCsv('', current, DOMAINS).fileError).toBe('The file is empty.')
    expect(previewCsv('email,name\na@x.org,A', current, DOMAINS).fileError).toMatch(/Missing: role/)
    expect(previewCsv('email,full_name,role\n', current, DOMAINS).fileError).toMatch(/no people/)
    const big = 'email,full_name,role\n' + Array.from({ length: 501 }, (_, i) => `p${i}@x.org,P ${i},teacher`).join('\n')
    expect(previewCsv(big, current, DOMAINS).fileError).toMatch(/At most 500/)
  })
})

describe('messages', () => {
  it('summarizes a save', () => {
    expect(savedMessage({ added: 2, updated: 1, reactivated: 0, unchanged: 3 })).toBe(
      'Added 2, updated 1, reactivated 0. 3 already up to date.',
    )
  })
})
