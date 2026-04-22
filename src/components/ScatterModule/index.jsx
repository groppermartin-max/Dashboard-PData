import React from 'react'
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Label,
} from 'recharts'
import { DIM_OPTIONS, scoreField } from '../../constants.js'
import ScatterTooltip from './ScatterTooltip.jsx'
import InfoBar from '../InfoBar.jsx'

export default function ScatterModule({ data }) {
  const [xDim, setXDim]   = React.useState('innovation')
  const [yDim, setYDim]   = React.useState('production')
  const [filter, setFilter] = React.useState('top50')

  const filtered = React.useMemo(() => {
    let d = data.filter(m =>
      m[scoreField(xDim)] != null && m[scoreField(yDim)] != null
    )
    if (filter === 'top50') d = d.filter(m => m.top50)
    return d
  }, [data, xDim, yDim, filter])

  const xOpt = DIM_OPTIONS.find(o => o.value === xDim)
  const yOpt = DIM_OPTIONS.find(o => o.value === yDim)

  const infoStats = [
    { value: filtered.length, label: 'MSAs shown' },
    { value: xOpt.label, label: 'X Axis', color: xOpt.color },
    { value: yOpt.label, label: 'Y Axis', color: yOpt.color },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      <div className="controls">
        <span className="ctrl-label">X Axis</span>
        <select value={xDim} onChange={e => setXDim(e.target.value)}>
          {DIM_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        <span className="ctrl-label" style={{ marginLeft: 8 }}>Y Axis</span>
        <select value={yDim} onChange={e => setYDim(e.target.value)}>
          {DIM_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="ctrl-label">Filter</span>
          <div className="toggle-group">
            <button
              className={`toggle-btn ${filter === 'top50' ? 'active' : ''}`}
              onClick={() => setFilter('top50')}
            >Top 50</button>
            <button
              className={`toggle-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >All MSAs</button>
          </div>
        </div>
      </div>

      <InfoBar
        stats={infoStats}
        note="Score = avg(rank assets, rank USD). Lower score = higher rank."
      />

      <div className="scatter-wrap">
        <div className="scatter-title">
          <strong>{xOpt.label}</strong> vs <strong>{yOpt.label}</strong> — Defense Economy Index
        </div>

        <ResponsiveContainer width="100%" height={440}>
          <ScatterChart margin={{ top: 10, right: 30, bottom: 40, left: 30 }}>
            <CartesianGrid stroke="#2a3f5c" strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey={scoreField(xDim)}
              name={xOpt.label}
              tick={{ fill: '#8aa0ba', fontSize: 11 }}
              reversed
            >
              <Label
                value={`${xOpt.label} Score (lower = better)`}
                position="insideBottom"
                offset={-20}
                fill="#8aa0ba"
                fontSize={11}
              />
            </XAxis>
            <YAxis
              type="number"
              dataKey={scoreField(yDim)}
              name={yOpt.label}
              tick={{ fill: '#8aa0ba', fontSize: 11 }}
              reversed
            >
              <Label
                value={`${yOpt.label} Score`}
                angle={-90}
                position="insideLeft"
                offset={10}
                fill="#8aa0ba"
                fontSize={11}
              />
            </YAxis>
            <Tooltip
              content={<ScatterTooltip xDim={xDim} yDim={yDim} />}
            />
            <Scatter
              data={filtered}
              fill={xOpt.color}
              fillOpacity={0.75}
              r={5}
            />
          </ScatterChart>
        </ResponsiveContainer>

        <div className="dim-legend">
          {DIM_OPTIONS.map(o => (
            <div key={o.value} className="dim-item">
              <span className="dim-dot" style={{ background: o.color }} />
              {o.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
