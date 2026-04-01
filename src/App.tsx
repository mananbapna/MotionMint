import { FormEvent, useEffect, useRef, useState } from 'react';
import anshumanPortrait from './assets/Anshuman_Portrait.png';
import harshPortrait from './assets/Harsh_Portrait.png';
import mananPortrait from './assets/Manan_Portrait.png';
import logoImage from './assets/logo.png';
import rollingOutIndiaReelVideo from './assets/RollingOutIndia.mp4';

type PortfolioCategory = 'All' | 'VFX' | 'Wedding' | 'YouTube' | 'Reels' | 'Fest';

type PortfolioItem = {
  emoji: string;
  label: string;
  title: string;
  category: PortfolioCategory;
  subtitle: string;
  featured?: boolean;
  videoSrc?: string;
  embedSrc?: string;
  previewEmbedSrc?: string;
  thumbnailSrc?: string;
  showInAll?: boolean;
};

type YouTubePlayer = {
  destroy: () => void;
};

type YouTubePlayerNamespace = {
  Player: new (
    element: HTMLElement,
    options: {
      width?: string | number;
      height?: string | number;
      videoId: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: () => void;
        onError?: () => void;
      };
    },
  ) => YouTubePlayer;
};

declare global {
  interface Window {
    YT?: YouTubePlayerNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const VFX_YOUTUBE_ID = 'Wmam-VvjcfE';
const WEDDING_YOUTUBE_ID = 'PxFDrJvHbVo';
const SECOND_WEDDING_YOUTUBE_ID = 'SEF0Bfo0S4A';
const MAIN_YOUTUBE_ID = 'Es9MvcHDybI';
const REEL_YOUTUBE_ID = '9LvdTwylZoI';
const LALIT_BRAND_YOUTUBE_ID = '_rJM4rIfc24';
const FEST_YOUTUBE_ID = 'xsTenjiqYUM';

const BRAND_NAME = 'MotionMintStudio';
const INSTAGRAM_URL = 'https://www.instagram.com/_motionmintstudio?igsh=bXp1cmlzdGk2djB0';
const LINKEDIN_URL = 'https://www.linkedin.com/in/motionmintstudio/';
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
  ['🎬', 'Commercial Shoots', 'Polished commercial shoot production and edits designed to showcase brands, products, and campaigns with premium visual impact.'],
  ['🤖', 'AI Video & Automation', 'Cutting-edge AI-powered video generation, editing automation, and next-generation content production.'],
  ['◈', '3D CAD & Visualisation', 'High-fidelity 3D modelling, product renders, and architectural visualisations crafted for maximum impact.'],
  ['🎉', 'Events & Parties', 'Dynamic event highlight reels and party coverage edits that capture every moment of the celebration.'],
] as const;

const filters: PortfolioCategory[] = ['All', 'VFX', 'Wedding', 'YouTube', 'Reels', 'Fest'];

const portfolioItems: PortfolioItem[] = [
  {
    emoji: '✦',
    label: 'VFX Showreel',
    title: 'Cinematic VFX Reel',
    category: 'VFX',
    subtitle: 'VFX · Motion Graphics',
    embedSrc: `https://www.youtube-nocookie.com/embed/${VFX_YOUTUBE_ID}?autoplay=1&loop=1&playlist=${VFX_YOUTUBE_ID}&rel=0&vq=hd1080&hd=1`,
    previewEmbedSrc: `https://www.youtube-nocookie.com/embed/${VFX_YOUTUBE_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${VFX_YOUTUBE_ID}&rel=0&playsinline=1&vq=hd1080&hd=1`,
    thumbnailSrc: `https://i.ytimg.com/vi/${VFX_YOUTUBE_ID}/hqdefault.jpg`,
  },
  {
    emoji: '💍',
    label: 'Wedding Film',
    title: 'Priya & Aryan',
    category: 'Wedding',
    subtitle: 'Wedding · Cinematic',
    embedSrc: `https://www.youtube-nocookie.com/embed/${WEDDING_YOUTUBE_ID}?autoplay=1&loop=1&playlist=${WEDDING_YOUTUBE_ID}&rel=0&vq=hd1080&hd=1`,
    previewEmbedSrc: `https://www.youtube-nocookie.com/embed/${WEDDING_YOUTUBE_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${WEDDING_YOUTUBE_ID}&rel=0&playsinline=1&vq=hd1080&hd=1`,
    thumbnailSrc: `https://i.ytimg.com/vi/${WEDDING_YOUTUBE_ID}/hqdefault.jpg`,
  },
  {
    emoji: '💍',
    label: 'Wedding Story',
    title: 'Riya & Kunal',
    category: 'Wedding',
    subtitle: 'Wedding · Celebration',
    embedSrc: `https://www.youtube-nocookie.com/embed/${SECOND_WEDDING_YOUTUBE_ID}?autoplay=1&loop=1&playlist=${SECOND_WEDDING_YOUTUBE_ID}&rel=0&vq=hd1080&hd=1`,
    previewEmbedSrc: `https://www.youtube-nocookie.com/embed/${SECOND_WEDDING_YOUTUBE_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${SECOND_WEDDING_YOUTUBE_ID}&rel=0&playsinline=1&vq=hd1080&hd=1`,
    thumbnailSrc: `https://i.ytimg.com/vi/${SECOND_WEDDING_YOUTUBE_ID}/hqdefault.jpg`,
    showInAll: false,
  },
  {
    emoji: '▶',
    label: 'YouTube Feature',
    title: 'Lalbagh Cha Raja 2025',
    category: 'YouTube',
    subtitle: 'YouTube · Long-Form',
    embedSrc: `https://www.youtube-nocookie.com/embed/${MAIN_YOUTUBE_ID}?autoplay=1&loop=1&playlist=${MAIN_YOUTUBE_ID}&rel=0&vq=hd1080&hd=1`,
    previewEmbedSrc: `https://www.youtube-nocookie.com/embed/${MAIN_YOUTUBE_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${MAIN_YOUTUBE_ID}&rel=0&playsinline=1&vq=hd1080&hd=1`,
    thumbnailSrc: `https://i.ytimg.com/vi/${MAIN_YOUTUBE_ID}/hqdefault.jpg`,
  },
  {
    emoji: '▶',
    label: 'YouTube Episode',
    title: 'YouTube Deep Dive',
    category: 'YouTube',
    subtitle: 'YouTube · Long-Form',
    videoSrc: '/videos/youtube-secondary.optimized.mp4',
    showInAll: false,
  },
  {
    emoji: '⚡',
    label: 'Reel',
    title: 'Cinematic Reel',
    category: 'Reels',
    subtitle: 'Reels · Social',
    embedSrc: `https://www.youtube-nocookie.com/embed/${REEL_YOUTUBE_ID}?autoplay=1&loop=1&playlist=${REEL_YOUTUBE_ID}&rel=0&vq=hd1080&hd=1`,
    previewEmbedSrc: `https://www.youtube-nocookie.com/embed/${REEL_YOUTUBE_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${REEL_YOUTUBE_ID}&rel=0&playsinline=1&vq=hd1080&hd=1`,
    thumbnailSrc: `https://i.ytimg.com/vi/${REEL_YOUTUBE_ID}/hqdefault.jpg`,
  },
  {
    emoji: '⚡',
    label: 'Brand Reel',
    title: 'RollingOutIndia Reel',
    category: 'Reels',
    subtitle: 'Reels · Event',
    videoSrc: rollingOutIndiaReelVideo,
    showInAll: false,
  },
  {
    emoji: '🎉',
    label: 'Fest Aftermovie',
    title: 'SIES 2024 Official Aftermovie',
    category: 'Fest',
    subtitle: 'Fest · Aftermovie',
    embedSrc: `https://www.youtube-nocookie.com/embed/${FEST_YOUTUBE_ID}?autoplay=1&loop=1&playlist=${FEST_YOUTUBE_ID}&rel=0&vq=hd1080&hd=1`,
    previewEmbedSrc: `https://www.youtube-nocookie.com/embed/${FEST_YOUTUBE_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${FEST_YOUTUBE_ID}&rel=0&playsinline=1&vq=hd1080&hd=1`,
    thumbnailSrc: `https://i.ytimg.com/vi/${FEST_YOUTUBE_ID}/hqdefault.jpg`,
  },
  {
    emoji: '🎬',
    label: 'Brand Shoot',
    title: 'LaLiT Chandigarh',
    category: 'YouTube',
    subtitle: 'Brand Shoot · Hospitality',
    embedSrc: `https://www.youtube-nocookie.com/embed/${LALIT_BRAND_YOUTUBE_ID}?autoplay=1&loop=1&playlist=${LALIT_BRAND_YOUTUBE_ID}&rel=0&vq=hd1080&hd=1`,
    previewEmbedSrc: `https://www.youtube-nocookie.com/embed/${LALIT_BRAND_YOUTUBE_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${LALIT_BRAND_YOUTUBE_ID}&rel=0&playsinline=1&vq=hd1080&hd=1`,
    thumbnailSrc: `https://i.ytimg.com/vi/${LALIT_BRAND_YOUTUBE_ID}/hqdefault.jpg`,
  },
];

const team = [
  ['👤', 'Harsh Rawal', 'Founder & CEO', 'Shapes the creative vision and business direction of MotionMintStudio, leading the brand with a focus on storytelling, growth, and high-impact client work.', harshPortrait],
  ['👤', 'Anshuman Rawal', 'Co-Founder & CFO', 'Drives the technical backbone of MotionMintStudio, overseeing systems, innovation, and workflows that keep production efficient, scalable, and future-ready.', anshumanPortrait],
  ['👤', 'Manan Bapna', 'CTO', 'Oversees operations and delivery across MotionMintStudio, aligning execution, client communication, and internal coordination to keep every project running smoothly end to end.', mananPortrait],
] as const;

const testimonials = [
  ['💍', '[Client Name]', 'Wedding Film', "MotionMintStudio transformed our wedding footage into something we'll treasure for a lifetime. The cinematic quality was beyond anything we imagined."],
  ['▶', '[Client Name]', 'YouTube Creator', 'Our YouTube channel engagement doubled after MotionMintStudio started editing our content. The pacing, colour, and energy they bring is unmatched.'],
  ['◈', '[Client Name]', 'Brand Campaign', 'The 3D product visualisations MotionMintStudio created for our brand were absolutely stunning. It elevated our entire marketing campaign.'],
] as const;

let youtubeIframeApiPromise: Promise<YouTubePlayerNamespace> | null = null;

function loadYouTubeIframeApi() {
  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  if (!youtubeIframeApiPromise) {
    youtubeIframeApiPromise = new Promise<YouTubePlayerNamespace>((resolve, reject) => {
      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[src="https://www.youtube.com/iframe_api"]',
      );
      const previousReady = window.onYouTubeIframeAPIReady;

      const handleReady = () => {
        previousReady?.();

        if (window.YT?.Player) {
          resolve(window.YT);
          return;
        }

        reject(new Error('YouTube iframe API did not initialize.'));
      };

      window.onYouTubeIframeAPIReady = handleReady;

      if (existingScript) {
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      script.onerror = () => reject(new Error('Unable to load the YouTube iframe API.'));
      document.head.append(script);
    }).catch((error) => {
      youtubeIframeApiPromise = null;
      throw error;
    });
  }

  return youtubeIframeApiPromise;
}

function extractYouTubeVideoId(embedSrc: string) {
  try {
    const url = new URL(embedSrc);
    const segments = url.pathname.split('/').filter(Boolean);
    const embedIndex = segments.indexOf('embed');

    if (embedIndex === -1) {
      return null;
    }

    return segments[embedIndex + 1] ?? null;
  } catch {
    return null;
  }
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>('All');
  const [submitted, setSubmitted] = useState(false);
  const [activeVideo, setActiveVideo] = useState<PortfolioItem | null>(null);
  const [unavailablePortfolioTitles, setUnavailablePortfolioTitles] = useState<string[]>([]);
  const [modalPlaying, setModalPlaying] = useState(true);
  const [modalMuted, setModalMuted] = useState(false);
  const [modalProgress, setModalProgress] = useState(0);
  const [modalDuration, setModalDuration] = useState(0);
  const [modalIsPortrait, setModalIsPortrait] = useState(false);
  const [modalPlaybackMode, setModalPlaybackMode] = useState<'embed' | 'local'>('embed');
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const modalEmbedHostRef = useRef<HTMLDivElement | null>(null);
  const modalYouTubePlayerRef = useRef<YouTubePlayer | null>(null);
  const modalUsesLocalVideo = Boolean(
    activeVideo?.videoSrc && (!activeVideo.embedSrc || modalPlaybackMode === 'local'),
  );

  const markPortfolioItemUnavailable = (item: PortfolioItem) => {
    setUnavailablePortfolioTitles((current) =>
      current.includes(item.title) ? current : [...current, item.title],
    );

    modalYouTubePlayerRef.current?.destroy();
    modalYouTubePlayerRef.current = null;

    const video = modalVideoRef.current;
    if (video) {
      video.pause();
    }

    setActiveVideo((current) => (current?.title === item.title ? null : current));
  };

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

  useEffect(() => {
    document.body.classList.toggle('video-open', Boolean(activeVideo));

    const handleEscape = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(target.tagName)
      ) {
        return;
      }

      if (event.key === 'Escape') {
        const video = modalVideoRef.current;
        if (video) {
          video.pause();
        }
        setActiveVideo(null);
        return;
      }

      if (!activeVideo) {
        return;
      }

      if (!modalUsesLocalVideo) {
        return;
      }

      if (event.key === ' ' || event.code === 'Space') {
        event.preventDefault();
        toggleModalPlayback();
        return;
      }

      if (event.key.toLowerCase() === 'm') {
        event.preventDefault();
        toggleModalMute();
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        skipModalTime(-5);
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        skipModalTime(5);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.classList.remove('video-open');
      window.removeEventListener('keydown', handleEscape);
    };
  }, [activeVideo, modalUsesLocalVideo]);

  useEffect(() => {
    const video = modalVideoRef.current;

    if (!video || !activeVideo || !modalUsesLocalVideo) {
      return;
    }

    video.currentTime = 0;
    video.muted = modalMuted;

    const handleLoadedMetadata = () => {
      setModalDuration(video.duration || 0);
      setModalIsPortrait(video.videoHeight > video.videoWidth);
    };

    const handleTimeUpdate = () => {
      setModalProgress(video.currentTime);
      setModalDuration(video.duration || 0);
    };

    const handlePlay = () => setModalPlaying(true);
    const handlePause = () => setModalPlaying(false);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    void video.play().catch(() => {
      setModalPlaying(false);
    });

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [activeVideo, modalMuted, modalUsesLocalVideo]);

  useEffect(() => {
    const host = modalEmbedHostRef.current;

    if (!host || !activeVideo?.embedSrc || !activeVideo.videoSrc || modalPlaybackMode !== 'embed') {
      return;
    }

    const youtubeVideoId = extractYouTubeVideoId(activeVideo.embedSrc);
    if (!youtubeVideoId) {
      setModalPlaybackMode('local');
      return;
    }

    let cancelled = false;
    const fallbackTimeout = window.setTimeout(() => {
      if (cancelled) {
        return;
      }

      modalYouTubePlayerRef.current?.destroy();
      modalYouTubePlayerRef.current = null;
      setModalPlaybackMode('local');
    }, 4500);

    void loadYouTubeIframeApi()
      .then((YT) => {
        if (cancelled || !modalEmbedHostRef.current) {
          return;
        }

        modalEmbedHostRef.current.innerHTML = '';
        modalYouTubePlayerRef.current = new YT.Player(modalEmbedHostRef.current, {
          width: '100%',
          height: '100%',
          videoId: youtubeVideoId,
          playerVars: {
            autoplay: 1,
            playsinline: 1,
            rel: 0,
            loop: 1,
            playlist: youtubeVideoId,
          },
          events: {
            onReady: () => {
              if (cancelled) {
                return;
              }

              window.clearTimeout(fallbackTimeout);
            },
            onError: () => {
              if (cancelled) {
                return;
              }

              window.clearTimeout(fallbackTimeout);
              modalYouTubePlayerRef.current?.destroy();
              modalYouTubePlayerRef.current = null;
              setModalPlaybackMode('local');
            },
          },
        });
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        window.clearTimeout(fallbackTimeout);
        setModalPlaybackMode('local');
      });

    return () => {
      cancelled = true;
      window.clearTimeout(fallbackTimeout);
      modalYouTubePlayerRef.current?.destroy();
      modalYouTubePlayerRef.current = null;
      host.innerHTML = '';
    };
  }, [activeVideo, modalPlaybackMode]);

  const openVideoModal = (item: PortfolioItem) => {
    setModalMuted(false);
    setModalProgress(0);
    setModalDuration(0);
    setModalPlaying(true);
    setModalIsPortrait(false);
    setModalPlaybackMode(item.videoSrc && !item.embedSrc ? 'local' : 'embed');
    setActiveVideo(item);
  };

  const closeActiveVideo = () => {
    const video = modalVideoRef.current;
    if (video) {
      video.pause();
    }
    setActiveVideo(null);
  };

  const handleModalVideoError = () => {
    if (!activeVideo) {
      return;
    }

    markPortfolioItemUnavailable(activeVideo);
  };

  const toggleModalPlayback = () => {
    const video = modalVideoRef.current;
    if (!video) {
      return;
    }

    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };

  const toggleModalMute = () => {
    const video = modalVideoRef.current;
    if (!video) {
      return;
    }

    const nextMuted = !modalMuted;
    video.muted = nextMuted;
    setModalMuted(nextMuted);
  };

  const skipModalTime = (delta: number) => {
    const video = modalVideoRef.current;
    if (!video) {
      return;
    }

    const nextTime = Math.min(Math.max(video.currentTime + delta, 0), video.duration || 0);
    video.currentTime = nextTime;
    setModalProgress(nextTime);
  };

  const handleModalSeek = (value: number) => {
    const video = modalVideoRef.current;
    if (!video) {
      return;
    }

    video.currentTime = value;
    setModalProgress(value);
  };

  const formatTime = (seconds: number) => {
    const safeSeconds = Number.isFinite(seconds) ? Math.max(seconds, 0) : 0;
    const minutes = Math.floor(safeSeconds / 60);
    const remainingSeconds = Math.floor(safeSeconds % 60);
    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const visiblePortfolio =
    activeFilter === 'All'
      ? portfolioItems.filter(
          (item) => item.showInAll !== false && !unavailablePortfolioTitles.includes(item.title),
        )
      : portfolioItems.filter(
          (item) =>
            item.category === activeFilter && !unavailablePortfolioTitles.includes(item.title),
        );

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
          <img src={logoImage} alt={BRAND_NAME} className="brand-logo-image brand-logo-image-nav" />
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
                className={`port-item ${item.featured ? 'port-item-featured' : ''} ${item.videoSrc || item.embedSrc ? 'port-item-video' : ''}`}
              >
                <div
                  className="port-placeholder"
                  onClick={item.videoSrc || item.embedSrc ? () => openVideoModal(item) : undefined}
                  role={item.videoSrc || item.embedSrc ? 'button' : undefined}
                  tabIndex={item.videoSrc || item.embedSrc ? 0 : undefined}
                  onKeyDown={
                    item.videoSrc || item.embedSrc
                      ? (event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            openVideoModal(item);
                          }
                        }
                      : undefined
                  }
                  aria-label={item.videoSrc || item.embedSrc ? `Open ${item.title} video` : undefined}
                >
                  {item.videoSrc ? (
                    <>
                      <video
                        className="port-video"
                        src={item.videoSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        onError={() => markPortfolioItemUnavailable(item)}
                      />
                      <div className="port-video-hint">
                        <span className="port-video-hint-icon" aria-hidden="true">
                          <PlayIcon />
                        </span>
                        <span>Open</span>
                      </div>
                    </>
                  ) : item.embedSrc && item.thumbnailSrc ? (
                    <>
                      {item.previewEmbedSrc ? (
                        <iframe
                          className={`port-video port-video-embed ${item.category === 'Reels' ? 'port-video-embed-portrait' : ''}`}
                          src={item.previewEmbedSrc}
                          title={`${item.title} preview`}
                          allow="autoplay; encrypted-media; picture-in-picture"
                          referrerPolicy="strict-origin-when-cross-origin"
                        />
                      ) : (
                        <img src={item.thumbnailSrc} alt={item.title} className="port-video port-video-thumb" />
                      )}
                      <div className="port-video-hint">
                        <span className="port-video-hint-icon" aria-hidden="true">
                          <PlayIcon />
                        </span>
                        <span>Open</span>
                      </div>
                    </>
                  ) : (
                    <div className="port-inner">
                      <span className="emoji">{item.emoji}</span>
                      <span>{item.label}</span>
                    </div>
                  )}
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
            {team.map(([avatar, name, role, bio, photo]) => (
              <article key={name} className="team-card reveal">
                <div className="team-avatar">
                  {photo ? (
                    <img src={photo} alt={name} className="team-avatar-image" />
                  ) : (
                    avatar
                  )}
                </div>
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
                  <span>motionmintstudio24@gmail.com</span>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">📱</div>
                  <span>+91 80976 20107 / +91 98925 07669</span>
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
                <a
                  href={LINKEDIN_URL}
                  className="social-btn"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedInIcon />
                </a>
                <a href="#" className="social-btn" title="Twitter / X" aria-label="Twitter / X">
                  <XIcon />
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  className="social-btn whatsapp-social"
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
          <img src={logoImage} alt={BRAND_NAME} className="brand-logo-image brand-logo-image-footer" />
        </div>
        <div className="footer-links">
          <a href="#services">Services</a>
          <a href="#portfolio">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} MotionMintStudio. All rights reserved.</p>
      </footer>

      {activeVideo ? (
        <div className="video-modal" role="dialog" aria-modal="true" aria-label={activeVideo.title}>
          <button
            type="button"
            className="video-modal-backdrop"
            aria-label="Close expanded video"
            onClick={closeActiveVideo}
          />
          <div className={`video-modal-panel ${modalIsPortrait ? 'video-modal-panel-portrait' : ''}`}>
            <button
              type="button"
              className="video-modal-close"
              aria-label="Close expanded video"
              onClick={closeActiveVideo}
            >
              Close
            </button>
            <div className="video-modal-stage">
              {modalUsesLocalVideo ? (
                <video
                  ref={modalVideoRef}
                  className="video-modal-player"
                  src={activeVideo.videoSrc}
                  autoPlay
                  playsInline
                  preload="auto"
                  onClick={toggleModalPlayback}
                  onError={handleModalVideoError}
                />
              ) : activeVideo.embedSrc ? (
                activeVideo.videoSrc ? (
                  <div ref={modalEmbedHostRef} className="video-modal-embed" aria-label={activeVideo.title} />
                ) : (
                  <iframe
                    className="video-modal-embed"
                    src={activeVideo.embedSrc}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                )
              ) : null}
              <div className="video-modal-topbar">
                <div className="video-modal-meta">
                  <h4>{activeVideo.title}</h4>
                  <span>{activeVideo.subtitle}</span>
                </div>
              </div>
              {modalUsesLocalVideo ? (
              <div className="video-modal-controls">
                <button
                  type="button"
                  className="video-control"
                  aria-label="Skip back 5 seconds"
                  onClick={() => skipModalTime(-5)}
                >
                  <SkipBackIcon />
                </button>
                <button
                  type="button"
                  className="video-control"
                  aria-label={modalPlaying ? 'Pause video' : 'Play video'}
                  onClick={toggleModalPlayback}
                >
                  {modalPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <button
                  type="button"
                  className="video-control"
                  aria-label="Skip forward 5 seconds"
                  onClick={() => skipModalTime(5)}
                >
                  <SkipForwardIcon />
                </button>
                <button
                  type="button"
                  className="video-control"
                  aria-label={modalMuted ? 'Unmute video' : 'Mute video'}
                  onClick={toggleModalMute}
                >
                  {modalMuted ? <MuteIcon /> : <VolumeIcon />}
                </button>
                <div className="video-progress-wrap">
                  <input
                    type="range"
                    min="0"
                    max={modalDuration || 0}
                    step="0.1"
                    value={Math.min(modalProgress, modalDuration || 0)}
                    className="video-progress"
                    aria-label="Video progress"
                    style={
                      {
                        '--progress-fill': `${modalDuration ? (modalProgress / modalDuration) * 100 : 0}%`,
                      } as React.CSSProperties
                    }
                    onChange={(event) => handleModalSeek(Number(event.target.value))}
                  />
                  <div className="video-time">
                    <span>{formatTime(modalProgress)}</span>
                    <span>{formatTime(modalDuration)}</span>
                  </div>
                </div>
              </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.553 4.103 1.519 5.833L.057 23.25l5.562-1.461A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.523-5.168-1.432l-.371-.22-3.302.867.882-3.218-.24-.384A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l10-6.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="7" y="5" width="4" height="14" rx="1" />
      <rect x="13" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 9v6h4l5 4V5l-5 4z" />
      <path d="M18 9.5a4.5 4.5 0 0 1 0 5" />
      <path d="M20.5 7a8 8 0 0 1 0 10" />
    </svg>
  );
}

function MuteIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 9v6h4l5 4V5l-5 4z" />
      <path d="m17 9 4 6" />
      <path d="m21 9-4 6" />
    </svg>
  );
}

function SkipBackIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 19 2 12l9-7v14z" />
      <path d="M22 19 13 12l9-7v14z" />
    </svg>
  );
}

function SkipForwardIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m13 19 9-7-9-7v14z" />
      <path d="M2 19 11 12 2 5v14z" />
    </svg>
  );
}

export default App;
