'use strict';

// ============================================================
// PROJECT DATA
// ============================================================
// ⚠️  REPLACE these sample entries with your real projects.
//     Every entry marked status: "Sample" is placeholder content.
//     Remove or update them before publishing your portfolio.
// ============================================================

const projects = [
  {
    title: "Customer Churn Prediction",
    description:
      "A machine learning classification pipeline predicting customer churn using behavioral metrics, automated feature preprocessing, and ensemble modeling with ROC-AUC evaluation.",
    category: "Machine Learning",
    technologies: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
    image: "assets/images/project-taskflow.webp",
    demoUrl: "",
    repoUrl: "",
    status: "Sample",
  },
  {
    title: "E-Commerce Sales Insights",
    description:
      "Comprehensive exploratory data analysis on multi-channel transactional records, identifying seasonal purchasing trends, revenue drivers, and customer cohort behavior.",
    category: "Data Analysis",
    technologies: ["Python", "SQL", "Pandas", "Looker Studio"],
    image: "assets/images/project-devmetrics.webp",
    demoUrl: "",
    repoUrl: "",
    status: "Sample",
  },
  {
    title: "Medical Image Classification",
    description:
      "A deep learning convolutional neural network (CNN) trained with transfer learning to detect pulmonary abnormalities in medical chest radiographs.",
    category: "Deep Learning",
    technologies: ["Python", "TensorFlow", "NumPy", "Google Colab"],
    image: "assets/images/project-notebook.webp",
    demoUrl: "",
    repoUrl: "",
    status: "Sample",
  },
  {
    title: "House Price Valuation Model",
    description:
      "A predictive regression pipeline that analyzes neighborhood geospatial metrics and structural features to generate accurate real estate property valuations.",
    category: "Machine Learning",
    technologies: ["Python", "Scikit-learn", "NumPy", "Seaborn"],
    image: "assets/images/project-palette.webp",
    demoUrl: "",
    repoUrl: "",
    status: "Sample",
  },
  {
    title: "Global Climate & Emission Analytics",
    description:
      "Interactive data visualization analysis investigating historical carbon emission trajectories, energy transition patterns, and socioeconomic correlation factors.",
    category: "Data Analysis",
    technologies: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    image: "assets/images/project-monitor.webp",
    demoUrl: "",
    repoUrl: "",
    status: "Sample",
  },
  {
    title: "Sentiment Analysis on Product Reviews",
    description:
      "Natural language processing pipeline classifying customer feedback sentiments across thousands of reviews using neural network architectures and word embeddings.",
    category: "Deep Learning",
    technologies: ["Python", "TensorFlow", "Scikit-learn", "Pandas"],
    image: "assets/images/project-pixelart.webp",
    demoUrl: "",
    repoUrl: "",
    status: "Sample",
  },
];

// ============================================================
// UTILITY HELPERS
// ============================================================

