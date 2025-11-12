import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'aos/dist/aos.css'
import '../assets/style/style.css'

export default function Returns() {
  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true })
  }, [])

  const [orderId, setOrderId] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [reason, setReason] = useState('Damaged item')
  const [comments, setComments] = useState('')

  const [showReceipt, setShowReceipt] = useState(false)
  const [returnId, setReturnId] = useState('')

  const canSubmit = orderId.trim().length >= 6 && email.trim().length > 3

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canSubmit) return
    const rid = `RT${Date.now().toString().slice(-10)}`
    setReturnId(rid)
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
              <h1 className="display-5 fw-bold mb-3">Returns & Refunds</h1>
              <p className="lead mb-4">Start a return, check eligibility, and learn about our refund timelines.</p>
            </div>
          </div>
        </div>
      </header>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7" data-aos="fade-up">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="h5 mb-3">Start a Return</div>
                  <form className="row g-3 text-start" onSubmit={handleSubmit}>
                    <div className="col-12">
                      <label className="form-label">Order / Tracking ID</label>
                      <input className="form-control" placeholder="e.g. PS123456789IN" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label">Your Email</label>
                      <input type="email" className="form-control" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label">Phone</label>
                      <input className="form-control" placeholder="+91 XXXXX XXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Reason</label>
                      <select className="form-select" value={reason} onChange={(e) => setReason(e.target.value)}>
                        <option>Damaged item</option>
                        <option>Wrong item delivered</option>
                        <option>Not needed anymore</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Comments (optional)</label>
                      <textarea className="form-control" rows="3" placeholder="Share details to help us resolve faster" value={comments} onChange={(e) => setComments(e.target.value)}></textarea>
                    </div>
                    <div className="col-12 d-grid d-md-flex gap-3">
                      <button className="btn btn-primary btn-lg flex-fill" type="submit" disabled={!canSubmit}>Submit Return</button>
                      <Link to="/tracking" className="btn btn-outline-primary btn-lg flex-fill">Track Shipment</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-5" data-aos="fade-left">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="h5 mb-3">Policy Summary</div>
                  <ul className="text-muted small mb-3 ps-3">
                    <li>Returns must be initiated within 7 days of delivery.</li>
                    <li>Item must be unused and in original packaging.</li>
                    <li>Refunds are processed within 5–7 business days post inspection.</li>
                  </ul>
                  <div className="accordion" id="returnFaq">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="q1">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#a1" aria-expanded="true" aria-controls="a1">
                          Who pays for return shipping?
                        </button>
                      </h2>
                      <div id="a1" className="accordion-collapse collapse show" aria-labelledby="q1" data-bs-parent="#returnFaq">
                        <div className="accordion-body text-muted small">
                          For damaged/incorrect items, we cover return shipping. For other reasons, charges may apply.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="q2">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#a2" aria-expanded="false" aria-controls="a2">
                          When will I get my refund?
                        </button>
                      </h2>
                      <div id="a2" className="accordion-collapse collapse" aria-labelledby="q2" data-bs-parent="#returnFaq">
                        <div className="accordion-body text-muted small">
                          Refunds are issued to the original payment method within 5–7 business days after inspection.
                        </div>
                      </div>
                    </div>
                  </div>
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
                <h5 className="modal-title">Return Receipt</h5>
                <button type="button" className="btn-close" onClick={() => setShowReceipt(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="small text-muted">Return ID</div>
                    <div className="h5">{returnId}</div>
                  </div>
                  <div className="col-md-6 text-md-end">
                    <div className="small text-muted">Submitted</div>
                    <div className="fw-semibold">{new Date().toLocaleString()}</div>
                  </div>
                  <div className="col-12"><hr /></div>
                  <div className="col-md-6">
                    <div className="fw-semibold mb-1">Order / Tracking</div>
                    <div>{orderId || '—'}</div>
                  </div>
                  <div className="col-md-6">
                    <div className="fw-semibold mb-1">Contact</div>
                    <div className="small">{email || '—'}</div>
                    <div className="small">{phone || '—'}</div>
                  </div>
                  <div className="col-12"><hr /></div>
                  <div className="col-md-6">
                    <div className="small text-muted">Reason</div>
                    <div className="fw-semibold">{reason}</div>
                  </div>
                  <div className="col-md-6">
                    <div className="small text-muted">Comments</div>
                    <div>{comments || '—'}</div>
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

