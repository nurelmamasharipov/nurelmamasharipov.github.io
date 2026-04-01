const STORAGE_KEYS = {
  theme: "cpf-theme",
  answers: "cpf-answers",
  results: "cpf-results",
};

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavigationState();

  const page = document.body.dataset.page;
  if (page === "home") initHomePage();
  if (page === "test") initTestPage();
  if (page === "results") initResultsPage();
  if (page === "career") initCareerPage();
});

function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = savedTheme || (prefersDark ? "dark" : "light");
  document.body.classList.toggle("dark", theme === "dark");

  const toggle = document.querySelector("#themeToggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem(STORAGE_KEYS.theme, isDark ? "dark" : "light");
  });
}

function initNavigationState() {
  const page = document.body.dataset.page;
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === page) {
      link.setAttribute("aria-current", "page");
    }
  });
}

function initHomePage() {
  const grid = document.querySelector("#careerPreviewGrid");
  if (!grid) return;

  grid.innerHTML = CAREERS.map(
    (career) => `
      <article class="surface career-card">
        <span class="pill">${career.badge}</span>
        <h3>${career.title}</h3>
        <p>${career.shortDescription}</p>
        <div class="career-card__meta">
          <span class="salary">${career.salary}</span>
          <a class="button button--ghost" href="career.html?id=${career.id}">View Details</a>
        </div>
      </article>
    `
  ).join("");
}

function initTestPage() {
  const elements = {
    savedBanner: document.querySelector("#savedBanner"),
    continueSaved: document.querySelector("#continueSaved"),
    clearSaved: document.querySelector("#clearSaved"),
    questionStep: document.querySelector("#questionStep"),
    questionTitle: document.querySelector("#questionTitle"),
    progressSummary: document.querySelector("#progressSummary"),
    progressFill: document.querySelector("#progressFill"),
    progressCount: document.querySelector("#progressCount"),
    questionPrompt: document.querySelector("#questionPrompt"),
    optionList: document.querySelector("#optionList"),
    supportNote: document.querySelector("#supportNote"),
    prevButton: document.querySelector("#prevQuestion"),
    nextButton: document.querySelector("#nextQuestion"),
    submitButton: document.querySelector("#submitTest"),
    traitBars: document.querySelector("#traitBars"),
    restartButton: document.querySelector("#restartTest"),
    loadingScreen: document.querySelector("#loadingScreen"),
  };

  const state = {
    answers: loadAnswers(),
    currentIndex: 0,
  };

  const firstUnanswered = state.answers.findIndex((value) => typeof value !== "number");
  if (firstUnanswered > 0) {
    state.currentIndex = firstUnanswered;
  }

  renderSavedBanner();
  renderQuestion();
  renderStrengthPreview();

  elements.continueSaved.addEventListener("click", () => {
    const nextIndex = state.answers.findIndex((value) => typeof value !== "number");
    state.currentIndex = nextIndex === -1 ? QUESTIONS.length - 1 : nextIndex;
    renderQuestion();
  });

  elements.clearSaved.addEventListener("click", () => {
    clearStoredAssessment();
    state.answers = createEmptyAnswers();
    state.currentIndex = 0;
    renderSavedBanner();
    renderQuestion();
    renderStrengthPreview();
    hideSupportNote();
  });

  elements.prevButton.addEventListener("click", () => {
    state.currentIndex = Math.max(0, state.currentIndex - 1);
    renderQuestion();
    hideSupportNote();
  });

  elements.nextButton.addEventListener("click", () => {
    if (typeof state.answers[state.currentIndex] !== "number") {
      showSupportNote("Select one answer before moving to the next question.");
      return;
    }
    state.currentIndex = Math.min(QUESTIONS.length - 1, state.currentIndex + 1);
    renderQuestion();
    hideSupportNote();
  });

  elements.submitButton.addEventListener("click", () => {
    if (state.answers.some((value) => typeof value !== "number")) {
      showSupportNote("Complete every question to calculate your top 3 career matches.");
      return;
    }

    const results = calculateResults(state.answers);
    localStorage.setItem(STORAGE_KEYS.answers, JSON.stringify(state.answers));
    localStorage.setItem(STORAGE_KEYS.results, JSON.stringify(results));
    elements.loadingScreen.classList.remove("is-hidden");

    window.setTimeout(() => {
      window.location.href = "results.html";
    }, 1100);
  });

  elements.restartButton.addEventListener("click", () => {
    clearStoredAssessment();
    state.answers = createEmptyAnswers();
    state.currentIndex = 0;
    renderSavedBanner();
    renderQuestion();
    renderStrengthPreview();
    hideSupportNote();
  });

  function renderSavedBanner() {
    const answeredCount = state.answers.filter((value) => typeof value === "number").length;
    elements.savedBanner.classList.toggle("is-hidden", answeredCount === 0);
  }

  function renderQuestion() {
    const question = QUESTIONS[state.currentIndex];
    const selectedAnswer = state.answers[state.currentIndex];
    const answeredCount = state.answers.filter((value) => typeof value === "number").length;
    const progress = ((state.currentIndex + 1) / QUESTIONS.length) * 100;

    elements.questionStep.textContent = `Question ${state.currentIndex + 1} of ${QUESTIONS.length}`;
    elements.questionTitle.textContent = question.text;
    elements.progressSummary.textContent = `${Math.round(progress)}% complete`;
    elements.progressFill.style.width = `${progress}%`;
    elements.progressCount.textContent = `${answeredCount}/${QUESTIONS.length} answered`;
    elements.questionPrompt.textContent = question.prompt;

    elements.optionList.innerHTML = question.options
      .map((option, index) => {
        const isSelected = selectedAnswer === index ? " is-selected" : "";
        return `
          <button class="option-card${isSelected}" type="button" data-index="${index}">
            <span class="option-card__marker">${String.fromCharCode(65 + index)}</span>
            <span class="option-card__content">
              <strong>${option.label}</strong>
              <small>${option.description}</small>
            </span>
          </button>
        `;
      })
      .join("");

    elements.optionList.querySelectorAll("[data-index]").forEach((button) => {
      button.addEventListener("click", () => {
        state.answers[state.currentIndex] = Number(button.dataset.index);
        localStorage.setItem(STORAGE_KEYS.answers, JSON.stringify(state.answers));
        renderQuestion();
        renderStrengthPreview();
        hideSupportNote();
      });
    });

    elements.prevButton.disabled = state.currentIndex === 0;
    const isLast = state.currentIndex === QUESTIONS.length - 1;
    elements.nextButton.hidden = isLast;
    elements.submitButton.hidden = !isLast;
  }

  function renderStrengthPreview() {
    const normalizedScores = normalizeScores(calculateCategoryScores(state.answers));
    elements.traitBars.innerHTML = CATEGORY_ORDER.map((key) => {
      const item = CATEGORY_INFO[key];
      const value = Math.round(normalizedScores[key] || 0);
      return `
        <div class="strength-row">
          <div class="strength-row__top">
            <span>${item.label}</span>
            <span>${value}%</span>
          </div>
          <div class="strength-row__bar">
            <span style="width:${value}%; background:${item.color};"></span>
          </div>
        </div>
      `;
    }).join("");
  }

  function showSupportNote(message) {
    elements.supportNote.textContent = message;
    elements.supportNote.classList.remove("is-hidden");
  }

  function hideSupportNote() {
    elements.supportNote.classList.add("is-hidden");
  }
}

