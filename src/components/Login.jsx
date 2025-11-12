import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'aos/dist/aos.css'
import '../assets/style/style.css'

export default function Login() {
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
            <div className="col-md-8 col-lg-6" data-aos="fade-up">
              <h1 className="display-6 fw-bold mb-3">Welcome back</h1>
              <p className="lead mb-4">Log in to manage your shipments and track parcels.</p>
              <div className="hero-card shadow-sm p-4 bg-white rounded-3 border text-start">
                <form className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="you@example.com" />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="••••••••" />
                  </div>
                  <div className="col-12 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rememberMe" />
                      <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                    </div>
                    <Link to="/forgot" className="small">Forgot password?</Link>
                  </div>
                  <div className="col-12 d-grid">
                    <button type="button" className="btn btn-primary btn-lg">Log In</button>
                  </div>
                  <div className="col-12 text-center small">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </header>

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
