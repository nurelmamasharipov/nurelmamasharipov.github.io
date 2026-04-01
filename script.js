const STORAGE_KEY = "focusflow_tasks";
const EVENTS_STORAGE_KEY = "focusflow_events";
const DEFAULT_FOCUS_MINUTES = 25;
const CIRCLE_LENGTH = 2 * Math.PI * 90;

const state = {
  tasks: loadTasks(),
  events: loadEvents(),
  filter: "all",
  calendar: getInitialCalendarState(),
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
  eventsCount: document.querySelector("#eventsCount"),
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
  calendarGrid: document.querySelector("#calendarGrid"),
  calendarMonthLabel: document.querySelector("#calendarMonthLabel"),
  prevMonth: document.querySelector("#prevMonth"),
  nextMonth: document.querySelector("#nextMonth"),
  eventForm: document.querySelector("#eventForm"),
  eventDate: document.querySelector("#eventDate"),
  eventTitle: document.querySelector("#eventTitle"),
  eventNote: document.querySelector("#eventNote"),
  selectedDateLabel: document.querySelector("#selectedDateLabel"),
  selectedDayList: document.querySelector("#selectedDayList"),
  upcomingEvents: document.querySelector("#upcomingEvents"),
};

init();

function init() {
  setupTabs();
  setupTasks();
  setupFilters();
  setupTimer();
  setupCalendar();
  renderTasks();
  updateStats();
  updateTimerUI();
  renderCalendar();
  renderSelectedDayDetails();
  renderUpcomingEvents();
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
    renderCalendar();
    renderSelectedDayDetails();
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

    if (task.done) {
      elements.doneList.appendChild(fragment);
    } else {
      elements.todoList.appendChild(fragment);
    }
  });

  elements.todoCount.textContent = String(state.tasks.filter((task) => !task.done).length);
  elements.doneCount.textContent = String(state.tasks.filter((task) => task.done).length);
}

function toggleTask(taskId) {
  state.tasks = state.tasks.map((task) =>
    task.id === taskId ? { ...task, done: !task.done } : task
  );
  persistTasks();
  renderTasks();
  updateStats();
  renderCalendar();
  renderSelectedDayDetails();
}

function deleteTask(taskId) {
  state.tasks = state.tasks.filter((task) => task.id !== taskId);
  persistTasks();
  renderTasks();
  updateStats();
  renderCalendar();
  renderSelectedDayDetails();
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
  elements.eventsCount.textContent = String(state.events.length);
}

function setupTimer() {
  elements.timerProgress.style.strokeDasharray = `${CIRCLE_LENGTH}`;

  elements.startTimer.addEventListener("click", startTimer);
  elements.pauseTimer.addEventListener("click", pauseTimer);
  elements.resetTimer.addEventListener("click", resetTimer);

  elements.timerMinutes.addEventListener("change", () => {
    const minutes = clampMinutes(Number(elements.timerMinutes.value));
    elements.timerMinutes.value = String(minutes);
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
  elements.statFocus.textContent = String(minutes);
  updateTimerUI();
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

function setupCalendar() {
  elements.prevMonth.addEventListener("click", () => {
    state.calendar.viewMonth -= 1;
    normalizeCalendarMonth();
    renderCalendar();
  });

  elements.nextMonth.addEventListener("click", () => {
    state.calendar.viewMonth += 1;
    normalizeCalendarMonth();
    renderCalendar();
  });

  elements.eventForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const date = elements.eventDate.value;
    const title = elements.eventTitle.value.trim();
    const note = elements.eventNote.value.trim();

    if (!date || !title) {
      return;
    }

    state.events.unshift({
      id: crypto.randomUUID(),
      date,
      title,
      note,
      createdAt: Date.now(),
    });

    persistEvents();
    state.calendar.selectedDate = date;
    elements.eventForm.reset();
    renderCalendar();
    renderSelectedDayDetails();
    renderUpcomingEvents();
    updateStats();
  });
}

function renderCalendar() {
  const year = state.calendar.viewYear;
  const month = state.calendar.viewMonth;
  const firstDay = new Date(year, month, 1);
  const startWeekday = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const totalCells = 42;

  elements.calendarMonthLabel.textContent = new Intl.DateTimeFormat("ru-RU", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month, 1));

  elements.calendarGrid.innerHTML = "";

  for (let index = 0; index < totalCells; index += 1) {
    let dayNumber;
    let cellMonth = month;
    let cellYear = year;
    let isMuted = false;

    if (index < startWeekday) {
      dayNumber = prevMonthDays - startWeekday + index + 1;
      cellMonth = month - 1;
      isMuted = true;
    } else if (index >= startWeekday + daysInMonth) {
      dayNumber = index - startWeekday - daysInMonth + 1;
      cellMonth = month + 1;
      isMuted = true;
    } else {
      dayNumber = index - startWeekday + 1;
    }

    const cellDate = new Date(cellYear, cellMonth, dayNumber);
    const isoDate = toISODate(cellDate);
    const dayButton = document.createElement("button");
    const markers = document.createElement("div");
    const number = document.createElement("div");
    const noteCount = document.createElement("div");

    dayButton.type = "button";
    dayButton.className = "calendar-day";

    if (isMuted) {
      dayButton.classList.add("is-muted");
    }
    if (isoDate === toISODate(new Date())) {
      dayButton.classList.add("is-today");
    }
    if (isoDate === state.calendar.selectedDate) {
      dayButton.classList.add("is-selected");
    }

    const eventsForDay = getEventsByDate(isoDate);
    const tasksForDay = getTasksByDate(isoDate);

    number.className = "calendar-day__num";
    number.textContent = String(dayNumber);

    markers.className = "calendar-markers";
    if (eventsForDay.length > 0) {
      markers.appendChild(createMarker("calendar-marker calendar-marker--event"));
    }
    if (tasksForDay.length > 0) {
      markers.appendChild(createMarker("calendar-marker calendar-marker--task"));
    }

    noteCount.className = "calendar-note-count";
    noteCount.textContent =
      eventsForDay.length + tasksForDay.length > 0
        ? `${eventsForDay.length + tasksForDay.length} запис.`
        : " ";

    dayButton.append(number, markers, noteCount);
    dayButton.addEventListener("click", () => {
      state.calendar.selectedDate = isoDate;
      renderCalendar();
      renderSelectedDayDetails();
    });

    elements.calendarGrid.appendChild(dayButton);
  }
}

