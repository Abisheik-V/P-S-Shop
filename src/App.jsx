import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Index from './components/Index.jsx'
import Rates from './components/Rates.jsx'
import Shipping from './components/Shipping.jsx'
import Tracking from './components/Tracking.jsx'
import Contact from './components/Contact.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import About from './components/About.jsx'
import CreateShipment from './components/Create-shipment.jsx'
import Support from './components/Support.jsx'
import Careers from './components/Careers.jsx'
import Blog from './components/Blog.jsx'
import Press from './components/Press.jsx'
import Returns from './components/Returns.jsx'
import Insurance from './components/Insurance.jsx'
import Docs from './components/Docs.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/rates" element={<Rates />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/create-shipment" element={<CreateShipment />} />
        <Route path="/support" element={<Support />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/press" element={<Press />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
