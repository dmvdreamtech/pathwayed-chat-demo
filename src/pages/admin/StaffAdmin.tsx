import { useCallback, useEffect, useState, type ChangeEvent } from 'react'
import { StaffShell } from '@/components/staff/StaffShell'
import { useAuth } from '@/context/AuthContext'
import {
  ROLE_LABEL,
  STAFF_ROLES,
  checkStaffInput,
  loadStaffList,
  loadStaffSchools,
  normalizeRole,
  previewCsv,
  saveStaff,
  savedMessage,
  setStaffActive,
  setStaffRole,
  type CsvPreview,
  type PreviewStatus,
  type StaffMember,
  type StaffRole,
  type StaffSchool,
} from '@/lib/staffAdmin'

const STATUS_LABEL: Record<PreviewStatus, string> = {
  new: 'New',
  update: 'Update',
  reactivate: 'Reactivate',
  unchanged: 'No change',
  error: 'Fix this row',
}
const TEMPLATE = 'data:text/csv;charset=utf-8,' + encodeURIComponent('email,full_name,role\nteacher@school.org,Jordan Smith,teacher\n')

/**
 * /admin/staff: who is on each school's staff list in the tutoring app, and
 * what they can see. Platform admins only; the database refuses everyone else
 * (migration 0038), and this page says so. Nobody is ever deleted: a person is
 * deactivated, and an upload or "add" with their email brings them back.
 */
