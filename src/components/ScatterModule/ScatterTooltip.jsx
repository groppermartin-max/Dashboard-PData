import { DIM_OPTIONS, scoreField, rankField } from '../../constants.js'

export default function ScatterTooltip({ active, payload, xDim, yDim }) {
  if (!active || !payload?.length) return null
  const d = payload[0]?.payload
  if (!d) return null
  const xLabel = DIM_OPTIONS.find(o => o.value === xDim)?.label
  const yLabel = DIM_OPTIONS.find(o => o.value === yDim)?.label
  return (
    <div className="tooltip-box">
      <div className="t-msa">{d.msa}</div>
      <div className="t-row"><span>{xLabel} Score</span><span>{d[scoreField(xDim)]?.toFixed(1)}</span></div>
      <div className="t-row"><span>{xLabel} Rank</span><span>#{d[rankField(xDim)]}</span></div>
      <div className="t-row"><span>{yLabel} Score</span><span>{d[scoreField(yDim)]?.toFixed(1)}</span></div>
      <div className="t-row"><span>{yLabel} Rank</span><span>#{d[rankField(yDim)]}</span></div>
      <div className="t-row"><span>Total USD (M)</span><span>${d.amt_total_m?.toFixed(0)}</span></div>
    </div>
  )
}
