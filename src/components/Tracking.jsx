import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'aos/dist/aos.css'
import '../assets/style/style.css'

export default function Tracking() {
  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true })
  }, [])

  const [trackingId, setTrackingId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const normalize = (val) => val.toUpperCase().replace(/[^A-Z0-9]/g, '')

  const handleTrack = (e) => {
    e.preventDefault()
    setError('')
    setResult(null)
    const id = normalize(trackingId)
    if (!id || id.length < 8) {
      setError('Enter a valid tracking number (min 8 chars).')
      return
    }
    setLoading(true)
    // Mock lookup
    setTimeout(() => {
      // Very simple mock rules
      const now = new Date()
      const fmt = (d) => d.toLocaleString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false, month: 'short', day: '2-digit' })
      const base = id.startsWith('PS') ? 'In Transit' : id.endsWith('IN') ? 'Out for Delivery' : 'Shipment Created'
      const checkpoints = [
        { title: 'Shipment Created', place: 'Online', time: fmt(new Date(now.getTime() - 36 * 3600 * 1000)) },
        { title: 'Departed Facility', place: 'Mumbai', time: fmt(new Date(now.getTime() - 18 * 3600 * 1000)) },
        { title: 'Arrived at Local Facility', place: 'Bengaluru', time: fmt(new Date(now.getTime() - 3 * 3600 * 1000)) },
        { title: 'Out for Delivery', place: 'Bengaluru', time: fmt(new Date(now.getTime() - 30 * 60 * 1000)) },
      ]
      const status = base
      const live = status === 'Out for Delivery'
      const eta = live ? 'Today by 8 PM' : '2–3 days'
      setResult({ id, status, eta, checkpoints })
      setLoading(false)
    }, 800)
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
              <h1 className="display-5 fw-bold mb-3">Track Your Parcel</h1>
              <p className="lead mb-4">Enter your tracking number to see the latest updates.</p>
              <div className="hero-card shadow-sm p-4 bg-white rounded-3 border">
                <form className="row g-3 text-start" onSubmit={handleTrack}>
                  <div className="col-12">
                    <label className="form-label">Tracking number</label>
                    <input type="text" className="form-control form-control-lg" placeholder="e.g. PS123456789IN" value={trackingId} onChange={(e) => setTrackingId(normalize(e.target.value))} />
                  </div>
                  <div className="col-12 d-grid d-md-flex gap-3">
                    <button type="submit" className="btn btn-primary btn-lg flex-fill" disabled={!trackingId || loading}>
                      {loading ? 'Tracking…' : 'Track Now'}
                    </button>
                    <Link to="/support" className="btn btn-outline-primary btn-lg flex-fill">Need help?</Link>
                  </div>
                  {error && (
                    <div className="col-12">
                      <div className="alert alert-warning py-2 m-0">{error}</div>
                    </div>
                  )}
                </form>
              </div>
              {result && (
                <div className="row mt-3 g-3 text-start">
                  <div className="col-12 col-md-4">
                    <div className="card shadow-sm h-100">
                      <div className="card-body">
                        <div className="small text-muted">Tracking ID</div>
                        <div className="h6 mb-3">{result.id}</div>
                        <div className="small text-muted">Current status</div>
                        <div className="h5">{result.status}</div>
                        <div className="small text-muted">ETA</div>
                        <div className="fw-semibold">{result.eta}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-8">
                    <div className="card shadow-sm h-100">
                      <div className="card-body">
                        <div className="fw-semibold mb-2">Live Timeline</div>
                        <ul className="list-group list-group-flush">
                          {result.checkpoints.map((c, idx) => (
                            <li key={idx} className="list-group-item d-flex justify-content-between align-items-start">
                              <div>
                                <div className="fw-semibold">{c.title}</div>
                                <div className="text-muted small">{c.place} • {c.time}</div>
                              </div>
                              {idx === result.checkpoints.length - 1 && (
                                <span className="badge bg-success">Live</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <section className="py-5 bg-light">
        <div className="container">
          {!result && (
            <div className="text-center mb-2" data-aos="fade-up">
              <h2 className="h1 mb-2">How tracking works</h2>
              <p className="text-muted">Enter a tracking number above to view a live timeline.</p>
            </div>
          )}
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
