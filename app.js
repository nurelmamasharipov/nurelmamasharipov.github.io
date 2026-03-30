// Загружаем напоминания из памяти браузера
let reminders = JSON.parse(
  localStorage.getItem('reminders') || '[]'
);

function addReminder() {
  const text = document.getElementById('taskInput').value;
  const time = document.getElementById('timeInput').value;
  if (!text.trim()) return;

  const item = { id: Date.now(), text, time, done: false };
  reminders.push(item);
  save();
  render();

  // Очищаем поля
  document.getElementById('taskInput').value = '';
  document.getElementById('timeInput').value = '';
}

function save() {
  localStorage.setItem('reminders', JSON.stringify(reminders));
}

function render() {
  const list = document.getElementById('reminderList');
  list.innerHTML = reminders.map(r => `
    <li class="reminder-item">
      <span class="${r.done ? 'done' : ''}"
            onclick="toggleDone(${r.id})">
        ${r.text}
        ${r.time ? '<br><small>' + formatTime(r.time) + '</small>' : ''}
      </span>
      <button class="delete-btn"
              onclick="deleteItem(${r.id})">✕</button>
    </li>
  `).join('');
}

function toggleDone(id) {
  reminders = reminders.map(r =>
    r.id === id ? { ...r, done: !r.done } : r
  );
  save(); render();
}

function deleteItem(id) {
  reminders = reminders.filter(r => r.id !== id);
  save(); render();
}

function formatTime(t) {
  return new Date(t).toLocaleString('ru');
}

// Проверка времени каждую минуту
setInterval(() => {
  const now = new Date();
  reminders.forEach(r => {
    if (r.time && !r.done) {
      const diff = new Date(r.time) - now;
      if (diff > 0 && diff < 60000) {
        alert(`Напоминание: ${r.text}`);
      }
    }
  });
}, 60000);

render(); // Отображаем при загрузке
