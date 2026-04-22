export default function Header({ usingMock }) {
  return (
    <div className="header">
      <h1>PuntoLab <span>Defense Economy</span> Dashboard</h1>
      <span className="header-tag">Bases 25.3</span>
      {usingMock && (
        <span className="header-tag header-tag--outline">Mock Data</span>
      )}
    </div>
  )
}
