// Módulo de comentários
const commentsStore = {};

export function addComment(postId, comment) {
    if (!commentsStore[postId]) commentsStore[postId] = [];
    commentsStore[postId].push(comment);
}

export function getComments(postId) {
    return commentsStore[postId] || [];
}

export function removeComment(postId, index) {
    if (commentsStore[postId]) commentsStore[postId].splice(index, 1);
}

export function renderComments(postId, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const comments = getComments(postId);
    container.innerHTML = comments.length === 0
        ? `<div class='text-gray-500 text-center'>Nenhum comentário ainda.</div>`
        : comments.map((c, i) => `<div class='bg-white/80 dark:bg-black/80 rounded-xl px-3 py-2 text-sm text-black dark:text-white'><b>${c.user}:</b> ${c.text} <button onclick='window.removeCommentUI(${postId},${i})' class='ml-2 text-xs text-red-500'>Remover</button></div>`).join('');
}

// Exemplo de integração para remover comentário via UI
window.removeCommentUI = function(postId, index) {
    removeComment(postId, index);
    // Atualize o container após remover
    renderComments(postId, 'comments-container-' + postId);
};
