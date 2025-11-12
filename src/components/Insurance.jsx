import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'aos/dist/aos.css'
import '../assets/style/style.css'

export default function Insurance() {
  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true })
  }, [])

  const [declared, setDeclared] = useState('')
  const [category, setCategory] = useState('General merchandise')
  const [showReceipt, setShowReceipt] = useState(false)
  const [quoteId, setQuoteId] = useState('')
  const [quote, setQuote] = useState({ base: 0, rate: 0, premium: 0, tax: 0, total: 0 })

  const canEstimate = () => {
    const v = parseFloat(declared)
    return !isNaN(v) && v > 0
  }

  const handleEstimate = (e) => {
    e.preventDefault()
    if (!canEstimate()) return
    const v = parseFloat(declared)
    const rates = {
      'General merchandise': 0.015,
      'Electronics': 0.02,
      'Apparel': 0.012,
      'Fragile items': 0.025,
    }
    const base = 10
    const rate = rates[category] ?? 0.015
    const premium = base + v * rate
    const tax = premium * 0.18
    const total = premium + tax
    setQuote({ base: parseFloat(base.toFixed(2)), rate, premium: parseFloat(premium.toFixed(2)), tax: parseFloat(tax.toFixed(2)), total: parseFloat(total.toFixed(2)) })
    setQuoteId(`IN${Date.now().toString().slice(-10)}`)
    setShowReceipt(true)
  }

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
              <h1 className="display-5 fw-bold mb-3">Shipment Insurance</h1>
              <p className="lead mb-4">Protect your parcels against loss or damage with instant coverage at checkout.</p>
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                <a className="btn btn-primary btn-lg" href="#quote">Get a quick quote</a>
                <a className="btn btn-outline-primary btn-lg" href="#claims">How claims work</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-4" data-aos="fade-up">
            <h2 className="h1 mb-2">Why insure with us</h2>
            <p className="text-muted">Fast claims, fair pricing, and transparent coverage.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4" data-aos="zoom-in">
              <div className="card h-100">
                <div className="card-body">
                  <div className="h5 mb-2">Door-to-door coverage</div>
                  <p className="text-muted small">From pickup to delivery, including warehousing and transit handling.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="100">
              <div className="card h-100">
                <div className="card-body">
                  <div className="h5 mb-2">Quick claims</div>
                  <p className="text-muted small">Submit online with photos; most claims resolved within 5–7 business days.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="200">
              <div className="card h-100">
                <div className="card-body">
                  <div className="h5 mb-2">Fair pricing</div>
                  <p className="text-muted small">As low as 1.5% of declared value with clear terms and exclusions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showReceipt && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-modal="true">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Insurance Quote Receipt</h5>
                <button type="button" className="btn-close" onClick={() => setShowReceipt(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="small text-muted">Quote ID</div>
                    <div className="h5">{quoteId}</div>
                  </div>
                  <div className="col-md-6 text-md-end">
                    <div className="small text-muted">Generated</div>
                    <div className="fw-semibold">{new Date().toLocaleString()}</div>
                  </div>
                  <div className="col-12"><hr /></div>
                  <div className="col-md-4">
                    <div className="small text-muted">Declared value</div>
                    <div className="fw-semibold">₹{declared || '—'}</div>
                  </div>
                  <div className="col-md-4">
                    <div className="small text-muted">Category</div>
                    <div className="fw-semibold">{category}</div>
                  </div>
                  <div className="col-md-4">
                    <div className="small text-muted">Rate</div>
                    <div className="fw-semibold">{(quote.rate * 100).toFixed(1)}%</div>
                  </div>
                  <div className="col-12"><hr /></div>
                  <div className="col-md-6">
                    <div className="d-flex justify-content-between"><span>Base</span><span>₹{quote.base.toFixed(2)}</span></div>
                    <div className="d-flex justify-content-between"><span>Premium</span><span>₹{quote.premium.toFixed(2)}</span></div>
                    <div className="d-flex justify-content-between"><span>Tax (18%)</span><span>₹{quote.tax.toFixed(2)}</span></div>
                  </div>
                  <div className="col-md-6 d-flex align-items-end">
                    <div className="ms-auto">
                      <div className="small text-muted">Total</div>
                      <div className="h4">₹{quote.total.toFixed(2)}</div>
                    </div>
                  </div>
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

      <section id="quote" className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6" data-aos="fade-up">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="h5 mb-3">Quick Quote</div>
                  <form className="row g-3 text-start" onSubmit={handleEstimate}>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Declared value (₹)</label>
                      <input type="number" className="form-control" placeholder="10000" value={declared} onChange={(e) => setDeclared(e.target.value)} />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Category</label>
                      <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option>General merchandise</option>
                        <option>Electronics</option>
                        <option>Apparel</option>
                        <option>Fragile items</option>
                      </select>
                    </div>
                    <div className="col-12 d-grid d-md-flex gap-3">
                      <button className="btn btn-primary flex-fill" type="submit" disabled={!canEstimate()}>Estimate Premium</button>
                      <Link to="/create-shipment" className="btn btn-outline-primary flex-fill">Add to shipment</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="h5 mb-3">Coverage overview</div>
                  <ul className="text-muted small ps-3 mb-0">
                    <li>Loss or damage during transit</li>
                    <li>Weather and handling incidents</li>
                    <li>Exclusions apply (perishables, prohibited goods, improper packaging)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="claims" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-4" data-aos="fade-up">
            <h2 className="h1 mb-2">Claims process</h2>
            <p className="text-muted">Simple online flow to submit and track your claim.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4" data-aos="fade-up">
              <div className="card h-100">
                <div className="card-body">
                  <div className="h5 mb-2">1. Report</div>
                  <p className="text-muted small">Start a claim within 48 hours of delivery with photos and details.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <div className="card h-100">
                <div className="card-body">
                  <div className="h5 mb-2">2. Review</div>
                  <p className="text-muted small">Our team validates documents and evaluates eligibility.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <div className="card h-100">
                <div className="card-body">
                  <div className="h5 mb-2">3. Resolve</div>
                  <p className="text-muted small">Approved claims are paid out to your original payment method.</p>
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

