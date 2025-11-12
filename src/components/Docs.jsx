import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'aos/dist/aos.css'
import '../assets/style/style.css'

export default function Docs() {
  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true })
  }, [])

  const sections = useMemo(() => ([
    {
      id: 'getting-started',
      title: 'Getting Started',
      category: 'Getting Started',
      body: `Install our SDK, create an API key, and make your first request in minutes.`,
      snippet: {
        label: 'Install (npm)',
        code: 'npm install pssdk\n# or\nyarn add pssdk',
      },
    },
    {
      id: 'auth',
      title: 'Authentication',
      category: 'API',
      body: `Authenticate using a Bearer token sent via the Authorization header. Keys can be managed from your dashboard.`,
      snippet: {
        label: 'cURL',
        code: 'curl -H "Authorization: Bearer <API_KEY>" https://api.psshop.example/v1/me',
      },
    },
    {
      id: 'rates',
      title: 'Rates API',
      category: 'API',
      body: `Get real-time quotes by providing origin, destination, weight and dimensions.`,
      snippet: {
        label: 'Request (JSON)',
        code: '{\n  "from": "560001",\n  "to": "400001",\n  "weight": 1.2,\n  "dims": "30x20x10"\n}',
      },
    },
    {
      id: 'tracking',
      title: 'Tracking API',
      category: 'API',
      body: `Retrieve status and checkpoints for a shipment using the tracking ID.`,
      snippet: {
        label: 'cURL',
        code: 'curl https://api.psshop.example/v1/track/PS123456789IN',
      },
    },
    {
      id: 'webhooks',
      title: 'Webhooks',
      category: 'Guides',
      body: `Subscribe to delivery events like OutForDelivery and Delivered to keep your systems in sync.`,
      snippet: {
        label: 'Example payload',
        code: '{\n  "event": "delivered",\n  "trackingId": "PS123456789IN",\n  "time": "2025-10-18T10:22:00Z"\n}',
      },
    },
  ]), [])

  const categories = ['All', 'Getting Started', 'API', 'Guides']
  const [query, setQuery] = useState('')
  const [activeCat, setActiveCat] = useState('All')
  const [openIds, setOpenIds] = useState(new Set(['getting-started']))
  const [copiedId, setCopiedId] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return sections.filter(s =>
      (activeCat === 'All' || s.category === activeCat) &&
      (!q || s.title.toLowerCase().includes(q) || s.body.toLowerCase().includes(q))
    )
  }, [sections, activeCat, query])

  const toggleOpen = (id) => {
    setOpenIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const copy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(''), 1200)
    } catch (_) { /* noop */ }
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
              <h1 className="display-5 fw-bold mb-3">Documentation</h1>
              <p className="lead mb-4">Guides and API references for the Parcel & Shipping Shop platform.</p>
              <div className="row g-2 align-items-center">
                <div className="col-12 col-md-8 mx-auto">
                  <input className="form-control form-control-lg" placeholder="Search docs (e.g. rates, tracking)" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
              </div>
              <div className="d-flex gap-2 flex-wrap justify-content-center mt-3">
                {categories.map(c => (
                  <button key={c} className={`btn btn-sm ${activeCat === c ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveCat(c)}>{c}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              {filtered.length === 0 && (
                <div className="text-center text-muted">No results. Try a different search or category.</div>
              )}
              <div className="accordion" id="docsAccordion">
                {filtered.map((s, idx) => (
                  <div className="accordion-item" key={s.id} data-aos="fade-up" data-aos-delay={idx * 50}>
                    <h2 className="accordion-header">
                      <button className={`accordion-button ${openIds.has(s.id) ? '' : 'collapsed'}`} type="button" onClick={() => toggleOpen(s.id)}>
                        <span className="badge bg-light text-dark me-2">{s.category}</span>
                        {s.title}
                      </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${openIds.has(s.id) ? 'show' : ''}`}>
                      <div className="accordion-body">
                        <p className="text-muted mb-3">{s.body}</p>
                        {s.snippet && (
                          <div className="position-relative">
                            <div className="small text-muted mb-1">{s.snippet.label}</div>
                            <pre className="bg-dark text-white p-3 rounded small"><code>{s.snippet.code}</code></pre>
                            <button className="btn btn-sm btn-outline-primary position-absolute" style={{ top: 0, right: 0 }} onClick={() => copy(s.snippet.code, s.id)}>
                              {copiedId === s.id ? 'Copied' : 'Copy'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
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