/** Escape HTML entities for safe attribute values */
function escapeAttr(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Validate that a URL string has a safe scheme */
function isSafeUrl(url) {
  if (!url || typeof url !== "string") return false;
  try {
    const parsed = new URL(url, window.location.origin);
    return ["http:", "https:", "mailto:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

/** Check if prefers-reduced-motion is active */
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// ============================================================
// MOBILE NAVIGATION
// ============================================================

function initMobileNav() {
  const toggle = document.getElementById("mobile-menu-toggle");
  const menu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("mobile-menu-overlay");
  if (!toggle || !menu) return;

  function openMenu() {
    menu.classList.remove("translate-x-full");
    menu.classList.add("translate-x-0");
    toggle.setAttribute("aria-expanded", "true");
    if (overlay) overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    menu.classList.remove("translate-x-0");
    menu.classList.add("translate-x-full");
    toggle.setAttribute("aria-expanded", "false");
    if (overlay) overlay.classList.add("hidden");
    document.body.style.overflow = "";
  }

  function isOpen() {
    return toggle.getAttribute("aria-expanded") === "true";
  }

  toggle.addEventListener("click", () => {
    isOpen() ? closeMenu() : openMenu();
  });

  // Close on overlay click
  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) {
      closeMenu();
      toggle.focus();
    }
  });

  // Close when a menu link is clicked
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

// ============================================================
// PROJECT RENDERING
// ============================================================

function createProjectCard(project, index) {
  const card = document.createElement("article");
  card.className =
    "group relative flex flex-col bg-white border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/60 hover:shadow-lg hover:shadow-slate-200/70 focus-within:border-primary/60";
  card.setAttribute("data-category", project.category);
  // Marker used by updateProjectStat() so only real project cards are counted
  card.setAttribute("data-project-card", "");
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";

  // Image container
  const imageWrapper = document.createElement("div");
  imageWrapper.className =
    "relative aspect-video bg-surface-subtle overflow-hidden";

  const img = document.createElement("img");
  img.alt = `Screenshot of ${project.title}`;
  img.className =
    "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105";
  img.loading = index > 1 ? "lazy" : "eager";
  img.width = 600;
  img.height = 338;

  // Image fallback
  if (project.image) {
    img.src = project.image;
    img.addEventListener("error", function handleImgError() {
      this.removeEventListener("error", handleImgError);
      this.style.display = "none";
      showImageFallback(imageWrapper, project.title);
    });
  } else {
    img.style.display = "none";
    showImageFallback(imageWrapper, project.title);
  }

  imageWrapper.appendChild(img);

  // Status badge
  if (project.status) {
    const badge = document.createElement("span");
    badge.className =
      "absolute top-3 right-3 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full backdrop-blur-sm";

    // Badges use the secondary/accent hues as tints, with the "-strong"
    // shade for the label so the small text stays readable.
    if (project.status === "Sample") {
      badge.classList.add("bg-secondary/15", "text-secondary-strong", "border", "border-secondary/30");
    } else if (project.status === "In Progress") {
      badge.classList.add("bg-accent/15", "text-accent-strong", "border", "border-accent/30");
    } else {
      badge.classList.add("bg-emerald-500/15", "text-emerald-700", "border", "border-emerald-500/30");
    }
    badge.textContent = project.status;
    imageWrapper.appendChild(badge);
  }

  card.appendChild(imageWrapper);

  // Card body
  const body = document.createElement("div");
  body.className = "flex flex-col flex-1 p-5 sm:p-6";

  // Category label (accent hue, strong shade for small-text contrast)
  const catLabel = document.createElement("span");
  catLabel.className =
    "inline-block text-[11px] font-semibold uppercase tracking-widest text-accent-strong mb-2 font-mono";
  catLabel.textContent = project.category;
  body.appendChild(catLabel);

  // Title (primary text, strong primary on hover)
  const title = document.createElement("h3");
  title.className =
    "text-lg font-bold text-content-primary mb-2 group-hover:text-primary-strong transition-colors duration-200";
  title.textContent = project.title;
  body.appendChild(title);

  // Description (muted slate)
  const desc = document.createElement("p");
  desc.className = "text-sm text-content-secondary leading-relaxed mb-4 flex-1";
  desc.textContent = project.description;
  body.appendChild(desc);

  // Tech tags (page background tint, cool-gray border)
  if (project.technologies && project.technologies.length) {
    const tagContainer = document.createElement("div");
    tagContainer.className = "flex flex-wrap gap-1.5 mb-5";
    project.technologies.forEach((tech) => {
      const tag = document.createElement("span");
      tag.className =
        "px-2.5 py-1 text-[11px] font-medium rounded-md bg-surface-main text-content-secondary border border-border";
      tag.textContent = tech;
      tagContainer.appendChild(tag);
    });
    body.appendChild(tagContainer);
  }

  // Action links
  const actions = document.createElement("div");
  actions.className = "flex items-center gap-3 mt-auto pt-2";

  if (isSafeUrl(project.demoUrl)) {
    const demo = document.createElement("a");
    demo.href = project.demoUrl;
    demo.target = "_blank";
    demo.rel = "noopener noreferrer";
    demo.className =
      "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-content-primary hover:bg-primary-hover transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white";
    demo.innerHTML = `Live Demo
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
      </svg>`;
    actions.appendChild(demo);
  }

  if (isSafeUrl(project.repoUrl)) {
    const repo = document.createElement("a");
    repo.href = project.repoUrl;
    repo.target = "_blank";
    repo.rel = "noopener noreferrer";
    repo.className =
      "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-border bg-white text-content-secondary hover:text-content-primary hover:border-primary/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white";
    repo.innerHTML = `Source Code
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
      </svg>`;
    actions.appendChild(repo);
  }

  // If neither URL is available, show a muted note
  if (!isSafeUrl(project.demoUrl) && !isSafeUrl(project.repoUrl)) {
    const noLinks = document.createElement("span");
    noLinks.className = "text-xs text-content-secondary italic";
    noLinks.textContent = "Links coming soon";
    actions.appendChild(noLinks);
  }

  body.appendChild(actions);
  card.appendChild(body);

  return card;
}

function showImageFallback(wrapper, title) {
  const fallback = document.createElement("div");
  fallback.className =
    "absolute inset-0 flex flex-col items-center justify-center bg-surface-subtle";

  const icon = document.createElement("div");
  icon.className = "text-secondary mb-2";
  icon.innerHTML = `<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z"/>
  </svg>`;
  fallback.appendChild(icon);

  const label = document.createElement("span");
  label.className = "text-xs text-content-secondary font-medium";
  label.textContent = title || "Project Preview";
  fallback.appendChild(label);

  wrapper.appendChild(fallback);
}

function renderProjects(filter = "All") {
  const grid = document.getElementById("projects-grid");
  const emptyState = document.getElementById("projects-empty");
  const countEl = document.getElementById("project-count");
  if (!grid) return;

  grid.innerHTML = "";

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  if (countEl) {
    countEl.textContent = `${filtered.length} project${filtered.length !== 1 ? "s" : ""}`;
  }

  if (filtered.length === 0) {
    if (emptyState) emptyState.classList.remove("hidden");
    if (filter === "All") updateProjectStat();
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");

  filtered.forEach((project, i) => {
    const card = createProjectCard(project, i);
    grid.appendChild(card);

    // Staggered entrance animation
    if (!prefersReducedMotion()) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, i * 80);
      });
    } else {
      card.style.opacity = "1";
      card.style.transform = "none";
    }
  });

  // Only an unfiltered render contains every project card, so the About
  // stat is recalculated here and left untouched by category filters.
  if (filter === "All") updateProjectStat();
}

