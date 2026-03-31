const USERS_KEY = "hanguk_flow_users";
const SESSION_KEY = "hanguk_flow_session";
const LEVELS = ["all", "beginner", "intermediate", "advanced"];

const lessons = [
  {
    id: "lesson-beginner-eun-neun",
    level: "beginner",
    title: "은/는: тема предложения",
    summary: "Как выделить тему и мягко задать контекст фразы.",
    explanation:
      "Частицы 은/는 показывают тему предложения. Их часто используют, когда вы говорите, о ком или о чем идет речь, либо сравниваете предметы.",
    examples: [
      { korean: "저는 학생이에요.", translation: "Я студент(ка)." },
      { korean: "오늘은 날씨가 좋아요.", translation: "Сегодня хорошая погода." }
    ],
    exercise: {
      question: "Выберите правильную частицу: 저는 한국___ 공부해요.",
      answer: "어를",
      hint: "Подумайте, что именно изучают."
    }
  },
  {
    id: "lesson-beginner-eul-reul",
    level: "beginner",
    title: "을/를: прямое дополнение",
    summary: "Как показать объект действия в предложении.",
    explanation:
      "Частицы 을/를 ставятся после существительного, которое является объектом действия. Они отвечают на вопрос: что именно мы делаем, читаем, смотрим или изучаем?",
    examples: [
      { korean: "저는 한국어를 배워요.", translation: "Я изучаю корейский язык." },
      { korean: "드라마를 봐요.", translation: "Я смотрю дораму." }
    ],
    exercise: {
      question: "Заполните пропуск: 책___ 읽어요.",
      answer: "을",
      hint: "Это объект действия."
    }
  },
  {
    id: "lesson-intermediate-go-sipda",
    level: "intermediate",
    title: "고 싶다: хотеть что-то сделать",
    summary: "Полезная конструкция для желаний и целей.",
    explanation:
      "Конструкция 고 싶다 присоединяется к основе глагола и показывает желание сделать действие. В вежливой речи часто используется форма 고 싶어요.",
    examples: [
      { korean: "한국에 가고 싶어요.", translation: "Я хочу поехать в Корею." },
      { korean: "더 많이 말하고 싶어요.", translation: "Я хочу больше говорить." }
    ],
    exercise: {
      question: "Как сказать: Я хочу смотреть дораму?",
      answer: "드라마를 보고 싶어요",
      hint: "Используйте глагол 보다."
    }
  },
  {
    id: "lesson-intermediate-eseo",
    level: "intermediate",
    title: "에서: место действия",
    summary: "Где происходит действие и как это обозначить.",
    explanation:
      "Частица 에서 показывает место, где происходит действие: учиться, работать, встречаться, смотреть и так далее.",
    examples: [
      { korean: "집에서 공부해요.", translation: "Я занимаюсь дома." },
      { korean: "카페에서 친구를 만나요.", translation: "Я встречаюсь с другом в кафе." }
    ],
    exercise: {
      question: "Заполните пропуск: 학교___ 한국어를 배워요.",
      answer: "에서",
      hint: "Нужно указать место действия."
    }
  },
  {
    id: "lesson-advanced-neunde",
    level: "advanced",
    title: "는데/은데: контраст и фон",
    summary: "Связка для мягкого противопоставления и контекста.",
    explanation:
      "Конструкции 는데/은데 помогают создать фон для следующей мысли, противопоставить идеи или смягчить высказывание. Очень частотны в живой речи и диалогах из дорам.",
    examples: [
      { korean: "바쁜데도 공부했어요.", translation: "Хотя я был(а) занят(а), я занимался(ась)." },
      { korean: "이 드라마는 재미있는데 조금 어려워요.", translation: "Эта дорама интересная, но немного сложная." }
    ],
    exercise: {
      question: "Допишите связку: 시간이 없___ 복습은 해야 해요.",
      answer: "는데",
      hint: "Нужно мягко противопоставить две идеи."
    }
  },
  {
    id: "lesson-advanced-get-gatda",
    level: "advanced",
    title: "것 같다: предположение",
    summary: "Как аккуратно выразить мнение или догадку.",
    explanation:
      "것 같다 используется, когда говорящий предполагает, что что-то, вероятно, верно. Конструкция полезна в рассуждениях и обсуждениях сюжета.",
    examples: [
      { korean: "이 장면이 중요한 것 같아요.", translation: "Кажется, эта сцена важная." },
      { korean: "그 배우가 다시 나올 것 같아요.", translation: "Кажется, этот актер снова появится." }
    ],
    exercise: {
      question: "Как сказать: Кажется, субтитры трудные?",
      answer: "자막이 어려운 것 같아요",
      hint: "Используйте 형용사 + (으)ㄴ 것 같아요."
    }
  }
];

const dramas = [
  {
    title: "Weightlifting Fairy Kim Bok Joo",
    year: "2016",
    level: "beginner",
    description:
      "Теплая дорама с понятной повседневной речью. Хорошо подходит для старта с русскими субтитрами.",
    tags: ["романтика", "спорт", "повседневная речь"],
    link: "https://www.viki.com/tv/32634c-weightlifting-fairy-kim-bok-joo",
    vocabPrompt: "힘내"
  },
  {
    title: "Lovely Runner",
    year: "2024",
    level: "beginner",
    description:
      "Легкая и эмоциональная история с современными выражениями и хорошим темпом для повторения фраз.",
    tags: ["романтика", "современная речь", "молодежный"],
    link: "https://www.viki.com/tv/40466c-lovely-runner",
    vocabPrompt: "괜찮아요"
  },
  {
    title: "Twinkling Watermelon",
    year: "2023",
    level: "intermediate",
    description:
      "Подходит для перехода к более быстрому корейскому и живым школьным диалогам.",
    tags: ["школа", "семья", "эмоции"],
    link: "https://www.viki.com/tv/40131c-twinkling-watermelon",
    vocabPrompt: "약속"
  },
  {
    title: "While You Were Sleeping",
    year: "2017",
    level: "intermediate",
    description:
      "Здесь хороший баланс между разговорной речью и более насыщенными сюжетными сценами.",
    tags: ["драма", "фэнтези", "разговорный корейский"],
    link: "https://www.viki.com/tv/33538c-while-you-were-sleeping",
    vocabPrompt: "꿈"
  },
  {
    title: "Guardian: The Lonely and Great God",
    year: "2016",
    level: "advanced",
    description:
      "Более богатый словарь, образная речь и диалоги, которые хорошо подходят для продвинутого уровня.",
    tags: ["фэнтези", "поэтичная речь", "сложные диалоги"],
    link: "https://www.viki.com/tv/31706c-guardian-the-lonely-and-great-god",
    vocabPrompt: "운명"
  },
  {
    title: "Descendants of the Sun",
    year: "2016",
    level: "advanced",
    description:
      "Хороша для тренировки уверенного восприятия речи без постоянной опоры на перевод.",
    tags: ["драма", "экшен", "взрослый словарь"],
    link: "https://www.viki.com/tv/23205c-descendants-of-the-sun",
    vocabPrompt: "걱정하지 마"
  }
];

