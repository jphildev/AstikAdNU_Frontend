import { Link } from 'react-router'
import './ApplicationStatus.css'

// Sample data until the student application endpoints exist.
const application = {
  id: 'VG-2026-01482',
  submittedAt: 'October 27, 2026 • 12:34 PM',
  status: 'Pending',
  currentStep: 1,
  vehicle: [
    { label: 'Vehicle type', value: 'Motorcycle' },
    { label: 'Plate number', value: 'NCC 123' },
    { label: 'Make and model', value: 'Honda Click 125i' },
    { label: 'Color', value: 'Black' },
    { label: 'Sticker restriction', value: 'Monday' },
    { label: 'Sticker validity', value: 'SY 2026–2027' },
  ],
  requirements: [
    { label: 'Driver’s License', uploaded: true },
    { label: 'Official Receipt', uploaded: true },
    { label: 'School ID', uploaded: true },
  ],
}

const STEPS = [
  { title: 'Submitted', text: 'Your application was received.' },
  { title: 'Under review', text: 'The security office is checking your documents.' },
  { title: 'Approved', text: 'Your application has been approved.' },
  { title: 'Sticker released', text: 'Claim your sticker at the security office.' },
]

function stepState(index, current) {
  if (index < current) return 'done'
  if (index === current) return 'current'
  return 'upcoming'
}

export default function ApplicationStatus() {
  if (!application) {
    return (
      <>
        <header className="page-header">
          <h1>Application Status</h1>
          <p>Track the progress of your car sticker application.</p>
        </header>
        <section className="as-card as-empty">
          <h2>No application yet</h2>
          <p>Apply for a car sticker to see its status here.</p>
          <Link className="as-button" to="/vehicle-registration">
            Apply for Car Sticker
          </Link>
        </section>
      </>
    )
  }

  const { id, submittedAt, status, currentStep, vehicle, requirements } = application

  return (
    <>
      <header className="page-header">
        <h1>Application Status</h1>
        <p>Track the progress of your car sticker application.</p>
      </header>

      <div className="as-stack">
        <section className="as-card as-summary">
          <div>
            <p className="as-label">Reference number</p>
            <p className="as-reference">{id}</p>
            <p className="as-date">Submitted on {submittedAt}</p>
          </div>
          <span className={`as-status as-status-${status.toLowerCase()}`}>{status}</span>
        </section>

        <section className="as-card">
          <h2>Progress</h2>
          <ol className="as-steps">
            {STEPS.map(({ title, text }, index) => {
              const state = stepState(index, currentStep)
              return (
                <li
                  key={title}
                  className={`as-step as-step-${state}`}
                  aria-current={state === 'current' ? 'step' : undefined}
                >
                  <span className="as-step-marker" aria-hidden="true">
                    {state === 'done' ? '✓' : index + 1}
                  </span>
                  <div>
                    <p className="as-step-title">{title}</p>
                    <p className="as-step-text">{text}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </section>

        <div className="as-grid">
          <section className="as-card">
            <h2>Vehicle details</h2>
            <dl className="as-details">
              {vehicle.map(({ label, value }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="as-card">
            <h2>Requirements</h2>
            <ul className="as-requirements">
              {requirements.map(({ label, uploaded }) => (
                <li key={label}>
                  <span>{label}</span>
                  <span className={uploaded ? 'as-req as-req-ok' : 'as-req as-req-missing'}>
                    {uploaded ? 'Uploaded' : 'Missing'}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="as-card as-next">
          <h2>What happens next</h2>
          <p>
            The security office is reviewing your application. You will be notified via email once it’s
            approved. Bring your school ID when you claim your sticker.
          </p>
        </section>
      </div>
    </>
  )
}
