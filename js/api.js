const API_URL = 'http://localhost:3000/tasks';

export const getTasks = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};

export const addTask = async (taskData) => {
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
    });
};