const state = {
  selectedLevel: "all",
  selectedLessonId: null,
  currentUser: null
};

const elements = {
  userChip: document.querySelector("#userChip"),
  openAuthButton: document.querySelector("#openAuthButton"),
  logoutButton: document.querySelector("#logoutButton"),
  authModal: document.querySelector("#authModal"),
  closeAuthButton: document.querySelector("#closeAuthButton"),
  closeAuthBackdrop: document.querySelector("#closeAuthBackdrop"),
  authTabs: document.querySelectorAll(".auth-tab"),
  authForms: document.querySelectorAll(".auth-form"),
  authMessage: document.querySelector("#authMessage"),
  loginForm: document.querySelector("#loginForm"),
  registerForm: document.querySelector("#registerForm"),
  streakCount: document.querySelector("#streakCount"),
  completedLessonsCount: document.querySelector("#completedLessonsCount"),
  savedWordsCount: document.querySelector("#savedWordsCount"),
  progressStreak: document.querySelector("#progressStreak"),
  progressLessons: document.querySelector("#progressLessons"),
  progressWords: document.querySelector("#progressWords"),
  dailyGoalTitle: document.querySelector("#dailyGoalTitle"),
  dailyGoalText: document.querySelector("#dailyGoalText"),
  levelFilters: document.querySelector("#levelFilters"),
  lessonList: document.querySelector("#lessonList"),
  lessonCardTemplate: document.querySelector("#lessonCardTemplate"),
  lessonTitle: document.querySelector("#lessonTitle"),
  lessonLevelBadge: document.querySelector("#lessonLevelBadge"),
  lessonSummary: document.querySelector("#lessonSummary"),
  lessonExplanation: document.querySelector("#lessonExplanation"),
  lessonExamples: document.querySelector("#lessonExamples"),
  exerciseBox: document.querySelector("#exerciseBox"),
  completeLessonButton: document.querySelector("#completeLessonButton"),
  dramaGrid: document.querySelector("#dramaGrid"),
  dramaCardTemplate: document.querySelector("#dramaCardTemplate"),
  vocabForm: document.querySelector("#vocabForm"),
  wordInput: document.querySelector("#wordInput"),
  translationInput: document.querySelector("#translationInput"),
  sourceInput: document.querySelector("#sourceInput"),
  vocabList: document.querySelector("#vocabList"),
  vocabItemTemplate: document.querySelector("#vocabItemTemplate")
};

init();

function init() {
  bindAuth();
  bindVocabulary();
  renderLevelFilters();
  hydrateSession();
  renderLessons();
  renderSelectedLesson();
  renderDramas();
  renderVocabulary();
  updateDashboard();
}

function bindAuth() {
  elements.openAuthButton.addEventListener("click", openAuthModal);
  elements.closeAuthButton.addEventListener("click", closeAuthModal);
  elements.closeAuthBackdrop.addEventListener("click", closeAuthModal);
  elements.logoutButton.addEventListener("click", logout);

  elements.authTabs.forEach((tab) => {
    tab.addEventListener("click", () => switchAuthTab(tab.dataset.authTab));
  });

  elements.loginForm.addEventListener("submit", handleLogin);
  elements.registerForm.addEventListener("submit", handleRegister);
}

function bindVocabulary() {
  elements.vocabForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!state.currentUser) {
      openAuthModal();
      setAuthMessage("Сначала войдите в аккаунт, чтобы сохранять слова.");
      return;
    }

    addWord({
      word: elements.wordInput.value.trim(),
      translation: elements.translationInput.value.trim(),
      source: elements.sourceInput.value.trim()
    });

    elements.vocabForm.reset();
  });
}

function renderLevelFilters() {
  const labels = {
    all: "Все",
    beginner: "Начальный",
    intermediate: "Средний",
    advanced: "Продвинутый"
  };

  elements.levelFilters.innerHTML = "";

  LEVELS.forEach((level) => {
    const button = document.createElement("button");
    button.className = `pill ${state.selectedLevel === level ? "is-active" : ""}`;
    button.type = "button";
    button.textContent = labels[level];
    button.addEventListener("click", () => {
      state.selectedLevel = level;
      renderLevelFilters();
      renderLessons();
    });
    elements.levelFilters.appendChild(button);
  });
}

function renderLessons() {
  const visibleLessons = lessons.filter((lesson) => {
    return state.selectedLevel === "all" || lesson.level === state.selectedLevel;
  });

  if (!state.selectedLessonId && visibleLessons.length > 0) {
    state.selectedLessonId = visibleLessons[0].id;
  }

  if (!visibleLessons.some((lesson) => lesson.id === state.selectedLessonId)) {
    state.selectedLessonId = visibleLessons[0] ? visibleLessons[0].id : null;
  }

  elements.lessonList.innerHTML = "";

  visibleLessons.forEach((lesson) => {
    const fragment = elements.lessonCardTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".lesson-card");
    const level = fragment.querySelector(".lesson-card__level");
    const status = fragment.querySelector(".lesson-card__status");
    const title = fragment.querySelector(".lesson-card__title");
    const summary = fragment.querySelector(".lesson-card__summary");

    card.classList.toggle("is-active", lesson.id === state.selectedLessonId);
    level.textContent = formatLevel(lesson.level);
    status.textContent = isLessonCompleted(lesson.id) ? "Пройден" : "Новый";
    title.textContent = lesson.title;
    summary.textContent = lesson.summary;

    card.addEventListener("click", () => {
      state.selectedLessonId = lesson.id;
      renderLessons();
      renderSelectedLesson();
    });

    elements.lessonList.appendChild(fragment);
  });

  renderSelectedLesson();
}

function renderSelectedLesson() {
  const lesson = lessons.find((item) => item.id === state.selectedLessonId);

  if (!lesson) return;

  elements.lessonTitle.textContent = lesson.title;
  elements.lessonLevelBadge.textContent = formatLevel(lesson.level);
  elements.lessonSummary.textContent = lesson.summary;
  elements.lessonExplanation.textContent = lesson.explanation;
  elements.lessonExamples.innerHTML = "";

  lesson.examples.forEach((example) => {
    const item = document.createElement("article");
    item.innerHTML = `<strong>${example.korean}</strong><span>${example.translation}</span>`;
    elements.lessonExamples.appendChild(item);
  });

  renderExercise(lesson);
  elements.completeLessonButton.classList.toggle("is-hidden", !state.currentUser);
  elements.completeLessonButton.onclick = function () {
    completeLesson(lesson.id);
  };
}