function renderSelectedDayDetails() {
  const selectedDate = state.calendar.selectedDate;
  const eventsForDay = getEventsByDate(selectedDate);
  const tasksForDay = getTasksByDate(selectedDate);
  const readableDate = new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(selectedDate));

  elements.selectedDateLabel.textContent = readableDate;
  elements.selectedDayList.innerHTML = "";

  if (eventsForDay.length === 0 && tasksForDay.length === 0) {
    elements.selectedDayList.innerHTML =
      '<div class="empty-state">На этот день пока ничего не запланировано.</div>';
    return;
  }

  eventsForDay
    .sort((a, b) => a.date.localeCompare(b.date))
    .forEach((entry) => {
      elements.selectedDayList.appendChild(
        createEventCard(entry.title, entry.note || "Личное событие", "Событие")
      );
    });

  tasksForDay.forEach((task) => {
    elements.selectedDayList.appendChild(
      createEventCard(task.title, task.description || "Задача с дедлайном", "Дедлайн")
    );
  });
}

function renderUpcomingEvents() {
  const todayIso = toISODate(new Date());
  const upcoming = [...state.events]
    .filter((event) => event.date >= todayIso)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4);

  elements.upcomingEvents.innerHTML = "";

  if (upcoming.length === 0) {
    elements.upcomingEvents.innerHTML =
      '<div class="empty-state">Пока нет будущих событий. Добавь первую важную дату.</div>';
    return;
  }

  upcoming.forEach((event) => {
    elements.upcomingEvents.appendChild(
      createEventCard(
        event.title,
        event.note || "Запланированное событие",
        formatShortDate(event.date)
      )
    );
  });
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : seedTasks();
  } catch {
    return seedTasks();
  }
}

function persistTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
}

function loadEvents() {
  try {
    const raw = localStorage.getItem(EVENTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : seedEvents();
  } catch {
    return seedEvents();
  }
}

function persistEvents() {
  localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(state.events));
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

function seedEvents() {
  const today = new Date();
  const firstEvent = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
  const secondEvent = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5);

  return [
    {
      id: crypto.randomUUID(),
      date: toISODate(firstEvent),
      title: "Проверить макет сайта",
      note: "Посмотреть, как сайт выглядит на телефоне и ноутбуке.",
      createdAt: Date.now(),
    },
    {
      id: crypto.randomUUID(),
      date: toISODate(secondEvent),
      title: "Подготовить рассказ о проекте",
      note: "Кратко объяснить идею, функции и пользу сайта.",
      createdAt: Date.now() - 1000,
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

function getInitialCalendarState() {
  const now = new Date();
  return {
    viewMonth: now.getMonth(),
    viewYear: now.getFullYear(),
    selectedDate: toISODate(now),
  };
}

function normalizeCalendarMonth() {
  if (state.calendar.viewMonth < 0) {
    state.calendar.viewMonth = 11;
    state.calendar.viewYear -= 1;
  }
  if (state.calendar.viewMonth > 11) {
    state.calendar.viewMonth = 0;
    state.calendar.viewYear += 1;
  }
}

function getEventsByDate(date) {
  return state.events.filter((event) => event.date === date);
}

function getTasksByDate(date) {
  return state.tasks.filter((task) => task.deadline === date);
}

function createMarker(className) {
  const marker = document.createElement("span");
  marker.className = className;
  return marker;
}

function createEventCard(title, text, chipText) {
  const item = document.createElement("article");
  const top = document.createElement("div");
  const heading = document.createElement("h4");
  const chip = document.createElement("span");
  const body = document.createElement("p");

  item.className = "event-item";
  top.className = "event-item__top";
  chip.className = "event-date-chip";

  heading.textContent = title;
  chip.textContent = chipText;
  body.textContent = text;

  top.append(heading, chip);
  item.append(top, body);
  return item;
}

function formatShortDate(dateValue) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
  }).format(new Date(dateValue));
}

function toISODate(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}
