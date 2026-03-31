const STORAGE_KEY = "focusflow_tasks";
const DEFAULT_FOCUS_MINUTES = 25;
const CIRCLE_LENGTH = 2 * Math.PI * 90;

const state = {
  tasks: loadTasks(),
  filter: "all",
  timer: {
    totalSeconds: DEFAULT_FOCUS_MINUTES * 60,
    remainingSeconds: DEFAULT_FOCUS_MINUTES * 60,
    intervalId: null,
    isRunning: false,
  },
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
}

function setupTabs() {
  elements.tabs.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.dataset.tab;

      elements.tabs.forEach((tab) => tab.classList.toggle("is-active", tab === button));
      elements.panels.forEach((panel) =>
        panel.classList.toggle("is-active", panel.id === tabId)
      );
    });
  });
}

function setupTasks() {
  elements.taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = elements.titleInput.value.trim();
    const description = elements.descriptionInput.value.trim();
    const difficulty = elements.difficultyInput.value;
    const deadline = elements.deadlineInput.value;

    if (!title) {
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
    });

    persistTasks();
    elements.taskForm.reset();
    elements.difficultyInput.value = "Средняя";
    renderTasks();
    updateStats();
  });
}

function setupFilters() {
  elements.filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.filter = button.dataset.filter;
      elements.filterButtons.forEach((pill) =>
        pill.classList.toggle("is-active", pill === button)
      );
      renderTasks();
    });
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

    title.textContent = task.title;
    description.textContent = task.description || "Без дополнительного описания.";
    deadline.textContent = task.deadline
      ? `Дедлайн: ${formatDate(task.deadline)}`
      : "Без дедлайна";

    badge.textContent = task.difficulty;
    badge.classList.add(getDifficultyClass(task.difficulty));

    toggle.textContent = task.done ? "Вернуть" : "Готово";
    toggle.addEventListener("click", () => toggleTask(task.id));
    remove.addEventListener("click", () => deleteTask(task.id));

    item.dataset.id = task.id;

    if (task.done) {
      elements.doneList.appendChild(fragment);
    } else {
      elements.todoList.appendChild(fragment);
    }
  });

  const todoTasks = state.tasks.filter((task) => !task.done).length;
  const doneTasks = state.tasks.filter((task) => task.done).length;
  elements.todoCount.textContent = String(todoTasks);
  elements.doneCount.textContent = String(doneTasks);
}

function toggleTask(taskId) {
  state.tasks = state.tasks.map((task) =>
    task.id === taskId ? { ...task, done: !task.done } : task
  );

  persistTasks();
  renderTasks();
  updateStats();
}

function deleteTask(taskId) {
  state.tasks = state.tasks.filter((task) => task.id !== taskId);
  persistTasks();
  renderTasks();
  updateStats();
}

function updateStats() {
  const total = state.tasks.length;
  const done = state.tasks.filter((task) => task.done).length;
  const hard = state.tasks.filter(
    (task) => !task.done && task.difficulty === "Сложная"
  ).length;
  const completion = total === 0 ? 0 : Math.round((done / total) * 100);

  elements.statTotal.textContent = String(total);
  elements.statDone.textContent = String(done);
  elements.completionRate.textContent = `${completion}%`;
  elements.hardTasksCount.textContent = String(hard);
}

function setupTimer() {
  elements.timerProgress.style.strokeDasharray = `${CIRCLE_LENGTH}`;

  elements.startTimer.addEventListener("click", startTimer);
  elements.pauseTimer.addEventListener("click", pauseTimer);
  elements.resetTimer.addEventListener("click", resetTimer);

  elements.timerMinutes.addEventListener("change", () => {
    const minutes = clampMinutes(Number(elements.timerMinutes.value));
    applyMinutes(minutes);
  });

  elements.presetButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const minutes = clampMinutes(Number(button.dataset.minutes));
      elements.timerMinutes.value = String(minutes);
      applyMinutes(minutes);
    });
  });
}

function startTimer() {
  if (state.timer.isRunning) {
    return;
  }

  state.timer.isRunning = true;
  elements.timerLabel.textContent = "Идет фокус";

  state.timer.intervalId = window.setInterval(() => {
    if (state.timer.remainingSeconds > 0) {
      state.timer.remainingSeconds -= 1;
      updateTimerUI();
      return;
    }

    pauseTimer();
    elements.timerLabel.textContent = "Завершено";
    elements.statFocus.textContent = String(
      Math.round(state.timer.totalSeconds / 60)
    );
  }, 1000);
}

function pauseTimer() {
  if (state.timer.intervalId) {
    window.clearInterval(state.timer.intervalId);
    state.timer.intervalId = null;
  }

  state.timer.isRunning = false;

  if (state.timer.remainingSeconds > 0) {
    elements.timerLabel.textContent = "Пауза";
  }
}

function resetTimer() {
  pauseTimer();
  const minutes = clampMinutes(Number(elements.timerMinutes.value));
  applyMinutes(minutes);
  elements.timerLabel.textContent = "Готов";
}

function applyMinutes(minutes) {
  pauseTimer();
  state.timer.totalSeconds = minutes * 60;
  state.timer.remainingSeconds = minutes * 60;
  updateTimerUI();
  elements.statFocus.textContent = String(minutes);
}

function updateTimerUI() {
  elements.timerDisplay.textContent = formatTime(state.timer.remainingSeconds);

  const progress =
    state.timer.totalSeconds === 0
      ? 0
      : state.timer.remainingSeconds / state.timer.totalSeconds;
  const dashOffset = CIRCLE_LENGTH * (1 - progress);
  elements.timerProgress.style.strokeDashoffset = `${dashOffset}`;
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : seedTasks();
  } catch (error) {
    return seedTasks();
  }
}

function persistTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
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
}

function clampMinutes(value) {
  if (!Number.isFinite(value)) {
    return DEFAULT_FOCUS_MINUTES;
  }

  return Math.min(180, Math.max(1, Math.round(value)));
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function formatDate(dateValue) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateValue));
}

function getDifficultyClass(difficulty) {
  if (difficulty === "Легкая") {
    return "difficulty-easy";
  }
  if (difficulty === "Сложная") {
    return "difficulty-hard";
  }
  return "difficulty-medium";
}
