import { TASK_STATUS } from './constants.js';

export const toggleView = (viewId) => {
    document.querySelectorAll('.view').forEach(view => view.classList.add('hidden'));
    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.remove('hidden');
    }
};

export const renderTasks = (tasks, onToggleTask, onDeleteTask) => {
    const container = document.getElementById('tasks-container');
    if (!container) return;

    container.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = buildTaskItem(task, onToggleTask, onDeleteTask);
        container.appendChild(taskItem);
    });
};

export const updateProgressBar = (tasks) => {
    const fillEl = document.getElementById('progress-fill');
    const textEl = document.getElementById('progress-percentage');
    const barEl = document.getElementById('progress-bar');
    if (!fillEl || !textEl) return;

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === TASK_STATUS.COMPLETED).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    fillEl.style.width = `${percentage}%`;
    textEl.textContent = `${percentage}%`;
    if (barEl) barEl.setAttribute('aria-valuenow', percentage);
};

export const updateTaskItem = (task) => {
    const item = document.querySelector(`[data-id="${task.id}"]`);
    if (!item) return;

    const status = task.status || TASK_STATUS.PENDING;
    const statusIcon = item.querySelector('.task-status-icon');
    const titleEl = item.querySelector('.task-title');
    const metaSpan = item.querySelector('.task-meta span');

    statusIcon.className = 'task-status-icon';
    titleEl.className = 'task-title';
    metaSpan.className = '';

    if (status === TASK_STATUS.COMPLETED) {
        statusIcon.classList.add('completed');
        statusIcon.textContent = '✓';
        titleEl.classList.add('completed-text');
    } else if (status === TASK_STATUS.IN_PROGRESS) {
        statusIcon.classList.add('in-progress');
        statusIcon.textContent = '';
        metaSpan.classList.add('in-progress-text');
    } else {
        statusIcon.textContent = '';
    }

    metaSpan.textContent = status;
};

export const buildTaskItem = (task, onToggleTask, onDeleteTask) => {
    const status = task.status || TASK_STATUS.PENDING;
    const category = task.category || '';

    let iconClass = '';
    let iconSymbol = '';
    let metaClass = '';
    let titleClass = '';

    if (status === TASK_STATUS.COMPLETED) {
        iconClass = 'completed';
        iconSymbol = '✓';
        titleClass = 'completed-text';
    } else if (status === TASK_STATUS.IN_PROGRESS) {
        iconClass = 'in-progress';
        metaClass = 'in-progress-text';
    }

    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    taskItem.dataset.id = task.id;
    taskItem.innerHTML = `
        <div class="task-status-icon ${iconClass}">${iconSymbol}</div>
        <div class="task-text">
            <p class="task-title ${titleClass}">${task.title}</p>
            <p class="task-meta">${category}${category ? ' • ' : ''}<span class="${metaClass}">${status}</span></p>
        </div>
        <button class="delete-btn" aria-label="Delete task">🗑️</button>
    `;

    const statusIcon = taskItem.querySelector('.task-status-icon');
    statusIcon.style.cursor = 'pointer';
    statusIcon.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        onToggleTask(task);
    });

    const deleteBtn = taskItem.querySelector('.delete-btn');
    if (deleteBtn && onDeleteTask) {
        deleteBtn.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            onDeleteTask(task.id);
        });
    }

    return taskItem;
};