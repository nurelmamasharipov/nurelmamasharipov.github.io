// --- STATE MANAGEMENT (localStorage) ---
const Storage = {
    getTasks: () => JSON.parse(localStorage.getItem('tasks')) || [],
    saveTasks: (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks)),
};

// Initial dummy data if empty
if (Storage.getTasks().length === 0) {
    Storage.saveTasks([
        { id: '1', title: 'Design Database Schema', status: 'todo', priority: 'High' },
        { id: '2', title: 'Setup GitHub Pages', status: 'progress', priority: 'Urgent' },
        { id: '3', title: 'Create Wireframes', status: 'done', priority: 'Medium' }
    ]);
}

// --- KANBAN LOGIC ---
const Kanban = {
    init() {
        this.render();
        this.setupDragAndDrop();
        
        document.getElementById('addTaskBtn').addEventListener('click', () => {
            const title = prompt('Enter task title:');
            if (title) this.addTask(title);
        });
    },

    getPriorityColor(priority) {
        const colors = { 'Low': '#4caf50', 'Medium': '#ff9800', 'High': '#f44336', 'Urgent': '#d50000' };
        return colors[priority] || colors['Low'];
    },

    render() {
        const tasks = Storage.getTasks();
        document.querySelectorAll('.task-list').forEach(list => list.innerHTML = '');

        tasks.forEach(task => {
            const el = document.createElement('div');
            el.className = 'task-card';
            el.draggable = true;
            el.dataset.id = task.id;
            el.innerHTML = `
                <div class="task-title">${task.title}</div>
                <div class="task-meta">
                    <span class="priority-indicator" style="background: ${this.getPriorityColor(task.priority)}20; color: ${this.getPriorityColor(task.priority)}">
                        ${task.priority}
                    </span>
                </div>
            `;
            document.getElementById(`${task.status}-list`).appendChild(el);
        });
    },

    addTask(title) {
        const tasks = Storage.getTasks();
        tasks.push({
            id: Date.now().toString(),
            title,
            status: 'todo',
            priority: 'Medium' // Default
        });
        Storage.saveTasks(tasks);
        this.render();
    },

    setupDragAndDrop() {
        const board = document.querySelector('.kanban-board');
        let draggedItem = null;

        board.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('task-card')) {
                draggedItem = e.target;
                setTimeout(() => e.target.style.opacity = '0.5', 0);
            }
        });

        board.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('task-card')) {
                setTimeout(() => {
                    e.target.style.opacity = '1';
                    draggedItem = null;
                }, 0);
            }
        });

        board.addEventListener('dragover', (e) => e.preventDefault());

        board.addEventListener('drop', (e) => {
            e.preventDefault();
            const column = e.target.closest('.column');
            if (column && draggedItem) {
                const list = column.querySelector('.task-list');
                list.appendChild(draggedItem);
                
                // Update LocalStorage
                const taskId = draggedItem.dataset.id;
                const newStatus = column.dataset.status;
                const tasks = Storage.getTasks();
                const task = tasks.find(t => t.id === taskId);
                if (task) {
                    task.status = newStatus;
                    Storage.saveTasks(tasks);
                }
            }
        });
    }
};

// --- POMODORO LOGIC ---
const Pomodoro = {
    timeLeft: 25 * 60,
    timerId: null,
    
    init() {
        this.display = document.getElementById('timer');
        document.getElementById('startTimer').addEventListener('click', () => this.start());
        document.getElementById('pauseTimer').addEventListener('click', () => this.pause());
        document.getElementById('resetTimer').addEventListener('click', () => this.reset());
        this.updateDisplay();
    },

    start() {
        if (this.timerId) return;
        this.timerId = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            if (this.timeLeft <= 0) {
                this.pause();
                this.playSound();
                alert('Focus session complete!');
            }
        }, 1000);
    },

    pause() {
        clearInterval(this.timerId);
        this.timerId = null;
    },

    reset() {
        this.pause();
        this.timeLeft = 25 * 60; // 25 minutes
        this.updateDisplay();
    },

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60).toString().padStart(2, '0');
        const seconds = (this.timeLeft % 60).toString().padStart(2, '0');
        this.display.textContent = `${minutes}:${seconds}`;
    },

    playSound() {
        // Simple beep using Web Audio API so no external files are needed
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    }
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    Kanban.init();
    Pomodoro.init();
});

// --- NAVIGATION LOGIC ---
const Navigation = {
    init() {
        this.links = document.querySelectorAll('.sidebar nav a');
        this.sections = document.querySelectorAll('main > section'); // Все секции контента

        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-target');
                this.switchTab(link, targetId);
            });
        });
    },

    switchTab(activeLink, targetId) {
        // Убираем активный класс у всех ссылок
        this.links.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');

        // Скрываем все секции и показываем нужную
        this.sections.forEach(section => {
            section.style.display = 'none';
        });
        
        const activeSection = document.getElementById(targetId);
        if (activeSection) {
            // Добавляем плавное появление
            activeSection.style.display = 'block';
            activeSection.style.animation = 'fadeIn 0.3s ease-in-out';
        }
    }
};

// Добавь это в инициализацию в самом низу файла:
document.addEventListener('DOMContentLoaded', () => {
    // Kanban.init();
    // Pomodoro.init();
    Navigation.init(); 
});
