import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'aos/dist/aos.css'
import '../assets/style/style.css'

export default function Press() {
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
            <div className="col-lg-8" data-aos="fade-up">
              <h1 className="display-5 fw-bold mb-3">Press & Media</h1>
              <p className="lead mb-4">Brand assets, press releases, and media resources for Parcel & Shipping Shop.</p>
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                <a className="btn btn-primary btn-lg" href="#press-kit">Download Press Kit</a>
                <a className="btn btn-outline-primary btn-lg" href="#media-inquiries">Media Inquiries</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="press-kit" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-4" data-aos="fade-up">
            <h2 className="h1 mb-2">Press Kit</h2>
            <p className="text-muted">Logos, product images, and brand guidelines.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4" data-aos="zoom-in">
              <div className="card h-100">
                <div className="card-body">
                  <div className="h5 mb-2">Logos</div>
                  <p className="text-muted small">PNG/SVG in light and dark variants.</p>
                  <a className="btn btn-outline-primary" href="#">Download</a>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="100">
              <div className="card h-100">
                <div className="card-body">
                  <div className="h5 mb-2">Product shots</div>
                  <p className="text-muted small">High-res images of our app and services.</p>
                  <a className="btn btn-outline-primary" href="#">Download</a>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="200">
              <div className="card h-100">
                <div className="card-body">
                  <div className="h5 mb-2">Guidelines</div>
                  <p className="text-muted small">Usage guidance for our brand and marks.</p>
                  <a className="btn btn-outline-primary" href="#">View</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="text-center mb-4" data-aos="fade-up">
            <h2 className="h1 mb-2 fw-bold text-white">Latest News</h2>
            <p className="text-white">Recent announcements and press mentions.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-6" data-aos="fade-up">
              <div className="card h-100">
                <div className="card-body">
                  <div className="small text-muted mb-1">Press Release • Oct 2025</div>
                  <h5 className="card-title">Parcel & Shipping Shop launches international next-day service</h5>
                  <p className="card-text text-muted">Expanding fast, reliable cross-border delivery for SMEs across 20+ countries.</p>
                  <a href="#" className="btn btn-link p-0">Read more</a>
                </div>
              </div>
            </div>
            <div className="col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="card h-100">
                <div className="card-body">
                  <div className="small text-muted mb-1">Media • Sep 2025</div>
                  <h5 className="card-title">Featured in Logistics Today: powering last-mile for D2C brands</h5>
                  <p className="card-text text-muted">How our platform helps sellers reduce RTOs and delight customers.</p>
                  <a href="#" className="btn btn-link p-0">Read story</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="media-inquiries" className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm" data-aos="fade-up">
                <div className="card-body p-4">
                  <div className="h5 mb-2">Media Inquiries</div>
                  <p className="text-muted">For interviews, quotes, or additional resources, reach our press team.</p>
                  <a href="mailto:press@psshop.example" className="btn btn-primary">Contact press@psshop.example</a>
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

