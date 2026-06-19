import { toggleView, renderTasks } from './ui.js';
import { addTask, getTasks } from './api.js';
import { initFilters } from './filters.js'; // 1. Importa el módulo

const loadTasks = async () => {
    const tasks = await getTasks();
    renderTasks(tasks);
};

// 2. Inicializa los filtros al arrancar
document.addEventListener('DOMContentLoaded', () => {
    initFilters();
});

document.getElementById('btn-start').addEventListener('click', () => toggleView('dashboard-view'));
document.getElementById('btn-go-create').addEventListener('click', () => toggleView('form-view'));
document.getElementById('btn-cancel').addEventListener('click', () => toggleView('dashboard-view'));

const taskForm = document.getElementById('task-form');
if (taskForm) {
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;

        await addTask({
            title: title,
            description: description,
            status: 'Pending',
            category: ''
        });

        taskForm.reset();
        toggleView('dashboard-view');
        await loadTasks();
    });
}

loadTasks();