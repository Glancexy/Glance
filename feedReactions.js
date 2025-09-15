// Módulo de reações dos posts do feed
export function handleLike(postId) {
    // Lógica para curtir um post
    console.log('Like no post', postId);
}

export function handleView(postId) {
    // Lógica para marcar visualização
    console.log('View no post', postId);
}

export function handleShare(postId) {
    // Lógica para compartilhar
    console.log('Share no post', postId);
}

export function handleComment(postId, comment) {
    // Lógica para adicionar comentário
    console.log('Comentário no post', postId, ':', comment);
}
