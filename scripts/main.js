const cvData = {
  profile: {
    name: "Iván López Marchante",
    title: "Backend Developer | AI Agents, Prompt Engineering & Java",
    location: "Malaga, Spain",
    summary:
      "Backend engineer delivering reliable microservices while driving practical AI adoption through prompts, reusable instructions, and skill-based agent workflows."
  },
  contacts: {
    linkedinUrl: "https://www.linkedin.com/in/ivan-lopez-marchante/",
    primaryEmail: "ivan.lopez@bestseller.com",
    secondaryEmail: "ivanlpz50@gmail.com",
    githubUrl: "https://github.com/ivanlpm"
  },
  about:
    "I build backend systems focused on reliability, clear architecture, and operational quality. In my current role at BESTSELLER, I combine software delivery with AI enablement by helping teams adopt Copilot and Codex using repeatable standards for prompts, instructions, and workflow skills.",
  experience: [
    {
      company: "BESTSELLER",
      role: "Backend Developer",
      start: "Sep 2025",
      end: "Present",
      location: "Malaga, Andalucia, Spain",
      mode: "Hybrid | Full-time",
      tags: ["backend", "ai-agents", "leadership"],
      highlights: [
        "Designed and applied AI agent workflows using structured prompts, reusable instructions, and skill-based execution patterns for backend delivery tasks.",
        "Improved engineering throughput by integrating Copilot and Codex into day-to-day development, code review preparation, and troubleshooting routines.",
        "Trained teammates from different teams on practical Copilot and Codex usage, including prompt quality, guardrails, and reusable working patterns.",
        "Promoted internal AI adoption with practical sessions and examples to help engineers use prompts, instructions, and skills consistently.",
        "Continued backend delivery in a microservices ecosystem, prioritizing API reliability, maintainability, and team engineering standards."
      ]
    },
    {
      company: "TMC (Client: Inditex)",
      role: "Backend Software Developer",
      start: "Jan 2024",
      end: "Sep 2025",
      location: "Spain",
      mode: "Full-time",
      tags: ["backend"],
      highlights: [
        "Implemented and maintained backend services for factory-management flows (orders, raw materials, and factory processes).",
        "Executed maintenance and modernization of legacy services, including dependency upgrades and production bug fixes.",
        "Improved delivery quality through unit, performance, and end-to-end testing in microservices environments."
      ]
    },
    {
      company: "TMC (Client: DIA)",
      role: "Backend Software Developer",
      start: "Mar 2023",
      end: "Dec 2023",
      location: "Remote",
      mode: "Full-time",
      tags: ["backend"],
      highlights: [
        "Built delivery-order endpoints and event-driven integrations for UberEats, Glovo, and JustEat.",
        "Migrated legacy delivery systems toward a unified order-management platform.",
        "Handled production incidents and traced distributed flows using observability tools and cloud data logs."
      ]
    },
    {
      company: "TMC",
      role: "Backend Software Developer",
      start: "Nov 2022",
      end: "Mar 2023",
      location: "Remote",
      mode: "Full-time",
      tags: ["backend"],
      highlights: [
        "Contributed to backend implementation and integration tasks in enterprise microservices projects.",
        "Collaborated with cross-functional teams under agile delivery practices."
      ]
    },
    {
      company: "Metadata",
      role: "Java Backend Developer",
      start: "Sep 2021",
      end: "Oct 2022",
      location: "Malaga, Spain",
      mode: "Full-time",
      tags: ["backend"],
      highlights: [
        "Developed a document-management microservice for labor-risk prevention in a SaaS platform.",
        "Implemented REST endpoints and service layers with focus on maintainability and testing.",
        "Participated in service design and delivery in a production business environment."
      ]
    }
  ],
  skills: {
    languages: ["Java", "Go", "Python", "TypeScript", "JavaScript", "C#", "C++"],
    frameworks: ["Spring Boot", "Quarkus", "Hibernate", "JUnit", "Karate"],
    tools: ["Docker", "Kafka", "RabbitMQ", "Git", "Bitbucket", "Jira", "Confluence", "GCP", "Grafana", "SonarLint"],
    methodology: ["Scrum", "SAFe", "Kanban"]
  },
  education: [
    "Bachelor's Degree in Software Engineering - University of Malaga (2021)",
    "High School - I.E.S Guadalpin, Marbella (2017)"
  ],
  languagesSpoken: ["Spanish (Native)", "English (Fluent)", "German (Beginner)"],
  certifications: [
    "B2 First Certificate Cambridge - English (2017)",
    "University extension course on Machine Learning and Visual Data Analysis (Dec 2024)"
  ]
};

const SPOTLIGHTS = ["all", "backend", "ai-agents", "leadership"];

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setLink(id, href, text) {
  const el = document.getElementById(id);
  if (!el) return;
  el.href = href;
  if (text) el.textContent = text;
}