function renderExercise(lesson) {
  elements.exerciseBox.innerHTML = `
    <label>
      ${lesson.exercise.question}
      <input type="text" id="exerciseAnswerInput" placeholder="${lesson.exercise.hint}" />
    </label>
    <button class="button button--secondary" type="button" id="checkExerciseButton">
      Проверить ответ
    </button>
    <div class="exercise-result" id="exerciseResult"></div>
  `;

  const input = document.querySelector("#exerciseAnswerInput");
  const button = document.querySelector("#checkExerciseButton");
  const result = document.querySelector("#exerciseResult");

  button.addEventListener("click", () => {
    const value = input.value.trim().toLowerCase();
    const expected = lesson.exercise.answer.trim().toLowerCase();
    const isCorrect = value === expected;

    result.className = `exercise-result ${isCorrect ? "is-correct" : "is-wrong"}`;
    result.textContent = isCorrect
      ? "Правильно! Отличная работа."
      : `Почти. Правильный ответ: ${lesson.exercise.answer}`;
  });
}

function renderDramas() {
  elements.dramaGrid.innerHTML = "";

  dramas.forEach((drama) => {
    const fragment = elements.dramaCardTemplate.content.cloneNode(true);
    const level = fragment.querySelector(".drama-card__level");
    const year = fragment.querySelector(".drama-card__year");
    const title = fragment.querySelector(".drama-card__title");
    const copy = fragment.querySelector(".drama-card__copy");
    const tagRow = fragment.querySelector(".tag-row");
    const link = fragment.querySelector(".drama-link");
    const addWordButton = fragment.querySelector(".drama-word-button");

    level.textContent = formatLevel(drama.level);
    year.textContent = drama.year;
    title.textContent = drama.title;
    copy.textContent = drama.description;
    link.href = drama.link;

    drama.tags.forEach((tag) => {
      const pill = document.createElement("span");
      pill.className = "tag";
      pill.textContent = tag;
      tagRow.appendChild(pill);
    });

    addWordButton.addEventListener("click", () => {
      elements.wordInput.value = drama.vocabPrompt;
      elements.translationInput.value = "";
      elements.sourceInput.value = drama.title;
      elements.wordInput.focus();
      document.querySelector("#vocabulary").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    elements.dramaGrid.appendChild(fragment);
  });
}

function renderVocabulary() {
  elements.vocabList.innerHTML = "";

  if (!state.currentUser) return;

  const words = state.currentUser.words.slice().reverse();

  words.forEach((entry) => {
    const fragment = elements.vocabItemTemplate.content.cloneNode(true);
    const item = fragment.querySelector(".vocab-item");
    const word = fragment.querySelector(".vocab-item__word");
    const translation = fragment.querySelector(".vocab-item__translation");
    const source = fragment.querySelector(".vocab-item__source");
    const toggle = fragment.querySelector(".vocab-toggle");
    const remove = fragment.querySelector(".vocab-delete");

    item.classList.toggle("is-learned", entry.learned);
    word.textContent = entry.word;
    translation.textContent = entry.translation;
    source.textContent = `Источник: ${entry.source}`;
    toggle.textContent = entry.learned ? "Повторить" : "Изучено";

    toggle.addEventListener("click", () => toggleWord(entry.id));
    remove.addEventListener("click", () => removeWord(entry.id));

    elements.vocabList.appendChild(fragment);
  });
}

function handleRegister(event) {
  event.preventDefault();

  const name = document.querySelector("#registerName").value.trim();
  const email = document.querySelector("#registerEmail").value.trim().toLowerCase();
  const password = document.querySelector("#registerPassword").value.trim();
  const users = getUsers();

  if (users.some((user) => user.email === email)) {
    setAuthMessage("Аккаунт с таким email уже существует.");
    return;
  }

  const today = getToday();
  const user = {
    id: createId(),
    name: name,
    email: email,
    password: password,
    streak: 1,
    lastActive: today,
    completedLessons: [],
    words: [],
    createdAt: today
  };

  users.push(user);
  saveUsers(users);
  saveSession(user.id);
  state.currentUser = user;

  elements.registerForm.reset();
  syncDailyActivity();
  closeAuthModal();
  updateDashboard();
  renderLessons();
  renderVocabulary();
}

function handleLogin(event) {
  event.preventDefault();

  const email = document.querySelector("#loginEmail").value.trim().toLowerCase();
  const password = document.querySelector("#loginPassword").value.trim();
  const user = getUsers().find((entry) => entry.email === email && entry.password === password);

  if (!user) {
    setAuthMessage("Неверный email или пароль.");
    return;
  }

  saveSession(user.id);
  state.currentUser = user;
  elements.loginForm.reset();
  syncDailyActivity();
  closeAuthModal();
  updateDashboard();
  renderLessons();
  renderVocabulary();
}

function hydrateSession() {
  const sessionUserId = localStorage.getItem(SESSION_KEY);

  if (!sessionUserId) {
    updateDashboard();
    return;
  }

  const user = getUsers().find((entry) => entry.id === sessionUserId);

  if (!user) {
    localStorage.removeItem(SESSION_KEY);
    updateDashboard();
    return;
  }

  state.currentUser = user;
  syncDailyActivity();
}

function syncDailyActivity() {
  if (!state.currentUser) return;

  const today = getToday();
  const last = state.currentUser.lastActive;

  if (last === today) {
    refreshCurrentUser();
    updateDashboard();
    return;
  }

  const gap = diffInDays(last, today);
  state.currentUser.streak = gap === 1 ? state.currentUser.streak + 1 : 1;
  state.currentUser.lastActive = today;

  persistCurrentUser();
  updateDashboard();
}

function completeLesson(lessonId) {
  if (!state.currentUser) {
    openAuthModal();
    setAuthMessage("Войдите, чтобы сохранять прогресс по урокам.");
    return;
  }

  if (!state.currentUser.completedLessons.includes(lessonId)) {
    state.currentUser.completedLessons.push(lessonId);
    persistCurrentUser();
    renderLessons();
    updateDashboard();
  }
}

function addWord(data) {
  if (!data.word || !data.translation || !data.source) return;

  state.currentUser.words.push({
    id: createId(),
    word: data.word,
    translation: data.translation,
    source: data.source,
    learned: false
  });

  persistCurrentUser();
  renderVocabulary();
  updateDashboard();
}

function toggleWord(wordId) {
  state.currentUser.words = state.currentUser.words.map((entry) => {
    if (entry.id === wordId) {
      return Object.assign({}, entry, { learned: !entry.learned });
    }
    return entry;
  });

  persistCurrentUser();
  renderVocabulary();
}

function removeWord(wordId) {
  state.currentUser.words = state.currentUser.words.filter((entry) => entry.id !== wordId);
  persistCurrentUser();
  renderVocabulary();
  updateDashboard();
}

function updateDashboard() {
  const user = state.currentUser;
  const streak = user ? user.streak : 0;
  const lessonsCount = user ? user.completedLessons.length : 0;
  const wordsCount = user ? user.words.length : 0;

  elements.userChip.textContent = user ? user.name : "Гость";
  elements.openAuthButton.classList.toggle("is-hidden", !!user);
  elements.logoutButton.classList.toggle("is-hidden", !user);

  elements.streakCount.textContent = String(streak);
  elements.completedLessonsCount.textContent = String(lessonsCount);
  elements.savedWordsCount.textContent = String(wordsCount);
  elements.progressStreak.textContent = `${streak} дней`;
  elements.progressLessons.textContent = `${lessonsCount} уроков`;
  elements.progressWords.textContent = `${wordsCount} слов`;

  if (user) {
    elements.dailyGoalTitle.textContent = `Серия активна: ${streak} ${pluralizeDays(streak)}`;
    elements.dailyGoalText.textContent =
      "Откройте урок или сохраните новое слово из дорамы, чтобы поддерживать учебный ритм.";
  } else {
    elements.dailyGoalTitle.textContent = "Войдите, чтобы сохранить streak";
    elements.dailyGoalText.textContent =
      "На GitHub Pages прогресс хранится локально в браузере, без отдельного сервера.";
  }
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
  state.currentUser = null;
  updateDashboard();
  renderLessons();
  renderVocabulary();
}

function switchAuthTab(tabName) {
  elements.authTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.authTab === tabName);
  });

  elements.authForms.forEach((form) => {
    form.classList.toggle("is-active", form.dataset.form === tabName);
  });

  setAuthMessage("Для GitHub Pages данные сохраняются локально в браузере пользователя.");
}