// ============================================================
// ABOUT ME — PROJECT COUNT STAT
// ============================================================

/**
 * Counts the project cards currently rendered in #projects-grid and
 * writes the result into the About Me "Projects" stat card.
 * Only direct children marked [data-project-card] are counted, so
 * headings, filter buttons, the empty state and decorative elements
 * are never included. Shows 0 when the grid is empty.
 */
function updateProjectStat() {
  const statEl = document.getElementById("stat-projects-count");
  if (!statEl) return;

  const count = document.querySelectorAll(
    "#projects-grid > [data-project-card]"
  ).length;

  statEl.textContent = String(count);
}

// ============================================================
// PROJECT FILTERING
// ============================================================

function initProjectFilters() {
  const filterContainer = document.getElementById("project-filters");
  if (!filterContainer) return;

  // Extract unique categories from the project data
  const categories = [
    "All",
    ...new Set(projects.map((p) => p.category)),
  ];

  // Build filter buttons. Active = brand fill with dark text (6.3:1);
  // inactive = white surface with muted text. Both keep a 1px border so
  // switching state doesn't shift the layout.
  const ACTIVE_CLASSES = ["bg-primary", "text-content-primary", "border-primary"];
  const INACTIVE_CLASSES = [
    "bg-white",
    "text-content-secondary",
    "border-border",
    "hover:text-content-primary",
    "hover:border-primary/40",
  ];

  function setActive(button, isActive) {
    button.classList.remove(...(isActive ? INACTIVE_CLASSES : ACTIVE_CLASSES));
    button.classList.add(...(isActive ? ACTIVE_CLASSES : INACTIVE_CLASSES));
    button.setAttribute("aria-pressed", String(isActive));
  }

  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className =
      "filter-btn px-4 py-2 text-sm font-medium rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-main";
    btn.textContent = cat;
    btn.setAttribute("data-filter", cat);
    setActive(btn, cat === "All");

    btn.addEventListener("click", () => {
      // Update active state on all buttons
      filterContainer.querySelectorAll(".filter-btn").forEach((b) => {
        setActive(b, b === btn);
      });

      renderProjects(cat);
    });

    filterContainer.appendChild(btn);
  });

  // Initial render
  renderProjects("All");
}

