import { ACT_COLORS, SHARE_COLS } from '../constants.js'

export default function ZipCard({ z, selected, onClick }) {
  const domColor = ACT_COLORS[z.dominant_activity] || 'var(--text-dim)'
  return (
    <div
      className={`zip-card ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="zip-code">{z.zip_code}</div>
      <div className="zip-dominant" style={{ color: domColor }}>
        ▶ {z.dominant_activity}
      </div>
      <div className="zip-bars">
        {SHARE_COLS.map(s => {
          const val = z[s.key] || 0
          return (
            <div key={s.key} className="zip-bar-row">
              <div className="zip-bar-label">{s.label}</div>
              <div className="zip-bar-track">
                <div
                  className="zip-bar-fill"
                  style={{ width: `${(val * 100).toFixed(0)}%`, background: s.color }}
                />
              </div>
              <div className="zip-bar-val">{(val * 100).toFixed(0)}%</div>
            </div>
          )
        })}
      </div>
      <div className="zip-meta">
        {z.total_assets} assets · ${z.total_amt_m?.toFixed(1)}M
      </div>
    </div>
  )
}