function openAuthModal() {
  elements.authModal.classList.add("is-open");
  elements.authModal.setAttribute("aria-hidden", "false");
}

function closeAuthModal() {
  elements.authModal.classList.remove("is-open");
  elements.authModal.setAttribute("aria-hidden", "true");
  setAuthMessage("Для GitHub Pages данные сохраняются локально в браузере пользователя.");
}

function setAuthMessage(message) {
  elements.authMessage.textContent = message;
}

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function saveSession(userId) {
  localStorage.setItem(SESSION_KEY, userId);
}

function persistCurrentUser() {
  const users = getUsers().map((entry) => {
    return entry.id === state.currentUser.id ? state.currentUser : entry;
  });

  saveUsers(users);
  refreshCurrentUser();
}

function refreshCurrentUser() {
  if (!state.currentUser) return;
  const fresh = getUsers().find((entry) => entry.id === state.currentUser.id);
  if (fresh) {
    state.currentUser = fresh;
  }
}

function isLessonCompleted(lessonId) {
  return state.currentUser ? state.currentUser.completedLessons.includes(lessonId) : false;
}

function formatLevel(level) {
  const map = {
    beginner: "Начальный",
    intermediate: "Средний",
    advanced: "Продвинутый"
  };
  return map[level] || level;
}

function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function diffInDays(from, to) {
  const start = new Date(`${from}T00:00:00`);
  const end = new Date(`${to}T00:00:00`);
  return Math.round((end - start) / 86400000);
}

function pluralizeDays(count) {
  if (count % 10 === 1 && count % 100 !== 11) return "день";
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return "дня";
  return "дней";
}

function createId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
    explanation:
      "Частицы 을/를 ставятся после существительного, которое является объектом действия. Они отвечают на вопрос: что именно мы делаем, читаем, смотрим или изучаем?",
    examples: [
      {
        korean: "저는 한국어를 배워요.",
        translation: "Я изучаю корейский язык.",
      },
      {
        korean: "드라마를 봐요.",
        translation: "Я смотрю дораму.",
      },
    ],
    exercise: {
      question: "Заполните пропуск: 책___ 읽어요.",
      answer: "을",
      hint: "Это объект действия.",
    },
  },
  {
    id: "lesson-intermediate-go-sipda",
    level: "intermediate",
    title: "고 싶다: хотеть что-то сделать",
    summary: "Полезная конструкция для желаний и целей.",
    explanation:
      "Конструкция 고 싶다 присоединяется к основе глагола и показывает желание сделать действие. В вежливой речи часто используется форма 고 싶어요.",
    examples: [
      {
        korean: "한국에 가고 싶어요.",
        translation: "Я хочу поехать в Корею.",
      },
      {
        korean: "더 많이 말하고 싶어요.",
        translation: "Я хочу больше говорить.",
      },
    ],
    exercise: {
      question: "Как сказать: Я хочу смотреть дораму?",
      answer: "드라마를 보고 싶어요",
      hint: "Используйте глагол 보다.",
    },
  },
  {
    id: "lesson-intermediate-eseo",
    level: "intermediate",
    title: "에서: место действия",
    summary: "Где происходит действие и как это обозначить.",
    explanation:
      "Частица 에서 показывает место, где происходит действие: учиться, работать, встречаться, смотреть и так далее.",
    examples: [
      {
        korean: "집에서 공부해요.",
        translation: "Я занимаюсь дома.",
      },
      {
        korean: "카페에서 친구를 만나요.",
        translation: "Я встречаюсь с другом в кафе.",
      },
    ],
    exercise: {
      question: "Заполните пропуск: 학교___ 한국어를 배워요.",
      answer: "에서",
      hint: "Нужно указать место действия.",
    },
  },
  {
    id: "lesson-advanced-neunde",
    level: "advanced",
    title: "는데/은데: контраст и фон",
    summary: "Связка для мягкого противопоставления и контекста.",
    explanation:
      "Конструкции 는데/은데 помогают создать фон для следующей мысли, противопоставить идеи или смягчить высказывание. Очень частотны в живой речи и диалогах из дорам.",
    examples: [
      {
        korean: "바쁜데도 공부했어요.",
        translation: "Хотя я был(а) занят(а), я занимался(ась).",
      },
      {
        korean: "이 드라마는 재미있는데 조금 어려워요.",
        translation: "Эта дорама интересная, но немного сложная.",
      },
    ],
    exercise: {
      question: "Допишите связку: 시간이 없___ 복습은 해야 해요.",
      answer: "는데",
      hint: "Нужно мягко противопоставить две идеи.",
    },
  },
  {
    id: "lesson-advanced-get-gatda",
    level: "advanced",
    title: "것 같다: предположение",
    summary: "Как аккуратно выразить мнение или догадку.",
    explanation:
      "것 같다 используется, когда говорящий предполагает, что что-то, вероятно, верно. Конструкция полезна в рассуждениях и обсуждениях сюжета.",
    examples: [
      {
        korean: "이 장면이 중요한 것 같아요.",
        translation: "Кажется, эта сцена важная.",
      },
      {
        korean: "그 배우가 다시 나올 것 같아요.",
        translation: "Кажется, этот актер снова появится.",
      },
    ],
    exercise: {
      question: "Как сказать: Кажется, субтитры трудные?",
      answer: "자막이 어려운 것 같아요",
      hint: "Используйте 형용사 + (으)ㄴ 것 같아요.",
    },
  },
];

