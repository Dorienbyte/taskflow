import { toggleView } from './ui.js';

// Eventos para cambiar de vista
document.getElementById('btn-start').addEventListener('click', () => toggleView('dashboard-view'));
document.getElementById('btn-go-create').addEventListener('click', () => toggleView('form-view'));
document.getElementById('btn-cancel').addEventListener('click', () => toggleView('dashboard-view'));