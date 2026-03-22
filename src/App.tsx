import { FormEvent, useEffect, useState } from 'react';

type PortfolioCategory = 'All' | 'VFX' | 'Wedding' | 'YouTube' | 'Reels' | '3D';

type PortfolioItem = {
  emoji: string;
  label: string;
  title: string;
  category: PortfolioCategory;
  subtitle: string;
  featured?: boolean;
};

const BRAND_NAME = 'MotionMintStudio';
const INSTAGRAM_URL = 'https://www.instagram.com/_motionmintstudios?igsh=bXp1cmlzdGk2djB0';
const LINKEDIN_URL = 'https://www.linkedin.com/company/motionmintstudio/';
const WHATSAPP_NUMBER = '918097620107';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
] as const;

const services = [
  ['✦', 'VFX & Motion Graphics', 'Visual effects, compositing, and motion graphics that bring imagination to life with precision and artistry.'],
  ['💍', 'Wedding & Pre-Wedding', 'Cinematic wedding films and dreamy pre-wedding edits that preserve your most precious moments with elegance.'],
  ['▶', 'YouTube & Long-Form', 'Professional editing for YouTube channels — colour grading, pacing, sound design, and engaging storytelling.'],
  ['⚡', 'Reels, Shorts & Short Films', 'Hook-driven short-form content optimised for Instagram, YouTube Shorts, and every major platform algorithm.'],
  ['🎯', 'UGC & Brand Content', 'Authentic user-generated content edits, brand films, and product showcases that convert viewers into customers.'],
  ['🤖', 'AI Video & Automation', 'Cutting-edge AI-powered video generation, editing automation, and next-generation content production.'],
  ['◈', '3D CAD & Visualisation', 'High-fidelity 3D modelling, product renders, and architectural visualisations crafted for maximum impact.'],
  ['🎉', 'Events & Parties', 'Dynamic event highlight reels and party coverage edits that capture every moment of the celebration.'],
] as const;

const filters: PortfolioCategory[] = ['All', 'VFX', 'Wedding', 'YouTube', 'Reels', '3D'];

const portfolioItems: PortfolioItem[] = [
  {
    emoji: '✦',
    label: 'VFX Showreel',
    title: 'Cinematic VFX Reel',
    category: 'VFX',
    subtitle: 'VFX · Motion Graphics',
    featured: true,
  },
  {
    emoji: '💍',
    label: 'Wedding Film',
    title: 'Priya & Aryan',
    category: 'Wedding',
    subtitle: 'Wedding · Cinematic',
  },
  {
    emoji: '▶',
    label: 'YouTube',
    title: 'Channel Edit Pack',
    category: 'YouTube',
    subtitle: 'YouTube · Long-Form',
  },
  {
    emoji: '⚡',
    label: 'Short Film',
    title: 'Echoes — Short Film',
    category: 'Reels',
    subtitle: 'Short Film · Narrative',
    featured: true,
  },
  {
    emoji: '◈',
    label: '3D Render',
    title: 'Product Visualisation',
    category: '3D',
    subtitle: '3D · CAD',
  },
  {
    emoji: '🎯',
    label: 'Brand Content',
    title: 'UGC Campaign',
    category: 'Reels',
    subtitle: 'UGC · Brand',
  },
];

const team = [
  ['👤', 'Anshuman Rawal', 'Founder & Creative Director', 'The visionary behind MotionMintStudio. Passionate about cinematic storytelling and pushing the boundaries of visual media.'],
  ['👤', 'Harsh Rawal', 'Founder & Creative Director', 'The visionary behind MotionMintStudio. Passionate about cinematic storytelling and pushing the boundaries of visual media.'],
  ['👤', 'Manan Bapna', 'Operations & Technical Director', 'Leads operations, client delivery, and strategic growth at MotionMintStudio, ensuring every project runs smoothly from first conversation to final frame.'],
] as const;

