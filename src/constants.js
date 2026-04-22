export const ACT_COLORS = {
  Innovation: '#60a5fa',
  Production:  '#f59e0b',
  Services:    '#34d399',
  Logistics:   '#c084fc',
}

export const DIM_OPTIONS = [
  { value: 'innovation', label: 'Innovation', color: '#60a5fa' },
  { value: 'production',  label: 'Production',  color: '#f59e0b' },
  { value: 'services',    label: 'Services',    color: '#34d399' },
  { value: 'logistics',   label: 'Logistics',   color: '#c084fc' },
]

export const SHARE_COLS = [
  { key: 'share_innovation', label: 'Innovation', color: '#60a5fa' },
  { key: 'share_production',  label: 'Production',  color: '#f59e0b' },
  { key: 'share_services',    label: 'Services',    color: '#34d399' },
  { key: 'share_logistics',   label: 'Logistics',   color: '#c084fc' },
]

export const scoreField  = d => `${d}_score`
export const rankField   = d => `${d}_rank`

export const ACTIVITIES = ['Innovation', 'Production', 'Services', 'Logistics']

export const MSA_OPTIONS = [
  { value: 'philadelphia', label: 'Philadelphia, PA', dataFile: '/data/map_philly.json' },
]
