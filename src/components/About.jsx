import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'aos/dist/aos.css'
import '../assets/style/style.css'

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true })
  }, [])

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
            <div className="col-lg-9" data-aos="fade-up">
              <h1 className="display-5 fw-bold mb-3">About Parcel & Shipping Shop</h1>
              <p className="lead mb-4">We make shipping simple, fast, and affordable for businesses and everyday senders.</p>
            </div>
          </div>
        </div>
      </header>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <h2 className="h3 mb-3">Our story</h2>
                  <p className="text-muted">Founded with a mission to modernize parcel logistics, we built an intuitive platform that connects shippers to multiple carriers with transparent pricing and real-time tracking.</p>
                  <p className="text-muted mb-0">Today, thousands of users trust us for quick pickups, reliable deliveries, and exceptional support.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="row g-3">
                <div className="col-6">
                  <div className="stat">
                    <div className="stat-value">250k+</div>
                    <div className="stat-label">Parcels delivered</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat">
                    <div className="stat-value">4.9/5</div>
                    <div className="stat-label">Customer rating</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat">
                    <div className="stat-value">150+</div>
                    <div className="stat-label">Cities served</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat">
                    <div className="stat-value">24/7</div>
                    <div className="stat-label">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="h1 mb-3 text-white">What we value</h2>
            <p className="text-white">Principles that guide our product and service.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4" data-aos="zoom-in">
              <div className="feature card h-100">
                <div className="card-body">
                  <h3 className="h5 mb-2">Reliability</h3>
                  <p className="text-muted mb-0">Shipments arrive on time with proactive updates at every step.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="100">
              <div className="feature card h-100">
                <div className="card-body">
                  <h3 className="h5 mb-2">Transparency</h3>
                  <p className="text-muted mb-0">Clear pricing, accurate ETAs, and support that actually helps.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="200">
              <div className="feature card h-100">
                <div className="card-body">
                  <h3 className="h5 mb-2">Customer-first</h3>
                  <p className="text-muted mb-0">We obsess over delightful delivery experiences for you and your customers.</p>
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
