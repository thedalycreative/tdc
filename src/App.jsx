function Styleguide() {
	return (
		<div
			className="page styleguide-page"
			style={{ padding: "2rem 0", maxWidth: 900, margin: "0 auto" }}
		>
			<section style={{ textAlign: "center", marginBottom: "2.5rem" }}>
				<h1
					style={{
						fontFamily: "'Fraunces',serif",
						fontSize: "2.2rem",
						marginBottom: "1.2rem",
					}}
				>
					Style Guide
				</h1>
				<p style={{ color: B.slate, fontSize: "1.1rem" }}>
					Brand colors, fonts, and visual assets for The Daly Creative.
				</p>
			</section>
			<section style={{ marginBottom: "2.5rem", textAlign: "center" }}>
				<h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: ".7rem" }}>
					Brand Colors
				</h2>
				<img
					src={require("./assets/images/style-guide/styleguide-colours.png")}
					alt="Brand Colors"
					style={{
						width: "100%",
						maxWidth: 600,
						borderRadius: "1rem",
						marginBottom: "1.2rem",
						boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
					}}
				/>
			</section>
			<section style={{ marginBottom: "2.5rem", textAlign: "center" }}>
				<h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: ".7rem" }}>
					Fonts & Headers
				</h2>
				<img
					src={require("./assets/images/style-guide/styleguide-headers-font.png")}
					alt="Fonts & Headers"
					style={{
						width: "100%",
						maxWidth: 600,
						borderRadius: "1rem",
						marginBottom: "1.2rem",
						boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
					}}
				/>
			</section>
			<section style={{ marginBottom: "2.5rem", textAlign: "center" }}>
				<h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: ".7rem" }}>
					Animated Icons (Lordicon)
				</h2>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						gap: "2rem",
						flexWrap: "wrap",
					}}
				>
					<lord-icon
						src="https://cdn.lordicon.com/gqzfzudq.json"
						trigger="loop"
						colors="primary:#2f9ea0,secondary:#ff8a3d"
						style={{ width: "64px", height: "64px" }}
					/>
					<lord-icon
						src="https://cdn.lordicon.com/lupuorrc.json"
						trigger="loop"
						colors="primary:#ff8a3d,secondary:#2f9ea0"
						style={{ width: "64px", height: "64px" }}
					/>
					<lord-icon
						src="https://cdn.lordicon.com/qhgmphtg.json"
						trigger="loop"
						colors="primary:#fb837d,secondary:#ff8a3d"
						style={{ width: "64px", height: "64px" }}
					/>
				</div>
				<script src="https://cdn.lordicon.com/lordicon.js"></script>
			</section>
		</div>
	);
}
// ─── Main App ────────────────────────────────────────────────────
export default function App() {
	return (
		<Router>
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/method" element={<Method />} />
				<Route path="/services" element={<Services />} />
				<Route path="/ai-tools" element={<AITools />} />
				<Route path="/my-work" element={<MyWork />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/styleguide" element={<Styleguide />} />
			</Routes>
		</Router>
	);
}
import { useState, useEffect, useRef } from "react";

// ─── Brand Tokens (exact from styleguide) ────────────────────────
const B = {
	ink: "#101116",
	navy: "#0f1d2d",
	slate: "#334155",
	sand: "#f4f1ea",
	cream: "#fffaf2",
	line: "#e2d9cc",
	orange: "#ff8a3d",
	teal: "#2f9ea0",
	mint: "#dff3f2",
	sky: "#7fcbdb",
	coral: "#fb837d",
	amber: "#e3b156",
	blue: "#4c8cbc",
	purple: "#a079cb",
	peach: "#fa9361",
	white: "#ffffff",
};

// ─── Global CSS ───────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,600&family=Space+Grotesk:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; scroll-padding-top: 90px; }

  body {
    font-family: 'Space Grotesk', sans-serif;
    background: ${B.cream};
    color: ${B.ink};
    line-height: 1.7;
    overflow-x: hidden;
  }

  ::selection { background: ${B.orange}44; }

  /* ── Scroll reveal ────────────────────────── */
  .sr { opacity: 0; transform: translateY(32px); transition: opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1); }
  .sr.in { opacity: 1; transform: none; }
  .sr-left  { transform: translateX(-32px); }
  .sr-right { transform: translateX( 32px); }
  .sr-left.in, .sr-right.in { transform: none; opacity: 1; }
  .sr-scale { transform: scale(.94); }
  .sr-scale.in { transform: none; opacity: 1; }

  /* ── Stagger ──────────────────────────────── */
  .sg > * { opacity: 0; transform: translateY(24px); transition: opacity .55s ease, transform .55s ease; }
  .sg.in > *:nth-child(1)  { opacity:1;transform:none;transition-delay:.05s }
  .sg.in > *:nth-child(2)  { opacity:1;transform:none;transition-delay:.15s }
  .sg.in > *:nth-child(3)  { opacity:1;transform:none;transition-delay:.25s }
  .sg.in > *:nth-child(4)  { opacity:1;transform:none;transition-delay:.35s }
  .sg.in > *:nth-child(5)  { opacity:1;transform:none;transition-delay:.45s }
  .sg.in > *:nth-child(6)  { opacity:1;transform:none;transition-delay:.55s }

  /* ── Keyframes ────────────────────────────── */
  @keyframes heroIn {
    from { opacity:0; transform: translateY(48px) scale(.97); }
    to   { opacity:1; transform: none; }
  }
  @keyframes float {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-10px); }
  }
  @keyframes spin-slow { to { transform: rotate(360deg); } }
  @keyframes marquee   { to { transform: translateX(-50%); } }
  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0 ${B.orange}55; }
    70%  { box-shadow: 0 0 0 14px transparent; }
    100% { box-shadow: 0 0 0 0 transparent; }
  }
  @keyframes shimmer {
    from { background-position: -400px 0; }
    to   { background-position:  400px 0; }
  }
  @keyframes blob {
    0%,100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    50%      { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  }
  @keyframes countUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }

  /* ── Marquee ──────────────────────────────── */
  .mq-track { animation: marquee 28s linear infinite; display:flex; width:max-content; }
  .mq-track:hover { animation-play-state:paused; }

  /* ── Nav ──────────────────────────────────── */
  .nav {
    position: fixed; top:0; left:0; right:0; z-index:999;
    padding: 1rem 2rem;
    transition: background .3s, backdrop-filter .3s, box-shadow .3s;
  }
  .nav.scrolled {
    background: rgba(255,250,242,.92);
    backdrop-filter: blur(16px);
    box-shadow: 0 4px 20px rgba(15,23,42,.1);
    border-bottom: 1px solid ${B.line};
  }

  /* ── CTA Buttons ──────────────────────────── */
  .btn {
    display: inline-flex; align-items: center; gap: .5rem;
    padding: .85rem 2.2rem;
    border-radius: 999px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600; font-size: .95rem;
    cursor: pointer; text-decoration: none;
    transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
  }
  .btn-primary {
    background: ${B.orange}; color: ${B.ink};
    box-shadow: 0 12px 28px ${B.orange}44;
    animation: pulse-ring 2.5s ease-in-out infinite;
  }
  .btn-primary:hover { transform: translateY(-2px); background: #ffa15d; box-shadow: 0 18px 36px ${B.orange}55; }
  .btn-outline {
    background: transparent; color: ${B.ink};
    border: 2px solid ${B.line};
  }
  .btn-outline:hover { border-color: ${B.ink}; transform: translateY(-2px); }

  /* ── Cards ────────────────────────────────── */
  .card {
    background: ${B.white};
    border: 1px solid ${B.line};
    border-radius: 24px;
    transition: transform .3s ease, box-shadow .3s ease;
  }
  .card:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(15,23,42,.12); }

  /* ── Sections ─────────────────────────────── */
  .section { padding: 7rem 2rem; }
  .section-sand { background: ${B.sand}; }
  .container { max-width: 1200px; margin: 0 auto; }

  .eyebrow {
    display: inline-flex; align-items: center; gap: .5rem;
    font-size: .78rem; font-weight: 600; letter-spacing: .18em;
    text-transform: uppercase; color: ${B.orange};
    margin-bottom: 1rem;
  }
  .eyebrow::before { content:''; width:28px; height:2px; background:${B.orange}; border-radius:2px; }

  h1,h2,h3 { font-family:'Fraunces', serif; line-height: 1.1; }

  /* ── Service Card accent bar ──────────────── */
  .svc-card { position:relative; overflow:hidden; }
  .svc-card::after {
    content:''; position:absolute; bottom:0; left:0; right:0; height:3px;
    background: linear-gradient(90deg, transparent, var(--accent,${B.orange}), transparent);
    transform: scaleX(0); transition: transform .35s ease;
    transform-origin: left;
  }
  .svc-card:hover::after { transform: scaleX(1); }

  /* ── Testimonial carousel ─────────────────── */
  .tcard { background:${B.white}; border:1px solid ${B.line}; border-radius:20px; padding:2rem; min-width:320px; max-width:340px; flex-shrink:0; }

  /* ── Portfolio card ───────────────────────── */
  .pcard { border-radius:24px; overflow:hidden; border:1px solid ${B.line}; background:${B.white}; transition: transform .3s, box-shadow .3s; }
  .pcard:hover { transform:translateY(-6px); box-shadow:0 24px 48px rgba(15,23,42,.12); }
  .pcard-thumb { height:200px; display:flex; align-items:center; justify-content:center; }

  /* ── Stats ────────────────────────────────── */
  .stat-num {
    font-family: 'Fraunces', serif;
    font-size: 3.5rem; font-weight: 700; line-height:1;
    animation: countUp .6s ease both;
  }

  /* ── Process step ─────────────────────────── */
  .process-step {
    position:relative; text-align:center; padding: 2.5rem 2rem;
    background: ${B.white}; border:1px solid ${B.line}; border-radius:24px;
    transition: transform .3s, box-shadow .3s;
  }
  .process-step:hover { transform:translateY(-4px); box-shadow:0 20px 40px rgba(15,23,42,.1); }
  .step-num {
    width:48px; height:48px; border-radius:50%;
    background: ${B.orange}; color: ${B.ink};
    font-family:'Fraunces',serif; font-weight:700; font-size:1.2rem;
    display:flex; align-items:center; justify-content:center;
    margin:0 auto 1.5rem;
  }

  /* ── Mobile ───────────────────────────────── */
  @media(max-width:768px){
    .nav-links { display:none!important; }
    .hero-grid { flex-direction:column!important; }
    .svc-grid { grid-template-columns:1fr!important; }
    .why-grid  { grid-template-columns:1fr!important; }
    .process-grid { grid-template-columns:1fr!important; }
    h1 { font-size: clamp(2.6rem,10vw,4.5rem)!important; }
  }