const testimonials = [
  ['💍', '[Client Name]', 'Wedding Film', "MotionMintStudio transformed our wedding footage into something we'll treasure for a lifetime. The cinematic quality was beyond anything we imagined."],
  ['▶', '[Client Name]', 'YouTube Creator', 'Our YouTube channel engagement doubled after MotionMintStudio started editing our content. The pacing, colour, and energy they bring is unmatched.'],
  ['◈', '[Client Name]', 'Brand Campaign', 'The 3D product visualisations MotionMintStudio created for our brand were absolutely stunning. It elevated our entire marketing campaign.'],
] as const;

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>('All');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 60);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', mobileMenuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [mobileMenuOpen]);

  const visiblePortfolio =
    activeFilter === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get('firstName') ?? '').trim();
    const lastName = String(formData.get('lastName') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const service = String(formData.get('service') ?? '').trim();
    const budget = String(formData.get('budget') ?? '').trim();
    const details = String(formData.get('details') ?? '').trim();
    const fullName = [firstName, lastName].filter(Boolean).join(' ');

    const message = [
      `New ${BRAND_NAME} enquiry`,
      '',
      `Name: ${fullName || 'Not provided'}`,
      `Email: ${email || 'Not provided'}`,
      `Phone / WhatsApp: ${phone || 'Not provided'}`,
      `Service: ${service || 'Not selected'}`,
      `Budget: ${budget || 'Not selected'}`,
      '',
      'Project Details:',
      details || 'Not provided',
    ].join('\n');

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
    event.currentTarget.reset();
    window.setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <nav className="site-nav">
        <a href="#hero" className="nav-logo">
          MotionMint<span>Studio</span>
        </a>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="nav-cta">
          Get in Touch
        </a>

        <button
          type="button"
          className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
            {link.label}
          </a>
        ))}
      </div>

      <main>
        <section id="hero" className="hero-section">
          <div className="hero-bg" />
          <div className="hero-grid" />
          <p className="hero-eyebrow">Premium Creative Studio</p>
          <h1 className="hero-title">
            We craft
            <br />
            <span className="gold">motion</span>
            <br />
            that moves.
          </h1>
          <p className="hero-sub">
            From cinematic VFX to viral reels — MotionMintStudio delivers world-class editing for
            brands, creators, and storytellers.
          </p>
          <div className="hero-btns">
            <a href="#portfolio" className="btn-primary">
              View Our Work
            </a>
            <a href="#contact" className="btn-secondary">
              Start a Project
            </a>
          </div>
          <div className="hero-showreel">
            <div className="port-placeholder showreel-placeholder">
              <div className="play-btn" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <span className="reel-label">MotionMintStudio — 2024 Showreel</span>
          </div>
        </section>

        <div className="gold-line" />

        <section id="services">
          <div className="services-header reveal">
            <p className="section-eyebrow">What We Do</p>
            <h2 className="section-title">Our Services</h2>
            <div className="divider" />
            <p className="section-desc">
              A full-spectrum creative studio offering everything from cinematic VFX to
              social-ready content — built to elevate your brand.
            </p>
          </div>
          <div className="services-grid">
            {services.map(([icon, title, description], index) => (
              <article key={title} className="service-card reveal">
                <span className="service-num">{String(index + 1).padStart(2, '0')}</span>
                <span className="service-icon">{icon}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="gold-line" />

        <section id="portfolio">
          <div className="portfolio-header reveal">
            <p className="section-eyebrow">Selected Work</p>
            <h2 className="section-title">Our Portfolio</h2>
            <div className="divider" />
          </div>

          <div className="portfolio-filter reveal" role="tablist" aria-label="Portfolio categories">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="portfolio-grid">
            {visiblePortfolio.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className={`port-item ${item.featured ? 'port-item-featured' : ''}`}
              >
                <div className="port-placeholder">
                  <div className="port-inner">
                    <span className="emoji">{item.emoji}</span>
                    <span>{item.label}</span>
                  </div>
                </div>
                <div className="port-overlay">
                  <div className="port-overlay-text">
                    <h4>{item.title}</h4>
                    <span>{item.subtitle}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="gold-line" />

        <section id="about">
          <div className="about-grid">
            <div className="about-visual reveal">
              <div className="about-img-placeholder">👤</div>
            </div>

            <div className="about-content reveal">
              <p className="section-eyebrow">About MotionMintStudio</p>
              <h2 className="section-title">
                Crafted with
                <br />
                precision & passion
              </h2>
              <div className="divider" />
              <p className="section-desc about-copy">
                MotionMintStudio is a Mumbai-based premium creative studio built for brands and
                storytellers who refuse to be ordinary. We believe that every frame is a
                canvas, every cut a brushstroke.
              </p>
              <p className="section-desc about-copy">
                From our founder&apos;s obsession with cinematic language to our team&apos;s mastery
                of cutting-edge tools, MotionMintStudio delivers content that doesn&apos;t just look
                good — it <em className="gold-emphasis">feels</em> unforgettable.
              </p>
              <a href="#contact" className="btn-primary">
                Work With Us
              </a>
            </div>
          </div>
        </section>

        <div className="gold-line" />

        <section id="team">
          <div className="team-header reveal">
            <p className="section-eyebrow">The Minds Behind the Magic</p>
            <h2 className="section-title">Meet the Team</h2>
            <div className="divider" />
          </div>
          <div className="team-grid">
            {team.map(([avatar, name, role, bio]) => (
              <article key={name} className="team-card reveal">
                <div className="team-avatar">{avatar}</div>
                <h3>{name}</h3>
                <p className="team-role">{role}</p>
                <p className="team-bio">{bio}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="gold-line" />

        <div className="gold-line" />

        <section id="contact">
          <div className="contact-grid">
            <div className="contact-info reveal">
              <p className="section-eyebrow">Let&apos;s Create Together</p>
              <h2>
                Ready to make something <em className="gold-emphasis">extraordinary?</em>
              </h2>
              <div className="divider" />
              <p>
                Whether you have a clear vision or just a spark of an idea, we&apos;d love to hear
                from you. Tell us about your project and let&apos;s bring it to life.
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-item-icon">✉</div>
                  <span>hello@motionmintstudio.in</span>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">📱</div>
                  <span>+91 80976 20107 / +91 80976 20107</span>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">📍</div>
                  <span>Mumbai, India</span>
                </div>
              </div>

              <div className="socials">
                <a
                  href={INSTAGRAM_URL}
                  className="social-btn"
                  title="Instagram"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noreferrer"
                >
                  <InstagramIcon />
                </a>
                <a href={LINKEDIN_URL} className="social-btn" title="LinkedIn" aria-label="LinkedIn">
                  <LinkedInIcon />
                </a>
                <a href="#" className="social-btn" title="Twitter / X" aria-label="Twitter / X">
                  <XIcon />
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  className="social-btn"
                  title="WhatsApp"
                  aria-label="WhatsApp"
                  target="_blank"
                  rel="noreferrer"
                >
                  <WhatsAppIcon />
                </a>
              </div>
            </div>

            <div className="contact-form-wrap reveal">
              <p className="section-eyebrow form-eyebrow">Client Enquiry Form</p>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Your first name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" placeholder="Your last name" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone / WhatsApp</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service">Service Required</label>
                  <select id="service" name="service" defaultValue="" required>
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option>VFX & Motion Graphics</option>
                    <option>Wedding / Pre-Wedding Film</option>
                    <option>YouTube Editing</option>
                    <option>Reels / Shorts / Short Film</option>
                    <option>UGC & Brand Content</option>
                    <option>AI Video</option>
                    <option>3D CAD & Visualisation</option>
                    <option>Events & Parties</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="budget">Project Budget (approx.)</label>
                  <select id="budget" name="budget" defaultValue="" required>
                    <option value="" disabled>
                      Select budget range
                    </option>
                    <option>Under ₹10,000</option>
                    <option>₹10,000 – ₹25,000</option>
                    <option>₹25,000 – ₹50,000</option>
                    <option>₹50,000 – ₹1,00,000</option>
                    <option>₹1,00,000+</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="details">Project Details</label>
                  <textarea
                    id="details"
                    name="details"
                    placeholder="Tell us about your project, timeline, and any references you have in mind..."
                    required
                  />
                </div>

                <button type="submit" className={`form-submit ${submitted ? 'is-sent' : ''}`}>
                  {submitted ? "Sent! We'll be in touch" : 'Send Enquiry'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-logo">
          MotionMint<span>Studio</span>
        </div>
        <div className="footer-links">
          <a href="#services">Services</a>
          <a href="#portfolio">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} MotionMintStudio. All rights reserved.</p>
      </footer>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        className="whatsapp-float"
        target="_blank"
        rel="noreferrer"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.553 4.103 1.519 5.833L.057 23.25l5.562-1.461A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.523-5.168-1.432l-.371-.22-3.302.867.882-3.218-.24-.384A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

export default App;
