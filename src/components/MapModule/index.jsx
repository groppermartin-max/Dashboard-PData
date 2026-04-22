import React from 'react'
import PhillyMap from './PhillyMap.jsx'
import ZipCard from '../ZipCard.jsx'
import InfoBar from '../InfoBar.jsx'
import { ACT_COLORS, ACTIVITIES } from '../../constants.js'

const SORT_OPTIONS = [
  { value: 'total_amt_m',       label: 'USD Allocations' },
  { value: 'total_assets',      label: 'Number of Assets' },
  { value: 'share_innovation',  label: 'Innovation Share' },
  { value: 'share_production',  label: 'Production Share' },
  { value: 'share_services',    label: 'Services Share' },
  { value: 'share_logistics',   label: 'Logistics Share' },
]

export default function MapModule({ data }) {
  const [sortBy, setSortBy]     = React.useState('total_amt_m')
  const [filterAct, setFilterAct] = React.useState('all')
  const [selectedZip, setSelectedZip] = React.useState(null)

  const actDist = React.useMemo(() => {
    const counts = {}
    data.forEach(z => {
      counts[z.dominant_activity] = (counts[z.dominant_activity] || 0) + 1
    })
    return counts
  }, [data])

  const displayed = React.useMemo(() => {
    let d = [...data]
    if (filterAct !== 'all') d = d.filter(z => z.dominant_activity === filterAct)
    d.sort((a, b) => (b[sortBy] || 0) - (a[sortBy] || 0))
    return d
  }, [data, sortBy, filterAct])

  const infoStats = [
    { value: displayed.length, label: 'ZIP Codes shown' },
    ...Object.entries(actDist).map(([act, n]) => ({
      value: n,
      label: `Dominant: ${act}`,
      color: ACT_COLORS[act],
    })),
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      <div className="map-notice">
        <h3>Philadelphia MSA — ZIP Code Activity Map</h3>
        <p>
          Circle markers show each ZIP code. Size = number of assets; color = dominant activity.
          Click a marker or a card to select. Run <code>02_export_map.R</code> to regenerate{' '}
          <code>map_philly.json</code>.
        </p>
      </div>

      <div className="controls">
        <span className="ctrl-label">Dominant Activity</span>
        <div className="toggle-group">
          <button
            className={`toggle-btn ${filterAct === 'all' ? 'active' : ''}`}
            onClick={() => setFilterAct('all')}
          >All</button>
          {ACTIVITIES.map(a => (
            <button
              key={a}
              className={`toggle-btn ${filterAct === a ? 'active' : ''}`}
              style={filterAct === a
                ? {}
                : { borderColor: ACT_COLORS[a], color: ACT_COLORS[a] }}
              onClick={() => setFilterAct(a)}
            >
              {a} {actDist[a] ? `(${actDist[a]})` : ''}
            </button>
          ))}
        </div>
        <span className="ctrl-label" style={{ marginLeft: 'auto' }}>Sort sidebar by</span>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          {SORT_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <InfoBar stats={infoStats} />

      <div className="map-layout">
        <div className="map-container">
          <PhillyMap
            data={displayed}
            selectedZip={selectedZip}
            onSelect={setSelectedZip}
          />
        </div>

        <div className="map-sidebar">
          <div className="zip-grid">
            {displayed.slice(0, 40).map(z => (
              <ZipCard
                key={z.zip_code}
                z={z}
                selected={selectedZip === z.zip_code}
                onClick={() => setSelectedZip(
                  selectedZip === z.zip_code ? null : z.zip_code
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