`;

// ─── IntersectionObserver hook ────────────────────────────────────
function useReveal(t = 0.14) {
	const ref = useRef(null);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const obs = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting) {
					el.classList.add("in");
					obs.unobserve(el);
				}
			},
			{ threshold: t },
		);
		obs.observe(el);
		return () => obs.disconnect();
	}, [t]);
	return ref;
}

// ─── LordIcon component ───────────────────────────────────────────
function Icon({
	src,
	size = 56,
	trigger = "hover",
	primary = B.orange,
	secondary = B.teal,
}) {
	return (
		<lord-icon
			src={src}
			trigger={trigger}
			colors={`primary:${primary},secondary:${secondary}`}
			style={{ width: size, height: size, display: "block" }}
		/>
	);
}

// ─── Navbar ───────────────────────────────────────────────────────
function Nav() {
	const [sc, setSc] = useState(false);
	useEffect(() => {
		const fn = () => setSc(window.scrollY > 60);
		window.addEventListener("scroll", fn);
		return () => window.removeEventListener("scroll", fn);
	}, []);
	const links = [
		["Home", "/"],
		["About", "/about"],
		["Method", "/method"],
		["Services", "/services"],
		["AI Tools", "/ai-tools"],
		["My Work", "/my-work"],
		["Contact", "/contact"],
		["Styleguide", "/styleguide"],
	];
	return (
		<nav className={`nav${sc ? " scrolled" : ""}`}>
			<div
				className="container"
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				{/* Logo */}
				<a
					href="/"
					style={{
						textDecoration: "none",
						display: "flex",
						alignItems: "center",
						gap: ".6rem",
					}}
				>
					<img
						src={require("./assets/images/logo-1536x1024.png")}
						alt="The Daly Creative Logo"
						style={{ width: 48, height: 32, objectFit: "contain" }}
					/>
					<div style={{ lineHeight: 1.1 }}>
						<div
							style={{
								fontFamily: "'Fraunces',serif",
								fontWeight: 700,
								fontSize: "1.05rem",
								color: B.ink,
							}}
						>
							The Daly Creative
						</div>
						<div
							style={{
								fontSize: ".65rem",
								color: B.slate,
								letterSpacing: ".1em",
								textTransform: "uppercase",
							}}
						>
							Perth, WA
						</div>
					</div>
				</a>
				{/* Links */}
				<div
					className="nav-links"
					style={{ display: "flex", gap: "2rem", alignItems: "center" }}
				>
					{links.map(([l, h]) => (
						<NavLink
							key={l}
							to={h}
							style={({ isActive }) => ({
								color: isActive ? B.orange : B.slate,
								textDecoration: isActive ? "underline" : "none",
								fontWeight: 500,
								fontSize: ".9rem",
								transition: "color .2s",
								textUnderlineOffset: "6px",
							})}
						>
							{l}
						</NavLink>
					))}
					<a
						href="mailto:hello@thedalycreative.com"
						className="btn btn-primary"
						style={{
							padding: ".65rem 1.5rem",
							fontSize: ".85rem",
							animation: "none",
						}}
					>
						Get Started
					</a>
				</div>
			</div>
		</nav>
	);
}

// ─── Hero ─────────────────────────────────────────────────────────
function Hero() {
	const [count, setCount] = useState({ projects: 0, years: 0 });
	useEffect(() => {
		let p = 0,
			y = 0;
		const t = setInterval(() => {
			if (p < 100) p = Math.min(p + 3, 100);
			if (y < 5) y = Math.min(y + 0.15, 5);
			setCount({ projects: Math.round(p), years: parseFloat(y.toFixed(1)) });
			if (p >= 100 && y >= 5) clearInterval(t);
		}, 30);
		return () => clearInterval(t);
	}, []);

	const [count, setCount] = useState({ projects: 0, years: 0 });
	useEffect(() => {
		let p = 0,
			y = 0;
		const t = setInterval(() => {
			// ...existing code...
		}, 50);
		return () => clearInterval(t);
	}, []);
	// ...existing code...
}

// ─── Page Components ─────────────────────────────────────────────
function Home() {
	return <Hero />;
}
function About() {
	return (
		<div className="page about-page" style={{ padding: "2rem 0" }}>
			<section
				className="about-hero"
				style={{ textAlign: "center", marginBottom: "2rem" }}
			>
				<h1
					style={{
						fontFamily: "'Fraunces',serif",
						fontSize: "2.5rem",
						marginBottom: "1.5rem",
					}}
				>
					Meet the Tim
				</h1>
			</section>
			<section
				className="meet-team-section"
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: "2rem",
					justifyContent: "center",
					alignItems: "flex-start",
				}}
			>
				<div
					className="team-member-detail"
					style={{ display: "flex", gap: "2rem", maxWidth: 900 }}
				>
					<div className="team-member-visual">
						<img
							src={require("./assets/images/meet-tim-yellow-x886.png")}
							alt="Tim Daly - Founder of The Daly Creative"
							style={{
								width: 260,
								borderRadius: "1.2rem",
								boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
							}}
						/>
					</div>
					<div className="team-member-text" style={{ flex: 1 }}>
						<h3
							style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: ".5rem" }}
						>
							Tim Daly
						</h3>
						<p
							className="team-role"
							style={{ color: B.orange, fontWeight: 600, marginBottom: ".8rem" }}
						>
							Founder & Creative Strategist
						</p>
						<p className="team-bio">
							Tim is a multi-disciplinary creative who lives at the intersection of
							design, technology, and strategy. With a background in brand development,
							web design, and AI automation, he founded The Daly Creative to help
							businesses cut through the noise and build systems that actually work.
						</p>
						<p className="team-bio">
							What sets Tim apart? He doesn't just build websites or design logos—he
							creates intelligent systems that grow with your business. From custom AI
							agents to full-stack brand identities, Tim believes in empowering clients
							with tools and knowledge, not just deliverables.
						</p>
						<p className="team-bio">
							As a neurodivergent creative, Tim understands the importance of clear
							communication, structured workflows, and accessible design. His approach
							is collaborative, transparent, and focused on long-term success rather
							than quick wins.
						</p>
						<p className="team-bio">
							When he's not building brands or training AI models, you'll find Tim
							exploring Perth's coffee scene, tinkering with new tech, or advocating
							for more human-centered digital experiences.
						</p>
						<div
							className="team-skills"
							style={{
								marginTop: "1rem",
								display: "flex",
								flexWrap: "wrap",
								gap: ".5rem",
							}}
						>
							<span
								className="skill-tag"
								style={{
									background: B.sand,
									color: B.navy,
									padding: ".3rem .8rem",
									borderRadius: "1rem",
									fontSize: ".85rem",
									fontWeight: 500,
								}}
							>
								Brand Strategy
							</span>
							<span
								className="skill-tag"
								style={{
									background: B.sand,
									color: B.navy,
									padding: ".3rem .8rem",
									borderRadius: "1rem",
									fontSize: ".85rem",
									fontWeight: 500,
								}}
							>
								Web Development
							</span>
							<span
								className="skill-tag"
								style={{
									background: B.sand,
									color: B.navy,
									padding: ".3rem .8rem",
									borderRadius: "1rem",
									fontSize: ".85rem",
									fontWeight: 500,
								}}
							>
								AI Automation
							</span>
							<span
								className="skill-tag"
								style={{
									background: B.sand,
									color: B.navy,
									padding: ".3rem .8rem",
									borderRadius: "1rem",
									fontSize: ".85rem",
									fontWeight: 500,
								}}
							>
								UX Design
							</span>
							<span
								className="skill-tag"
								style={{
									background: B.sand,
									color: B.navy,
									padding: ".3rem .8rem",
									borderRadius: "1rem",
									fontSize: ".85rem",
									fontWeight: 500,
								}}
							>
								Market Research
							</span>
							<span
								className="skill-tag"
								style={{
									background: B.sand,
									color: B.navy,
									padding: ".3rem .8rem",
									borderRadius: "1rem",
									fontSize: ".85rem",
									fontWeight: 500,
								}}
							>
								Content Systems
							</span>
						</div>
					</div>
				</div>
			</section>
			<section className="cv-section" style={{ marginTop: "3rem" }}>
				<div className="container">
					<div className="section-header" style={{ marginBottom: "2rem" }}>
						<h2 style={{ fontSize: "1.3rem", fontWeight: 700 }}>
							Experience & Credentials
						</h2>
						<p>A track record of creative solutions and strategic thinking</p>
					</div>
					<div className="cv-timeline">
						{/* Timeline Items */}
						<div className="cv-item">
							<h3>Chief of Everything</h3>
							<p className="cv-company">The Daly Creative</p>
							<p className="cv-date">February 2025 - Present</p>
							<p className="cv-description">
								Freelance studio focused on helping Perth businesses grow smarter
								through web development, digital marketing and AI-informed strategy.
								Design and build responsive websites and landing pages, develop content
								and brand assets aligned with client goals, and advise on data-informed
								marketing and practical AI use in small business workflows.
							</p>
						</div>
						<div className="cv-item">
							<h3>Technology Administrator</h3>
							<p className="cv-company">Department of Transport, Western Australia</p>
							<p className="cv-date">June 2024 - January 2025</p>
							<p className="cv-description">
								Supported People and Culture technology systems, including payroll and
								online training platforms, with a focus on process improvement and
								automation. Streamlined online training update processes, reducing
								processing time by approximately 20%. Acted as second-in-charge in a
								six-person team, providing technical guidance and maintaining
								relationships with executive stakeholders.
							</p>
						</div>
						<div className="cv-item">
							<h3>Court Technology and Resource Officer</h3>
							<p className="cv-company">Supreme Court of Western Australia</p>
							<p className="cv-date">July 2023 - May 2024</p>
							<p className="cv-description">
								Delivered and supported technology that underpins the operations of the
								Supreme Court, balancing innovation with the expectations of the
								judicial environment. Led the development and launch of the Court's
								intranet, improving internal communication and access to resources.
								Modernised courtroom booking with an integrated digital calendar system
								that replaced manual processes.
							</p>
						</div>
						<div className="cv-item">
							<h3>Court Support Officer</h3>
							<p className="cv-company">District Court of Western Australia</p>
							<p className="cv-date">November 2022 - July 2023</p>
							<p className="cv-description">
								Managed civil subpoena processing and storage, providing client-facing
								support while maintaining high standards of confidentiality and
								accuracy. Streamlined handling and security of civil subpoenas to
								reinforce procedural integrity.
							</p>
						</div>
						<div className="cv-item">
							<h3>Resident Support Officer / Team Leader</h3>
							<p className="cv-company">COVID-19 Quarantine Victoria</p>
							<p className="cv-date">December 2020 - April 2022</p>
							<p className="cv-description">
								Led a large team of resident support officers in hotel quarantine,
								ensuring safe and consistent operations during the pandemic. Provided
								calm leadership, rostering and resource management under constant
								change. Supported staff wellbeing while maintaining operational
								standards and compliance.
							</p>
						</div>
						<div className="cv-item">
							<h3>Digital Solutions Specialist</h3>
							<p className="cv-company">White Pages Australia / Sensis</p>
							<p className="cv-date">November 2018 - October 2020</p>
							<p className="cv-description">
								Exceeded sales and customer satisfaction targets while improving call
								centre efficiency and digital product adoption. Provided consultative
								support to small businesses seeking online visibility and marketing
								solutions.
							</p>
						</div>
						<div className="cv-item">
							<h3>Flight Attendant (Cabin Crew)</h3>
							<p className="cv-company">Jetstar Airways</p>
							<p className="cv-date">March 2013 - February 2018</p>
							<p className="cv-description">
								Provided high-quality service and safety in a fast-paced, highly
								regulated environment. Built resilience and people skills that underpin
								current work in technology and projects.
							</p>
						</div>
					</div>
					{/* Education */}
					<div className="cv-education" style={{ marginTop: "2rem" }}>
						<h4>Education</h4>
						<div className="education-cards" style={{ display: "flex", gap: "2rem" }}>
							<div
								className="education-card"
								style={{
									background: B.sand,
									padding: "1rem",
									borderRadius: "1rem",
									flex: 1,
								}}
							>
								<div
									className="education-icon"
									style={{ fontSize: "2rem", color: B.navy }}
								>
									🎓
								</div>
								<div className="education-details">
									<h5>Diploma of IT</h5>
									<p className="education-focus">
										Back End Web Development & Cyber Security
									</p>
									<p className="education-school">Equinim College</p>
									<p className="education-date">2024 - 2025</p>
								</div>
							</div>
							<div
								className="education-card"
								style={{
									background: B.sand,
									padding: "1rem",
									borderRadius: "1rem",
									flex: 1,
								}}
							>
								<div
									className="education-icon"
									style={{ fontSize: "2rem", color: B.navy }}
								>
									🎓
								</div>
								<div className="education-details">
									<h5>Bachelor of Business Administration</h5>
									<p className="education-focus">Marketing</p>
									<p className="education-school">Torrens University Australia</p>
									<p className="education-date">Currently completing</p>
								</div>
							</div>
						</div>
					</div>
					{/* Technical Skills */}
					<div className="cv-skills" style={{ marginTop: "2rem" }}>
						<h4>Technical Skills</h4>
						<div
							className="skills-group-grid"
							style={{ display: "flex", gap: "2rem" }}
						>
							<div className="skills-group" style={{ flex: 1 }}>
								<h5>Web Development</h5>
								<div
									className="skills-tags"
									style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}
								>
									<span
										className="skill-tag"
										style={{
											background: B.mint,
											color: B.navy,
											padding: ".3rem .8rem",
											borderRadius: "1rem",
											fontSize: ".85rem",
											fontWeight: 500,
										}}
									>
										HTML & CSS
									</span>
									<span
										className="skill-tag"
										style={{
											background: B.mint,
											color: B.navy,
											padding: ".3rem .8rem",
											borderRadius: "1rem",
											fontSize: ".85rem",
											fontWeight: 500,
										}}
									>
										JavaScript
									</span>
									<span
										className="skill-tag"
										style={{
											background: B.mint,
											color: B.navy,
											padding: ".3rem .8rem",
											borderRadius: "1rem",
											fontSize: ".85rem",
											fontWeight: 500,
										}}
									>
										Node.js & Express
									</span>
									<span
										className="skill-tag"
										style={{
											background: B.mint,
											color: B.navy,
											padding: ".3rem .8rem",
											borderRadius: "1rem",
											fontSize: ".85rem",
											fontWeight: 500,
										}}
									>
										REST APIs
									</span>
									<span
										className="skill-tag"
										style={{
											background: B.mint,
											color: B.navy,
											padding: ".3rem .8rem",
											borderRadius: "1rem",
											fontSize: ".85rem",
											fontWeight: 500,
										}}
									>
										Bootstrap
									</span>
									<span
										className="skill-tag"
										style={{
											background: B.mint,
											color: B.navy,
											padding: ".3rem .8rem",
											borderRadius: "1rem",
											fontSize: ".85rem",
											fontWeight: 500,
										}}
									>
										Responsive Design
									</span>
								</div>
							</div>
							<div className="skills-group" style={{ flex: 1 }}>
								<h5>Tools & Platforms</h5>
								<div
									className="skills-tags"
									style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}
								>
									<span
										className="skill-tag"
										style={{
											background: B.mint,
											color: B.navy,
											padding: ".3rem .8rem",
											borderRadius: "1rem",
											fontSize: ".85rem",
											fontWeight: 500,
										}}
									>
										Git & GitHub
									</span>
									<span
										className="skill-tag"
										style={{
											background: B.mint,
											color: B.navy,
											padding: ".3rem .8rem",
											borderRadius: "1rem",
											fontSize: ".85rem",
											fontWeight: 500,
										}}
									>
										VS Code
									</span>
									<span
										className="skill-tag"
										style={{
											background: B.mint,
											color: B.navy,
											padding: ".3rem .8rem",
											borderRadius: "1rem",
											fontSize: ".85rem",
											fontWeight: 500,
										}}
									>
										MongoDB
									</span>
									<span
										className="skill-tag"
										style={{
											background: B.mint,
											color: B.navy,
											padding: ".3rem .8rem",
											borderRadius: "1rem",
											fontSize: ".85rem",
											fontWeight: 500,
										}}
									>
										Microsoft 365
									</span>
									<span
										className="skill-tag"
										style={{
											background: B.mint,
											color: B.navy,
											padding: ".3rem .8rem",
											borderRadius: "1rem",
											fontSize: ".85rem",
											fontWeight: 500,
										}}
									>
										Azure AD
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section
				className="final-cta about-cta"
				style={{ marginTop: "3rem", textAlign: "center" }}
			>
				<h2
					className="final-cta-title"
					style={{ fontSize: "1.5rem", fontWeight: 700 }}
				>
					Ready to Grow?
				</h2>
				<p className="final-cta-text">
					Let's build something extraordinary together.
				</p>
				<a
					href="/contact"
					className="cta-button final-cta-button"
					style={{
						background: B.orange,
						color: B.white,
						padding: ".7rem 2rem",
						borderRadius: "2rem",
						fontWeight: 600,
						fontSize: "1rem",
						textDecoration: "none",
						display: "inline-block",
						marginTop: "1rem",
					}}
				>
					Start Your Project
				</a>
			</section>
		</div>
	);
}
function Method() {
	return (
		<div
			className="page method-page"
			style={{ padding: "2rem 0", maxWidth: 900, margin: "0 auto" }}
		>
			<section style={{ textAlign: "center", marginBottom: "2.5rem" }}>
				<h1
					style={{
						fontFamily: "'Fraunces',serif",
						fontSize: "2.2rem",
						marginBottom: "1.2rem",
					}}
				>
					Our Method
				</h1>
				<p style={{ color: B.slate, fontSize: "1.1rem" }}>
					A clear, collaborative process for creative and digital projects
				</p>
			</section>
			<section
				className="method-timeline"
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					gap: "2rem",
					flexWrap: "wrap",
				}}
			>
				{/* Timeline Steps */}
				{[
					{ label: "Design", color: B.orange },
					{ label: "Create", color: B.teal },
					{ label: "Trust", color: B.coral },
					{ label: "Connect", color: B.blue },
					{ label: "Automate", color: B.purple },
				].map((step, idx, arr) => (
					<div key={step.label} style={{ display: "flex", alignItems: "center" }}>
						<div
							style={{
								background: step.color,
								color: B.white,
								padding: "1.1rem 1.8rem",
								borderRadius: "2rem",
								fontWeight: 700,
								fontSize: "1.1rem",
								boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
								minWidth: 120,
								textAlign: "center",
							}}
						>
							{step.label}
						</div>
						{idx < arr.length - 1 && (
							<svg width="48" height="24" style={{ margin: "0 1rem" }}>
								<defs>
									<marker
										id="arrow"
										markerWidth="8"
										markerHeight="8"
										refX="6"
										refY="4"
										orient="auto"
										markerUnits="strokeWidth"
									>
										<path d="M0,0 L8,4 L0,8" fill={arr[idx + 1].color} />
									</marker>
								</defs>
								<line
									x1="0"
									y1="12"
									x2="40"
									y2="12"
									stroke={arr[idx + 1].color}
									strokeWidth="3"
									markerEnd="url(#arrow)"
								/>
							</svg>
						)}
					</div>
				))}
			</section>
			<section style={{ marginTop: "3rem", textAlign: "center" }}>
				<h2 style={{ fontSize: "1.3rem", fontWeight: 700 }}>Ready to start?</h2>
				<p style={{ color: B.slate }}>
					Let’s build something extraordinary together.
				</p>
				<a
					href="/contact"
					style={{
						background: B.orange,
						color: B.white,
						padding: ".7rem 2rem",
						borderRadius: "2rem",
						fontWeight: 600,
						fontSize: "1rem",
						textDecoration: "none",
						display: "inline-block",
						marginTop: "1rem",
					}}
				>
					Start Your Project
				</a>
			</section>
		</div>
	);
}
function Services() {
	const services = [
		{
			title: "Custom Website Development",
			desc:
				"High-performance, mobile-responsive sites built to convert. We focus on clean code, intuitive UX, and fast load times that keep visitors engaged.",
			bullets: [
				"Responsive Bootstrap & modern frameworks",
				"SEO optimization built-in",
				"Fast hosting & performance tuning",
				"CMS setup for easy updates",
			],
			img: require("./assets/images/our-services/web-design.png"),
		},
		{
			title: "Strategic Branding & Identity",
			desc:
				"Your brand is more than a logo. We create cohesive visual identities that stand out, communicate your values, and resonate with your audience.",
			bullets: [
				"Logo & visual identity design",
				"Color palettes & typography systems",
				"Brand guidelines & messaging",
				"Consistent brand voice across channels",
			],
			img: require("./assets/images/our-services/strategic-branding-and-identity.png"),
		},
		{
			title: "Localized SEO Visibility",
			desc:
				"Get found by customers actively searching for your services. We optimize your online presence for local search results to drive qualified traffic.",
			bullets: [
				"On-page & technical SEO",
				"Local keyword research",
				"Google Business optimization",
				"Local link building",
			],
			img: require("./assets/images/our-services/localized-seo-visibility.png"),
		},
		{
			title: "Grow & Support Plan",
			desc:
				"We don't build and disappear. Our ongoing support plans keep your site secure, updated, and optimized. We're your partner in growth.",
			bullets: [
				"Monthly check-ins & optimization",
				"Security updates & backups",
				"Performance monitoring",
				"Priority troubleshooting",
			],
			img: require("./assets/images/our-services/grow-and-support-plan.png"),
		},
		{
			title: "Training & Empowerment",
			desc:
				"We teach you to fish. Step-by-step training that's neurodivergent-friendly, so you can confidently manage your own dashboards and tools.",
			bullets: [
				"Customized training sessions",
				"Clear documentation & guides",
				"Accessible learning approach",
				"Ongoing support access",
			],
			img: require("./assets/images/our-services/training-and-empowerment.png"),
		},
		{
			title: "Managed Ad Campaigns",
			desc:
				"Maximize your ad spend with expert campaign management. We handle setup, optimization, and reporting so your budget works harder.",
			bullets: [
				"Google Ads & Facebook setup",
				"Campaign strategy & targeting",
				"Continuous optimization",
				"Monthly performance reports",
			],
			img: require("./assets/images/our-services/managed-ad-campaigns.png"),
		},
		{
			title: "AI Strategy & Navigation",
			desc:
				"Cut through the hype. We help you identify which AI tools actually work for your business and build a realistic implementation plan.",
			bullets: [
				"AI tool assessment & recommendations",
				"Implementation roadmap",
				"ROI analysis & tracking",
				"Ongoing optimization",
			],
			img: require("./assets/images/our-services/ai-strategy-and-navication.png"),
		},
		{
			title: "Workflow Automation",
			desc:
				"Eliminate repetitive tasks with intelligent automation. We connect your tools and build AI agents that streamline your daily operations.",
			bullets: [
				"Process automation with AI agents",
				"App integration & data flow",
				"Custom tool building",
				"Continuous improvement",
			],
			img: require("./assets/images/our-services/workflow-automation.png"),
		},
		{
			title: "AI Content Support",
			desc:
				"Never face a blank page again. We help you leverage AI to create consistent, brand-aligned content across blogs, social, and marketing channels.",
			bullets: [
				"AI writing tool setup",
				"Brand voice templates",
				"Content workflow automation",
				"Quality assurance & optimization",
			],
			img: require("./assets/images/our-services/grow-and-support.png"),
		},
		{
			title: "Data Insights",
			desc:
				"Turn messy data into clear decisions. We build dashboards and reports that show exactly what's working and where to find your next customer.",
			bullets: [
				"Dashboard design & setup",
				"Data integration & cleaning",
				"KPI tracking & analysis",
				"Actionable insights & recommendations",
			],
			img: require("./assets/images/our-services/data-insights.png"),
		},
		{
			title: "Smart Chatbots",
			desc:
				"24/7 customer support that actually sounds like your brand. Custom chatbots that handle FAQs, lead capture, and customer service while you sleep.",
			bullets: [
				"Custom AI chatbot development",
				"Multi-channel integration",
				"24/7 availability & response",
				"Lead capture & routing",
			],
			img: require("./assets/images/our-services/smart-chatbots.png"),
		},
		{
			title: "Future-Proofing",
			desc:
				"Stay ahead of the curve. Big-picture strategy advice that keeps your brand and business competitive as technology and markets evolve.",
			bullets: [
				"Tech trend analysis & guidance",
				"Strategic planning sessions",
				"Competitive intelligence",
				"Long-term roadmap development",
			],
			img: require("./assets/images/our-services/future-proofing.png"),
		},
	];
	return (
		<div className="page services-page" style={{ padding: "2rem 0" }}>
			<section style={{ textAlign: "center", marginBottom: "2.5rem" }}>
				<h1
					style={{
						fontFamily: "'Fraunces',serif",
						fontSize: "2.2rem",
						marginBottom: "1.2rem",
					}}
				>
					Our Services
				</h1>
				<p style={{ color: B.slate, fontSize: "1.1rem" }}>
					Smart, modern solutions designed to help your brand grow and scale.
				</p>
			</section>
			<section
				className="services-list"
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
					gap: "2rem",
					maxWidth: 1200,
					margin: "0 auto",
				}}
			>
				{services.map((svc) => (
					<div
						key={svc.title}
						className="service-card"
						style={{
							background: B.sand,
							borderRadius: "1.2rem",
							boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
							padding: "2rem 1.2rem",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<img
							src={svc.img}
							alt={svc.title}
							style={{
								width: 120,
								height: 120,
								objectFit: "contain",
								marginBottom: "1.2rem",
							}}
						/>
						<h2
							style={{
								fontFamily: "'Fraunces',serif",
								fontSize: "1.2rem",
								fontWeight: 700,
								marginBottom: ".7rem",
								color: B.navy,
							}}
						>
							{svc.title}
						</h2>
						<p style={{ color: B.slate, fontSize: ".98rem", marginBottom: ".7rem" }}>
							{svc.desc}
						</p>
						<ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
							{svc.bullets.map((b) => (
								<li
									key={b}
									style={{
										color: B.ink,
										fontSize: ".92rem",
										marginBottom: ".3rem",
										display: "flex",
										alignItems: "center",
									}}
								>
									<span
										style={{ color: B.orange, fontWeight: 700, marginRight: ".5rem" }}
									>
										✓
									</span>{" "}
									{b}
								</li>
							))}
						</ul>
					</div>
				))}
			</section>
		</div>
	);
}
function AITools() {
	return (
		<div
			className="page ai-tools-page"
			style={{ padding: "2rem 0", maxWidth: 1100, margin: "0 auto" }}
		>
			<section style={{ textAlign: "center", marginBottom: "2.5rem" }}>
				<h1
					style={{
						fontFamily: "'Fraunces',serif",
						fontSize: "2.2rem",
						marginBottom: "1.2rem",
					}}
				>
					Smarter Tools. Faster Growth.
				</h1>
				<p style={{ color: B.slate, fontSize: "1.1rem" }}>
					We build intelligent systems that automate your workflows, engage your
					customers, and turn data into decisions — so you can focus on what matters.
				</p>
				<a
					href="/contact"
					style={{
						background: B.orange,
						color: B.white,
						padding: ".7rem 2rem",
						borderRadius: "2rem",
						fontWeight: 600,
						fontSize: "1rem",
						textDecoration: "none",
						display: "inline-block",
						marginTop: "1rem",
					}}
				>
					Book a Free Consult
				</a>
			</section>
			<section style={{ marginBottom: "2.5rem" }}>
				<h2
					style={{
						fontFamily: "'Fraunces',serif",
						fontSize: "1.3rem",
						fontWeight: 700,
						marginBottom: "1.2rem",
						textAlign: "center",
					}}
				>
					What We Build
				</h2>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
						gap: "2rem",
					}}
				>
					{/* AI Tools Cards */}
					{[
						{
							title: "Custom AI Agents",
							desc:
								"Purpose-built GPT agents trained on your brand voice, products, and processes. They handle enquiries, generate content, and support your team around the clock.",
							bullets: [
								"Brand-trained language models",
								"Multi-channel deployment",
								"Continuous learning & improvement",
							],
						},
						{
							title: "Workflow Automation",
							desc:
								"Eliminate repetitive tasks with intelligent automation. We connect your tools, build triggers, and create flows that save hours every week.",
							bullets: [
								"App integrations & data sync",
								"Automated task chains",
								"Error handling & monitoring",
							],
						},
						{
							title: "Smart Chatbots",
							desc:
								"Customer support that never sleeps. Our chatbots handle FAQs, capture leads, and escalate complex queries — all in your brand voice.",
							bullets: [
								"Natural language understanding",
								"Lead capture & qualification",
								"Seamless human handoff",
							],
						},
						{
							title: "Data & Insights",
							desc:
								"Turn raw data into clear decisions. Custom dashboards, automated reports, and AI-powered analysis that tells you what's working and what to do next.",
							bullets: [
								"Custom dashboard design",
								"Automated reporting",
								"Predictive analytics",
							],
						},
						{
							title: "AI Content Systems",
							desc:
								"Never face a blank page again. We build content pipelines that draft, refine, and publish — keeping your brand consistent across every channel.",
							bullets: [
								"Brand voice templates",
								"Multi-format content generation",
								"Quality control workflows",
							],
						},
						{
							title: "AI Strategy",
							desc:
								"Cut through the hype. We assess your business, identify the right AI opportunities, and build a realistic roadmap to implementation.",
							bullets: [
								"Tool assessment & fit analysis",
								"Implementation roadmap",
								"ROI tracking & optimisation",
							],
						},
					].map((tool) => (
						<div
							key={tool.title}
							className="ai-tool-card"
							style={{
								background: B.sand,
								borderRadius: "1.2rem",
								boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
								padding: "2rem 1.2rem",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<h3
								style={{
									fontFamily: "'Fraunces',serif",
									fontSize: "1.1rem",
									fontWeight: 700,
									marginBottom: ".7rem",
									color: B.navy,
								}}
							>
								{tool.title}
							</h3>
							<p
								style={{
									color: B.slate,
									fontSize: ".98rem",
									marginBottom: ".7rem",
									textAlign: "center",
								}}
							>
								{tool.desc}
							</p>
							<ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
								{tool.bullets.map((b) => (
									<li
										key={b}
										style={{
											color: B.ink,
											fontSize: ".92rem",
											marginBottom: ".3rem",
											display: "flex",
											alignItems: "center",
										}}
									>
										<span
											style={{ color: B.orange, fontWeight: 700, marginRight: ".5rem" }}
										>
											~
										</span>{" "}
										{b}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</section>
			<section style={{ marginBottom: "2.5rem" }}>
				<h2
					style={{
						fontFamily: "'Fraunces',serif",
						fontSize: "1.3rem",
						fontWeight: 700,
						marginBottom: "1.2rem",
						textAlign: "center",
					}}
				>
					How It Works
				</h2>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						gap: "2rem",
						flexWrap: "wrap",
					}}
				>
					{[
						{
							step: "Discovery",
							desc:
								"We learn your business, map your workflows, and identify where AI can make the biggest impact.",
						},
						{
							step: "Design",
							desc:
								"We architect the solution, choose the right tools, and build a prototype you can test and refine.",
						},
						{
							step: "Deploy",
							desc:
								"We launch, train your team, and monitor performance. Then we optimise based on real-world results.",
						},
					].map((s, idx, arr) => (
						<div key={s.step} style={{ display: "flex", alignItems: "center" }}>
							<div
								style={{
									background: B.orange,
									color: B.white,
									padding: "1.1rem 1.8rem",
									borderRadius: "2rem",
									fontWeight: 700,
									fontSize: "1.1rem",
									boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
									minWidth: 120,
									textAlign: "center",
								}}
							>
								{s.step}
							</div>
							{idx < arr.length - 1 && (
								<svg width="48" height="24" style={{ margin: "0 1rem" }}>
									<defs>
										<marker
											id="arrow"
											markerWidth="8"
											markerHeight="8"
											refX="6"
											refY="4"
											orient="auto"
											markerUnits="strokeWidth"
										>
											<path d="M0,0 L8,4 L0,8" fill={B.orange} />
										</marker>
									</defs>
									<line
										x1="0"
										y1="12"
										x2="40"
										y2="12"
										stroke={B.orange}
										strokeWidth="3"
										markerEnd="url(#arrow)"
									/>
								</svg>
							)}
						</div>
					))}
				</div>
				<div style={{ marginTop: "2rem", textAlign: "center" }}>
					<a
						href="/contact"
						style={{
							background: B.orange,
							color: B.white,
							padding: ".7rem 2rem",
							borderRadius: "2rem",
							fontWeight: 600,
							fontSize: "1rem",
							textDecoration: "none",
							display: "inline-block",
							marginTop: "1rem",
						}}
					>
						Let's Talk
					</a>
				</div>
			</section>
			<section style={{ marginBottom: "2.5rem" }}>
				<h2
					style={{
						fontFamily: "'Fraunces',serif",
						fontSize: "1.3rem",
						fontWeight: 700,
						marginBottom: "1.2rem",
						textAlign: "center",
					}}
				>
					Built For Real Businesses
				</h2>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
						gap: "2rem",
					}}
				>
					{[
						{
							sector: "Retail & E-Commerce",
							desc:
								"Automated product descriptions, inventory alerts, and personalised customer support chatbots.",
						},
						{
							sector: "Trades & Services",
							desc:
								"Automated quoting, job scheduling, follow-up sequences, and review collection.",
						},
						{
							sector: "Health & Wellness",
							desc:
								"Appointment booking assistants, client intake automation, and content scheduling.",
						},
						{
							sector: "Hospitality & Food",
							desc:
								"Online ordering integrations, review management, and social media content engines.",
						},
					].map((biz) => (
						<div
							key={biz.sector}
							className="ai-sector-card"
							style={{
								background: B.sand,
								borderRadius: "1.2rem",
								boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
								padding: "1.5rem 1.2rem",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<h4
								style={{
									fontFamily: "'Fraunces',serif",
									fontSize: "1rem",
									fontWeight: 700,
									marginBottom: ".7rem",
									color: B.navy,
								}}
							>
								{biz.sector}
							</h4>
							<p
								style={{
									color: B.slate,
									fontSize: ".98rem",
									marginBottom: ".7rem",
									textAlign: "center",
								}}
							>
								{biz.desc}
							</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
function MyWork() {
	const projects = [
		{
			name: "Dora Health & Wellbeing",
			desc:
				"Building a community around women's health. Brand identity, digital strategy, social media.",
			bullets: [
				"Brand strategy and positioning",
				"Logo design and visual identity",
				"Social media presence and content direction",
				"Digital brand guidelines",
			],
			img: "https://www.instagram.com/dora_health/profile_pic", // Replace with actual logo or screenshot
			link: "https://www.instagram.com/dora_health/",
		},
		{
			name: "Preservation Framers",
			desc:
				"40+ years of craftsmanship, now online. Web design, brand refresh, SEO.",
			bullets: [
				"Website design and development",
				"Brand identity refinement",
				"Local SEO and Google presence",
				"Service page content strategy",
			],
			img: "https://www.preservationframers.com.au/logo.png", // Replace with actual logo or screenshot
			link: "https://www.preservationframers.com.au/",
		},
		{
			name: "West Coast Exterior Pros",
			desc:
				"Perth's trusted exterior cleaning specialists. Web development, brand identity, local SEO.",
			bullets: [
				"Full brand identity design",
				"Responsive website build",
				"Service pages and lead generation",
				"Local SEO and Google Business setup",
			],
			img: "https://www.wcepros.com/logo.png", // Replace with actual logo or screenshot
			link: "https://www.wcepros.com/",
		},
		{
			name: "Drumplings",
			desc:
				"The world's first fusion dumpling brand. Brand strategy, web design, content.",
			bullets: [
				"Brand strategy and creative direction",
				"Website design and development",
				"Packaging and visual identity support",
				"Content strategy and copywriting",
			],
			img: "https://www.drumplings.com/logo.png", // Replace with actual logo or screenshot
			link: "https://www.drumplings.com/",
		},
	];
	return (
		<div
			className="page my-work-page"
			style={{ padding: "2rem 0", maxWidth: 1100, margin: "0 auto" }}
		>
			<section style={{ textAlign: "center", marginBottom: "2.5rem" }}>
				<h1
					style={{
						fontFamily: "'Fraunces',serif",
						fontSize: "2.2rem",
						marginBottom: "1.2rem",
					}}
				>
					My Work
				</h1>
				<p style={{ color: B.slate, fontSize: "1.1rem" }}>
					Real projects. Real results. Here's a look at the brands we've helped
					build, launch, and grow.
				</p>
			</section>
			<section
				className="projects-list"
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
					gap: "2rem",
					maxWidth: 1200,
					margin: "0 auto",
				}}
			>
				{projects.map((proj) => (
					<div
						key={proj.name}
						className="project-card"
						style={{
							background: B.sand,
							borderRadius: "1.2rem",
							boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
							padding: "2rem 1.2rem",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<a href={proj.link} target="_blank" rel="noopener noreferrer">
							<img
								src={proj.img}
								alt={proj.name}
								style={{
									width: 120,
									height: 120,
									objectFit: "contain",
									marginBottom: "1.2rem",
									borderRadius: "1rem",
								}}
							/>
						</a>
						<h2
							style={{
								fontFamily: "'Fraunces',serif",
								fontSize: "1.2rem",
								fontWeight: 700,
								marginBottom: ".7rem",
								color: B.navy,
							}}
						>
							{proj.name}
						</h2>
						<p
							style={{
								color: B.slate,
								fontSize: ".98rem",
								marginBottom: ".7rem",
								textAlign: "center",
							}}
						>
							{proj.desc}
						</p>
						<ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
							{proj.bullets.map((b) => (
								<li
									key={b}
									style={{
										color: B.ink,
										fontSize: ".92rem",
										marginBottom: ".3rem",
										display: "flex",
										alignItems: "center",
									}}
								>
									<span
										style={{ color: B.orange, fontWeight: 700, marginRight: ".5rem" }}
									>
										
									</span>{" "}
									{b}
								</li>
							))}
						</ul>
						<a
							href={proj.link}
							target="_blank"
							rel="noopener noreferrer"
							style={{
								background: B.orange,
								color: B.white,
								padding: ".5rem 1.2rem",
								borderRadius: "2rem",
								fontWeight: 600,
								fontSize: ".95rem",
								textDecoration: "none",
								display: "inline-block",
								marginTop: "1rem",
							}}
						>
							View Project
						</a>
					</div>
				))}
			</section>
			<section style={{ marginTop: "3rem", textAlign: "center" }}>
				<h2 style={{ fontSize: "1.3rem", fontWeight: 700 }}>
					Ready to be our next success story?
				</h2>
				<p style={{ color: B.slate }}>
					Let's build something that works as hard as you do.
				</p>
				<a
					href="/contact"
					style={{
						background: B.orange,
						color: B.white,
						padding: ".7rem 2rem",
						borderRadius: "2rem",
						fontWeight: 600,
						fontSize: "1rem",
						textDecoration: "none",
						display: "inline-block",
						marginTop: "1rem",
					}}
				>
					Start a Project
				</a>
			</section>
		</div>
	);
}
function Contact() {
	return (
		<div
			className="page contact-page"
			style={{ padding: "2rem 0", maxWidth: 900, margin: "0 auto" }}
		>
			<section style={{ textAlign: "center", marginBottom: "2.5rem" }}>
				<h1
					style={{
						fontFamily: "'Fraunces',serif",
						fontSize: "2.2rem",
						marginBottom: "1.2rem",
					}}
				>
					Let's Create Something Extraordinary
				</h1>
				<p style={{ color: B.slate, fontSize: "1.1rem" }}>
					Ready to bring your vision to life? We're here to help you grow.
				</p>
			</section>
			<section
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: "2rem",
					justifyContent: "center",
					marginBottom: "2.5rem",
				}}
			>
				<div style={{ flex: 1, minWidth: 320 }}>
					<h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: ".7rem" }}>
						Get in Touch
					</h2>
					<ul
						style={{ listStyle: "none", padding: 0, margin: 0, fontSize: ".98rem" }}
					>
						<li style={{ marginBottom: ".7rem" }}>
							<span style={{ color: B.orange, fontWeight: 700, marginRight: ".5rem" }}>
								
							</span>
							<a
								href="mailto:contact@thedalycreative.com.au"
								style={{ color: B.navy, textDecoration: "none", fontWeight: 600 }}
							>
								contact@thedalycreative.com.au
							</a>
						</li>
						<li style={{ marginBottom: ".7rem" }}>
							<span style={{ color: B.orange, fontWeight: 700, marginRight: ".5rem" }}>
								
							</span>
							<a
								href="tel:+61414265050"
								style={{ color: B.navy, textDecoration: "none", fontWeight: 600 }}
							>
								+61 414 265 050
							</a>
						</li>
						<li style={{ marginBottom: ".7rem" }}>
							<span style={{ color: B.orange, fontWeight: 700, marginRight: ".5rem" }}>
								
							</span>
							Fremantle / Perth, WA
						</li>
					</ul>
					<div style={{ marginTop: "2rem" }}>
						<iframe
							title="Perth Map"
							src="https://www.openstreetmap.org/export/embed.html?bbox=115.750%2C-32.05%2C115.95%2C-31.85&amp;layer=mapnik&amp;marker=-32.0569%2C115.7496"
							style={{
								width: "100%",
								height: 260,
								borderRadius: "1rem",
								border: "1px solid #e2d9cc",
							}}
							allowFullScreen=""
						/>
					</div>
				</div>
				<div style={{ flex: 1, minWidth: 320 }}>
					<h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: ".7rem" }}>
						Start a Conversation
					</h2>
					<form style={{ display: "flex", flexDirection: "column", gap: ".9rem" }}>
						<input
							type="text"
							placeholder="Your Name"
							required
							style={{
								padding: ".7rem",
								borderRadius: "1rem",
								border: "1px solid #e2d9cc",
								fontSize: ".98rem",
							}}
						/>
						<input
							type="email"
							placeholder="Email Address"
							required
							style={{
								padding: ".7rem",
								borderRadius: "1rem",
								border: "1px solid #e2d9cc",
								fontSize: ".98rem",
							}}
						/>
						<input
							type="tel"
							placeholder="Phone Number (Optional)"
							style={{
								padding: ".7rem",
								borderRadius: "1rem",
								border: "1px solid #e2d9cc",
								fontSize: ".98rem",
							}}
						/>
						<select
							style={{
								padding: ".7rem",
								borderRadius: "1rem",
								border: "1px solid #e2d9cc",
								fontSize: ".98rem",
							}}
						>
							<option>Which service are you interested in?</option>
							<option>Brand Identity</option>
							<option>Web Development</option>
							<option>AI Business Tools</option>
							<option>Market Research</option>
							<option>Content Systems</option>
							<option>Growth Analytics</option>
						</select>
						<textarea
							placeholder="Tell us about your project"
							required
							style={{
								padding: ".7rem",
								borderRadius: "1rem",
								border: "1px solid #e2d9cc",
								fontSize: ".98rem",
								minHeight: 120,
							}}
						/>
						<button
							type="submit"
							style={{
								background: B.orange,
								color: B.white,
								padding: ".7rem 2rem",
								borderRadius: "2rem",
								fontWeight: 600,
								fontSize: "1rem",
								border: "none",
								cursor: "pointer",
								marginTop: ".5rem",
							}}
						>
							Send Message
						</button>
					</form>
					<div style={{ marginTop: "1.5rem", color: B.slate, fontSize: ".95rem" }}>
						<span style={{ display: "block", marginBottom: ".5rem" }}>
							 Response Time: We typically reply within 24 hours
						</span>
						<span style={{ display: "block", marginBottom: ".5rem" }}>
							 Free Consultation: Book a no-obligation discovery call
						</span>
						<span style={{ display: "block", marginBottom: ".5rem" }}>
							 Remote Friendly: We work with clients across Australia and beyond
						</span>
					</div>
				</div>
			</section>
		</div>
	);
}

// ─── Main App ────────────────────────────────────────────────────

function Marquee() {
	const words = [
		"Brand Identity",
		"Web Development",
		"AI Agents",
		"Automation",
		"Market Research",
		"Content Systems",
		"Growth Analytics",
		"Creative Intelligence",
		"Perth WA",
	];
	const d = [...words, ...words];
	return (
		<div
			style={{
				overflow: "hidden",
				background: B.sand,
				borderTop: `1px solid ${B.line}`,
				borderBottom: `1px solid ${B.line}`,
				padding: ".9rem 0",
			}}
		>
			<div className="mq-track">
				{d.map((w, i) => (
					<span
						key={i}
						style={{
							padding: "0 2rem",
							fontFamily: "'Space Grotesk',sans-serif",
							fontSize: ".85rem",
							fontWeight: 600,
							letterSpacing: ".12em",
							color: i % 3 === 1 ? B.orange : B.slate,
							textTransform: "uppercase",
							whiteSpace: "nowrap",
						}}
					>
						{w} <span style={{ color: B.line, margin: "0 2rem" }}>✦</span>
					</span>
				))}
			</div>
		</div>
	);
}

// ─── Services ─────────────────────────────────────────────────────
const SVCS = [
	{
		title: "Brand Identity",
		desc:
			"Visual identity design, messaging & voice, logos, color systems, and typography that tells your unique story.",
		icon: "https://cdn.lordicon.com/lupuorrc.json",
		accent: B.orange,
		bg: "#fff3eb",
	},
	{
		title: "Web Development",
		desc:
			"Modern responsive sites with content-first structure, SEO optimization, and intuitive CMS setup.",
		icon: "https://cdn.lordicon.com/whrxobsb.json",
		accent: B.teal,
		bg: "#edf9f9",
	},
	{
		title: "AI Agents",
		desc:
			"Custom GPT assistants, automation flows, 24/7 support agents, and AI-powered insights.",
		icon: "https://cdn.lordicon.com/gqzfzudq.json",
		accent: B.purple,
		bg: "#f2eef8",
	},
	{
		title: "Market Research",
		desc:
			"Surveys, audits, personas, competitor analysis, and messaging fit to position your brand perfectly.",
		icon: "https://cdn.lordicon.com/kkvxgpti.json",
		accent: B.blue,
		bg: "#edf3f9",
	},
	{
		title: "Content Systems",
		desc:
			"Content strategy, creative direction, and reusable templates that keep your brand consistent across every channel.",
		icon: "https://cdn.lordicon.com/dxjqoygy.json",
		accent: B.amber,
		bg: "#fdf6e8",
	},
	{
		title: "Growth Analytics",
		desc:
			"Dashboards, KPI tracking, and conversion optimization to turn insights into measurable growth.",
		icon: "https://cdn.lordicon.com/qhgmphtg.json",
		accent: B.coral,
		bg: "#fff0ef",
	},
];

function Services() {
	const hRef = useReveal();
	const gRef = useReveal(0.05);
	return (
		<section id="services" className="section">
			<div className="container">
				<div
					ref={hRef}
					className="sr"
					style={{ textAlign: "center", marginBottom: "4rem" }}
				>
					<div className="eyebrow">What We Offer</div>
					<h2 style={{ fontSize: "clamp(2.2rem,5vw,3.5rem)", color: B.ink }}>
						Six Products Built to
						<br />
						<em style={{ color: B.orange }}>Sharpen & Scale</em>
					</h2>
					return (
					<nav className={`nav${sc ? " scrolled" : ""}`}>
						<div
							className="container"
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							{/* Logo */}
							<a
								href="/"
								style={{
									textDecoration: "none",
									display: "flex",
									alignItems: "center",
									gap: ".6rem",
								}}
							>
								<img
									src={require("./assets/images/logo-1536x1024.png")}
									alt="The Daly Creative Logo"
									style={{ width: 48, height: 32, objectFit: "contain" }}
								/>
								<div style={{ lineHeight: 1.1 }}>
									<div
										style={{
											fontFamily: "'Fraunces',serif",
											fontWeight: 700,
											fontSize: "1.05rem",
											color: B.ink,
										}}
									>
										The Daly Creative
									</div>
									<div
										style={{
											fontSize: ".65rem",
											color: B.slate,
											letterSpacing: ".1em",
											textTransform: "uppercase",
										}}
									>
										Perth, WA
									</div>
								</div>
							</a>
							{/* Links */}
							<div
								className="nav-links"
								style={{ display: "flex", gap: "2rem", alignItems: "center" }}
							>
								{links.map(([l, h]) => (
									<NavLink
										key={l}
										to={h}
										style={({ isActive }) => ({
											color: isActive ? B.orange : B.slate,
											textDecoration: isActive ? "underline" : "none",
											fontWeight: 500,
											fontSize: ".9rem",
											transition: "color .2s",
											textUnderlineOffset: "6px",
										})}
									>
										{l}
									</NavLink>
								))}
								<a
									href="mailto:hello@thedalycreative.com"
									className="btn btn-primary"
									style={{
										padding: ".65rem 1.5rem",
										fontSize: ".85rem",
										animation: "none",
									}}
								>
									Get Started
								</a>
							</div>
						</div>
					</nav>
					);
				</div>
			</div>
		</section>
	);
}

// ─── AI Tools Feature ─────────────────────────────────────────────
function AISection() {
	const lRef = useReveal();
	const rRef = useReveal();
	const features = [
		"Custom GPT agents trained on your brand voice",
		"Workflow automation that saves hours every week",
		"Smart chatbots for 24/7 customer engagement",
		"AI content pipelines across every channel",
		"Data dashboards with predictive analytics",
		"AI strategy & implementation roadmaps",
	];
	return (
		<section id="ai" className="section section-sand">
			<div className="container">
				<div
					style={{
						display: "flex",
						gap: "5rem",
						alignItems: "center",
						flexWrap: "wrap",
					}}
				>
					{/* Left */}
					<div ref={lRef} className="sr sr-left" style={{ flex: "1 1 420px" }}>
						<div className="eyebrow">AI Tools & Automation</div>
						<h2
							style={{
								fontSize: "clamp(2rem,4.5vw,3.2rem)",
								color: B.ink,
								marginBottom: "1.5rem",
							}}
						>
							Smarter Tools.
							<br />
							<em style={{ color: B.teal }}>Faster Growth.</em>
						</h2>
						<p style={{ color: B.slate, lineHeight: 1.9, marginBottom: "2rem" }}>
							We build intelligent systems that automate your workflows, engage your
							customers, and turn data into decisions — so you can focus on what
							matters.
						</p>
						<ul
							style={{
								listStyle: "none",
								display: "flex",
								flexDirection: "column",
								gap: ".85rem",
								marginBottom: "2.5rem",
							}}
						>
							{features.map((f, i) => (
								<li
									key={i}
									style={{
										display: "flex",
										alignItems: "flex-start",
										gap: ".75rem",
										color: B.slate,
										fontSize: ".95rem",
									}}
								>
									<span
										style={{
											minWidth: 20,
											height: 20,
											borderRadius: "50%",
											background: B.teal,
											color: "#fff",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											fontSize: ".65rem",
											fontWeight: 700,
											marginTop: ".2rem",
										}}
									>
										✓
									</span>
									{f}
								</li>
							))}
						</ul>
						<div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
							<a href="ai-tools.html" className="btn btn-primary">
								Explore AI Tools
							</a>
							<a href="#contact" className="btn btn-outline">
								Book a Consult
							</a>
						</div>
					</div>

					{/* Right — visual grid */}
					<div ref={rRef} className="sr sr-right" style={{ flex: "1 1 380px" }}>
						<div
							style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
						>
							{[
								{
									icon: "https://cdn.lordicon.com/gqzfzudq.json",
									label: "AI Agents",
									num: "Custom",
									color: B.purple,
									bg: "#f2eef8",
								},
								{
									icon: "https://cdn.lordicon.com/whrxobsb.json",
									label: "Automation",
									num: "10×",
									color: B.teal,
									bg: "#edf9f9",
								},
								{
									icon: "https://cdn.lordicon.com/qhgmphtg.json",
									label: "Analytics",
									num: "Real-time",
									color: B.coral,
									bg: "#fff0ef",
								},
								{
									icon: "https://cdn.lordicon.com/dxjqoygy.json",
									label: "Content AI",
									num: "24/7",
									color: B.amber,
									bg: "#fdf6e8",
								},
							].map(({ icon, label, num, color, bg }) => (
								<div
									key={label}
									className="card"
									style={{
										padding: "1.75rem",
										textAlign: "center",
										background: bg,
										border: `1px solid ${color}22`,
									}}
								>
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											marginBottom: ".75rem",
										}}
									>
										<Icon
											src={icon}
											size={48}
											primary={color}
											secondary={B.slate}
											trigger="loop"
										/>
									</div>
									<div
										style={{
											fontFamily: "'Fraunces',serif",
											fontSize: "1.6rem",
											fontWeight: 700,
											color,
											lineHeight: 1,
										}}
									>
										{num}
									</div>
									<div
										style={{
											color: B.slate,
											fontSize: ".78rem",
											fontWeight: 600,
											letterSpacing: ".08em",
											textTransform: "uppercase",
											marginTop: ".3rem",
										}}
									>
										{label}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

// ─── Portfolio ────────────────────────────────────────────────────
const PROJECTS = [
	{
		name: "Dora Health & Wellbeing",
		tag: "Brand Identity · Social Media",
		icon: "https://cdn.lordicon.com/dxjqoygy.json",
		iconColor: B.purple,
		bg: `linear-gradient(135deg,#e8daf0,#f5f0fa)`,
		text: B.purple,
		url: "https://www.instagram.com/dora_health/",
	},
	{
		name: "Preservation Framers",
		tag: "Web Design · SEO",
		icon: "https://cdn.lordicon.com/whrxobsb.json",
		iconColor: B.teal,
		bg: `linear-gradient(135deg,#d9eff0,#eaf8f8)`,
		text: B.teal,
		url: "https://www.preservationframers.com.au/",
	},
	{
		name: "West Coast Exterior Pros",
		tag: "Web Dev · Brand Identity",
		icon: "https://cdn.lordicon.com/kkvxgpti.json",
		iconColor: B.blue,
		bg: `linear-gradient(135deg,#dceaf5,#edf4fa)`,
		text: B.blue,
		url: "https://www.wcepros.com/",
	},
	{
		name: "Drumplings",
		tag: "Brand Strategy · Web Design",
		icon: "https://cdn.lordicon.com/lupuorrc.json",
		iconColor: B.amber,
		bg: `linear-gradient(135deg,#fef0e0,#fdf6ec)`,
		text: B.amber,
		url: "https://www.drumplings.com/",
	},
];