// ============================================================
// ACTIVE NAVIGATION HIGHLIGHT (IntersectionObserver)
// ============================================================

function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (href === `#${id}`) {
              link.classList.add("text-primary-strong", "bg-primary/15", "border-primary/25");
              link.classList.remove("text-content-secondary", "border-transparent");
            } else {
              link.classList.remove("text-primary-strong", "bg-primary/15", "border-primary/25");
              link.classList.add("text-content-secondary", "border-transparent");
            }
          });
        }
      });
    },
    {
      rootMargin: "-20% 0px -75% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function initHeroPortrait() {
  const img = document.getElementById("hero-portrait");
  if (!img) return;
  img.addEventListener("error", function () {
    this.src = "assets/images/profile-placeholder.svg";
  });
}

// ============================================================
// SCROLL REVEAL (IntersectionObserver)
// ============================================================

function initScrollReveal() {
  if (prefersReducedMotion()) {
    // Immediately show all reveal elements
    document.querySelectorAll(".reveal").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });
}

// ============================================================
// SMOOTH SCROLL
// ============================================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const offset = 80; // Account for sticky nav
      const top =
        target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });

      // Update URL hash without jumping
      history.pushState(null, "", targetId);
    });
  });
}

// ============================================================
// NAV BACKGROUND ON SCROLL
// ============================================================

function initNavScroll() {
  const nav = document.getElementById("main-nav");
  if (!nav) return;

  function updateNav() {
    if (window.scrollY > 50) {
      nav.classList.add("nav-scrolled");
    } else {
      nav.classList.remove("nav-scrolled");
    }
  }

  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();
}

// ============================================================
// DYNAMIC FOOTER YEAR
// ============================================================

function initFooterYear() {
  const el = document.getElementById("footer-year");
  if (el) {
    el.textContent = new Date().getFullYear();
  }
}

// ============================================================
// TYPEWRITER ANIMATION (Hero Headline)
// ============================================================

function initTypewriter() {
  const prefixEl = document.getElementById("typewriter-prefix");
  const nameEl = document.getElementById("typewriter-name");
  const cursorEl = document.getElementById("typewriter-cursor");
  if (!prefixEl || !nameEl) return;

  const fullPrefix = "Hi, I'm ";
  const fullName = "Firnando";
  const totalLength = fullPrefix.length + fullName.length;

  // Respect prefers-reduced-motion accessibility preference
  if (prefersReducedMotion()) {
    prefixEl.textContent = fullPrefix;
    nameEl.textContent = fullName;
    if (cursorEl) cursorEl.style.display = "none";
    return;
  }

  const typingSpeed = 110; // ~100–120 ms per character
  const erasingSpeed = 55; // ~50–60 ms per character
  const pauseAfterType = 1800; // 1.5–2 detik jeda setelah kalimat lengkap
  const pauseAfterErase = 450; // Jeda singkat saat teks kosong sebelum mulai mengetik ulang

  let currentLength = totalLength;
  let isErasing = true;

  function render(len) {
    if (len <= fullPrefix.length) {
      prefixEl.textContent = fullPrefix.substring(0, len);
      nameEl.textContent = "";
    } else {
      prefixEl.textContent = fullPrefix;
      nameEl.textContent = fullName.substring(0, len - fullPrefix.length);
    }
  }

  function step() {
    if (isErasing) {
      if (currentLength > 0) {
        currentLength--;
        render(currentLength);
        setTimeout(step, erasingSpeed);
      } else {
        // Teks kosong; jeda singkat sebelum mulai mengetik ulang
        isErasing = false;
        setTimeout(step, pauseAfterErase);
      }
    } else {
      if (currentLength < totalLength) {
        currentLength++;
        render(currentLength);
        setTimeout(step, typingSpeed);
      } else {
        // Selesai mengetik seluruh kalimat; jeda 1.8 detik sebelum mengulang
        isErasing = true;
        setTimeout(step, pauseAfterType);
      }
    }
  }

  // Teks awal sudah lengkap di HTML, tunggu jeda sebelum animasi menghapus dimulai
  setTimeout(step, pauseAfterType);
}

// ============================================================
// INITIALIZE
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initProjectFilters();
  initActiveNav();
  initScrollReveal();
  initSmoothScroll();
  initNavScroll();
  initFooterYear();
  initHeroPortrait();
  initTypewriter();
});