function initResultsPage() {
  const results = loadResults();
  const emptyState = document.querySelector("#resultsEmpty");
  const content = document.querySelector("#resultsContent");
  const banner = document.querySelector("#recommendationBanner");
  const topMatches = document.querySelector("#topMatches");
  const dominantTraits = document.querySelector("#dominantTraits");
  const motivationalMessage = document.querySelector("#motivationalMessage");
  const exploreTopCareer = document.querySelector("#exploreTopCareer");

  document.querySelectorAll("[data-action='restart']").forEach((button) => {
    button.addEventListener("click", () => {
      clearStoredAssessment();
      window.location.href = "test.html";
    });
  });

  if (!results) {
    emptyState.hidden = false;
    content.hidden = true;
    return;
  }

  emptyState.hidden = true;
  content.hidden = false;

  const topCareer = results.recommendations[0];
  banner.innerHTML = `
    <div>
      <p class="eyebrow">Best match</p>
      <h1>${topCareer.title}</h1>
      <p>${topCareer.reason}</p>
    </div>
    <div class="hero-summary__side">
      <div class="match-badge match-badge--large">${topCareer.match}%</div>
      <div class="action-row action-row--stack">
        <a class="button button--primary" href="career.html?id=${topCareer.id}">View Career Details</a>
        <button class="button button--ghost" type="button" data-action="restart">Restart Test</button>
      </div>
    </div>
  `;

  banner.querySelector("[data-action='restart']").addEventListener("click", () => {
    clearStoredAssessment();
    window.location.href = "test.html";
  });

  topMatches.innerHTML = results.recommendations
    .map(
      (career) => `
        <article class="result-card">
          <div class="result-card__top">
            <div>
              <span class="pill">${career.badge}</span>
              <h3>${career.title}</h3>
            </div>
            <div class="match-badge">${career.match}%</div>
          </div>
          <p>${career.reason}</p>
          <div class="result-card__footer">
            <span class="salary">${career.salary}</span>
            <a class="button button--ghost" href="career.html?id=${career.id}">View Career Details</a>
          </div>
        </article>
      `
    )
    .join("");

  dominantTraits.innerHTML = results.primaryTraits
    .map((key) => {
      const info = CATEGORY_INFO[key];
      const score = Math.round(results.normalizedScores[key]);
      return `
        <article class="trait-card">
          <span class="trait-card__dot" style="background:${info.color};"></span>
          <div>
            <strong>${info.label} - ${score}%</strong>
            <p>${info.description}</p>
          </div>
        </article>
      `;
    })
    .join("");

  motivationalMessage.textContent = getMotivationalMessage(topCareer.match);
  exploreTopCareer.href = `career.html?id=${topCareer.id}`;

  renderResultsChart(results);
}