function Portfolio() {
	const hRef = useReveal();
	const gRef = useReveal(0.05);
	return (
		<section id="work" className="section">
			<div className="container">
				<div
					ref={hRef}
					className="sr"
					style={{ textAlign: "center", marginBottom: "4rem" }}
				>
					<div className="eyebrow">Featured Work</div>
					<h2 style={{ fontSize: "clamp(2.2rem,5vw,3.5rem)" }}>
						Real Projects.
						<br />
						<em style={{ color: B.orange }}>Real Results.</em>
					</h2>
				</div>
				<div
					ref={gRef}
					className="sg"
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(2,1fr)",
						gap: "1.5rem",
					}}
				>
					{PROJECTS.map((p, i) => (
						<a
							key={i}
							href={p.url}
							target="_blank"
							rel="noopener noreferrer"
							className="pcard"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<div
								className="pcard-thumb"
								style={{ background: p.bg, flexDirection: "column", gap: ".75rem" }}
							>
								<div
									style={{
										width: 80,
										height: 80,
										borderRadius: 20,
										background: "rgba(255,255,255,0.55)",
										backdropFilter: "blur(8px)",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										boxShadow: `0 8px 24px ${p.iconColor}22`,
									}}
								>
									<Icon
										src={p.icon}
										size={52}
										primary={p.iconColor}
										secondary={B.slate}
										trigger="hover"
									/>
								</div>
							</div>
							<div style={{ padding: "1.75rem" }}>
								<div
									style={{
										display: "flex",
										gap: ".5rem",
										flexWrap: "wrap",
										marginBottom: ".75rem",
									}}
								>
									{p.tag.split(" · ").map((t) => (
										<span
											key={t}
											style={{
												background: B.sand,
												color: B.slate,
												fontSize: ".72rem",
												fontWeight: 600,
												letterSpacing: ".08em",
												textTransform: "uppercase",
												padding: ".25rem .75rem",
												borderRadius: 999,
											}}
										>
											{t}
										</span>
									))}
								</div>
								<h3
									style={{
										fontFamily: "'Fraunces',serif",
										fontSize: "1.35rem",
										color: B.ink,
										marginBottom: ".5rem",
									}}
								>
									{p.name}
								</h3>
								<span
									style={{
										color: p.text,
										fontWeight: 600,
										fontSize: ".85rem",
										display: "inline-flex",
										alignItems: "center",
										gap: ".3rem",
									}}
								>
									View Project →
								</span>
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}

// ─── Why TDC ──────────────────────────────────────────────────────
function WhySection() {
	const hRef = useReveal();
	const gRef = useReveal(0.05);
	const reasons = [
		{
			title: "Creative + Strategic",
			desc:
				"Artistic vision meets data-driven strategy — everything we build looks stunning and performs.",
			icon: "https://cdn.lordicon.com/hbigeisx.json",
			color: B.orange,
			bg: "#fff3eb",
		},
		{
			title: "AI-Native Thinking",
			desc:
				"AI isn't an add-on for us — it's woven into every strategy, workflow, and deliverable we produce.",
			icon: "https://cdn.lordicon.com/gqzfzudq.json",
			color: B.teal,
			bg: "#edf9f9",
		},
		{
			title: "Perth Based",
			desc:
				"Locally owned, globally informed. We know the WA market and bring world-class execution to local brands.",
			icon: "https://cdn.lordicon.com/kkvxgpti.json",
			color: B.blue,
			bg: "#edf3f9",
		},
		{
			title: "Results Obsessed",
			desc:
				"Every decision is tracked. Every campaign measured. We don't rest until your numbers move.",
			icon: "https://cdn.lordicon.com/qhgmphtg.json",
			color: B.coral,
			bg: "#fff0ef",
		},
		{
			title: "Full-Stack Partners",
			desc:
				"Strategy, design, tech, and analytics — one team, one vision, zero handoff friction.",
			icon: "https://cdn.lordicon.com/srsgifqc.json",
			color: B.purple,
			bg: "#f2eef8",
		},
		{
			title: "Continuous Growth",
			desc:
				"We don't launch and leave. We monitor, optimise, and evolve your brand as your business scales.",
			icon: "https://cdn.lordicon.com/lqxfrxad.json",
			color: B.amber,
			bg: "#fdf6e8",
		},
	];
	return (
		<section className="section section-sand">
			<div className="container">
				<div
					ref={hRef}
					className="sr"
					style={{ textAlign: "center", marginBottom: "4rem" }}
				>
					<div className="eyebrow">Why Choose TDC</div>
					<h2 style={{ fontSize: "clamp(2.2rem,5vw,3.5rem)" }}>
						The Studio That
						<br />
						<em style={{ color: B.orange }}>Does It All</em>
					</h2>
					<p
						style={{
							color: B.slate,
							marginTop: "1rem",
							fontSize: "1.1rem",
							maxWidth: 520,
							margin: "1rem auto 0",
						}}
					>
						Strategy. Design. Tech. AI. All under one roof.
					</p>
				</div>

				<div
					ref={gRef}
					className="why-grid sg"
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(3,1fr)",
						gap: "1.5rem",
					}}
				>
					{reasons.map((r, i) => (
						<div
							key={i}
							className="card"
							style={{
								padding: "2rem",
								display: "flex",
								flexDirection: "column",
								gap: ".75rem",
							}}
						>
							<div
								style={{
									width: 60,
									height: 60,
									borderRadius: 16,
									background: r.bg,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									marginBottom: ".25rem",
								}}
							>
								<Icon
									src={r.icon}
									size={38}
									primary={r.color}
									secondary={B.slate}
									trigger="hover"
								/>
							</div>
							<h3
								style={{
									fontFamily: "'Fraunces',serif",
									fontSize: "1.2rem",
									color: B.ink,
								}}
							>
								{r.title}
							</h3>
							<p style={{ color: B.slate, fontSize: ".9rem", lineHeight: 1.75 }}>
								{r.desc}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// ─── About ────────────────────────────────────────────────────────
function About() {
	const lRef = useReveal();
	const rRef = useReveal();
	return (
		<section id="about" className="section section-sand">
			<div className="container">
				<div
					style={{
						display: "flex",
						gap: "5rem",
						alignItems: "center",
						flexWrap: "wrap",
					}}
				>
					<div ref={lRef} className="sr sr-left" style={{ flex: "1 1 420px" }}>
						<div className="eyebrow">Built by Creators, for Creators</div>
						<h2
							style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", marginBottom: "1.5rem" }}
						>
							Art Meets
							<br />
							<em style={{ color: B.orange }}>Intelligence</em>
						</h2>
						<p style={{ color: B.slate, lineHeight: 1.9, marginBottom: "1.25rem" }}>
							At The Daly Creative, we believe that great brands are built at the
							intersection of art and intelligence. Our team brings together designers,
							developers, strategists, and AI specialists passionate about helping
							businesses grow creatively — and intelligently.
						</p>
						<p style={{ color: B.slate, lineHeight: 1.9, marginBottom: "2.5rem" }}>
							We're not just about making things look good (though we do that too).
							We're about creating systems, tools, and strategies that empower your
							brand to thrive in an ever-changing digital landscape.
						</p>
						<a href="about.html" className="btn btn-primary">
							Meet the Team
						</a>
					</div>

					<div ref={rRef} className="sr sr-right" style={{ flex: "1 1 340px" }}>
						<div
							style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
						>
							{[
								{
									label: "Creative Intelligence",
									icon: "https://cdn.lordicon.com/hbigeisx.json",
									color: B.orange,
									text: "Artistic vision with data-driven strategy.",
								},
								{
									label: "Future-Ready Tech",
									icon: "https://cdn.lordicon.com/gqzfzudq.json",
									color: B.teal,
									text: "Modern tech from websites to AI automation.",
								},
								{
									label: "Partnership Approach",
									icon: "https://cdn.lordicon.com/srsgifqc.json",
									color: B.purple,
									text: "We teach you to fish. Tools that last.",
								},
								{
									label: "Perth Based",
									icon: "https://cdn.lordicon.com/kkvxgpti.json",
									color: B.blue,
									text: "Locally owned, globally thinking.",
								},
							].map(({ label, icon, color, text }) => (
								<div key={label} className="card" style={{ padding: "1.75rem" }}>
									<div style={{ marginBottom: ".75rem" }}>
										<Icon
											src={icon}
											size={40}
											primary={color}
											secondary={B.slate}
											trigger="hover"
										/>
									</div>
									<div
										style={{
											fontFamily: "'Fraunces',serif",
											fontSize: "1rem",
											fontWeight: 600,
											color: B.ink,
											marginBottom: ".5rem",
										}}
									>
										{label}
									</div>
									<p style={{ color: B.slate, fontSize: ".83rem", lineHeight: 1.6 }}>
										{text}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

// ─── Process ──────────────────────────────────────────────────────
function Process() {
	const hRef = useReveal();
	const gRef = useReveal(0.08);
	const steps = [
		{
			n: "01",
			title: "Discovery",
			desc:
				"We learn your business, map workflows, and identify where design and AI make the biggest impact.",
			icon: "https://cdn.lordicon.com/kkvxgpti.json",
			color: B.orange,
		},
		{
			n: "02",
			title: "Design",
			desc:
				"We architect the solution, choose the right tools, and build a prototype you can test and refine.",
			icon: "https://cdn.lordicon.com/lupuorrc.json",
			color: B.teal,
		},
		{
			n: "03",
			title: "Build",
			desc:
				"We develop and integrate everything — from beautiful websites to intelligent automation flows.",
			icon: "https://cdn.lordicon.com/whrxobsb.json",
			color: B.purple,
		},
		{
			n: "04",
			title: "Deploy & Grow",
			desc:
				"We launch, train your team, monitor performance, and optimise based on real-world results.",
			icon: "https://cdn.lordicon.com/qhgmphtg.json",
			color: B.coral,
		},
	];
	return (
		<section className="section">
			<div className="container">
				<div
					ref={hRef}
					className="sr"
					style={{ textAlign: "center", marginBottom: "4rem" }}
				>
					<div className="eyebrow">How We Work</div>
					<h2 style={{ fontSize: "clamp(2.2rem,5vw,3.5rem)" }}>
						From Discovery to
						<br />
						<em style={{ color: B.orange }}>Delivery</em>
					</h2>
				</div>
				<div
					ref={gRef}
					className="sg process-grid"
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(4,1fr)",
						gap: "1.25rem",
					}}
				>
					{steps.map((s) => (
						<div key={s.n} className="process-step">
							<div className="step-num" style={{ background: s.color }}>
								{s.n}
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									marginBottom: "1rem",
								}}
							>
								<Icon
									src={s.icon}
									size={48}
									primary={s.color}
									secondary={B.slate}
									trigger="loop"
								/>
							</div>
							<h3
								style={{
									fontFamily: "'Fraunces',serif",
									fontSize: "1.25rem",
									color: B.ink,
									marginBottom: ".75rem",
								}}
							>
								{s.title}
							</h3>
							<p style={{ color: B.slate, fontSize: ".88rem", lineHeight: 1.7 }}>
								{s.desc}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// ─── Testimonials ─────────────────────────────────────────────────
const TESTI = [
	{
		q: "Translated complex requirements into clear, human-centered assets.",
		s: "Client, 2025",
		c: B.orange,
	},
	{
		q: "Created a voice guide our team and partners can use consistently.",
		s: "Client, 2025",
		c: B.teal,
	},
	{
		q: "Refined service naming into plain-English options that were easy to find.",
		s: "Client, 2025",
		c: B.purple,
	},
	{
		q: "Onboarding documentation reduced admin friction and improved trust.",
		s: "Client, 2025",
		c: B.coral,
	},
	{
		q: "Wireframes and information architecture prioritized accessibility and conversion.",
		s: "Client, 2025",
		c: B.blue,
	},
	{
		q: "Mapped metadata and internal links, then seeded a practical content pipeline.",
		s: "Client, 2025",
		c: B.amber,
	},
	{
		q: "Coordinated stakeholders, reconciled priorities, and kept momentum steady.",
		s: "Client, 2025",
		c: B.orange,
	},
	{
		q: "Set up checklists and templates so non-technical staff maintain standards.",
		s: "Client, 2025",
		c: B.teal,
	},
	{
		q: "Balanced warm language with the rigor required in regulated settings.",
		s: "Client, 2025",
		c: B.purple,
	},
	{
		q: "Bridged strategy and execution while keeping everyone aligned.",
		s: "Client, 2025",
		c: B.coral,
	},
];

function Testimonials() {
	const hRef = useReveal();
	const vpRef = useRef(null);
	const [pos, setPos] = useState(0);
	// autoplay
	useEffect(() => {
		const id = setInterval(() => {
			if (vpRef.current) {
				setPos((p) => {
					const n = p + 1;
					vpRef.current.scrollBy({ left: 350, behavior: "smooth" });
					return n;
				});
			}
		}, 4500);
		return () => clearInterval(id);
	}, []);
	const double = [...TESTI, ...TESTI];
	return (
		<section className="section section-sand">
			<div className="container">
				<div
					ref={hRef}
					className="sr"
					style={{ textAlign: "center", marginBottom: "3rem" }}
				>
					<div className="eyebrow">What Our Clients Say</div>
					<h2 style={{ fontSize: "clamp(2.2rem,5vw,3.5rem)" }}>
						Real Results from
						<br />
						<em style={{ color: B.orange }}>Real Partnerships</em>
					</h2>
				</div>
				<div
					ref={vpRef}
					style={{
						display: "flex",
						gap: "1.25rem",
						overflow: "hidden",
						padding: ".5rem 0",
					}}
				>
					{double.map((t, i) => (
						<div key={i} className="tcard">
							<div style={{ marginBottom: "1rem", fontSize: "1.5rem", color: t.c }}>
								❝
							</div>
							<p
								style={{
									color: B.ink,
									fontStyle: "italic",
									lineHeight: 1.8,
									fontSize: ".95rem",
									marginBottom: "1.25rem",
								}}
							>
								{t.q}
							</p>
							<div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
								<div
									style={{
										width: 36,
										height: 36,
										borderRadius: "50%",
										background: t.c + "22",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										color: t.c,
										fontSize: ".9rem",
										fontWeight: 700,
									}}
								>
									★
								</div>
								<span style={{ color: B.slate, fontSize: ".82rem", fontWeight: 500 }}>
									— {t.s}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// ─── CTA ──────────────────────────────────────────────────────────
function CTA() {
	const ref = useReveal();
	return (
		<section
			id="contact"
			className="section"
			style={{
				background: `linear-gradient(135deg,${B.navy} 0%,#1a2d45 100%)`,
				position: "relative",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					position: "absolute",
					top: "-30%",
					right: "-10%",
					width: 600,
					height: 600,
					borderRadius: "50%",
					background: `radial-gradient(circle,${B.orange}18,transparent 70%)`,
					pointerEvents: "none",
				}}
			/>
			<div
				style={{
					position: "absolute",
					bottom: "-20%",
					left: "-5%",
					width: 400,
					height: 400,
					borderRadius: "50%",
					background: `radial-gradient(circle,${B.teal}14,transparent 70%)`,
					pointerEvents: "none",
				}}
			/>
			<div className="container">
				<div
					ref={ref}
					className="sr"
					style={{
						maxWidth: 700,
						margin: "0 auto",
						textAlign: "center",
						position: "relative",
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							marginBottom: "2rem",
							animation: "float 3s ease-in-out infinite",
						}}
					>
						<Icon
							src="https://cdn.lordicon.com/lqxfrxad.json"
							size={80}
							primary={B.orange}
							secondary={B.teal}
							trigger="loop"
						/>
					</div>
					<div className="eyebrow" style={{ justifyContent: "center" }}>
						Ready to Grow?
					</div>
					<h2
						style={{
							fontSize: "clamp(2.5rem,6vw,4.5rem)",
							color: B.cream,
							margin: "1rem 0 1.5rem",
						}}
					>
						Let's Build Something
						<br />
						<em style={{ color: B.orange }}>Extraordinary</em>
					</h2>
					<p
						style={{
							color: "rgba(255,250,242,.7)",
							fontSize: "1.05rem",
							marginBottom: "3rem",
							lineHeight: 1.8,
						}}
					>
						Ready to transform your brand with creative strategy and smart automation?
						Let's talk.
					</p>
					<div
						style={{
							display: "flex",
							gap: "1rem",
							justifyContent: "center",
							flexWrap: "wrap",
						}}
					>
						<a href="mailto:hello@thedalycreative.com" className="btn btn-primary">
							Start Your Project →
						</a>
						<a
							href="contact.html"
							className="btn btn-outline"
							style={{ color: B.cream, borderColor: "rgba(255,250,242,.3)" }}
						>
							Book a Free Call
						</a>
					</div>
					<div
						style={{
							marginTop: "3rem",
							display: "flex",
							justifyContent: "center",
							gap: "2rem",
							flexWrap: "wrap",
						}}
					>
						{[
							{
								icon: "https://cdn.lordicon.com/rhvddzym.json",
								iconColor: B.teal,
								val: "hello@thedalycreative.com",
								href: "mailto:hello@thedalycreative.com",
							},
							{
								icon: "https://cdn.lordicon.com/srsgifqc.json",
								iconColor: B.orange,
								val: "+61 414 265 050",
								href: "tel:+61414265050",
							},
							{
								icon: "https://cdn.lordicon.com/kkvxgpti.json",
								iconColor: B.sky,
								val: "Fremantle, Perth WA",
								href: "#",
							},
						].map(({ icon, iconColor, val, href }) => (
							<a
								key={val}
								href={href}
								style={{
									display: "flex",
									alignItems: "center",
									gap: ".6rem",
									color: "rgba(255,250,242,.6)",
									textDecoration: "none",
									fontSize: ".85rem",
									transition: "color .2s",
								}}
								onMouseEnter={(e) => (e.currentTarget.style.color = B.orange)}
								onMouseLeave={(e) =>
									(e.currentTarget.style.color = "rgba(255,250,242,.6)")
								}
							>
								<Icon
									src={icon}
									size={20}
									primary="rgba(255,250,242,0.6)"
									secondary={iconColor}
									trigger="hover"
								/>
								{val}
							</a>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

// ─── Footer ───────────────────────────────────────────────────────
function Footer() {
	const cols = [
		{
			heading: "Services",
			links: [
				["Brand Identity", "services.html#service-branding"],
				["Web Development", "services.html#service-web-dev"],
				["AI Business Tools", "services.html#service-ai-strategy"],
				["Market Research", "services.html#service-data"],
				["Content Systems", "services.html#service-content"],
				["Growth Analytics", "services.html#service-future"],
			],
		},
		{
			heading: "Company",
			links: [
				["About Us", "about.html"],
				["Our Work", "portfolio.html"],
				["AI Tools", "ai-tools.html"],
				["Contact", "contact.html"],
			],
		},
		{
			heading: "Connect",
			links: [
				["LinkedIn", "https://www.linkedin.com/in/thetimdaly/"],
				["Facebook", "https://www.facebook.com/thedalycreative/"],
				["Instagram", "https://www.instagram.com/thedalycreative/"],
				["hello@thedalycreative.com", "mailto:hello@thedalycreative.com"],
			],
		},
	];
	return (
		<footer
			style={{
				background: B.sand,
				borderTop: `1px solid ${B.line}`,
				padding: "4rem 2rem 2rem",
			}}
		>
			<div className="container">
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
						gap: "3rem",
						marginBottom: "3rem",
						flexWrap: "wrap",
					}}
				>
					{/* Brand */}
					<div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: ".6rem",
								marginBottom: "1rem",
							}}
						>
							<div
								style={{
									width: 36,
									height: 36,
									background: B.orange,
									borderRadius: "50%",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<span
									style={{
										fontFamily: "'Fraunces',serif",
										color: B.ink,
										fontWeight: 700,
									}}
								>
									D
								</span>
							</div>
							<span
								style={{
									fontFamily: "'Fraunces',serif",
									fontWeight: 700,
									color: B.ink,
								}}
							>
								The Daly Creative
							</span>
						</div>
						<p
							style={{
								color: B.slate,
								fontSize: ".9rem",
								lineHeight: 1.7,
								maxWidth: 220,
							}}
						>
							Creative strategy meets smart automation. We help brands grow with
							design, tech, and tools that work.
						</p>
					</div>
					{/* Cols */}
					{cols.map(({ heading, links }) => (
						<div key={heading}>
							<h4
								style={{
									fontSize: ".75rem",
									fontWeight: 700,
									letterSpacing: ".15em",
									textTransform: "uppercase",
									color: B.navy,
									marginBottom: "1.25rem",
								}}
							>
								{heading}
							</h4>
							<ul
								style={{
									listStyle: "none",
									display: "flex",
									flexDirection: "column",
									gap: ".75rem",
								}}
							>
								{links.map(([l, h]) => (
									<li key={l}>
										<a
											href={h}
											style={{
												color: B.slate,
												textDecoration: "none",
												fontSize: ".9rem",
												transition: "color .2s",
											}}
											onMouseEnter={(e) => (e.target.style.color = B.orange)}
											onMouseLeave={(e) => (e.target.style.color = B.slate)}
										>
											{l}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
				{/* Bottom */}
				<div
					style={{
						borderTop: `1px solid ${B.line}`,
						paddingTop: "2rem",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						flexWrap: "wrap",
						gap: "1rem",
					}}
				>
					<p style={{ color: B.slate, fontSize: ".82rem" }}>
						© {new Date().getFullYear()} The Daly Creative · ABN 67 540 020 478 · All
						rights reserved.
					</p>
					<div style={{ display: "flex", gap: "1.5rem" }}>
						{[
							["Terms", "terms.html"],
							["Privacy", "privacy.html"],
						].map(([l, h]) => (
							<a
								key={l}
								href={h}
								style={{ color: B.slate, fontSize: ".82rem", textDecoration: "none" }}
							>
								{l}
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}

// ─── App ──────────────────────────────────────────────────────────
