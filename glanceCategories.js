// Módulo de categorias dos Glance Videos
export const GLANCE_VIDEO_CATEGORIES = [
    'Viagem',
    'Tecnologia',
    'Arte',
    'Música',
    'Humor',
    'Educação',
    'Vlog',
    'Outro'
];

export function renderCategories(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = GLANCE_VIDEO_CATEGORIES.map(cat => `
        <button class='category-btn px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold m-1'>${cat}</button>
    `).join('');
}
