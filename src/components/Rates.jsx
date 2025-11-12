import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'aos/dist/aos.css'
import '../assets/style/style.css'

export default function Rates() {
  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true })
  }, [])

  const [fromPin, setFromPin] = useState('')
  const [toPin, setToPin] = useState('')
  const [weight, setWeight] = useState('')
  const [dims, setDims] = useState('')
  const [service, setService] = useState('Auto select')

  const parsedDims = useMemo(() => {
    const parts = dims.split('x').map(p => parseFloat(p.trim()))
    if (parts.length !== 3 || parts.some(isNaN)) return { l: 0, w: 0, h: 0 }
    return { l: parts[0], w: parts[1], h: parts[2] }
  }, [dims])

  const volumetricWeight = useMemo(() => {
    const { l, w, h } = parsedDims
    if (!l || !w || !h) return 0
    return (l * w * h) / 5000
  }, [parsedDims])

  const chargeableWeight = useMemo(() => {
    const w = parseFloat(weight)
    const actual = isNaN(w) ? 0 : w
    const cw = Math.max(actual, volumetricWeight)
    if (cw === 0) return 0
    return Math.max(0.5, parseFloat(cw.toFixed(2)))
  }, [weight, volumetricWeight])

  const sameRegion = useMemo(() => {
    if (fromPin.length < 2 || toPin.length < 2) return null
    return fromPin.slice(0, 2) === toPin.slice(0, 2)
  }, [fromPin, toPin])

  const estimatedKm = useMemo(() => {
    if (sameRegion === null) return 0
    return sameRegion ? 20 : 1200
  }, [sameRegion])

  const selectedService = useMemo(() => {
    if (service !== 'Auto select') return service
    if (sameRegion === null) return 'Standard'
    return sameRegion ? 'Same-Day' : 'Standard'
  }, [service, sameRegion])

  const quote = useMemo(() => {
    const cfg = {
      'Same-Day': { base: 120, perKg: 40, perKm: 4, kmCap: 25, intl: 0 },
      'Standard': { base: 80, perKg: 25, perKm: 1.2, kmCap: null, intl: 0 },
      'International': { base: 900, perKg: 200, perKm: 0, kmCap: null, intl: 500 },
    }
    const c = cfg[selectedService]
    if (!c || chargeableWeight === 0) {
      return { subtotal: 0, tax: 0, total: 0, breakdown: null }
    }
    const km = c.kmCap ? Math.min(estimatedKm, c.kmCap) : estimatedKm
    const weightCost = c.perKg * chargeableWeight
    const distanceCost = c.perKm * km
    const intl = selectedService === 'International' ? c.intl : 0
    const subtotal = c.base + weightCost + distanceCost + intl
    const tax = subtotal * 0.18
    const total = subtotal + tax
    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      breakdown: { km, weightCost, distanceCost, intl }
    }
  }, [selectedService, chargeableWeight, estimatedKm])

  return (
    <div className="homepage">
      <nav className="navbar navbar-expand-lg navbar-dark site-nav sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">P&S Shop</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/rates">Rates</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/shipping">Shipping</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/tracking">Tracking</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
            </ul>
            <div className="d-flex gap-2">
              <Link to="/login" className="btn btn-outline-primary">Log in</Link>
              <Link to="/signup" className="btn btn-primary">Sign up</Link>
            </div>
          </div>
        </div>
      </nav>

      <header className="hero-section text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8" data-aos="fade-up">
              <h1 className="display-5 fw-bold mb-3">Shipping Rates</h1>
              <p className="lead mb-4">Calculate instant quotes for domestic and international shipments.</p>
              <div className="rate-card shadow-sm p-4 bg-white rounded-3 border">
                <form className="row g-3 text-start" onSubmit={(e) => e.preventDefault()}>
                  <div className="col-md-6">
                    <label className="form-label">From pincode</label>
                    <input type="text" className="form-control" placeholder="e.g. 560001" value={fromPin} onChange={(e) => setFromPin(e.target.value.replace(/[^0-9]/g, '').slice(0,6))} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">To pincode</label>
                    <input type="text" className="form-control" placeholder="e.g. 400001" value={toPin} onChange={(e) => setToPin(e.target.value.replace(/[^0-9]/g, '').slice(0,6))} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Weight (kg)</label>
                    <input type="number" step="0.01" className="form-control" placeholder="1.0" value={weight} onChange={(e) => setWeight(e.target.value)} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Dimensions (cm)</label>
                    <input type="text" className="form-control" placeholder="L x W x H" value={dims} onChange={(e) => setDims(e.target.value)} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Service</label>
                    <select className="form-select" value={service} onChange={(e) => setService(e.target.value)}>
                      <option>Auto select</option>
                      <option>Same-Day</option>
                      <option>Standard</option>
                      <option>International</option>
                    </select>
                  </div>
                  <div className="col-12 d-grid d-md-flex gap-3">
                    <button type="submit" className="btn btn-primary btn-lg flex-fill">Get Rates</button>
                    <Link to="/create-shipment" className="btn btn-outline-primary btn-lg flex-fill">Create Shipment</Link>
                  </div>
                </form>
              </div>
              <div className="mt-4 text-start">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="d-flex flex-wrap justify-content-between align-items-end">
                      <div className="mb-3 mb-md-0">
                        <div className="small text-muted">Selected service</div>
                        <div className="h5 m-0">{selectedService}</div>
                      </div>
                      <div className="text-end">
                        <div className="small text-muted">Estimated total</div>
                        <div className="display-6 fw-bold">{quote.total > 0 ? `₹${quote.total}` : '—'}</div>
                      </div>
                    </div>
                    <div className="row mt-3 g-3">
                      <div className="col-6 col-md-3">
                        <div className="small text-muted">Chargeable wt</div>
                        <div className="fw-semibold">{chargeableWeight ? `${chargeableWeight} kg` : '—'}</div>
                      </div>
                      <div className="col-6 col-md-3">
                        <div className="small text-muted">Estimated km</div>
                        <div className="fw-semibold">{estimatedKm ? `${estimatedKm} km` : '—'}</div>
                      </div>
                      <div className="col-6 col-md-3">
                        <div className="small text-muted">Subtotal</div>
                        <div className="fw-semibold">{quote.subtotal ? `₹${quote.subtotal}` : '—'}</div>
                      </div>
                      <div className="col-6 col-md-3">
                        <div className="small text-muted">Tax (18%)</div>
                        <div className="fw-semibold">{quote.tax ? `₹${quote.tax}` : '—'}</div>
                      </div>
                    </div>
                    {quote.breakdown && (
                      <div className="mt-3 small text-muted">
                        Includes distance ₹{quote.breakdown.distanceCost.toFixed(2)} and weight ₹{quote.breakdown.weightCost.toFixed(2)}{selectedService === 'International' ? ` + intl ₹${quote.breakdown.intl.toFixed(2)}` : ''}.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-4" data-aos="fade-up">
            <h2 className="h1 mb-2">Popular Plans</h2>
            <p className="text-muted">Choose speed or savings—your call.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4" data-aos="zoom-in">
              <div className="card h-100">
                <div className="card-body">
                  <div className="h5 mb-2">Same-Day</div>
                  <div className="display-6 fw-bold mb-2">₹199</div>
                  <ul className="text-muted small m-0 ps-3">
                    <li>0–5 km intra-city</li>
                    <li>Max 3 kg</li>
                    <li>Live tracking</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="100">
              <div className="card h-100">
                <div className="card-body">
                  <div className="h5 mb-2">Standard</div>
                  <div className="display-6 fw-bold mb-2">₹99</div>
                  <ul className="text-muted small m-0 ps-3">
                    <li>City-to-city 2–4 days</li>
                    <li>Max 5 kg</li>
                    <li>Door pickup</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="200">
              <div className="card h-100">
                <div className="card-body">
                  <div className="h5 mb-2">International</div>
                  <div className="display-6 fw-bold mb-2">₹999</div>
                  <ul className="text-muted small m-0 ps-3">
                    <li>Priority customs support</li>
                    <li>Insurance options</li>
                    <li>5–7 business days</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="fw-bold h5 mb-3">Parcel & Shipping Shop</div>
              <p className="text-white">Smart logistics for modern businesses and everyday senders.</p>
              <div className="small text-white">© {new Date().getFullYear()} All rights reserved.</div>
            </div>
            <div className="col-6 col-md-2">
              <div className="fw-semibold mb-3">Company</div>
              <ul className="list-unstyled footer-links">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/press">Press</Link></li>
              </ul>
            </div>
            <div className="col-6 col-md-2">
              <div className="fw-semibold mb-3">Products</div>
              <ul className="list-unstyled footer-links">
                <li><Link to="/shipping">Shipping</Link></li>
                <li><Link to="/tracking">Tracking</Link></li>
                <li><Link to="/returns">Returns</Link></li>
                <li><Link to="/insurance">Insurance</Link></li>
              </ul>
            </div>
            <div className="col-6 col-md-2">
              <div className="fw-semibold mb-3">Resources</div>
              <ul className="list-unstyled footer-links">
                <li><Link to="/docs">Docs</Link></li>
                <li><Link to="/api">API</Link></li>
                <li><Link to="/rate-calculator">Rate calculator</Link></li>
                <li><Link to="/help">Help center</Link></li>
              </ul>
            </div>
            <div className="col-6 col-md-2">
              <div className="fw-semibold mb-3">Legal</div>
              <ul className="list-unstyled footer-links">
                <li><Link to="/privacy">Privacy</Link></li>
                <li><Link to="/terms">Terms</Link></li>
                <li><Link to="/security">Security</Link></li>
                <li><Link to="/status">Status</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container d-flex flex-wrap gap-3 justify-content-between align-items-center">
            <div className="small text-white">Made for speed, reliability, and great rates.</div>
            <div className="d-flex gap-3 small">
              <Link to="/contact">Contact</Link>
              <Link to="/support">Support</Link>
              <Link to="/sitemap.xml">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
