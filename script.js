const STORAGE_KEYS = {
  theme: "career-path-finder-theme",
  answers: "career-path-finder-answers",
  results: "career-path-finder-results",
};

const CATEGORY_COLORS = {
  technology: "#1f5eff",
  creativity: "#ff6b4a",
  business: "#f7a928",
  social: "#14a36f",
  analytical: "#7d57ff",
};

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initSharedUI();

  const page = document.body.dataset.page;
  if (page === "home") {
    initHomePage();
  }
  if (page === "test") {
    initTestPage();
  }
  if (page === "results") {
    initResultsPage();
  }
  if (page === "career") {
    initCareerPage();
  }
});

function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
  document.body.classList.toggle("dark", initialTheme === "dark");

  const toggle = document.querySelector("#themeToggle");
  if (!toggle) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem(STORAGE_KEYS.theme, isDark ? "dark" : "light");
  });
}

function initSharedUI() {
  const yearNode = document.querySelector("#year");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }
}

function initHomePage() {
  const grid = document.querySelector("#careerPreviewGrid");
  if (!grid) {
    return;
  }

  // Render the shared career database on the landing page so the cards stay
  // consistent with the detail view and recommendation engine.
  grid.innerHTML = CAREERS.slice(0, 6)
    .map(
      (career) => `
        <article class="career-card reveal">
          <span class="career-card__badge">${career.categoryLabel}</span>
          <h3>${career.title}</h3>
          <p>${career.shortDescription}</p>
          <div class="career-card__footer">
            <span class="salary-pill">${career.salary}</span>
            <a class="button button--ghost" href="career.html?id=${career.id}">View Career</a>
          </div>
        </article>
      `
    )
    .join("");
}