function initCareerPage() {
  const list = document.querySelector("#careerList");
  const detail = document.querySelector("#careerDetail");
  const params = new URLSearchParams(window.location.search);
  let activeId = params.get("id") || CAREERS[0].id;
  const results = loadResults();

  if (!CAREERS.find((career) => career.id === activeId)) {
    activeId = CAREERS[0].id;
  }

  renderList();
  renderDetail(activeId);

  function renderList() {
    list.innerHTML = CAREERS.map((career) => {
      const recommendation = results?.recommendations.find((item) => item.id === career.id);
      return `
        <button class="career-list-item${career.id === activeId ? " is-active" : ""}" type="button" data-id="${career.id}">
          <div class="career-list-item__top">
            <span>${career.title}</span>
            ${recommendation ? `<small>${recommendation.match}%</small>` : ""}
          </div>
          <p>${career.badge}</p>
        </button>
      `;
    }).join("");

    list.querySelectorAll("[data-id]").forEach((button) => {
      button.addEventListener("click", () => {
        activeId = button.dataset.id;
        const nextUrl = new URL(window.location.href);
        nextUrl.searchParams.set("id", activeId);
        window.history.replaceState({}, "", nextUrl);
        renderList();
        renderDetail(activeId);
      });
    });
  }

  function renderDetail(careerId) {
    const career = CAREERS.find((item) => item.id === careerId);
    const recommendation = results?.recommendations.find((item) => item.id === careerId);

    detail.innerHTML = `
      <article class="surface career-detail">
        <div class="career-detail__hero">
          <div>
            <p class="eyebrow">Career details</p>
            <h1>${career.title}</h1>
            <p>${career.description}</p>
          </div>
          <div class="career-detail__stats">
            <span class="pill">${career.badge}</span>
            <span class="salary">${career.salary}</span>
            ${recommendation ? `<div class="match-badge">${recommendation.match}%</div>` : ""}
          </div>
        </div>

        ${recommendation ? `
          <div class="surface inner-banner">
            <p class="eyebrow">Why this fits you</p>
            <p>${recommendation.reason}</p>
          </div>
        ` : ""}

        <div class="career-detail__grid">
          <section class="surface inner-card">
            <p class="eyebrow">Description</p>
            <p>${career.fitText}</p>
            <p><strong>Best for:</strong> ${career.bestFor}</p>
          </section>

          <section class="surface inner-card">
            <p class="eyebrow">Required skills</p>
            <ul class="stack-list">
              ${career.skills.map((skill) => `<li>${skill}</li>`).join("")}
            </ul>
          </section>

          <section class="surface inner-card">
            <p class="eyebrow">Learning roadmap</p>
            <ol class="roadmap-list">
              ${career.roadmap.map((step) => `<li>${step}</li>`).join("")}
            </ol>
          </section>
        </div>
      </article>
    `;
  }
}