export function StaffAdmin() {
  const { user, loading } = useAuth()
  const [schools, setSchools] = useState<StaffSchool[] | null>(null)
  const [denied, setDenied] = useState<'not_admin' | 'failed' | null>(null)
  const [schoolId, setSchoolId] = useState('')
  const [staff, setStaff] = useState<StaffMember[] | null>(null)
  const [notice, setNotice] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const [confirmOff, setConfirmOff] = useState<string | null>(null)
  const [preview, setPreview] = useState<{ name: string; result: CsvPreview } | null>(null)
  const [one, setOne] = useState({ email: '', full_name: '', role: 'teacher' })
  const [oneProblems, setOneProblems] = useState<string[]>([])

  useEffect(() => {
    if (loading || !user) return
    let active = true
    loadStaffSchools().then((r) => {
      if (!active) return
      if (!r.ok) return setDenied(r.reason)
      setSchools(r.value)
      if (r.value.length === 1) setSchoolId(r.value[0].schoolId)
    })
    return () => {
      active = false
    }
  }, [loading, user])

  const refresh = useCallback(async (id: string) => {
    const r = await loadStaffList(id)
    if (r.ok) setStaff(r.value)
    else setNotice({ kind: 'err', text: 'We could not load the staff list. Refreshing usually fixes it.' })
  }, [])

  useEffect(() => {
    if (!schoolId) return
    let active = true
    loadStaffList(schoolId).then((r) => {
      if (!active) return
      if (r.ok) setStaff(r.value)
      else setNotice({ kind: 'err', text: 'We could not load the staff list. Refreshing usually fixes it.' })
    })
    return () => {
      active = false
    }
  }, [schoolId])

  const chooseSchool = (id: string) => {
    setSchoolId(id)
    setStaff(null)
    setPreview(null)
    setNotice(null)
  }

  const school = schools?.find((s) => s.schoolId === schoolId) ?? null

  const run = async (work: () => Promise<{ ok: boolean; message?: string }>, done: string) => {
    setBusy(true)
    setNotice(null)
    const r = await work()
    setBusy(false)
    if (r.ok) setNotice({ kind: 'ok', text: done })
    else setNotice({ kind: 'err', text: r.message ? `Not saved: ${r.message}` : 'Not saved. Please try again.' })
    if (schoolId) await refresh(schoolId)
    return r.ok
  }

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file || !staff || !school) return
    setPreview({ name: file.name, result: previewCsv(await file.text(), staff, school.domains) })
  }

  const saveUpload = async () => {
    if (!preview || !preview.result.toSave.length) return
    let message = ''
    const ok = await run(async () => {
      const r = await saveStaff(schoolId, preview.result.toSave)
      if (r.ok) message = savedMessage(r.value)
      return r.ok ? { ok: true } : { ok: false, message: r.message }
    }, '')
    if (ok) {
      setNotice({ kind: 'ok', text: message })
      setPreview(null)
    }
  }

  const addOne = async () => {
    const problems = checkStaffInput(one.email, one.full_name, one.role)
    setOneProblems(problems)
    if (problems.length) return
    const input = { email: one.email.trim().toLowerCase(), full_name: one.full_name.trim(), role: normalizeRole(one.role)! }
    const existing = staff?.find((m) => m.email === input.email)
    const ok = await run(
      async () => saveStaff(schoolId, [input]),
      existing ? `${input.full_name} was already on the list and is now up to date.` : `Added ${input.full_name}.`,
    )
    if (ok) setOne({ email: '', full_name: '', role: 'teacher' })
  }

  if (!loading && !user) {
    return (
      <StaffShell>
        <div className="panel">
          <p className="muted">Sign in with a platform admin account to manage school staff.</p>
        </div>
      </StaffShell>
    )
  }
  if (denied) {
    return (
      <StaffShell>
        <div className="panel">
          <p className="muted">
            {denied === 'not_admin'
              ? 'This page is for PathwayEd platform admins.'
              : 'We could not load schools right now. Refreshing usually fixes it.'}
          </p>
        </div>
      </StaffShell>
    )
  }
  if (!schools) {
    return (
      <StaffShell>
        <div className="panel">
          <p className="muted">Loading schools...</p>
        </div>
      </StaffShell>
    )
  }

  return (
    <StaffShell>
      <h1 className="greet" style={{ marginTop: 18 }}>
        School staff
      </h1>
      <p className="muted staff-small">
        Who can open the staff view in PathwayEd tutoring. Teachers see progress; guidance, admins and academic deans
        also see test scores. People sign in with Google using the email listed here. Nobody is deleted: deactivate
        someone to remove their access.
      </p>

      <div className="panel staff-admin-bar">
        <label className="staff-label" htmlFor="school">
          School
        </label>
        <select id="school" value={schoolId} onChange={(e) => chooseSchool(e.target.value)}>
          <option value="">Choose a school</option>
          {schools.map((s) => (
            <option key={s.schoolId} value={s.schoolId}>
              {s.name} ({s.staffActive} active)
            </option>
          ))}
        </select>
        {school && <span className="muted staff-small">Addresses: {school.domains.join(', ')}</span>}
      </div>

      {notice && (
        <div className={`panel staff-notice ${notice.kind}`} role="status">
          {notice.text}
        </div>
      )}

      {school && (
        <>
          <section className="panel staff-activity">
            <h2 className="staff-h2">Staff ({staff ? staff.filter((m) => m.active).length : '...'} active)</h2>
            {!staff ? (
              <p className="muted">Loading...</p>
            ) : staff.length === 0 ? (
              <p className="muted">No staff yet. Add one person or upload a CSV below.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Status</th>
                    <th scope="col">Signed in</th>
                    <th scope="col">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((m) => (
                    <tr key={m.id} className={m.active ? '' : 'staff-row-off'}>
                      <td>{m.fullName ?? <span className="muted">No name</span>}</td>
                      <td>{m.email}</td>
                      <td>
                        <select
                          aria-label={`Role for ${m.email}`}
                          value={m.role}
                          disabled={busy || !m.active}
                          onChange={(e) =>
                            void run(
                              async () => setStaffRole(m.id, e.target.value as StaffRole),
                              `${m.fullName ?? m.email} is now ${ROLE_LABEL[e.target.value as StaffRole]}.`,
                            )
                          }
                        >
                          {STAFF_ROLES.map((r) => (
                            <option key={r} value={r}>
                              {ROLE_LABEL[r]}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>{m.active ? 'Active' : 'Deactivated'}</td>
                      <td>{m.linked ? 'Yes' : 'Not yet'}</td>
                      <td>
                        {m.active ? (
                          confirmOff === m.id ? (
                            <span className="staff-confirm">
                              <button
                                type="button"
                                className="link staff-danger"
                                disabled={busy}
                                onClick={() => {
                                  setConfirmOff(null)
                                  void run(async () => setStaffActive(m.id, false), `${m.fullName ?? m.email} is deactivated.`)
                                }}
                              >
                                Confirm
                              </button>
                              <button type="button" className="link" onClick={() => setConfirmOff(null)}>
                                Cancel
                              </button>
                            </span>
                          ) : (
                            <button type="button" className="link" disabled={busy} onClick={() => setConfirmOff(m.id)}>
                              Deactivate
                            </button>
                          )
                        ) : (
                          <button
                            type="button"
                            className="link"
                            disabled={busy}
                            onClick={() =>
                              void run(async () => setStaffActive(m.id, true), `${m.fullName ?? m.email} is active again.`)
                            }
                          >
                            Reactivate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          <section className="panel">
            <h2 className="staff-h2">Add one person</h2>
            <div className="staff-add">
              <label>
                <span className="staff-label">Email</span>
                <input
                  type="email"
                  value={one.email}
                  onChange={(e) => setOne({ ...one, email: e.target.value })}
                  placeholder={`name@${school.domains[0] ?? 'school.org'}`}
                />
              </label>
              <label>
                <span className="staff-label">Full name</span>
                <input value={one.full_name} onChange={(e) => setOne({ ...one, full_name: e.target.value })} />
              </label>
              <label>
                <span className="staff-label">Role</span>
                <select value={one.role} onChange={(e) => setOne({ ...one, role: e.target.value })}>
                  {STAFF_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {ROLE_LABEL[r]}
                    </option>
                  ))}
                </select>
              </label>
              <button type="button" className="btn btn-primary" disabled={busy} onClick={() => void addOne()}>
                Add
              </button>
            </div>
            {oneProblems.length > 0 && <p className="err">{oneProblems.join('. ')}.</p>}
          </section>

          <section className="panel staff-activity">
            <h2 className="staff-h2">Upload a CSV</h2>
            <p className="muted staff-small">
              Columns: email, full_name, role (teacher, guidance, admin or academic dean). The first line names the
              columns. You will see what changes before anything is saved.{' '}
              <a href={TEMPLATE} download="staff-template.csv">
                Download a template
              </a>
            </p>
            <input type="file" accept=".csv,text/csv" disabled={!staff || busy} onChange={(e) => void onFile(e)} />

            {preview && (
              <div className="staff-preview">
                {preview.result.fileError ? (
                  <p className="err">
                    {preview.name}: {preview.result.fileError}
                  </p>
                ) : (
                  <>
                    <p className="staff-small">
                      <b>{preview.name}</b>: {preview.result.counts.new} new, {preview.result.counts.update} to update,{' '}
                      {preview.result.counts.reactivate} to reactivate, {preview.result.counts.unchanged} with no change
                      {preview.result.counts.error ? (
                        <>
                          , <b className="staff-danger">{preview.result.counts.error} to fix</b>
                        </>
                      ) : null}
                      .
                    </p>
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">Line</th>
                          <th scope="col">Email</th>
                          <th scope="col">Name</th>
                          <th scope="col">Role</th>
                          <th scope="col">What happens</th>
                        </tr>
                      </thead>
                      <tbody>
                        {preview.result.rows.map((r) => (
                          <tr key={r.line} className={r.status === 'error' ? 'staff-row-bad' : ''}>
                            <td>{r.line}</td>
                            <td>{r.email || <span className="muted">blank</span>}</td>
                            <td>{r.fullName || <span className="muted">blank</span>}</td>
                            <td>{r.role || <span className="muted">blank</span>}</td>
                            <td className="staff-wrap">
                              <b>{STATUS_LABEL[r.status]}</b>
                              {r.problems.length > 0 && <>: {r.problems.join('. ')}</>}
                              {r.warnings.length > 0 && <span className="muted">. {r.warnings.join('. ')}</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="staff-preview-actions">
                      <button
                        type="button"
                        className="btn btn-primary"
                        disabled={busy || preview.result.toSave.length === 0}
                        onClick={() => void saveUpload()}
                      >
                        Save {preview.result.toSave.length} {preview.result.toSave.length === 1 ? 'person' : 'people'}
                      </button>
                      <button type="button" className="link" onClick={() => setPreview(null)}>
                        Cancel
                      </button>
                      {preview.result.counts.error > 0 && (
                        <span className="muted staff-small">
                          Rows to fix are not saved. Fix them in the file and upload it again.
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </section>
        </>
      )}
    </StaffShell>
  )
}