const state = {
  tasks: loadTasks(),
  filter: "all",
  timer: {
    totalSeconds: DEFAULT_FOCUS_MINUTES * 60,
    remainingSeconds: DEFAULT_FOCUS_MINUTES * 60,
    intervalId: null,
    isRunning: false,
const dramas = [
  {
    title: "Weightlifting Fairy Kim Bok Joo",
    year: "2016",
    level: "beginner",
    description:
      "Теплая дорама с понятной повседневной речью. Хорошо подходит для старта с русскими субтитрами.",
    tags: ["романтика", "спорт", "повседневная речь"],
    source: "Viki",
    link: "https://www.viki.com/tv/32634c-weightlifting-fairy-kim-bok-joo",
    vocabPrompt: "힘내",
  },
  {
    title: "Lovely Runner",
    year: "2024",
    level: "beginner",
    description:
      "Легкая и эмоциональная история с современными выражениями и хорошим темпом для повторения фраз.",
    tags: ["романтика", "современная речь", "молодежный"],
    source: "Viki",
    link: "https://www.viki.com/tv/40466c-lovely-runner",
    vocabPrompt: "괜찮아요",
  },
  {
    title: "Twinkling Watermelon",
    year: "2023",
    level: "intermediate",
    description:
      "Подходит для перехода к более быстрому корейскому и живым школьным диалогам.",
    tags: ["школа", "семья", "эмоции"],
    source: "Viki",
    link: "https://www.viki.com/tv/40131c-twinkling-watermelon",
    vocabPrompt: "약속",
  },
  {
    title: "While You Were Sleeping",
    year: "2017",
    level: "intermediate",
    description:
      "Здесь хороший баланс между разговорной речью и более насыщенными сюжетными сценами.",
    tags: ["драма", "фэнтези", "разговорный корейский"],
    source: "Viki",
    link: "https://www.viki.com/tv/33538c-while-you-were-sleeping",
    vocabPrompt: "꿈",
  },
  {
    title: "Guardian: The Lonely and Great God",
    year: "2016",
    level: "advanced",
    description:
      "Более богатый словарь, образная речь и диалоги, которые хорошо подходят для продвинутого уровня.",
    tags: ["фэнтези", "поэтичная речь", "сложные диалоги"],
    source: "Viki",
    link: "https://www.viki.com/tv/31706c-guardian-the-lonely-and-great-god",
    vocabPrompt: "운명",
  },
  {
    title: "Descendants of the Sun",
    year: "2016",
    level: "advanced",
    description:
      "Хороша для тренировки уверенного восприятия речи без постоянной опоры на перевод.",
    tags: ["драма", "экшен", "взрослый словарь"],
    source: "Viki",
    link: "https://www.viki.com/tv/23205c-descendants-of-the-sun",
    vocabPrompt: "걱정하지 마",
  },
];

const state = {
  selectedLevel: "all",
  selectedLessonId: null,
  currentUser: null,
};

const elements = {
  tabs: document.querySelectorAll(".tab-button"),
  panels: document.querySelectorAll(".tab-panel"),
  taskForm: document.querySelector("#taskForm"),
  titleInput: document.querySelector("#taskTitle"),
  descriptionInput: document.querySelector("#taskDescription"),
  difficultyInput: document.querySelector("#taskDifficulty"),
  deadlineInput: document.querySelector("#taskDeadline"),
  todoList: document.querySelector("#todoList"),
  doneList: document.querySelector("#doneList"),
  todoCount: document.querySelector("#todoCount"),
  doneCount: document.querySelector("#doneCount"),
  statTotal: document.querySelector("#statTotal"),
  statDone: document.querySelector("#statDone"),
  statFocus: document.querySelector("#statFocus"),
  completionRate: document.querySelector("#completionRate"),
  hardTasksCount: document.querySelector("#hardTasksCount"),
  taskTemplate: document.querySelector("#taskTemplate"),
  filterButtons: document.querySelectorAll(".pill"),
  timerDisplay: document.querySelector("#timerDisplay"),
  timerLabel: document.querySelector("#timerLabel"),
  timerMinutes: document.querySelector("#timerMinutes"),
  timerProgress: document.querySelector("#timerProgress"),
  startTimer: document.querySelector("#startTimer"),
  pauseTimer: document.querySelector("#pauseTimer"),
  resetTimer: document.querySelector("#resetTimer"),
  presetButtons: document.querySelectorAll(".preset-button"),
  userChip: document.querySelector("#userChip"),
  openAuthButton: document.querySelector("#openAuthButton"),
  logoutButton: document.querySelector("#logoutButton"),
  authModal: document.querySelector("#authModal"),
  closeAuthButton: document.querySelector("#closeAuthButton"),
  closeAuthBackdrop: document.querySelector("#closeAuthBackdrop"),
  authTabs: document.querySelectorAll(".auth-tab"),
  authForms: document.querySelectorAll(".auth-form"),
  authMessage: document.querySelector("#authMessage"),
  loginForm: document.querySelector("#loginForm"),
  registerForm: document.querySelector("#registerForm"),
  streakCount: document.querySelector("#streakCount"),
  completedLessonsCount: document.querySelector("#completedLessonsCount"),
  savedWordsCount: document.querySelector("#savedWordsCount"),
  progressStreak: document.querySelector("#progressStreak"),
  progressLessons: document.querySelector("#progressLessons"),
  progressWords: document.querySelector("#progressWords"),
  dailyGoalTitle: document.querySelector("#dailyGoalTitle"),
  dailyGoalText: document.querySelector("#dailyGoalText"),
  levelFilters: document.querySelector("#levelFilters"),
  lessonList: document.querySelector("#lessonList"),
  lessonCardTemplate: document.querySelector("#lessonCardTemplate"),
  lessonTitle: document.querySelector("#lessonTitle"),
  lessonLevelBadge: document.querySelector("#lessonLevelBadge"),
  lessonSummary: document.querySelector("#lessonSummary"),
  lessonExplanation: document.querySelector("#lessonExplanation"),
  lessonExamples: document.querySelector("#lessonExamples"),
  exerciseBox: document.querySelector("#exerciseBox"),
  completeLessonButton: document.querySelector("#completeLessonButton"),
  dramaGrid: document.querySelector("#dramaGrid"),
  dramaCardTemplate: document.querySelector("#dramaCardTemplate"),
  vocabForm: document.querySelector("#vocabForm"),
  wordInput: document.querySelector("#wordInput"),
  translationInput: document.querySelector("#translationInput"),
  sourceInput: document.querySelector("#sourceInput"),
  vocabList: document.querySelector("#vocabList"),
  vocabItemTemplate: document.querySelector("#vocabItemTemplate"),
};

init();

function init() {
  setupTabs();
  setupTasks();
  setupFilters();
  setupTimer();
  renderTasks();
  updateStats();
  updateTimerUI();
  bindAuth();
  bindVocabulary();
  renderLevelFilters();
  hydrateSession();
  renderLessons();
  renderSelectedLesson();
  renderDramas();
  renderVocabulary();
  updateDashboard();
}

function setupTabs() {
  elements.tabs.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.dataset.tab;
function bindAuth() {
  elements.openAuthButton.addEventListener("click", openAuthModal);
  elements.closeAuthButton.addEventListener("click", closeAuthModal);
  elements.closeAuthBackdrop.addEventListener("click", closeAuthModal);
  elements.logoutButton.addEventListener("click", logout);

      elements.tabs.forEach((tab) => tab.classList.toggle("is-active", tab === button));
      elements.panels.forEach((panel) =>
        panel.classList.toggle("is-active", panel.id === tabId)
      );
    });
  elements.authTabs.forEach((tab) => {
    tab.addEventListener("click", () => switchAuthTab(tab.dataset.authTab));
  });

  elements.loginForm.addEventListener("submit", handleLogin);
  elements.registerForm.addEventListener("submit", handleRegister);
}

function setupTasks() {
  elements.taskForm.addEventListener("submit", (event) => {
function bindVocabulary() {
  elements.vocabForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = elements.titleInput.value.trim();
    const description = elements.descriptionInput.value.trim();
    const difficulty = elements.difficultyInput.value;
    const deadline = elements.deadlineInput.value;

    if (!title) {
    if (!state.currentUser) {
      openAuthModal();
      setAuthMessage("Сначала войдите в аккаунт, чтобы сохранять слова.");
      return;
    }

    state.tasks.unshift({
      id: crypto.randomUUID(),
      title,
      description,
      difficulty,
      deadline,
      done: false,
      createdAt: Date.now(),
    addWord({
      word: elements.wordInput.value.trim(),
      translation: elements.translationInput.value.trim(),
      source: elements.sourceInput.value.trim(),
    });

    persistTasks();
    elements.taskForm.reset();
    elements.difficultyInput.value = "Средняя";
    renderTasks();
    updateStats();
    elements.vocabForm.reset();
  });
}

function setupFilters() {
  elements.filterButtons.forEach((button) => {
function renderLevelFilters() {
  const labels = {
    all: "Все",
    beginner: "Начальный",
    intermediate: "Средний",
    advanced: "Продвинутый",
  };

  elements.levelFilters.innerHTML = "";

  LEVELS.forEach((level) => {
    const button = document.createElement("button");
    button.className = `pill ${state.selectedLevel === level ? "is-active" : ""}`;
    button.type = "button";
    button.textContent = labels[level];
    button.addEventListener("click", () => {
      state.filter = button.dataset.filter;
      elements.filterButtons.forEach((pill) =>
        pill.classList.toggle("is-active", pill === button)
      );
      renderTasks();
      state.selectedLevel = level;
      renderLevelFilters();
      renderLessons();
    });
    elements.levelFilters.appendChild(button);
  });
}

function renderTasks() {
  elements.todoList.innerHTML = "";
  elements.doneList.innerHTML = "";

  const filteredTasks = state.tasks.filter((task) => {
    if (state.filter === "todo") {
      return !task.done;
    }
    if (state.filter === "done") {
      return task.done;
    }
    return true;
function renderLessons() {
  const visibleLessons = lessons.filter((lesson) => {
    return state.selectedLevel === "all" || lesson.level === state.selectedLevel;
  });

  filteredTasks.forEach((task) => {
    const fragment = elements.taskTemplate.content.cloneNode(true);
    const item = fragment.querySelector(".task-item");
    const badge = fragment.querySelector(".difficulty-badge");
    const title = fragment.querySelector(".task-title");
    const description = fragment.querySelector(".task-description");
    const deadline = fragment.querySelector(".deadline-text");
    const toggle = fragment.querySelector(".toggle-status");
    const remove = fragment.querySelector(".delete-button");
  if (!state.selectedLessonId && visibleLessons.length > 0) {
    state.selectedLessonId = visibleLessons[0].id;
  }

  if (!visibleLessons.some((lesson) => lesson.id === state.selectedLessonId)) {
    state.selectedLessonId = visibleLessons[0]?.id ?? null;
  }

    title.textContent = task.title;
    description.textContent = task.description || "Без дополнительного описания.";
    deadline.textContent = task.deadline
      ? `Дедлайн: ${formatDate(task.deadline)}`
      : "Без дедлайна";
  elements.lessonList.innerHTML = "";

    badge.textContent = task.difficulty;
    badge.classList.add(getDifficultyClass(task.difficulty));
  visibleLessons.forEach((lesson) => {
    const fragment = elements.lessonCardTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".lesson-card");
    const level = fragment.querySelector(".lesson-card__level");
    const status = fragment.querySelector(".lesson-card__status");
    const title = fragment.querySelector(".lesson-card__title");
    const summary = fragment.querySelector(".lesson-card__summary");

    toggle.textContent = task.done ? "Вернуть" : "Готово";
    toggle.addEventListener("click", () => toggleTask(task.id));
    remove.addEventListener("click", () => deleteTask(task.id));
    card.classList.toggle("is-active", lesson.id === state.selectedLessonId);
    level.textContent = formatLevel(lesson.level);
    status.textContent = isLessonCompleted(lesson.id) ? "Пройден" : "Новый";
    title.textContent = lesson.title;
    summary.textContent = lesson.summary;

    item.dataset.id = task.id;
    card.addEventListener("click", () => {
      state.selectedLessonId = lesson.id;
      renderLessons();
      renderSelectedLesson();
    });

    if (task.done) {
      elements.doneList.appendChild(fragment);
    } else {
      elements.todoList.appendChild(fragment);
    }
    elements.lessonList.appendChild(fragment);
  });

  const todoTasks = state.tasks.filter((task) => !task.done).length;
  const doneTasks = state.tasks.filter((task) => task.done).length;
  elements.todoCount.textContent = String(todoTasks);
  elements.doneCount.textContent = String(doneTasks);
  renderSelectedLesson();
}

function toggleTask(taskId) {
  state.tasks = state.tasks.map((task) =>
    task.id === taskId ? { ...task, done: !task.done } : task
  );
function renderSelectedLesson() {
  const lesson = lessons.find((item) => item.id === state.selectedLessonId);

  if (!lesson) {
    return;
  }

  elements.lessonTitle.textContent = lesson.title;
  elements.lessonLevelBadge.textContent = formatLevel(lesson.level);
  elements.lessonSummary.textContent = lesson.summary;
  elements.lessonExplanation.textContent = lesson.explanation;
  elements.lessonExamples.innerHTML = "";

  lesson.examples.forEach((example) => {
    const item = document.createElement("article");
    item.innerHTML = `<strong>${example.korean}</strong><span>${example.translation}</span>`;
    elements.lessonExamples.appendChild(item);
  });

  persistTasks();
  renderTasks();
  updateStats();
  renderExercise(lesson);
  elements.completeLessonButton.classList.toggle("is-hidden", !state.currentUser);
  elements.completeLessonButton.onclick = () => completeLesson(lesson.id);
}

function deleteTask(taskId) {
  state.tasks = state.tasks.filter((task) => task.id !== taskId);
  persistTasks();
  renderTasks();
  updateStats();
}
function renderExercise(lesson) {
  elements.exerciseBox.innerHTML = `
    <label>
      ${lesson.exercise.question}
      <input type="text" id="exerciseAnswerInput" placeholder="${lesson.exercise.hint}" />
    </label>
    <button class="button button--secondary" type="button" id="checkExerciseButton">
      Проверить ответ
    </button>
    <div class="exercise-result" id="exerciseResult"></div>
  `;

function updateStats() {
  const total = state.tasks.length;
  const done = state.tasks.filter((task) => task.done).length;
  const hard = state.tasks.filter(
    (task) => !task.done && task.difficulty === "Сложная"
  ).length;
  const completion = total === 0 ? 0 : Math.round((done / total) * 100);
  const input = document.querySelector("#exerciseAnswerInput");
  const button = document.querySelector("#checkExerciseButton");
  const result = document.querySelector("#exerciseResult");

  elements.statTotal.textContent = String(total);
  elements.statDone.textContent = String(done);
  elements.completionRate.textContent = `${completion}%`;
  elements.hardTasksCount.textContent = String(hard);
  button.addEventListener("click", () => {
    const value = input.value.trim().toLowerCase();
    const expected = lesson.exercise.answer.trim().toLowerCase();
    const isCorrect = value === expected;

    result.className = `exercise-result ${isCorrect ? "is-correct" : "is-wrong"}`;
    result.textContent = isCorrect
      ? "Правильно! Отличная работа."
      : `Почти. Правильный ответ: ${lesson.exercise.answer}`;
  });
}

function setupTimer() {
  elements.timerProgress.style.strokeDasharray = `${CIRCLE_LENGTH}`;
function renderDramas() {
  elements.dramaGrid.innerHTML = "";

  elements.startTimer.addEventListener("click", startTimer);
  elements.pauseTimer.addEventListener("click", pauseTimer);
  elements.resetTimer.addEventListener("click", resetTimer);
  dramas.forEach((drama) => {
    const fragment = elements.dramaCardTemplate.content.cloneNode(true);
    const level = fragment.querySelector(".drama-card__level");
    const year = fragment.querySelector(".drama-card__year");
    const title = fragment.querySelector(".drama-card__title");
    const copy = fragment.querySelector(".drama-card__copy");
    const tagRow = fragment.querySelector(".tag-row");
    const link = fragment.querySelector(".drama-link");
    const addWordButton = fragment.querySelector(".drama-word-button");

  elements.timerMinutes.addEventListener("change", () => {
    const minutes = clampMinutes(Number(elements.timerMinutes.value));
    applyMinutes(minutes);
  });
    level.textContent = formatLevel(drama.level);
    year.textContent = drama.year;
    title.textContent = drama.title;
    copy.textContent = drama.description;
    link.href = drama.link;

    drama.tags.forEach((tag) => {
      const pill = document.createElement("span");
      pill.className = "tag";
      pill.textContent = tag;
      tagRow.appendChild(pill);
    });

  elements.presetButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const minutes = clampMinutes(Number(button.dataset.minutes));
      elements.timerMinutes.value = String(minutes);
      applyMinutes(minutes);
    addWordButton.addEventListener("click", () => {
      elements.wordInput.value = drama.vocabPrompt;
      elements.translationInput.value = "";
      elements.sourceInput.value = drama.title;
      elements.wordInput.focus();
      document.querySelector("#vocabulary").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    elements.dramaGrid.appendChild(fragment);
  });
}

function startTimer() {
  if (state.timer.isRunning) {
function renderVocabulary() {
  elements.vocabList.innerHTML = "";

  if (!state.currentUser) {
    return;
  }

  state.timer.isRunning = true;
  elements.timerLabel.textContent = "Идет фокус";
  const words = [...state.currentUser.words].reverse();

  words.forEach((entry) => {
    const fragment = elements.vocabItemTemplate.content.cloneNode(true);
    const item = fragment.querySelector(".vocab-item");
    const word = fragment.querySelector(".vocab-item__word");
    const translation = fragment.querySelector(".vocab-item__translation");
    const source = fragment.querySelector(".vocab-item__source");
    const toggle = fragment.querySelector(".vocab-toggle");
    const remove = fragment.querySelector(".vocab-delete");

    item.classList.toggle("is-learned", entry.learned);
    word.textContent = entry.word;
    translation.textContent = entry.translation;
    source.textContent = `Источник: ${entry.source}`;
    toggle.textContent = entry.learned ? "Повторить" : "Изучено";

  state.timer.intervalId = window.setInterval(() => {
    if (state.timer.remainingSeconds > 0) {
      state.timer.remainingSeconds -= 1;
      updateTimerUI();
      return;
    }
    toggle.addEventListener("click", () => toggleWord(entry.id));
    remove.addEventListener("click", () => removeWord(entry.id));

    pauseTimer();
    elements.timerLabel.textContent = "Завершено";
    elements.statFocus.textContent = String(
      Math.round(state.timer.totalSeconds / 60)
    );
  }, 1000);
    elements.vocabList.appendChild(fragment);
  });
}

function pauseTimer() {
  if (state.timer.intervalId) {
    window.clearInterval(state.timer.intervalId);
    state.timer.intervalId = null;
function handleRegister(event) {
  event.preventDefault();

  const name = document.querySelector("#registerName").value.trim();
  const email = document.querySelector("#registerEmail").value.trim().toLowerCase();
  const password = document.querySelector("#registerPassword").value.trim();
  const users = getUsers();

  if (users.some((user) => user.email === email)) {
    setAuthMessage("Аккаунт с таким email уже существует.");
    return;
  }

  state.timer.isRunning = false;
  const today = getToday();
  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
    streak: 1,
    lastActive: today,
    completedLessons: [],
    words: [],
    createdAt: today,
  };

  users.push(user);
  saveUsers(users);
  saveSession(user.id);
  state.currentUser = user;

  if (state.timer.remainingSeconds > 0) {
    elements.timerLabel.textContent = "Пауза";
  elements.registerForm.reset();
  syncDailyActivity();
  closeAuthModal();
  updateDashboard();
  renderLessons();
  renderVocabulary();
}

function handleLogin(event) {
  event.preventDefault();

  const email = document.querySelector("#loginEmail").value.trim().toLowerCase();
  const password = document.querySelector("#loginPassword").value.trim();
  const user = getUsers().find((entry) => entry.email === email && entry.password === password);

  if (!user) {
    setAuthMessage("Неверный email или пароль.");
    return;
  }

  saveSession(user.id);
  state.currentUser = user;
  elements.loginForm.reset();
  syncDailyActivity();
  closeAuthModal();
  updateDashboard();
  renderLessons();
  renderVocabulary();
}

function resetTimer() {
  pauseTimer();
  const minutes = clampMinutes(Number(elements.timerMinutes.value));
  applyMinutes(minutes);
  elements.timerLabel.textContent = "Готов";
function hydrateSession() {
  const sessionUserId = localStorage.getItem(SESSION_KEY);
  if (!sessionUserId) {
    updateDashboard();
    return;
  }

  const user = getUsers().find((entry) => entry.id === sessionUserId);
  if (!user) {
    localStorage.removeItem(SESSION_KEY);
    updateDashboard();
    return;
  }

  state.currentUser = user;
  syncDailyActivity();
}

function applyMinutes(minutes) {
  pauseTimer();
  state.timer.totalSeconds = minutes * 60;
  state.timer.remainingSeconds = minutes * 60;
  updateTimerUI();
  elements.statFocus.textContent = String(minutes);
function syncDailyActivity() {
  if (!state.currentUser) {
    return;
  }

  const today = getToday();
  const last = state.currentUser.lastActive;

  if (last === today) {
    refreshCurrentUser();
    updateDashboard();
    return;
  }

  const gap = diffInDays(last, today);
  state.currentUser.streak = gap === 1 ? state.currentUser.streak + 1 : 1;
  state.currentUser.lastActive = today;

  persistCurrentUser();
  updateDashboard();
}

function updateTimerUI() {
  elements.timerDisplay.textContent = formatTime(state.timer.remainingSeconds);
function completeLesson(lessonId) {
  if (!state.currentUser) {
    openAuthModal();
    setAuthMessage("Войдите, чтобы сохранять прогресс по урокам.");
    return;
  }

  const progress =
    state.timer.totalSeconds === 0
      ? 0
      : state.timer.remainingSeconds / state.timer.totalSeconds;
  const dashOffset = CIRCLE_LENGTH * (1 - progress);
  elements.timerProgress.style.strokeDashoffset = `${dashOffset}`;
  if (!state.currentUser.completedLessons.includes(lessonId)) {
    state.currentUser.completedLessons.push(lessonId);
    persistCurrentUser();
    renderLessons();
    updateDashboard();
  }
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : seedTasks();
  } catch (error) {
    return seedTasks();
function addWord({ word, translation, source }) {
  if (!word || !translation || !source) {
    return;
  }

  state.currentUser.words.push({
    id: crypto.randomUUID(),
    word,
    translation,
    source,
    learned: false,
  });

  persistCurrentUser();
  renderVocabulary();
  updateDashboard();
}

function persistTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
function toggleWord(wordId) {
  state.currentUser.words = state.currentUser.words.map((entry) =>
    entry.id === wordId ? { ...entry, learned: !entry.learned } : entry
  );

  persistCurrentUser();
  renderVocabulary();
}

function seedTasks() {
  return [
    {
      id: crypto.randomUUID(),
      title: "Собрать структуру сайта",
      description: "Продумать блоки, вкладки и общий сценарий проекта.",
      difficulty: "Средняя",
      deadline: "",
      done: false,
      createdAt: Date.now(),
    },
    {
      id: crypto.randomUUID(),
      title: "Подготовить описание для колледжа",
      description: "Коротко объяснить идею проекта и зачем он полезен.",
      difficulty: "Легкая",
      deadline: "",
      done: true,
      createdAt: Date.now() - 5000,
    },
  ];
function removeWord(wordId) {
  state.currentUser.words = state.currentUser.words.filter((entry) => entry.id !== wordId);
  persistCurrentUser();
  renderVocabulary();
  updateDashboard();
}

function clampMinutes(value) {
  if (!Number.isFinite(value)) {
    return DEFAULT_FOCUS_MINUTES;
function updateDashboard() {
  const user = state.currentUser;

  elements.userChip.textContent = user ? user.name : "Гость";
  elements.openAuthButton.classList.toggle("is-hidden", Boolean(user));
  elements.logoutButton.classList.toggle("is-hidden", !user);

  const streak = user?.streak ?? 0;
  const lessonsCount = user?.completedLessons.length ?? 0;
  const wordsCount = user?.words.length ?? 0;

  elements.streakCount.textContent = String(streak);
  elements.completedLessonsCount.textContent = String(lessonsCount);
  elements.savedWordsCount.textContent = String(wordsCount);
  elements.progressStreak.textContent = `${streak} дней`;
  elements.progressLessons.textContent = `${lessonsCount} уроков`;
  elements.progressWords.textContent = `${wordsCount} слов`;

  if (user) {
    elements.dailyGoalTitle.textContent = `Серия активна: ${streak} ${pluralizeDays(streak)}`;
    elements.dailyGoalText.textContent =
      "Откройте урок или сохраните новое слово из дорамы, чтобы поддерживать учебный ритм.";
  } else {
    elements.dailyGoalTitle.textContent = "Войдите, чтобы сохранить streak";
    elements.dailyGoalText.textContent =
      "На GitHub Pages прогресс хранится локально в браузере, без отдельного сервера.";
  }
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
  state.currentUser = null;
  updateDashboard();
  renderLessons();
  renderVocabulary();
}

function switchAuthTab(tabName) {
  elements.authTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.authTab === tabName);
  });

  elements.authForms.forEach((form) => {
    form.classList.toggle("is-active", form.dataset.form === tabName);
  });

  setAuthMessage("Для GitHub Pages данные сохраняются локально в браузере пользователя.");
}

function openAuthModal() {
  elements.authModal.classList.add("is-open");
  elements.authModal.setAttribute("aria-hidden", "false");
}

function closeAuthModal() {
  elements.authModal.classList.remove("is-open");
  elements.authModal.setAttribute("aria-hidden", "true");
  setAuthMessage("Для GitHub Pages данные сохраняются локально в браузере пользователя.");
}

function setAuthMessage(message) {
  elements.authMessage.textContent = message;
}

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function saveSession(userId) {
  localStorage.setItem(SESSION_KEY, userId);
}

function persistCurrentUser() {
  const users = getUsers().map((entry) => {
    return entry.id === state.currentUser.id ? state.currentUser : entry;
  });

  saveUsers(users);
  refreshCurrentUser();
}

function refreshCurrentUser() {
  const fresh = getUsers().find((entry) => entry.id === state.currentUser.id);
  if (fresh) {
    state.currentUser = fresh;
  }
}

  return Math.min(180, Math.max(1, Math.round(value)));
function isLessonCompleted(lessonId) {
  return state.currentUser?.completedLessons.includes(lessonId) ?? false;
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
function formatLevel(level) {
  const map = {
    beginner: "Начальный",
    intermediate: "Средний",
    advanced: "Продвинутый",
  };

  return map[level] ?? level;
}

function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(dateValue) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateValue));
function diffInDays(from, to) {
  const start = new Date(`${from}T00:00:00`);
  const end = new Date(`${to}T00:00:00`);
  return Math.round((end - start) / 86400000);
}

function getDifficultyClass(difficulty) {
  if (difficulty === "Легкая") {
    return "difficulty-easy";
function pluralizeDays(count) {
  if (count % 10 === 1 && count % 100 !== 11) {
    return "день";
  }
  if (difficulty === "Сложная") {
    return "difficulty-hard";
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return "дня";
  }
  return "difficulty-medium";
  return "дней";
}
