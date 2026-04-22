import React from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import { ACT_COLORS, SHARE_COLS } from '../../constants.js'

// Radius scaled by total assets (min 5, max 20)
function radius(z, maxAssets) {
  return 5 + (z.total_assets / maxAssets) * 15
}

function FlyTo({ center, zoom }) {
  const map = useMap()
  React.useEffect(() => {
    map.flyTo(center, zoom, { duration: 0.8 })
  }, [center, zoom, map])
  return null
}

export default function PhillyMap({ data, selectedZip, onSelect }) {
  const maxAssets = React.useMemo(
    () => Math.max(...data.map(z => z.total_assets || 0), 1),
    [data]
  )

  // Center on Philadelphia
  const center = [39.952, -75.165]

  return (
    <MapContainer
      center={center}
      zoom={11}
      scrollWheelZoom
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {data.map(z => {
        if (!z.lat_center || !z.lon_center) return null
        const color = ACT_COLORS[z.dominant_activity] || '#8aa0ba'
        const isSelected = selectedZip === z.zip_code
        return (
          <CircleMarker
            key={z.zip_code}
            center={[z.lat_center, z.lon_center]}
            radius={radius(z, maxAssets)}
            pathOptions={{
              color: isSelected ? '#FFD700' : color,
              fillColor: color,
              fillOpacity: isSelected ? 0.9 : 0.65,
              weight: isSelected ? 2 : 1,
            }}
            eventHandlers={{ click: () => onSelect(z.zip_code) }}
          >
            <Popup>
              <div className="popup-zip">{z.zip_code}</div>
              <div
                className="popup-dom"
                style={{ color: color }}
              >
                ▶ {z.dominant_activity}
              </div>
              {SHARE_COLS.map(s => (
                <div key={s.key} className="popup-row">
                  <span>{s.label}</span>
                  <span>{((z[s.key] || 0) * 100).toFixed(0)}%</span>
                </div>
              ))}
              <div className="popup-row" style={{ marginTop: 6 }}>
                <span>Assets</span><span>{z.total_assets}</span>
              </div>
              <div className="popup-row">
                <span>USD</span><span>${z.total_amt_m?.toFixed(1)}M</span>
              </div>
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
