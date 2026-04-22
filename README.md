# PuntoLab — Defense Economy Dashboard

Interactive dashboard built with **Vite + React + Recharts + Leaflet** showing U.S. metropolitan area defense economy scores across four dimensions: Innovation, Production, Services, and Logistics.

## Stack

| Tool | Purpose |
|------|---------|
| Vite + React 18 | Frontend framework |
| Recharts | Scatter plot (Module A) |
| React-Leaflet + Leaflet | Interactive map with circle markers (Module B) |
| CartoDB Dark tiles | Basemap (no API key needed) |

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

> If `public/data/scatter_index.json` or `public/data/map_philly.json` are missing,
> the dashboard falls back to randomly generated mock data automatically.

## Data pipeline

```
R scripts  ──►  JSON files  ──►  Vite dev server  ──►  Browser
```

### 01_export_scatter.R → `public/data/scatter_index.json`

Exports one object per MSA (~800 total). Required fields per record:

| Field | Type | Description |
|-------|------|-------------|
| `msa` | string | MSA name, e.g. `"Philadelphia, PA"` |
| `top50` | boolean | Whether the MSA is in the national top 50 |
| `{dim}_score` | number | Composite score for each dimension (lower = better rank) |
| `{dim}_rank` | number | National rank for each dimension |
| `{dim}_assets` | number | Count of defense assets |
| `{dim}_amt` | number | USD allocation (millions) |
| `amt_total_m` | number | Total USD across all dimensions (millions) |

`{dim}` ∈ `innovation` | `production` | `services` | `logistics`

### 02_export_map.R → `public/data/map_philly.json`

Exports one object per ZIP code in the Philadelphia MSA. Required fields:

| Field | Type | Description |
|-------|------|-------------|
| `zip_code` | string | 5-digit ZIP |
| `dominant_activity` | string | Activity with highest USD share |
| `share_innovation` | number | 0–1 share of Innovation allocations |
| `share_production` | number | 0–1 share of Production allocations |
| `share_services` | number | 0–1 share of Services allocations |
| `share_logistics` | number | 0–1 share of Logistics allocations |
| `total_assets` | number | Count of defense assets |
| `total_amt_m` | number | Total USD (millions) |
| `lat_center` | number | ZIP centroid latitude |
| `lon_center` | number | ZIP centroid longitude |
| `orgs` | string | Pipe-separated list of organizations |

## Project structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Tabs.jsx
│   ├── InfoBar.jsx
│   ├── ZipCard.jsx
│   ├── ScatterModule/
│   │   ├── index.jsx        # Scatter plot with axis/filter controls
│   │   └── ScatterTooltip.jsx
│   └── MapModule/
│       ├── index.jsx        # Controls, sidebar, layout
│       └── PhillyMap.jsx    # Leaflet map with CircleMarkers
├── constants.js             # Colors, dimension options, MSA options
├── mockData.js              # Fallback generators
├── App.jsx
├── main.jsx
└── index.css                # Design tokens (navy/gold) + all styles
public/
└── data/
    ├── scatter_index.json
    └── map_philly.json
```

## Adding a new MSA

1. Export a new `map_{msa}.json` from R with the same schema as Philly.
2. Add an entry to `MSA_OPTIONS` in `src/constants.js`:
   ```js
   { value: 'boston', label: 'Boston, MA', dataFile: '/data/map_boston.json' }
   ```
3. Wire `App.jsx` to fetch based on the selected MSA and pass it to `MapModule`.

## Color scheme

| Token | Hex | Use |
|-------|-----|-----|
| `--navy` | `#1F3864` | Header background, tooltips |
| `--gold` | `#FFD700` | Accents, active states |
| `--innov` | `#60a5fa` | Innovation dimension |
| `--prod` | `#f59e0b` | Production dimension |
| `--serv` | `#34d399` | Services dimension |
| `--log` | `#c084fc` | Logistics dimension |
