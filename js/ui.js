export const toggleView = (viewId) => {
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    document.getElementById(viewId).classList.remove('hidden');
};

export const renderTasks = (tasks) => {
    const container = document.getElementById('tasks-container');
    container.innerHTML = '';

    tasks.forEach(task => {
        const status = task.status || 'Pending';
        const category = task.category || '';

        let iconClass = '';
        let iconSymbol = '';
        let metaClass = '';
        let titleClass = '';

        if (status === 'Completed') {
            iconClass = 'completed';
            iconSymbol = '✓';
            titleClass = 'completed-text';
        } else if (status === 'In Progress') {
            iconClass = 'in-progress';
            metaClass = 'in-progress-text';
        }

        const taskEl = document.createElement('div');
        taskEl.classList.add('task-item');
        taskEl.innerHTML = `
            <div class="task-status-icon ${iconClass}">${iconSymbol}</div>
            <div class="task-text">
                <p class="task-title ${titleClass}">${task.title}</p>
                <p class="task-meta">${category}${category ? ' • ' : ''}<span class="${metaClass}">${status}</span></p>
            </div>
        `;
        container.appendChild(taskEl);
    });
};