function getActiveSpotlight() {
  const hash = window.location.hash.replace("#", "").toLowerCase();
  return SPOTLIGHTS.includes(hash) ? hash : "all";
}

function updateFilterButtons(activeFilter) {
  document.querySelectorAll(".spotlight-btn").forEach((button) => {
    const isActive = button.dataset.filter === activeFilter;
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function sortBySpotlight(activeFilter) {
  if (activeFilter === "all") return [...cvData.experience];
  const relevant = [];
  const rest = [];

  cvData.experience.forEach((exp) => {
    if (exp.tags.includes(activeFilter)) {
      relevant.push(exp);
    } else {
      rest.push(exp);
    }
  });

  return [...relevant, ...rest];
}

function renderExperience(activeFilter) {
  const container = document.getElementById("experience-list");
  if (!container) return;

  container.textContent = "";
  const jobs = sortBySpotlight(activeFilter);

  jobs.forEach((job) => {
    const card = document.createElement("article");
    card.className = "timeline-card";
    card.setAttribute("role", "listitem");

    const relevant = activeFilter === "all" || job.tags.includes(activeFilter);
    card.classList.add(relevant ? "relevant" : "muted");

    const highlights = job.highlights.map((item) => `<li>${item}</li>`).join("");
    const tags = job.tags.map((tag) => `<span class=\"tag\">${tag}</span>`).join("");

    card.innerHTML = `
      <div class="timeline-header">
        <div>
          <p class="timeline-role">${job.role}</p>
          <p class="timeline-company">${job.company}</p>
        </div>
        <p class="timeline-meta">${job.start} - ${job.end}</p>
      </div>
      <p class="timeline-meta">${job.location} | ${job.mode}</p>
      <div class="timeline-tags">${tags}</div>
      <ul>${highlights}</ul>
    `;

    container.appendChild(card);
  });
}

function renderSkills() {
  const skillsGrid = document.getElementById("skills-grid");
  if (!skillsGrid) return;

  Object.entries(cvData.skills).forEach(([key, values]) => {
    const title = key.charAt(0).toUpperCase() + key.slice(1);
    const tags = values.map((value) => `<span class="tag">${value}</span>`).join("");

    const card = document.createElement("article");
    card.className = "skill-card";
    card.innerHTML = `
      <h3>${title}</h3>
      <div class="tags">${tags}</div>
    `;

    skillsGrid.appendChild(card);
  });
}

function renderList(id, values) {
  const list = document.getElementById(id);
  if (!list) return;
  values.forEach((value) => {
    const li = document.createElement("li");
    li.textContent = value;
    list.appendChild(li);
  });
}

function setupSpotlightHandlers() {
  const buttons = document.querySelectorAll(".spotlight-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const next = button.dataset.filter;
      if (!SPOTLIGHTS.includes(next)) return;
      updateFilterButtons(next);
      renderExperience(next);
      if (next === "all") {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      } else {
        window.location.hash = next;
      }
    });
  });

  window.addEventListener("hashchange", () => {
    const active = getActiveSpotlight();
    updateFilterButtons(active);
    renderExperience(active);
  });
}

function setupRevealAnimation() {
  const reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("show"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  reveals.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index * 60, 220)}ms`;
    observer.observe(el);
  });
}

function setupPhotoFallback() {
  const photo = document.getElementById("profile-photo");
  if (!photo) return;

  photo.addEventListener("error", () => {
    photo.src = "assets/img/profile-placeholder.svg";
  });
}

function boot() {
  setText("hero-name", cvData.profile.name);
  setText("hero-title", cvData.profile.title);
  setText("hero-location", cvData.profile.location);
  setText("hero-summary", cvData.profile.summary);
  setText("about-text", cvData.about);

  setLink("linkedin-link", cvData.contacts.linkedinUrl);
  setLink("github-link", cvData.contacts.githubUrl);
  setLink("contact-linkedin", cvData.contacts.linkedinUrl);
  setLink("contact-github", cvData.contacts.githubUrl);

  setLink("email-primary", `mailto:${cvData.contacts.primaryEmail}`, cvData.contacts.primaryEmail);
  setLink("email-secondary", `mailto:${cvData.contacts.secondaryEmail}`, cvData.contacts.secondaryEmail);

  renderSkills();
  renderList("education-list", cvData.education);
  renderList("languages-list", cvData.languagesSpoken);
  renderList("cert-list", cvData.certifications);

  const active = getActiveSpotlight();
  updateFilterButtons(active);
  renderExperience(active);
  setupSpotlightHandlers();

  const date = new Date();
  setText("last-updated", date.toISOString().slice(0, 10));

  setupPhotoFallback();
  setupRevealAnimation();
}

document.addEventListener("DOMContentLoaded", boot);
