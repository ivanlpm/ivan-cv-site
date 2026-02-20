const cvData = {
  profile: {
    name: "Iván López Marchante",
    title: "Backend Engineer | Scalable Systems & API Development",
    location: "Malaga, Spain",
    heroSummary:
      "Java-focused Backend Engineer building high-reliability APIs, scalable microservices, and practical AI workflows that improve engineering delivery outcomes.",
    professionalSummary: [
      "Backend engineer with strong Java background, focused on reliable microservices and practical AI enablement.",
      "I combine software delivery with repeatable workflows for prompts, instructions, and skills to improve quality, speed, and team consistency."
    ]
  },
  contacts: {
    linkedinUrl: "https://www.linkedin.com/in/ivan-lopez-marchante/",
    primaryEmail: "ivan.lopez@bestseller.com",
    secondaryEmail: "ivanlpz50@gmail.com",
    githubUrl: "https://github.com/ivanlpm"
  },
  experience: [
    {
      company: "BESTSELLER",
      role: "Backend Developer",
      start: "Sep 2025",
      end: "Present",
      location: "Malaga, Andalucia, Spain",
      mode: "Hybrid | Full-time",
      tags: ["backend", "ai-agents", "leadership"],
      achievements: [
        {
          action: "Designed",
          impact:
            "scalable backend services and API contracts for buying workflows, standardizing service boundaries and reducing integration complexity.",
          technologies: ["Java", "Spring Boot", "REST APIs", "Kafka"]
        },
        {
          action: "Optimized",
          impact:
            "engineering throughput by embedding Copilot and Codex workflows into development, review preparation, and troubleshooting practices.",
          technologies: ["Copilot", "Codex", "Prompt Engineering", "AI Workflows"]
        },
        {
          action: "Led",
          impact:
            "enablement sessions across multiple teams on prompt quality, instruction patterns, and reusable skill-driven execution.",
          technologies: ["Team Enablement", "Engineering Standards"]
        }
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
      achievements: [
        {
          action: "Built",
          impact:
            "factory-management APIs and backend business flows, improving domain consistency for orders and raw-material processing.",
          technologies: ["Java", "Spring Boot", "PostgreSQL", "Microservices"]
        },
        {
          action: "Improved",
          impact:
            "legacy platform stability through targeted maintenance, dependency upgrades, and production bug resolution.",
          technologies: ["JUnit", "Integration Testing", "Grafana"]
        }
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
      achievements: [
        {
          action: "Developed",
          impact:
            "delivery-order APIs and event-driven integrations for UberEats, Glovo, and JustEat.",
          technologies: ["Java", "Kafka", "GCP", "Microservices"]
        },
        {
          action: "Reduced",
          impact:
            "production resolution times by strengthening observability and flow diagnostics across distributed services.",
          technologies: ["BigQuery", "Kibana", "Incident Management"]
        }
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
      achievements: [
        {
          action: "Delivered",
          impact:
            "backend implementations and integrations in enterprise projects under agile timelines.",
          technologies: ["Java", "Scrum", "API Integration"]
        }
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
      achievements: [
        {
          action: "Implemented",
          impact:
            "document-management microservices and REST endpoints for labor-risk prevention workflows in SaaS.",
          technologies: ["Java", "Spring Boot", "REST APIs", "MySQL"]
        }
      ]
    }
  ],
  skills: {
    backend: ["Java", "Spring Boot", "REST APIs", "Microservices", "Kafka", "Hibernate"],
    databases: ["PostgreSQL", "MySQL", "DB2", "BigQuery", "Redis"],
    cloudDevops: ["Docker", "GCP", "Bitbucket Pipelines", "Grafana", "Kibana", "CI/CD"],
    aiAutomation: ["Copilot", "Codex", "Prompt Engineering", "Instruction Design", "AI Workflows", "Automation Patterns"]
  },
  contactSection: {
    title: "Contact",
    text:
      "If you want to connect about backend engineering, Java, microservices, or AI enablement, feel free to reach out.",
    buttonLabel: "Send Email"
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

const SKILL_META = {
  backend: { title: "Backend", icon: "BE" },
  databases: { title: "Databases", icon: "DB" },
  cloudDevops: { title: "Cloud / DevOps", icon: "CL" },
  aiAutomation: { title: "AI / Automation", icon: "AI" }
};

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

function clearNode(id) {
  const el = document.getElementById(id);
  if (el) el.textContent = "";
  return el;
}

function getActiveSpotlight() {
  const hash = window.location.hash.replace("#", "").toLowerCase();
  return SPOTLIGHTS.includes(hash) ? hash : "all";
}

function updateFilterButtons(activeFilter) {
  document.querySelectorAll(".spotlight-btn").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.filter === activeFilter));
  });
}

function sortBySpotlight(activeFilter) {
  if (activeFilter === "all") return [...cvData.experience];

  const relevant = [];
  const rest = [];
  cvData.experience.forEach((item) => {
    if (item.tags.includes(activeFilter)) relevant.push(item);
    else rest.push(item);
  });
  return [...relevant, ...rest];
}

function renderProfessionalSummary() {
  const content = clearNode("professional-summary-content");
  if (!content) return;

  cvData.profile.professionalSummary.forEach((line) => {
    const p = document.createElement("p");
    p.textContent = line;
    content.appendChild(p);
  });

}

function renderExperience(activeFilter) {
  const container = clearNode("experience-list");
  if (!container) return;

  const jobs = sortBySpotlight(activeFilter);

  jobs.forEach((job) => {
    const card = document.createElement("article");
    card.className = "timeline-card";
    card.setAttribute("role", "listitem");

    const relevant = activeFilter === "all" || job.tags.includes(activeFilter);
    card.classList.add(relevant ? "relevant" : "muted");

    const tags = job.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");

    const achievements = job.achievements
      .map((item) => {
        const tech = item.technologies
          .map((technology) => `<span class="tech-chip">${technology}</span>`)
          .join("");

        return `
          <li>
            <strong>${item.action}</strong> ${item.impact}
            <div class="tech-row">${tech}</div>
          </li>
        `;
      })
      .join("");

    card.innerHTML = `
      <header class="timeline-header">
        <div>
          <p class="timeline-role">${job.role}</p>
          <p class="timeline-company">${job.company}</p>
        </div>
        <p class="timeline-meta">${job.start} - ${job.end}</p>
      </header>
      <p class="timeline-meta">${job.location} | ${job.mode}</p>
      <div class="timeline-tags">${tags}</div>
      <ul class="achievement-list">${achievements}</ul>
    `;

    container.appendChild(card);
  });
}

function renderSkillsByCategory() {
  const grid = clearNode("skills-grid");
  if (!grid) return;

  Object.entries(cvData.skills).forEach(([key, values]) => {
    const meta = SKILL_META[key];
    if (!meta) return;

    const tagMarkup = values.map((value) => `<span class="skill-tag">${value}</span>`).join("");

    const card = document.createElement("article");
    card.className = "skill-card";
    card.setAttribute("role", "listitem");
    card.innerHTML = `
      <header class="skill-header">
        <span class="skill-icon" aria-hidden="true">${meta.icon}</span>
        <h3>${meta.title}</h3>
      </header>
      <div class="skill-tags">${tagMarkup}</div>
    `;

    grid.appendChild(card);
  });
}

function renderContactSection() {
  setText("contact-title", cvData.contactSection.title);
  setText("contact-text", cvData.contactSection.text);
  setText("contact-button", cvData.contactSection.buttonLabel);

  setLink("contact-button", `mailto:${cvData.contacts.primaryEmail}`);
  setLink("contact-primary-email", `mailto:${cvData.contacts.primaryEmail}`, cvData.contacts.primaryEmail);
  setLink("contact-secondary-email", `mailto:${cvData.contacts.secondaryEmail}`, cvData.contacts.secondaryEmail);
  setLink("contact-linkedin", cvData.contacts.linkedinUrl);
  setLink("contact-github", cvData.contacts.githubUrl);
}

function renderList(id, values) {
  const list = clearNode(id);
  if (!list) return;
  values.forEach((value) => {
    const li = document.createElement("li");
    li.textContent = value;
    list.appendChild(li);
  });
}

function setupSpotlightHandlers() {
  document.querySelectorAll(".spotlight-btn").forEach((button) => {
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
    { threshold: 0.12 }
  );

  reveals.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index * 55, 220)}ms`;
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
  setText("hero-summary", cvData.profile.heroSummary);

  setLink("linkedin-link", cvData.contacts.linkedinUrl);
  setLink("github-link", cvData.contacts.githubUrl);

  renderProfessionalSummary();
  renderSkillsByCategory();
  renderContactSection();
  renderList("education-list", cvData.education);
  renderList("languages-list", cvData.languagesSpoken);
  renderList("cert-list", cvData.certifications);

  const active = getActiveSpotlight();
  updateFilterButtons(active);
  renderExperience(active);
  setupSpotlightHandlers();

  setText("last-updated", new Date().toISOString().slice(0, 10));

  setupPhotoFallback();
  setupRevealAnimation();
}

document.addEventListener("DOMContentLoaded", boot);
