import { useSearchParams } from 'react-router'
import campusMap from '../../assets/campus-map.png'
import './CampusParking.css'

// Sample occupancy until the parking endpoints exist.
// x / y are the pin tip position as a percentage of the map image.
const LOTS = [
  { id: 'A', total: 16, occupied: 4, x: 60.7, y: 12.6 },
  { id: 'B', total: 24, occupied: 10, x: 66.9, y: 29 },
  { id: 'C', total: 24, occupied: 8, x: 41.3, y: 81 },
]

function StatCard({ label, value, tone }) {
  return (
    <section className="cp-stat">
      <h2>{label}</h2>
      <p className={tone ? `cp-stat-value cp-stat-${tone}` : 'cp-stat-value'}>{value}</p>
    </section>
  )
}

export default function CampusParking() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selected = LOTS.find((lot) => lot.id === searchParams.get('lot')?.toUpperCase())

  const total = selected ? selected.total : LOTS.reduce((sum, lot) => sum + lot.total, 0)
  const occupied = selected ? selected.occupied : LOTS.reduce((sum, lot) => sum + lot.occupied, 0)
  const vacant = total - occupied

  const pins = selected ? [selected] : LOTS
  const name = selected && `Lot ${selected.id}`

  function selectLot(id) {
    setSearchParams(id ? { lot: id } : {})
  }

  return (
    <>
      <header className="page-header cp-header">
        <div>
          <h1>{selected ? `${name} Detail` : 'Campus Parking'}</h1>
          <p>{selected ? 'selected lot overview' : 'real-time parking map'}</p>
        </div>
        <span className="cp-pill">Sample availability</span>
      </header>

      <section className="cp-card">
        <div className="cp-card-head">
          <div>
            <h2>{selected ? `${name} Overview` : 'Campus Parking Map'}</h2>
            <p>
              Ateneo de Naga University · {selected ? `${name} selected` : 'sample lot positions'}
            </p>
          </div>
          <ul className="cp-legend">
            <li>
              <span className="cp-swatch cp-swatch-vacant" aria-hidden="true" />
              Vacant
            </li>
            <li>
              <span className="cp-swatch cp-swatch-occupied" aria-hidden="true" />
              Occupied
            </li>
          </ul>
        </div>

        <div className="cp-map">
          <img
            src={campusMap}
            alt="Map of Ateneo de Naga University and the surrounding streets."
            width="1626"
            height="840"
          />

          {pins.map((lot) => {
            const full = lot.total - lot.occupied <= 0
            const isSelected = selected?.id === lot.id
            return (
              <button
                key={lot.id}
                type="button"
                className={full ? 'cp-pin cp-pin-full' : 'cp-pin'}
                style={{ left: `${lot.x}%`, top: `${lot.y}%` }}
                aria-pressed={isSelected}
                aria-label={`Lot ${lot.id}: ${lot.total - lot.occupied} of ${lot.total} spaces vacant`}
                onClick={() => selectLot(isSelected ? null : lot.id)}
              >
                Lot {lot.id}
                {isSelected && ' · selected'}
              </button>
            )
          })}

          <p className="cp-map-note cp-map-note-left">
            {selected ? `${name} selected · sample occupancy` : 'Lot positions are illustrative'}
          </p>
          <p className="cp-map-note cp-map-note-right">Google Maps · ©2026 Google</p>
        </div>

        {selected && (
          <button type="button" className="cp-back" onClick={() => selectLot(null)}>
            ← Show all lots
          </button>
        )}
      </section>

      <div className="cp-stats" aria-live="polite">
        <StatCard label={selected ? `${name} total spaces` : 'Total spaces'} value={total} />
        <StatCard label={selected ? `${name} empty spaces` : 'Vacant spaces'} value={vacant} tone="vacant" />
        <StatCard label={selected ? `${name} vehicles parked` : 'Occupied spaces'} value={occupied} />
      </div>
    </>
  )
}
