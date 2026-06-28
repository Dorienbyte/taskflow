
import { toggleView, renderTasks, updateTaskItem, updateProgressBar, buildTaskItem } from './ui.js';
import { addTask, getTasks, updateTask, deleteTask } from './apiConnection.js';
import { initFilters,getNextStatus  } from './filters.js';
import { TASK_STATUS, FILTERS } from './constants.js';

let allTasks = [];
let currentFilter = FILTERS.ALL;
let searchQuery = '';

const filterTasks = (tasks, filter) => {
    if (filter === FILTERS.PENDING) {
        return tasks.filter(task => (task.status || TASK_STATUS.PENDING) === TASK_STATUS.PENDING);
    }
    if (filter === FILTERS.IN_PROGRESS) {
        return tasks.filter(task => task.status === TASK_STATUS.IN_PROGRESS);
    }
    if (filter === FILTERS.COMPLETED) {
        return tasks.filter(task => task.status === TASK_STATUS.COMPLETED);
    }
    return tasks;
};

const displayTasks = () => {
    let visibleTasks = filterTasks(allTasks, currentFilter);
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        visibleTasks = visibleTasks.filter(task => 
            task.title.toLowerCase().includes(query)
        );
    }
    renderTasks(visibleTasks, handleToggleTask, handleDeleteTask);
    updateProgressBar(allTasks);
};

const loadTasks = async () => {
    allTasks = await getTasks();
    displayTasks();
};



const handleToggleTask = async (task) => {
    const currentStatus = task.status || TASK_STATUS.PENDING;
    const newStatus = getNextStatus(currentStatus);
    const updatedTask = { ...task, status: newStatus };

    allTasks = allTasks.map(t => t.id === task.id ? updatedTask : t);
    updateTaskItem(updatedTask);
    updateProgressBar(allTasks);

    await updateTask(task.id, { status: newStatus });
};

const handleDeleteTask = async (id) => {
    allTasks = allTasks.filter(t => t.id !== id);
    displayTasks();
    await deleteTask(id);
};

const handleFilterChange = (filter) => {
    currentFilter = filter;
    displayTasks();
};

document.getElementById('btn-start').addEventListener('click', () => toggleView('dashboard-view'));
document.getElementById('btn-go-create').addEventListener('click', () => toggleView('form-view'));
document.getElementById('btn-cancel').addEventListener('click', () => toggleView('dashboard-view'));

const taskForm = document.getElementById('task-form');
if (taskForm) {
    taskForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;

        const newTask = await addTask({
            title: title,
            description: description,
            status: TASK_STATUS.PENDING,
            category: ''
        });

        if (newTask) {
            allTasks.push(newTask);
            
            // Si el filtro activo coincide con la nueva tarea (Pending / All),
            // la agregamos directamente al DOM sin parpadeos ni borrar la lista completa.
            if (currentFilter === FILTERS.ALL || currentFilter === FILTERS.PENDING) {
                const container = document.getElementById('tasks-container');
                if (container) {
                    const taskItem = buildTaskItem(newTask, handleToggleTask, handleDeleteTask);
                    container.appendChild(taskItem);
                }
            }
            updateProgressBar(allTasks);
        }

        taskForm.reset();
        toggleView('dashboard-view');
    });
}

initFilters(handleFilterChange);
loadTasks();

const searchInput = document.querySelector('.search-container input');
if (searchInput) {
    searchInput.addEventListener('input', (event) => {
        searchQuery = event.target.value;
        displayTasks();
    });
}