function calculateResults(answers) {
  const categoryScores = calculateCategoryScores(answers);
  const normalizedScores = normalizeScores(categoryScores);
  const primaryTraits = [...CATEGORY_ORDER]
    .sort((a, b) => normalizedScores[b] - normalizedScores[a])
    .slice(0, 3);

  const recommendations = CAREERS.map((career) => {
    const fitScore = scoreCareerMatch(normalizedScores, career.weights);
    return {
      id: career.id,
      title: career.title,
      badge: career.badge,
      salary: career.salary,
      match: fitScore,
      reason: buildReason(career, normalizedScores, primaryTraits),
    };
  })
    .sort((a, b) => b.match - a.match)
    .slice(0, 3);

  return {
    categoryScores,
    normalizedScores,
    primaryTraits,
    recommendations,
    completedAt: new Date().toISOString(),
  };
}

function calculateCategoryScores(answers) {
  const scores = createEmptyScores();

  answers.forEach((answerIndex, questionIndex) => {
    if (typeof answerIndex !== "number") return;
    const option = QUESTIONS[questionIndex]?.options[answerIndex];
    if (!option) return;

    CATEGORY_ORDER.forEach((key) => {
      scores[key] += option.scores[key] || 0;
    });
  });

  return scores;
}

function normalizeScores(scores) {
  const total = CATEGORY_ORDER.reduce((sum, key) => sum + scores[key], 0);
  if (!total) return createEmptyScores();

  return CATEGORY_ORDER.reduce((result, key) => {
    result[key] = (scores[key] / total) * 100;
    return result;
  }, {});
}

function scoreCareerMatch(userScores, careerWeights) {
  let weightedTotal = 0;
  let weightSum = 0;

  CATEGORY_ORDER.forEach((key) => {
    weightedTotal += (userScores[key] || 0) * careerWeights[key];
    weightSum += 100 * careerWeights[key];
  });

  const raw = weightSum ? weightedTotal / weightSum : 0;
  return Math.max(60, Math.min(98, Math.round(raw * 100)));
}

function buildReason(career, normalizedScores, primaryTraits) {
  const topCareerTraits = [...CATEGORY_ORDER]
    .sort((a, b) => career.weights[b] - career.weights[a])
    .slice(0, 2);

  const aligned = primaryTraits.filter((key) => topCareerTraits.includes(key));
  const chosen = aligned.length ? aligned : topCareerTraits;
  const labels = chosen.map((key) => CATEGORY_INFO[key].label.toLowerCase());
  const summary = labels.length > 1 ? `${labels[0]} and ${labels[1]}` : labels[0];

  return `${career.fitText} Your answers show strong ${summary}, which makes this career a strong match for your profile.`;
}

function renderResultsChart(results) {
  const canvas = document.querySelector("#resultsChart");
  if (!canvas || typeof Chart === "undefined") return;

  const textColor = getComputedStyle(document.body).getPropertyValue("--text").trim();
  const gridColor = getComputedStyle(document.body).getPropertyValue("--border").trim();

  new Chart(canvas, {
    type: "bar",
    data: {
      labels: CATEGORY_ORDER.map((key) => CATEGORY_INFO[key].label),
      datasets: [
        {
          data: CATEGORY_ORDER.map((key) => Math.round(results.normalizedScores[key] || 0)),
          backgroundColor: CATEGORY_ORDER.map((key) => CATEGORY_INFO[key].color),
          borderRadius: 12,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          ticks: { color: textColor, font: { family: "DM Sans", weight: "700" } },
          grid: { display: false },
        },
        y: {
          beginAtZero: true,
          max: 40,
          ticks: { color: textColor, stepSize: 10 },
          grid: { color: gridColor },
        },
      },
    },
  });
}

function getMotivationalMessage(score) {
  if (score >= 90) {
    return "You have a very strong fit here. Start building proof through projects, research, or a student portfolio.";
  }
  if (score >= 80) {
    return "This is a strong direction for you. The next step is to test it through hands-on experience.";
  }
  return "You have clear potential here. Explore the roadmap and use practice to sharpen your direction.";
}

function loadAnswers() {
  const raw = localStorage.getItem(STORAGE_KEYS.answers);
  if (!raw) return createEmptyAnswers();

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length === QUESTIONS.length ? parsed : createEmptyAnswers();
  } catch {
    return createEmptyAnswers();
  }
}

function loadResults() {
  const raw = localStorage.getItem(STORAGE_KEYS.results);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function clearStoredAssessment() {
  localStorage.removeItem(STORAGE_KEYS.answers);
  localStorage.removeItem(STORAGE_KEYS.results);
}

function createEmptyAnswers() {
  return Array(QUESTIONS.length).fill(null);
}

function createEmptyScores() {
  return CATEGORY_ORDER.reduce((result, key) => {
    result[key] = 0;
    return result;
  }, {});
}
