import { useEffect, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";

const NAV = [
  ["perfil", "Perfil"],
  ["stack", "Stack"],
  ["experiencia", "Experiencia"],
  ["proyectos", "Proyectos"],
  ["contacto", "Contacto"],
] as const;

const STACK: Record<string, string[]> = {
  Backend: ["Java", "Spring Boot", "REST APIs", "Arquitectura Limpia", "SQL"],
  Frontend: [
    "Angular",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
  ],
  Datos: ["PostgreSQL", "Supabase"],
  Herramientas: [
    "Git",
    "GitHub",
    "IntelliJ IDEA",
    "Vercel",
    "GitHub Copilot",
    "Scrum",
  ],
  Redes: ["MikroTik", "Winbox", "Cableado RJ45"],
};

const JOBS = [
  {
    role: "Desarrollador de Software Full Stack",
    org: "TCS (Tata Consultancy Services), Medellín",
    when: "May 2025 – Nov 2025",
    pts: [
      "Desarrollé funcionalidades críticas con Angular (frontend) y Java Spring Boot (backend).",
      "Diseñé componentes reutilizables, formularios dinámicos y validaciones que mejoraron la experiencia de usuario.",
      "Construí endpoints REST seguros que garantizan el cumplimiento de reglas de negocio.",
      "Participé en la modificación de esquemas PostgreSQL para integrar nuevos requerimientos operativos.",
      "Integré frontend, backend y base de datos de extremo a extremo.",
    ],
  },
  {
    role: "Técnico 1 de Infraestructura",
    org: "Energitelco / Consolitel, Medellín",
    when: "Ago 2026 – Actualidad",
    pts: [
      "Levanté servicios de internet y diagnostiqué fallas en infraestructura de red.",
      "Configuré radios, módems, puertos y equipos MikroTik según especificaciones técnicas.",
      "Realicé cableado RJ45 y cambios de equipos para garantizar conectividad.",
      "Usé Winbox y plataformas internas para monitoreo y gestión de sistemas.",
    ],
  },
];

const PROJECTS = [
  {
    name: "E-commerce de Electrónica",
    stack: ["React", "Supabase", "Vercel"],
    text: "Tienda en línea full stack con autenticación, carrito de compras, panel administrativo e integración con WhatsApp.",
    demo: "https://ecommerce-electronica.vercel.app/",
    repo: "https://github.com/jose-luis-1/ecommerce-electronica-",
  },
  {
    name: "Spa Ali",
    stack: ["Next.js", "TypeScript", "Vercel"],
    text: "Sitio web moderno para un negocio real, con diseño responsive e integración con WhatsApp para reservas.",
    demo: "https://espa-ali.vercel.app/",
    repo: "",
  },
];

const EMAIL = "joseluisagamezlopez@gmail.com";
const LINE = [70, 140, 215, 290, 365, 440];

export default function App() {
  const [tab, setTab] = useState("Backend");
  const [active, setActive] = useState("perfil");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".jl");
    if (!root) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        root.style.setProperty(
          "--p",
          String(max > 0 ? window.scrollY / max : 0),
        );
        root.style.setProperty("--sy", String(window.scrollY));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const rv = new IntersectionObserver(
      (es) =>
        es.forEach((e) => e.target.classList.toggle("in", e.isIntersecting)),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    root.querySelectorAll(".jl-rv").forEach((n) => rv.observe(n));
    const sec = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach(([id]) => {
      const n = document.getElementById(id);
      if (n) sec.observe(n);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      rv.disconnect();
      sec.disconnect();
    };
  }, []);

  const tilt = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--ry", `${x * 14}deg`);
    e.currentTarget.style.setProperty("--rx", `${-y * 14}deg`);
  };
  const untilt = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--ry", "0deg");
    e.currentTarget.style.setProperty("--rx", "0deg");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <div className="jl">
      <div className="jl-bar" />
      <nav className="jl-nav" aria-label="Principal">
        <a className="jl-logo" href="#perfil">
          JLA
        </a>
        <div className="jl-links">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} aria-current={active === id}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      <header className="jl-hero" id="perfil">
        <div className="jl-sky" aria-hidden="true">
          <svg
            className="jl-line"
            viewBox="0 0 520 120"
            preserveAspectRatio="none"
          >
            <path d="M0 20 Q260 70 520 20" />
            {LINE.map((x, i) => (
              <rect
                key={x}
                className={`jl-cloth c${i % 3}`}
                x={x}
                y={36 + (x < 260 ? (x / 260) * 14 : ((520 - x) / 260) * 14)}
                width="26"
                height="40"
              />
            ))}
          </svg>
          <div className="jl-3d">
            <div className="jl-shadow" />
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="jl-box"
                style={
                  { "--i": i, "--h": `${36 * (i + 1)}px` } as CSSProperties
                }
              >
                <i className="t" />
                <i className="f" />
                <i className="k" />
                <i className="l" />
                <i className="r" />
              </div>
            ))}
          </div>
        </div>
        <span className="jl-k">Medellín, Colombia</span>
        <h1>José Luis Agámez</h1>
        <p>
          Desarrollador Full Stack Junior. Construyo APIs con Java y Spring Boot
          e interfaces con Angular y React, con experiencia real en TCS.
        </p>
        <div>
          <a className="jl-cta" href="#proyectos">
            Ver proyectos
          </a>
          <a className="jl-cta ghost" href="#contacto">
            Contactarme
          </a>
        </div>
      </header>

      <section className="jl-sec">
        <div className="jl-two">
          <div className="jl-rv">
            <span className="jl-k">Perfil</span>
            <h2 className="jl-h2">
              Código limpio, de la base de datos a la pantalla.
            </h2>
          </div>
          <div className="jl-rv">
            <p>
              Soy desarrollador Full Stack con 7 meses de experiencia en Tata
              Consultancy Services, donde trabajé en aplicaciones empresariales
              completas con Java, Spring Boot, Angular y PostgreSQL bajo Scrum.
            </p>
            <p>
              Me enfoco en APIs REST, arquitectura limpia, bases de datos
              relacionales e interfaces dinámicas. También tengo experiencia en
              infraestructura de redes, lo que me ayuda a entender el sistema
              completo.
            </p>
            <p>
              <strong>Formación:</strong> Ingeniería en Programación de
              Software, IU Digital de Antioquia (7.º semestre, graduación
              estimada 2028). Técnico en Programación de Software, SENA (2023).{" "}
              <strong>Idiomas:</strong> español nativo, inglés A2.
            </p>
          </div>
        </div>
      </section>

      <section className="jl-sec" id="stack">
        <span className="jl-k jl-rv">Stack</span>
        <h2 className="jl-h2 jl-rv">Herramientas con las que trabajo</h2>
        <div className="jl-tabs jl-rv" role="tablist">
          {Object.keys(STACK).map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              className="jl-tab"
              onClick={() => setTab(k)}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="jl-chips" key={tab}>
          {STACK[tab].map((s, i) => (
            <span
              key={s}
              className="jl-chip"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      <section className="jl-sec" id="experiencia">
        <span className="jl-k jl-rv">Experiencia</span>
        <h2 className="jl-h2 jl-rv">Dónde he trabajado</h2>
        <div className="jl-tl">
          {JOBS.map((j) => (
            <article key={j.role} className="jl-job jl-rv">
              <h3>{j.role}</h3>
              <small>
                {j.org} · {j.when}
              </small>
              <ul>
                {j.pts.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="jl-sec" id="proyectos">
        <span className="jl-k jl-rv">Proyectos</span>
        <h2 className="jl-h2 jl-rv">Proyectos en producción</h2>
        <div className="jl-grid">
          {PROJECTS.map((p) => (
            <div key={p.name} className="jl-rv">
              <article
                className="jl-card jl-tilt"
                onMouseMove={tilt}
                onMouseLeave={untilt}
              >
                <div className="jl-tags">
                  {p.stack.map((t) => (
                    <span key={t} className="jl-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <h3>{p.name}</h3>
                <p>{p.text}</p>
                <div>
                  <a
                    className="jl-cta"
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ver demo
                  </a>
                  {p.repo && (
                    <a
                      className="jl-cta ghost"
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Código
                    </a>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>

      <footer className="jl-foot" id="contacto">
        <div className="jl-foot-in">
          <span className="jl-k">Contacto</span>
          <h2 className="jl-h2">Hablemos de tu próximo proyecto.</h2>
          <button className="jl-cta" onClick={copy}>
            {copied ? "Correo copiado" : EMAIL}
          </button>
          <a
            className="jl-cta ghost"
            href="https://wa.me/573114144629"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <a
            className="jl-cta ghost"
            href="https://www.linkedin.com/in/jose-luis-agamez/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="jl-cta ghost"
            href="https://github.com/jose-luis-1"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <small>José Luis Agámez López · Medellín, Antioquia, Colombia</small>
        </div>
      </footer>
    </div>
  );
}
