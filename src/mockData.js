const CITIES = [
  'San Diego, CA','Los Angeles, CA','New York, NY','Boston, MA',
  'Philadelphia, PA','Washington, DC','Seattle, WA','Houston, TX',
  'Dallas, TX','Chicago, IL','Atlanta, GA','Denver, CO',
  'Phoenix, AZ','San Jose, CA','Orlando, FL','Baltimore, MD',
  'Tampa, FL','Detroit, MI','Minneapolis, MN','St. Louis, MO',
  'Norfolk, VA','Huntsville, AL','San Antonio, TX','Sacramento, CA',
  'Raleigh, NC','Jacksonville, FL','Louisville, KY','Indianapolis, IN',
  'Columbus, OH','Kansas City, MO','Hartford, CT','Providence, RI',
  'Nashville, TN','New Haven, CT','Bridgeport, CT','Albuquerque, NM',
  'Oklahoma City, OK','Richmond, VA','Riverside, CA','Las Vegas, NV',
  'Portland, OR','Memphis, TN','Buffalo, NY','Pittsburgh, PA',
  'Cincinnati, OH','Cleveland, OH','Salt Lake City, UT','Milwaukee, WI',
  'Rochester, NY','Albany, NY',
]

export function generateMockScatter() {
  return CITIES.map((msa, i) => ({
    msa,
    top50: true,
    innovation_score: Math.random() * 80 + 10,
    production_score: Math.random() * 80 + 10,
    services_score:   Math.random() * 80 + 10,
    logistics_score:  Math.random() * 80 + 10,
    innovation_rank: i + 1,
    production_rank: Math.floor(Math.random() * 50) + 1,
    services_rank:   Math.floor(Math.random() * 50) + 1,
    logistics_rank:  Math.floor(Math.random() * 50) + 1,
    innovation_assets: Math.floor(Math.random() * 200 + 10),
    production_assets: Math.floor(Math.random() * 150 + 5),
    innovation_amt: Math.random() * 5000 + 200,
    production_amt: Math.random() * 8000 + 100,
    amt_total_m: Math.random() * 20000 + 500,
  }))
}

const PHILLY_ZIPS = [
  '19101','19102','19103','19104','19106','19107','19111','19114','19115','19116',
  '19118','19119','19120','19121','19122','19123','19124','19125','19126','19128',
  '19130','19131','19132','19133','19134','19135','19136','19137','19138','19139',
  '19140','19141','19143','19144','19145','19146','19147','19148','19149','19150',
  '08101','08102','08103','08104','08105','19703','19702','19801','19802','17101',
]

const ACTS = ['Innovation','Production','Services','Logistics']

// Approximate centroids for mock zips (Philly area)
const LAT_BASE = 39.95
const LON_BASE = -75.16

export function generateMockMap() {
  return PHILLY_ZIPS.map((zip, i) => {
    const shares = ACTS.map(() => Math.random())
    const total  = shares.reduce((a, b) => a + b, 0)
    const norm   = shares.map(s => s / total)
    const domIdx = norm.indexOf(Math.max(...norm))
    return {
      zip_code: zip,
      total_assets: Math.floor(Math.random() * 20 + 1),
      total_amt_m:  parseFloat((Math.random() * 500).toFixed(2)),
      dominant_activity: ACTS[domIdx],
      share_innovation: parseFloat(norm[0].toFixed(4)),
      share_production:  parseFloat(norm[1].toFixed(4)),
      share_services:    parseFloat(norm[2].toFixed(4)),
      share_logistics:   parseFloat(norm[3].toFixed(4)),
      lat_center: LAT_BASE + (Math.random() - 0.5) * 0.3,
      lon_center: LON_BASE + (Math.random() - 0.5) * 0.4,
      orgs: 'Sample Org A | Sample Org B',
    }
  })
}
