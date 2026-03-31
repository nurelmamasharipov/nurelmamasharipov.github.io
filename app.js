// --- STATE MANAGEMENT (localStorage) ---
const Storage = {
    getTasks: () => JSON.parse(localStorage.getItem('tasks')) || [],
    saveTasks: (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks)),
};

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
            Modal.open();
        });

        // Delete вЂ” event delegation РЅР° РІСЃРµР№ РґРѕСЃРєРµ
        document.querySelector('.kanban-board').addEventListener('click', (e) => {
            const deleteBtn = e.target.closest('.task-delete');
            if (deleteBtn) {
                e.stopPropagation();
                this.deleteTask(deleteBtn.dataset.id);
            }
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
                <div class="task-card-header">
                    <div class="task-title">${task.title}</div>
                    <button class="task-delete" data-id="${task.id}" title="Delete task">
                        <i class="ph ph-x"></i>
                    </button>
                </div>
                <div class="task-meta">
                    <span class="priority-indicator" style="background: ${this.getPriorityColor(task.priority)}20; color: ${this.getPriorityColor(task.priority)}">
                        ${task.priority}
                    </span>
                </div>
            `;
            document.getElementById(`${task.status}-list`).appendChild(el);
        });
    },

    addTask(title, priority = 'Medium') {
        const tasks = Storage.getTasks();
        tasks.push({
            id: Date.now().toString(),
            title,
            status: 'todo',
            priority
        });
        Storage.saveTasks(tasks);
        this.render();
    },

    deleteTask(id) {
        let tasks = Storage.getTasks();
        tasks = tasks.filter(t => t.id !== id);
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
        this.timeLeft = 25 * 60;
        this.updateDisplay();
    },

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60).toString().padStart(2, '0');
        const seconds = (this.timeLeft % 60).toString().padStart(2, '0');
        this.display.textContent = `${minutes}:${seconds}`;
    },

    playSound() {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    }
};

// --- MODAL LOGIC ---
const Modal = {
    selectedComplexity: 'Medium',

    init() {
        const overlay = document.getElementById('taskModal');
        const input = document.getElementById('taskTitleInput');

        document.getElementById('closeModal').addEventListener('click', () => this.close());
        document.getElementById('cancelModal').addEventListener('click', () => this.close());
        document.getElementById('confirmAddTask').addEventListener('click', () => this.submit());

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.close();
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.submit();
            if (e.key === 'Escape') this.close();
        });

        document.querySelectorAll('.complexity-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.complexity-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.selectedComplexity = btn.dataset.value;
            });
        });
    },

    open() {
        document.getElementById('taskTitleInput').value = '';
        this.selectedComplexity = 'Medium';
        document.querySelectorAll('.complexity-btn').forEach(b => {
            b.classList.toggle('selected', b.dataset.value === 'Medium');
        });
        document.getElementById('taskModal').classList.add('open');
        setTimeout(() => document.getElementById('taskTitleInput').focus(), 50);
    },

    close() {
        document.getElementById('taskModal').classList.remove('open');
    },

    submit() {
        const title = document.getElementById('taskTitleInput').value.trim();
        if (!title) {
            document.getElementById('taskTitleInput').focus();
            return;
        }
        Kanban.addTask(title, this.selectedComplexity);
        this.close();
    }
};

// --- NAVIGATION LOGIC ---
const Navigation = {
    init() {
        this.links    = document.querySelectorAll('.sidebar nav a');
        this.sections = document.querySelectorAll('main > section');

        // РџСЂРё СЃС‚Р°СЂС‚Рµ РїРѕРєР°Р·С‹РІР°РµРј С‚РѕР»СЊРєРѕ РїРµСЂРІСѓСЋ СЃРµРєС†РёСЋ
        this.sections.forEach((s, i) => {
            s.style.display = i === 0 ? 'block' : 'none';
        });

        this.links.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchTab(index);
            });
        });
    },

    switchTab(activeIndex) {
        this.links.forEach((link, i) => {
            link.classList.toggle('active', i === activeIndex);
        });

        this.sections.forEach((section, i) => {
            if (i === activeIndex) {
                section.style.display = 'block';
                section.style.animation = 'fadeIn 0.3s ease-in-out';
            } else {
                section.style.display = 'none';
            }
        });
    }
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    Kanban.init();
    Pomodoro.init();
    Modal.init();
    Navigation.init();
});
