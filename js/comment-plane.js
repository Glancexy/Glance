// Mostra o ícone de avião ao digitar comentário e publica ao clicar
// Exibe ou oculta o botão 'Enviar' conforme o campo de comentário
function toggleSendCommentBtn(form) {
    if (!form) return;
    // Avião antigo
    const planeBtn = form.querySelector('.plane-comment-btn');
    const input = form.querySelector('.comment-input');
    if (planeBtn) {
        planeBtn.style.display = (input && input.value.trim().length > 0) ? 'inline-flex' : 'none';
    }
    // Novo botão 'Enviar'
    const sendBtn = form.querySelector('.send-comment-btn');
    if (sendBtn) {
        sendBtn.style.display = (input && input.value.trim().length > 0) ? 'inline-flex' : 'none';
    }
}
function setupCommentPlaneIcon() {
    document.addEventListener('input', function(e) {
        if (e.target.classList.contains('comment-input')) {
            const form = e.target.closest('form');
            toggleSendCommentBtn(form);
        }
    });
    document.addEventListener('click', function(e) {
        if (e.target.closest('.plane-comment-btn')) {
            const btn = e.target.closest('.plane-comment-btn');
            const form = btn.closest('form');
            if (form) {
                form.dispatchEvent(new Event('submit', {cancelable: true}));
            }
        }
        // Mostrar todos os comentários ao clicar no ícone de comentários
        if (e.target.closest('.comment-btn')) {
            const btn = e.target.closest('.comment-btn');
            const postIdx = btn.getAttribute('data-postidx');
            let modal = document.getElementById('comments-modal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'comments-modal';
                modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center bg-black/80';
                document.body.appendChild(modal);
            }
            modal.innerHTML = `<div class='bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full shadow-2xl'><h2 class='text-xl font-bold mb-4 text-black dark:text-white'>Comentários</h2><div id='comments-list'></div><button id='close-comments-modal' class='mt-6 px-6 py-2 bg-blue-500 text-white rounded-xl font-semibold'>Fechar</button></div>`;
            modal.classList.remove('hidden');
            const commentsList = modal.querySelector('#comments-list');
            if (window.postComments && window.postComments[postIdx] && window.postComments[postIdx].length > 0) {
                commentsList.innerHTML = window.postComments[postIdx].map(c => `<div class='mb-2 p-2 rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white'>${c}</div>`).join('');
            } else {
                commentsList.innerHTML = `<div class='text-gray-500 dark:text-gray-400 text-center'>Nenhum comentário ainda.</div>`;
            }
            modal.querySelector('#close-comments-modal').onclick = function() {
                modal.classList.add('hidden');
            };
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.target.classList.contains('comment-input') && (e.key === 'Enter' || e.keyCode === 13)) {
            const form = e.target.closest('form');
            if (form) {
                form.dispatchEvent(new Event('submit', {cancelable: true}));
                e.preventDefault();
            }
        }
    });
    // Handler para submit do form (Enter ou avião)
    document.addEventListener('submit', function(e) {
        if (e.target.classList.contains('comment-form')) {
            const form = e.target;
            const input = form.querySelector('.comment-input');
            const planeBtn = form.querySelector('.plane-comment-btn');
            if (input && input.value.trim().length > 0) {
                window.sendComment(input.value, form);
                input.value = '';
                if (planeBtn) planeBtn.style.display = 'none';
            }
            e.preventDefault();
        }
    });
}
// Função global para adicionar comentário ao post
window.sendComment = function(comment, form) {
    // Encontra o postIdx corretamente
    let postIdx = null;
    // Busca pelo atributo data-postidx no form ou nos pais
    if (form.hasAttribute('data-postidx')) {
        postIdx = form.getAttribute('data-postidx');
    } else {
        let el = form;
        while (el && !el.hasAttribute('data-postidx')) {
            el = el.parentElement;
        }
        if (el && el.hasAttribute('data-postidx')) {
            postIdx = el.getAttribute('data-postidx');
        }
    }
    console.log('Enviando comentário para postIdx:', postIdx, 'Comentário:', comment);
    if (postIdx !== null && window.postComments) {
        window.postComments[postIdx] = window.postComments[postIdx] || [];
        window.postComments[postIdx].push(comment);
        // Atualiza contador
        const commentBtn = document.querySelector(`.comment-btn[data-postidx='${postIdx}'] .font-bold`);
        if (commentBtn) commentBtn.textContent = window.postComments[postIdx].length;
        // Atualiza modal se estiver aberto
        let modal = document.getElementById('comments-modal');
        if (modal && !modal.classList.contains('hidden')) {
            const commentsList = modal.querySelector('#comments-list');
            if (commentsList) {
                commentsList.innerHTML = window.postComments[postIdx].map(c => `<div class='mb-2 p-2 rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white'>${c}</div>`).join('');
            }
        }
    } else {
        console.warn('Não foi possível encontrar o postIdx ou postComments. Comentário não enviado.');
    }
};
document.addEventListener('DOMContentLoaded', setupCommentPlaneIcon);
// Sincroniza postComments global com a variável do HTML
if (typeof postComments === 'undefined' || !postComments) {
    window.postComments = {};
} else {
    window.postComments = postComments;
}
