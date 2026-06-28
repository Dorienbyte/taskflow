export const initFilters = (onFilterChange) => {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedFilter = button.getAttribute('data-filter');
            onFilterChange(selectedFilter);
        });
    });   

};
const getNextStatus = (currentStatus) => {
    if (currentStatus === TASK_STATUS.PENDING) return TASK_STATUS.IN_PROGRESS;
    if (currentStatus === TASK_STATUS.IN_PROGRESS) return TASK_STATUS.COMPLETED;
    return TASK_STATUS.PENDING;
};