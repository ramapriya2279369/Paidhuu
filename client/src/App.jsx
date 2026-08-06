import React, { useState, useEffect } from 'react';

function App() {
  const [brands, setBrands] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [expandedBrands, setExpandedBrands] = useState({});

  const toggleExpand = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedBrands(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => {
    // Fetch brand data from Node.js API
    fetch('http://localhost:5001/api/brands')
      .then(res => res.json())
      .then(data => setBrands(data))
      .catch(err => {
        console.error("Error fetching brands: ", err);
        // Fallback static data if backend not active
        setBrands([
          {
            id: 'paidhuethicalfoods',
            name: 'Paidhu Ethical Foods',
            description: "Paidhu – The Edible Flower Co. offers premium edible flower-based foods, including Bloom Cookies, Petal Jams, Medley Teas, Brew Flora, and Saffron, crafted with natural ingredients. We are committed to healthy, preservative-free, and ethically made products that bring wellness and floral goodness to everyday life.",
            url: 'https://paidhuethicalfoods.com',
            logo: '/assets/paidhu_logo_white.png'
          },
          {
            id: 'paidhusaffron',
            name: 'Paidhu Saffron',
            description: "Paidhu Saffron offers the world's finest, ethically sourced grade-A Kashmiri Saffron, handpicked for its rich aroma, deep crimson color, and unparalleled purity. We are committed to delivering authentic, premium saffron that brings natural wellness, gourmet flavor, and exquisite quality to everyday life.",
            url: 'https://paidhusaffron.com',
            logo: '/assets/paidhu_saffron_logo.png'
          },
          {
            id: 'floffi',
            name: 'Floffi',
            description: "Floffi offers a delightful range of jams, sauces, spreads, and everyday food products made with carefully selected quality ingredients. We are committed to delivering great taste, freshness, and trusted quality in every product for you and your family.",
            url: 'https://floffi.in',
            logo: '/assets/fluffy_logo.png'
          },
          {
            id: 'viyara',
            name: 'Viyara',
            description: "VIYARA is a tech-enabled software and marketing agency helping businesses grow through innovative technology and data-driven strategies. We deliver scalable software, impactful digital experiences, and performance-focused marketing solutions that drive growth, improve efficiency, and create lasting business success.",
            url: 'https://viyara.co.in',
            logo: '/assets/viyara_logo.png'
          },
          {
            id: 'kalikasphere',
            name: 'KalikaSphere',
            description: "Kalikasphere is a creative learning and innovation platform focused on empowering individuals and businesses through education, creativity, technology, and community-driven experiences. We provide workshops, digital solutions, strategic consulting, and innovative programs that inspire growth, collaboration, and lifelong learning.",
            url: 'https://kalikasphere.com',
            logo: '/assets/collegebear_logo.png'
          }
        ]);
      });

    // Scrolled header listener
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormStatus(null);
    try {
      const response = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setFormStatus({ type: 'success', text: data.message });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus({ type: 'error', text: data.error || 'Something went wrong.' });
      }
    } catch (err) {
      console.error("Submit error:", err);
      setFormStatus({ type: 'error', text: 'Network error. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* Premium Background Glow Effect */}
      <div className="bg-glow-container">
        <div className="bg-glow-1"></div>
        <div className="bg-glow-2"></div>
      </div>

      {/* Header / Navbar */}
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#home" className="nav-brand" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
          <img src="/assets/paidhu_monogram_white.png" alt="Paidhu Group Logo" className="nav-brand-logo" />
          <img src="/assets/paidhu_text_gold.png" alt="Paidhu" className="nav-brand-text-logo" style={{ height: '28px', objectFit: 'contain' }} />
        </a>
        <ul className="nav-links">
          <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
          <li><a href="#brands" onClick={(e) => { e.preventDefault(); scrollToSection('brands'); }}>Brands</a></li>
        </ul>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-main-logo-container">
          <img src="/assets/paidhu_monogram_white.png" alt="Paidhu Group Monogram Logo" className="hero-main-logo" />
        </div>
        <h1 className="hero-tagline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/assets/paidhu_text_gold.png" alt="Paidhu" style={{ height: '70px', objectFit: 'contain' }} />
        </h1>
        <p className="hero-description">
          A multi-brand ecosystem driving ethical growth, premium lifestyles, luxury craftsmanship, and smart education.
        </p>
      </section>

      {/* Brands Cards Section */}
      <section id="brands" className="brands-section">
        <div className="section-header">
          <p className="section-subtitle">Our Projects</p>
          <h2 className="section-title">Featured Ventures</h2>
        </div>

        <div className="brands-grid">
          {brands.map(brand => (
            <a 
              key={brand.id} 
              href={brand.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`brand-card glass ${brand.id}`}
            >
              <div className="brand-logo-container">
                <img 
                  src={brand.logo} 
                  alt={`${brand.name} Logo`} 
                  className="brand-card-logo"
                />
              </div>
              <div className="card-divider"></div>
              <h3>{brand.name}</h3>
              <p>
                {expandedBrands[brand.id] 
                  ? brand.description 
                  : `${brand.description.slice(0, 110)}...`}
                <span 
                  onClick={(e) => toggleExpand(e, brand.id)}
                  style={{ 
                    color: 'var(--accent-gold)', 
                    cursor: 'pointer', 
                    marginLeft: '6px', 
                    fontWeight: '600',
                    textDecoration: 'underline'
                  }}
                >
                  {expandedBrands[brand.id] ? 'Read Less' : 'Read More'}
                </span>
              </p>
              <span className="brand-action">
                Visit Website
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/assets/paidhu_monogram_white.png" alt="Paidhu logo" style={{ height: '24px', objectFit: 'contain' }} />
          <img src="/assets/paidhu_text_gold.png" alt="Paidhu" style={{ height: '14px', objectFit: 'contain' }} />
        </div>
        <div className="footer-copy">
          &copy; {new Date().getFullYear()} Paidhu. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
