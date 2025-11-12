import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'aos/dist/aos.css'
import '../assets/style/style.css'

export default function Index() {
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
      <header className="hero-section text-center text-md-start">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-md-6" data-aos="fade-up">
              <h1 className="display-5 fw-bold mb-3">Ship smarter. Deliver faster.</h1>
              <p className="lead mb-4">Affordable parcel delivery, real-time tracking, and reliable logistics for businesses and individuals.</p>
              <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                <Link to="/create-shipment" className="btn btn-primary btn-lg px-4">Create Shipment</Link>
                <Link to="/rates" className="btn btn-outline-primary btn-lg px-4">View Rates</Link>
              </div>
              <div className="hero-trust mt-4">
                <div className="d-flex flex-wrap gap-4 align-items-center justify-content-center justify-content-md-start">
                  <div className="trust-item">250k+ parcels delivered</div>
                  <div className="trust-dot" />
                  <div className="trust-item">4.9/5 customer rating</div>
                </div>
              </div>
            </div>
            <div className="col-md-6" data-aos="fade-left">
              <div className="hero-card shadow-sm">
                <div className="p-4">
                  <h2 className="h4 mb-3">Track your parcel</h2>
                  <form className="row g-3">
                    <div className="col-12">
                      <input type="text" className="form-control form-control-lg" placeholder="Enter tracking number" />
                    </div>
                    <div className="col-12 d-grid d-md-flex gap-3">
                      <button type="button" className="btn btn-primary btn-lg flex-fill">Track Now</button>
                      <Link className="btn btn-outline-secondary btn-lg flex-fill" to="/support">Need help?</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-5 bg-light" id="services">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="h1 mb-3">Everything you need to ship</h2>
            <p className="text-muted">From local deliveries to international shipping, choose the service that fits your timeline and budget.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="0">
              <div className="feature card h-100">
                <div className="card-body">
                  <h3 className="h5 mb-2">Same-Day Delivery</h3>
                  <p className="text-muted mb-0">Urgent parcels delivered within hours across select cities.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <div className="feature card h-100">
                <div className="card-body">
                  <h3 className="h5 mb-2">Standard Shipping</h3>
                  <p className="text-muted mb-0">Reliable, cost-effective delivery for everyday parcels.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <div className="feature card h-100">
                <div className="card-body">
                  <h3 className="h5 mb-2">International</h3>
                  <p className="text-muted mb-0">Global reach with customs-ready documentation and support.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5" id="benefits">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="highlight p-4 p-lg-5">
                <h2 className="h1 mb-3">Why choose us</h2>
                <ul className="list-unstyled m-0">
                  <li className="d-flex gap-3 align-items-start mb-3"><span className="check" />Transparent pricing and instant quotes</li>
                  <li className="d-flex gap-3 align-items-start mb-3"><span className="check" />Doorstep pickup and delivery</li>
                  <li className="d-flex gap-3 align-items-start mb-3"><span className="check" />Live tracking and delivery alerts</li>
                  <li className="d-flex gap-3 align-items-start"><span className="check" />Insurance options for peace of mind</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="row g-3">
                <div className="col-6">
                  <div className="stat">
                    <div className="stat-value">99.8%</div>
                    <div className="stat-label">On-time delivery</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat">
                    <div className="stat-value">150+</div>
                    <div className="stat-label">Cities covered</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat">
                    <div className="stat-value">24/7</div>
                    <div className="stat-label">Support</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat">
                    <div className="stat-value">3x</div>
                    <div className="stat-label">Faster pickups</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light" id="testimonials">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="h1 mb-3">What customers say</h2>
            <p className="text-muted">Real feedback from businesses and individuals who ship with us.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4" data-aos="zoom-in">
              <div className="card h-100">
                <div className="card-body">
                  <p className="mb-3">Pickup was quick and tracking was accurate throughout. Rates are great for small businesses.</p>
                  <div className="fw-semibold">Arjun P.</div>
                  <div className="text-muted small">E-commerce seller</div>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="100">
              <div className="card h-100">
                <div className="card-body">
                  <p className="mb-3">Sent a fragile parcel internationally. Packaging support and insurance made it stress-free.</p>
                  <div className="fw-semibold">Neha S.</div>
                  <div className="text-muted small">Personal shipment</div>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="200">
              <div className="card h-100">
                <div className="card-body">
                  <p className="mb-3">Our team uses it daily for city-wide deliveries. The API and web dashboard are fantastic.</p>
                  <div className="fw-semibold">LogiTech Pvt Ltd</div>
                  <div className="text-muted small">Operations team</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5" id="partners">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6" data-aos="fade-right">
              <h2 className="h1 mb-3 text-dark">Integrated with carriers you trust</h2>
              <p className="text-dark mb-4">Multiple courier partners to give you the best speed and price. Choose the carrier or let us auto-select the optimal route.</p>
              <div className="d-flex gap-3 flex-wrap">
                <span className="badge bg-light text-dark px-3 py-2">Express</span>
                <span className="badge bg-light text-dark px-3 py-2">Surface</span>
                <span className="badge bg-light text-dark px-3 py-2">International</span>
                <span className="badge bg-light text-dark px-3 py-2">Reverse logistics</span>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="partner-grid">
                <div className="partner-tile">Carrier A</div>
                <div className="partner-tile">Carrier B</div>
                <div className="partner-tile">Carrier C</div>
                <div className="partner-tile">Carrier D</div>
                <div className="partner-tile">Carrier E</div>
                <div className="partner-tile">Carrier F</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-primary text-white text-center" id="cta">
        <div className="container" data-aos="zoom-in">
          <h2 className="display-6 mb-3">Ready to start shipping?</h2>
          <p className="lead mb-4">Create your first shipment in minutes and get instant tracking.</p>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/signup" className="btn btn-light btn-lg px-4">Get Started</Link>
            <Link to="/contact" className="btn btn-outline-light btn-lg px-4">Talk to sales</Link>
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