function initTestPage() {
  const elements = {
    questionNumber: document.querySelector("#questionNumber"),
    questionText: document.querySelector("#questionText"),
    questionPrompt: document.querySelector("#questionPrompt"),
    optionList: document.querySelector("#optionList"),
    progressFill: document.querySelector("#progressFill"),
    progressLabel: document.querySelector("#progressLabel"),
    progressCount: document.querySelector("#progressCount"),
    prevButton: document.querySelector("#prevQuestion"),
    nextButton: document.querySelector("#nextQuestion"),
    submitButton: document.querySelector("#submitTest"),
    traitBars: document.querySelector("#traitBars"),
    supportNote: document.querySelector("#supportNote"),
    loadingScreen: document.querySelector("#loadingScreen"),
    restartButton: document.querySelector("#restartTest"),
    savedBanner: document.querySelector("#savedBanner"),
    continueSavedButton: document.querySelector("#continueSaved"),
    clearSavedButton: document.querySelector("#clearSaved"),
  };

  const state = {
    currentIndex: 0,
    answers: loadAnswers(),
  };

  renderSavedBanner();
  renderQuestion();
  renderTraitPreview();

  elements.prevButton.addEventListener("click", () => {
    state.currentIndex = Math.max(0, state.currentIndex - 1);
    renderQuestion();
  });

  elements.nextButton.addEventListener("click", () => {
    const currentAnswer = state.answers[state.currentIndex];
    if (typeof currentAnswer !== "number") {
      showSupportNote("Choose an option to move to the next question.");
      return;
    }

    state.currentIndex = Math.min(QUESTIONS.length - 1, state.currentIndex + 1);
    renderQuestion();
  });

  elements.submitButton.addEventListener("click", () => {
    if (state.answers.some((answer) => typeof answer !== "number")) {
      showSupportNote("Answer every question to unlock your top career matches.");
      return;
    }

    const results = calculateResults(state.answers);
    localStorage.setItem(STORAGE_KEYS.results, JSON.stringify(results));
    localStorage.setItem(STORAGE_KEYS.answers, JSON.stringify(state.answers));
    elements.loadingScreen.classList.remove("is-hidden");

    window.setTimeout(() => {
      window.location.href = "results.html";
    }, 1600);
  });

  elements.restartButton.addEventListener("click", () => {
    state.answers = Array(QUESTIONS.length).fill(null);
    state.currentIndex = 0;
    persistAnswers(state.answers);
    renderSavedBanner();
    renderQuestion();
    renderTraitPreview();
    hideSupportNote();
  });

  elements.continueSavedButton.addEventListener("click", () => {
    const firstUnansweredIndex = state.answers.findIndex((value) => typeof value !== "number");
    state.currentIndex = firstUnansweredIndex === -1 ? QUESTIONS.length - 1 : firstUnansweredIndex;
    renderQuestion();
  });

  elements.clearSavedButton.addEventListener("click", () => {
    state.answers = Array(QUESTIONS.length).fill(null);
    localStorage.removeItem(STORAGE_KEYS.answers);
    localStorage.removeItem(STORAGE_KEYS.results);
    renderSavedBanner();
    renderQuestion();
    renderTraitPreview();
    hideSupportNote();
  });

  function renderSavedBanner() {
    const answeredCount = state.answers.filter((value) => typeof value === "number").length;
    elements.savedBanner.classList.toggle("is-hidden", answeredCount === 0);
  }

  function renderQuestion() {
    const question = QUESTIONS[state.currentIndex];
    const selectedIndex = state.answers[state.currentIndex];
    const answeredCount = state.answers.filter((value) => typeof value === "number").length;
    const progress = ((state.currentIndex + 1) / QUESTIONS.length) * 100;

    elements.questionNumber.textContent = `Question ${state.currentIndex + 1}`;
    elements.questionText.textContent = question.text;
    elements.questionPrompt.textContent = question.prompt;
    elements.progressFill.style.width = `${progress}%`;
    elements.progressLabel.textContent = `${Math.round(progress)}% complete`;
    elements.progressCount.textContent = `${answeredCount}/${QUESTIONS.length} answered`;

    // Each answer option exposes only a light hint about category impact while
    // the full scoring stays hidden in the dataset.
    elements.optionList.innerHTML = question.options
      .map((option, index) => {
        const selectedClass = selectedIndex === index ? "is-selected" : "";
        const contribution = formatContribution(option.scores);
        return `
          <button class="option-card ${selectedClass}" type="button" data-option-index="${index}">
            <span class="option-card__bullet">${String.fromCharCode(65 + index)}</span>
            <span>
              <strong>${option.label}</strong>
              <span class="option-card__hint">${option.description}</span>
            </span>
            <span class="tag">${contribution}</span>
          </button>
        `;
      })
      .join("");

    elements.optionList.querySelectorAll(".option-card").forEach((button) => {
      button.addEventListener("click", () => {
        const optionIndex = Number(button.dataset.optionIndex);
        state.answers[state.currentIndex] = optionIndex;
        persistAnswers(state.answers);
        hideSupportNote();
        renderQuestion();
        renderTraitPreview();
      });
    });

    elements.prevButton.disabled = state.currentIndex === 0;
    const isLastQuestion = state.currentIndex === QUESTIONS.length - 1;
    elements.nextButton.hidden = isLastQuestion;
    elements.submitButton.hidden = !isLastQuestion;
  }

  function renderTraitPreview() {
    // This preview uses the current partial answers so students can see their
    // emerging profile before the final recommendation is calculated.
    const scores = calculateCategoryScores(state.answers);
    const normalizedScores = normalizeScores(scores);

    elements.traitBars.innerHTML = CATEGORY_ORDER.map((categoryKey) => {
      const category = CATEGORY_INFO[categoryKey];
      const value = Math.round(normalizedScores[categoryKey] || 0);
      return `
        <div class="trait-row">
          <div class="trait-row__top">
            <span>${category.label}</span>
            <span>${value}%</span>
          </div>
          <div class="trait-row__track">
            <div class="trait-row__fill" style="width:${value}%; background: linear-gradient(135deg, ${category.color}, var(--accent));"></div>
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
  const resultsContent = document.querySelector("#resultsContent");
  const topMatches = document.querySelector("#topMatches");
  const summaryGrid = document.querySelector("#summaryGrid");
  const dominantTraits = document.querySelector("#dominantTraits");
  const recommendationBanner = document.querySelector("#recommendationBanner");
  const motivationalMessage = document.querySelector("#motivationalMessage");
  const restartButtons = document.querySelectorAll("[data-action='restart']");
  const exploreLink = document.querySelector("#exploreTopCareer");

  restartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEYS.answers);
      localStorage.removeItem(STORAGE_KEYS.results);
      window.location.href = "test.html";
    });
  });

  if (!results) {
    emptyState.hidden = false;
    resultsContent.hidden = true;
    return;
  }

  emptyState.hidden = true;
  resultsContent.hidden = false;

  const topCareer = results.recommendations[0];
  recommendationBanner.innerHTML = `
    <div>
      <p class="eyebrow">Best-fit pathway</p>
      <h2>You are ${topCareer.match}% compatible with ${topCareer.title}</h2>
      <p>${topCareer.reason}</p>
    </div>
    <div class="results-actions">
      <a class="button button--primary" href="career.html?id=${topCareer.id}">Open Career Plan</a>
      <button class="button button--ghost" type="button" data-action="restart">Restart Test</button>
    </div>
  `;

  recommendationBanner.querySelector("[data-action='restart']").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEYS.answers);
    localStorage.removeItem(STORAGE_KEYS.results);
    window.location.href = "test.html";
  });

  motivationalMessage.textContent = getMotivationalMessage(topCareer.match);
  exploreLink.href = `career.html?id=${topCareer.id}`;

  summaryGrid.innerHTML = `
    <article class="summary-card">
      <strong>${topCareer.match}%</strong>
      <span>Top compatibility score</span>
    </article>
    <article class="summary-card">
      <strong>${results.primaryTraits.map((trait) => CATEGORY_INFO[trait].label).join(", ")}</strong>
      <span>Dominant strengths</span>
    </article>
    <article class="summary-card">
      <strong>${results.recommendations.length}</strong>
      <span>Suggested career paths</span>
    </article>
  `;

  topMatches.innerHTML = results.recommendations
    .map(
      (career) => `
        <article class="result-card">
          <div class="result-card__top">
            <div>
              <span class="career-card__badge">${career.categoryLabel}</span>
              <h3>${career.title}</h3>
            </div>
            <div class="result-card__match">${career.match}%</div>
          </div>
          <p class="result-reason">${career.reason}</p>
          <div class="career-card__footer">
            <span class="salary-pill">${career.salary}</span>
            <a class="button button--ghost" href="career.html?id=${career.id}">View Details</a>
          </div>
        </article>
      `
    )
    .join("");

  dominantTraits.innerHTML = results.primaryTraits
    .map((traitKey) => {
      const category = CATEGORY_INFO[traitKey];
      const score = Math.round(results.normalizedScores[traitKey]);
      return `
        <article class="insight-card">
          <span class="tag" style="background:${hexToRgba(category.color, 0.14)}; color:${category.color};">${category.label}</span>
          <h3>${score}% strength</h3>
          <p>${category.description}</p>
        </article>
      `;
    })
    .join("");

  renderResultsChart(results);
}

function initCareerPage() {
  const listContainer = document.querySelector("#careerList");
  const detailContainer = document.querySelector("#careerDetail");
  const savedResults = loadResults();
  const params = new URLSearchParams(window.location.search);
  let currentCareerId = params.get("id") || CAREERS[0].id;

  if (!CAREERS.some((career) => career.id === currentCareerId)) {
    currentCareerId = CAREERS[0].id;
  }

  renderCareerList();
  renderCareerDetail(currentCareerId);

  function renderCareerList() {
    listContainer.innerHTML = CAREERS.map((career) => {
      const recommendation = savedResults?.recommendations.find((item) => item.id === career.id);
      return `
        <button class="career-list-card ${career.id === currentCareerId ? "is-active" : ""}" type="button" data-career-id="${career.id}">
          <div class="career-meta">
            <span class="career-card__badge">${career.categoryLabel}</span>
            ${recommendation ? `<span class="tag">${recommendation.match}% match</span>` : ""}
          </div>
          <h3>${career.title}</h3>
          <p>${career.shortDescription}</p>
        </button>
      `;
    }).join("");

    listContainer.querySelectorAll("[data-career-id]").forEach((button) => {
      button.addEventListener("click", () => {
        currentCareerId = button.dataset.careerId;
        const nextUrl = new URL(window.location.href);
        nextUrl.searchParams.set("id", currentCareerId);
        window.history.replaceState({}, "", nextUrl);
        renderCareerList();
        renderCareerDetail(currentCareerId);
      });
    });
  }

  function renderCareerDetail(careerId) {
    const career = CAREERS.find((item) => item.id === careerId);
    const recommendation = savedResults?.recommendations.find((item) => item.id === careerId);

    detailContainer.innerHTML = `
      <article class="career-detail-card">
        <div class="career-page__hero">
          <div>
            <p class="eyebrow">Career profile</p>
            <h2>${career.title}</h2>
            <p class="career-copy">${career.description}</p>
          </div>
          <div class="career-page__actions">
            <span class="salary-pill">${career.salary}</span>
            ${recommendation ? `<span class="tag">${recommendation.match}% match for you</span>` : ""}
          </div>
        </div>

        ${recommendation ? `
          <div class="recommendation-banner">
            <div>
              <p class="eyebrow">Why it fits you</p>
              <p>${recommendation.reason}</p>
            </div>
            <a class="button button--primary" href="results.html">See Full Results</a>
          </div>
        ` : ""}

        <div class="detail-grid">
          <section class="panel-card">
            <p class="eyebrow">Required skills</p>
            <ul class="career-skills">
              ${career.skills.map((skill) => `<li>${skill}</li>`).join("")}
            </ul>
          </section>

          <section class="panel-card">
            <p class="eyebrow">Student roadmap</p>
            <ol class="roadmap">
              ${career.roadmap.map((step) => `<li>${step}</li>`).join("")}
            </ol>
          </section>

          <section class="panel-card">
            <p class="eyebrow">Career snapshot</p>
            <ul class="detail-list">
              <li><strong>Best for:</strong> ${career.bestFor}</li>
              <li><strong>Growth focus:</strong> ${career.growthFocus}</li>
              <li><strong>Work style:</strong> ${career.workStyle}</li>
            </ul>
          </section>
        </div>
      </article>
    `;
  }
}

function calculateResults(answers) {
  // The recommendation layer first converts raw category points into a
  // normalized profile, then compares that profile against each career model.
  const categoryScores = calculateCategoryScores(answers);
  const normalizedScores = normalizeScores(categoryScores);
  const primaryTraits = [...CATEGORY_ORDER]
    .sort((a, b) => normalizedScores[b] - normalizedScores[a])
    .slice(0, 3);

  const recommendations = CAREERS.map((career) => {
    const similarity = calculateCosineSimilarity(normalizedScores, career.weights);
    const match = Math.max(62, Math.min(98, Math.round(60 + similarity * 38)));
    return {
      id: career.id,
      title: career.title,
      salary: career.salary,
      categoryLabel: career.categoryLabel,
      match,
      reason: buildCareerReason(career, normalizedScores, primaryTraits),
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
    if (typeof answerIndex !== "number") {
      return;
    }

    const option = QUESTIONS[questionIndex]?.options[answerIndex];
    if (!option) {
      return;
    }

    CATEGORY_ORDER.forEach((category) => {
      scores[category] += option.scores[category] || 0;
    });
  });

  return scores;
}

function normalizeScores(scores) {
  const total = CATEGORY_ORDER.reduce((sum, category) => sum + scores[category], 0);
  if (!total) {
    return createEmptyScores();
  }

  return CATEGORY_ORDER.reduce((normalized, category) => {
    normalized[category] = (scores[category] / total) * 100;
    return normalized;
  }, {});
}

function calculateCosineSimilarity(normalizedScores, targetWeights) {
  // Cosine similarity keeps the ranking focused on pattern alignment rather
  // than total score volume, which works well for browser-only recommendations.
  let dotProduct = 0;
  let userMagnitude = 0;
  let targetMagnitude = 0;

  CATEGORY_ORDER.forEach((category) => {
    const userValue = normalizedScores[category] || 0;
    const targetValue = targetWeights[category] || 0;
    dotProduct += userValue * targetValue;
    userMagnitude += userValue * userValue;
    targetMagnitude += targetValue * targetValue;
  });

  if (!userMagnitude || !targetMagnitude) {
    return 0;
  }

  return dotProduct / (Math.sqrt(userMagnitude) * Math.sqrt(targetMagnitude));
}

function buildCareerReason(career, normalizedScores, primaryTraits) {
  const topCareerTraits = [...CATEGORY_ORDER]
    .sort((a, b) => career.weights[b] - career.weights[a])
    .slice(0, 2);

  const overlappingTraits = primaryTraits.filter((trait) => topCareerTraits.includes(trait));
  const highlightTraits = overlappingTraits.length ? overlappingTraits : topCareerTraits;

  const labels = highlightTraits.map((trait) => CATEGORY_INFO[trait].label.toLowerCase());
  const strongestTrait = CATEGORY_INFO[primaryTraits[0]].label.toLowerCase();
  const traitSummary = labels.length === 1 ? labels[0] : `${labels[0]} and ${labels[1]}`;
  const scoreSummary = `${Math.round(normalizedScores[primaryTraits[0]])}% ${strongestTrait}`;

  return `${career.fitText} Your profile shows strong ${traitSummary}, with ${scoreSummary} leading the way.`;
}

function renderResultsChart(results) {
  const canvas = document.querySelector("#resultsChart");
  if (!canvas || typeof Chart === "undefined") {
    return;
  }

  const chartLabels = CATEGORY_ORDER.map((key) => CATEGORY_INFO[key].label);
  const chartData = CATEGORY_ORDER.map((key) => Math.round(results.normalizedScores[key]));
  const colors = CATEGORY_ORDER.map((key) => CATEGORY_INFO[key].color);
  const textColor = getComputedStyle(document.body).getPropertyValue("--text").trim() || "#16202a";
  const lineColor = getComputedStyle(document.body).getPropertyValue("--line").trim() || "rgba(22,32,42,0.1)";

  new Chart(canvas, {
    type: "radar",
    data: {
      labels: chartLabels,
      datasets: [
        {
          label: "Your trait profile",
          data: chartData,
          fill: true,
          backgroundColor: hexToRgba(CATEGORY_COLORS.technology, 0.15),
          borderColor: CATEGORY_COLORS.technology,
          pointBackgroundColor: colors,
          pointBorderColor: "#ffffff",
          pointRadius: 5,
          pointHoverRadius: 6,
          borderWidth: 2.5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
      },
      plugins: {
        legend: {
          labels: {
            color: textColor,
            font: {
              family: "Plus Jakarta Sans",
              weight: "700",
            },
          },
        },
      },
      scales: {
        r: {
          angleLines: {
            color: lineColor,
          },
          grid: {
            color: lineColor,
          },
          pointLabels: {
            color: textColor,
            font: {
              family: "Plus Jakarta Sans",
              size: 12,
              weight: "700",
            },
          },
          suggestedMin: 0,
          suggestedMax: 40,
          ticks: {
            display: false,
            stepSize: 10,
          },
        },
      },
    },
  });
}

function loadAnswers() {
  const stored = localStorage.getItem(STORAGE_KEYS.answers);
  if (!stored) {
    return Array(QUESTIONS.length).fill(null);
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length === QUESTIONS.length
      ? parsed
      : Array(QUESTIONS.length).fill(null);
  } catch {
    return Array(QUESTIONS.length).fill(null);
  }
}

function persistAnswers(answers) {
  localStorage.setItem(STORAGE_KEYS.answers, JSON.stringify(answers));
}

function loadResults() {
  const stored = localStorage.getItem(STORAGE_KEYS.results);
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

function createEmptyScores() {
  return CATEGORY_ORDER.reduce((scores, category) => {
    scores[category] = 0;
    return scores;
  }, {});
}

function formatContribution(scores) {
  const ranked = Object.entries(scores)
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([key, value]) => `${CATEGORY_INFO[key].shortLabel} +${value}`);

  return ranked.join(" • ");
}

function getMotivationalMessage(score) {
  if (score >= 90) {
    return "You have a standout fit. Lean into projects, communities, and learning paths that turn this strength into real momentum.";
  }
  if (score >= 80) {
    return "You already have a strong alignment. The next step is testing this path through practice, not just thinking about it.";
  }
  return "You have promising potential here. Explore, build experience, and let curiosity refine your direction over time.";
}

function hexToRgba(hex, alpha) {
  const sanitized = hex.replace("#", "");
  const expanded = sanitized.length === 3
    ? sanitized.split("").map((char) => char + char).join("")
    : sanitized;
  const value = Number.parseInt(expanded, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
