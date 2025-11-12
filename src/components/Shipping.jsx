import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'aos/dist/aos.css'
import '../assets/style/style.css'

export default function Shipping() {
  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true })
  }, [])

  const [pickupPin, setPickupPin] = useState('')
  const [deliveryPin, setDeliveryPin] = useState('')

  const [pickupName, setPickupName] = useState('')
  const [pickupPhone, setPickupPhone] = useState('')
  const [pickupAddress, setPickupAddress] = useState('')
  const [pickupCity, setPickupCity] = useState('')

  const [deliveryName, setDeliveryName] = useState('')
  const [deliveryPhone, setDeliveryPhone] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [deliveryCity, setDeliveryCity] = useState('')

  const [weight, setWeight] = useState('')
  const [dims, setDims] = useState('')
  const [declaredValue, setDeclaredValue] = useState('')
  const [contents, setContents] = useState('')

  const [optInsurance, setOptInsurance] = useState(false)
  const [optFragile, setOptFragile] = useState(false)
  const [optCOD, setOptCOD] = useState(false)

  const [showReceipt, setShowReceipt] = useState(false)
  const [lrNumber, setLrNumber] = useState('')

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
    if (pickupPin.length < 2 || deliveryPin.length < 2) return null
    return pickupPin.slice(0, 2) === deliveryPin.slice(0, 2)
  }, [pickupPin, deliveryPin])

  const estimatedKm = useMemo(() => {
    if (sameRegion === null) return 0
    return sameRegion ? 20 : 1200
  }, [sameRegion])

  const selectedService = useMemo(() => {
    if (sameRegion === null) return 'Standard'
    return sameRegion ? 'Same-Day' : 'Standard'
  }, [sameRegion])

  const numbers = useMemo(() => {
    const cfg = {
      'Same-Day': { base: 120, perKg: 40, perKm: 4, kmCap: 25 },
      'Standard': { base: 80, perKg: 25, perKm: 1.2, kmCap: null },
    }
    const c = cfg[selectedService]
    if (!c || chargeableWeight === 0) {
      return { subtotal: 0, tax: 0, total: 0, breakdown: null }
    }
    const km = c.kmCap ? Math.min(estimatedKm, c.kmCap) : estimatedKm
    const weightCost = c.perKg * chargeableWeight
    const distanceCost = c.perKm * km
    const val = parseFloat(declaredValue)
    const safeVal = isNaN(val) ? 0 : val
    const insuranceFee = optInsurance ? safeVal * 0.015 : 0
    const fragileFee = optFragile ? 30 : 0
    const codFee = optCOD ? Math.max(30, safeVal * 0.015) : 0
    const subtotal = c.base + weightCost + distanceCost + insuranceFee + fragileFee + codFee
    const tax = subtotal * 0.18
    const total = subtotal + tax
    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      breakdown: { km, weightCost, distanceCost, insuranceFee, fragileFee, codFee }
    }
  }, [selectedService, chargeableWeight, estimatedKm, declaredValue, optInsurance, optFragile, optCOD])

  const canBook = useMemo(() => {
    return (
      pickupPin.length >= 2 &&
      deliveryPin.length >= 2 &&
      chargeableWeight > 0 &&
      numbers.total > 0
    )
  }, [pickupPin, deliveryPin, chargeableWeight, numbers])

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

      <header className="hero-section text-center text-md-start">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6" data-aos="fade-up">
              <h1 className="display-6 fw-bold mb-3">Create a Shipment</h1>
              <p className="lead mb-4">Book pickups, add package details, and get instant labels.</p>
              <div className="d-flex gap-3">
                <Link to="/rates" className="btn btn-outline-primary btn-lg px-4">Check Rates</Link>
                <a href="#create-shipment" className="btn btn-primary btn-lg px-4">Start Now</a>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="hero-card p-4">
                <div className="small text-muted mb-2">Fast pickups • Live tracking • Insurance options</div>
                <div className="d-flex gap-3 flex-wrap">
                  <span className="badge bg-light text-dark px-3 py-2">Same-Day</span>
                  <span className="badge bg-light text-dark px-3 py-2">Standard</span>
                  <span className="badge bg-light text-dark px-3 py-2">International</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="create-shipment" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-4" data-aos="fade-up">
            <h2 className="h1 mb-2">Shipment Details</h2>
            <p className="text-muted">Fill in pickup, delivery and package information.</p>
          </div>
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <form className="row g-4" onSubmit={(e) => e.preventDefault()}>
                <div className="col-12 col-lg-6">
                  <div className="h5 mb-3">Pickup</div>
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label className="form-label">Name</label>
                      <input className="form-control" placeholder="Sender name" value={pickupName} onChange={(e) => setPickupName(e.target.value)} />
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label">Phone</label>
                      <input className="form-control" placeholder="+91 XXXXX XXXXX" value={pickupPhone} onChange={(e) => setPickupPhone(e.target.value)} />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Address</label>
                      <input className="form-control" placeholder="Street, Area" value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)} />
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label">City</label>
                      <input className="form-control" placeholder="City" value={pickupCity} onChange={(e) => setPickupCity(e.target.value)} />
                    </div>
                    <div className="col-sm-3">
                      <label className="form-label">Pincode</label>
                      <input className="form-control" placeholder="560001" value={pickupPin} onChange={(e) => setPickupPin(e.target.value.replace(/[^0-9]/g, '').slice(0,6))} />
                    </div>
                    <div className="col-sm-3">
                      <label className="form-label">State</label>
                      <input className="form-control" placeholder="KA" />
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-6">
                  <div className="h5 mb-3">Delivery</div>
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label className="form-label">Name</label>
                      <input className="form-control" placeholder="Receiver name" value={deliveryName} onChange={(e) => setDeliveryName(e.target.value)} />
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label">Phone</label>
                      <input className="form-control" placeholder="+91 XXXXX XXXXX" value={deliveryPhone} onChange={(e) => setDeliveryPhone(e.target.value)} />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Address</label>
                      <input className="form-control" placeholder="Street, Area" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} />
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label">City</label>
                      <input className="form-control" placeholder="City" value={deliveryCity} onChange={(e) => setDeliveryCity(e.target.value)} />
                    </div>
                    <div className="col-sm-3">
                      <label className="form-label">Pincode</label>
                      <input className="form-control" placeholder="400001" value={deliveryPin} onChange={(e) => setDeliveryPin(e.target.value.replace(/[^0-9]/g, '').slice(0,6))} />
                    </div>
                    <div className="col-sm-3">
                      <label className="form-label">State</label>
                      <input className="form-control" placeholder="MH" />
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <hr />
                </div>

                <div className="col-12 col-lg-8">
                  <div className="h5 mb-3">Package</div>
                  <div className="row g-3">
                    <div className="col-sm-4">
                      <label className="form-label">Weight (kg)</label>
                      <input type="number" step="0.01" className="form-control" placeholder="1.25" value={weight} onChange={(e) => setWeight(e.target.value)} />
                    </div>
                    <div className="col-sm-4">
                      <label className="form-label">Dimensions (cm)</label>
                      <input className="form-control" placeholder="L x W x H" value={dims} onChange={(e) => setDims(e.target.value)} />
                    </div>
                    <div className="col-sm-4">
                      <label className="form-label">Declared value (₹)</label>
                      <input type="number" className="form-control" placeholder="1000" value={declaredValue} onChange={(e) => setDeclaredValue(e.target.value)} />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Contents</label>
                      <input className="form-control" placeholder="e.g. Electronics - mobile accessories" value={contents} onChange={(e) => setContents(e.target.value)} />
                    </div>
                  </div>
                </div>
                
                <div className="col-12 col-lg-4">
                  <div className="h5 mb-3">Options</div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="optInsurance" checked={optInsurance} onChange={(e) => setOptInsurance(e.target.checked)} />
                    <label className="form-check-label" htmlFor="optInsurance">Add Insurance</label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="optFragile" checked={optFragile} onChange={(e) => setOptFragile(e.target.checked)} />
                    <label className="form-check-label" htmlFor="optFragile">Fragile handling</label>
                  </div>
                  <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" id="optCOD" checked={optCOD} onChange={(e) => setOptCOD(e.target.checked)} />
                    <label className="form-check-label" htmlFor="optCOD">Cash on Delivery</label>
                  </div>
                  <div className="d-grid gap-2">
                    <Link to="/rates" className="btn btn-outline-primary">Calculate Rate</Link>
                    <button type="button" className="btn btn-primary" disabled={!canBook} onClick={() => { const lr = `LR${Date.now().toString().slice(-10)}`; setLrNumber(lr); setShowReceipt(true); }}>Book Pickup</button>
                  </div>
                  <div className="mt-3 small text-muted">Service: <span className="fw-semibold">{selectedService}</span></div>
                  <div className="mt-1 small">Chargeable weight: <span className="fw-semibold">{chargeableWeight ? `${chargeableWeight} kg` : '—'}</span></div>
                  <div className="mt-1 small">Estimated km: <span className="fw-semibold">{estimatedKm ? `${estimatedKm} km` : '—'}</span></div>
                  <hr className="my-3" />
                  <div className="d-flex justify-content-between"><span>Subtotal</span><span>{numbers.subtotal ? `₹${numbers.subtotal}` : '—'}</span></div>
                  <div className="d-flex justify-content-between"><span>Tax (18%)</span><span>{numbers.tax ? `₹${numbers.tax}` : '—'}</span></div>
                  <div className="d-flex justify-content-between fw-bold"><span>Total</span><span>{numbers.total ? `₹${numbers.total}` : '—'}</span></div>
                  {numbers.breakdown && (
                    <div className="mt-2 small text-muted">
                      Includes distance ₹{numbers.breakdown.distanceCost.toFixed(2)}, weight ₹{numbers.breakdown.weightCost.toFixed(2)}
                      {optInsurance ? `, insurance ₹${numbers.breakdown.insuranceFee.toFixed(2)}` : ''}
                      {optFragile ? `, fragile ₹${numbers.breakdown.fragileFee.toFixed(2)}` : ''}
                      {optCOD ? `, COD ₹${numbers.breakdown.codFee.toFixed(2)}` : ''}.
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {showReceipt && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-modal="true">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">LR Receipt</h5>
                <button type="button" className="btn-close" onClick={() => setShowReceipt(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="fw-semibold mb-1">LR Number</div>
                    <div className="h5">{lrNumber}</div>
                  </div>
                  <div className="col-md-6 text-md-end">
                    <div className="small text-muted">Total</div>
                    <div className="h4">{numbers.total ? `₹${numbers.total}` : '—'}</div>
                  </div>
                  <div className="col-12"><hr /></div>
                  <div className="col-md-6">
                    <div className="fw-semibold">Pickup</div>
                    <div className="small">{pickupName || '—'}</div>
                    <div className="small">{pickupPhone || '—'}</div>
                    <div className="small">{pickupAddress || '—'}</div>
                    <div className="small">{pickupCity || '—'} {pickupPin || ''}</div>
                  </div>
                  <div className="col-md-6">
                    <div className="fw-semibold">Delivery</div>
                    <div className="small">{deliveryName || '—'}</div>
                    <div className="small">{deliveryPhone || '—'}</div>
                    <div className="small">{deliveryAddress || '—'}</div>
                    <div className="small">{deliveryCity || '—'} {deliveryPin || ''}</div>
                  </div>
                  <div className="col-12"><hr /></div>
                  <div className="col-md-4"><div className="small text-muted">Service</div><div className="fw-semibold">{selectedService}</div></div>
                  <div className="col-md-4"><div className="small text-muted">Chargeable wt</div><div className="fw-semibold">{chargeableWeight ? `${chargeableWeight} kg` : '—'}</div></div>
                  <div className="col-md-4"><div className="small text-muted">Est. km</div><div className="fw-semibold">{estimatedKm ? `${estimatedKm} km` : '—'}</div></div>
                  <div className="col-12 mt-2"><div className="small text-muted">Contents</div><div>{contents || '—'}</div></div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowReceipt(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={() => { window.print && window.print(); }}>Print</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="site-footer">
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="fw-bold h5 mb-3">Parcel & Shipping Shop</div>
              <p className="text-white">Smart logistics for modern businesses and everyday senders.</p>
              <div className="small text-white"> {new Date().getFullYear()} All rights reserved.</div>
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
