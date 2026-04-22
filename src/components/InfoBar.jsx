export default function InfoBar({ stats, note }) {
  return (
    <div className="info-bar">
      {stats.map((s, i) => (
        <div key={i} className="info-stat">
          <span className="val" style={s.color ? { color: s.color } : undefined}>{s.value}</span>
          <span className="lbl">{s.label}</span>
        </div>
      ))}
      {note && (
        <div style={{ marginLeft: 'auto', alignSelf: 'center' }}>
          <span className="note">{note}</span>
        </div>
      )}
    </div>
  )
}
