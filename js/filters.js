export const initFilters = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            filtrarTareas(filter);
        });
    });
};

export function filtrarTareas(estado) {
    console.log("Filtrando por:", estado);
}