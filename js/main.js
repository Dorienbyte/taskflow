import { toggleView } from './ui.js';
import { addTask } from './api.js';

document.getElementById('btn-start').addEventListener('click', () => toggleView('dashboard-view'));
document.getElementById('btn-go-create').addEventListener('click', () => toggleView('form-view'));
document.getElementById('btn-cancel').addEventListener('click', () => toggleView('dashboard-view'));

const taskForm = document.getElementById('task-form');
if (taskForm) {
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        await addTask(title);
        taskForm.reset();
        toggleView('dashboard-view');
    });
}

localStorage.setItem('user', 'Dorien');
const user = localStorage.getItem('user');
console.log("Usuario actual:", user);

if (!localStorage.getItem('visited')) {
    console.log("Bienvenido por primera vez");
    localStorage.setItem('visited', 'true');
}