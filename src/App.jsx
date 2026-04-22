import React from 'react'
import Header from './components/Header.jsx'
import Tabs from './components/Tabs.jsx'
import ScatterModule from './components/ScatterModule/index.jsx'
import MapModule from './components/MapModule/index.jsx'
import { generateMockScatter, generateMockMap } from './mockData.js'

const TABS = [
  { id: 'scatter', label: 'Innovation–Production Index' },
  { id: 'map',     label: 'ZIP Activity Map · Philadelphia' },
]

export default function App() {
  const [tab, setTab]               = React.useState('scatter')
  const [scatterData, setScatterData] = React.useState(null)
  const [mapData, setMapData]         = React.useState(null)
  const [usingMock, setUsingMock]     = React.useState(false)

  React.useEffect(() => {
    fetch('/data/scatter_index.json')
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(d => setScatterData(d))
      .catch(() => { setScatterData(generateMockScatter()); setUsingMock(true) })

    fetch('/data/map_philly.json')
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(d => setMapData(d))
      .catch(() => setMapData(generateMockMap()))
  }, [])

  if (!scatterData || !mapData) {
    return <div className="loading">Loading data…</div>
  }

  return (
    <div className="app">
      <Header usingMock={usingMock} />
      <Tabs tabs={TABS} active={tab} onChange={setTab} />
      <div className="main">
        {tab === 'scatter' && <ScatterModule data={scatterData} />}
        {tab === 'map'     && <MapModule     data={mapData}     />}
      </div>
    </div>
  )
}
