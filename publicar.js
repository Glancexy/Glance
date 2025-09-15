// Módulo de publicação Glance
// Função para publicação de foto
export function handlePhotoPublish() {
    const inputPhoto = document.getElementById('glance-upload-photo');
    if (!inputPhoto) return;
    inputPhoto.value = '';
    inputPhoto.click();
    inputPhoto.onchange = function() {
        if (inputPhoto.files && inputPhoto.files[0]) {
            const file = inputPhoto.files[0];
            const url = URL.createObjectURL(file);
            const previewContainer = document.getElementById('glance-preview-container');
            if (previewContainer) previewContainer.innerHTML = `<img src='${url}' class='w-full max-w-xs rounded-xl mb-2' />`;
            window.uploadedFileData = url;
            window.uploadedFileType = 'image';
            window.uploadedTextContent = null;
            const glanceDescModal = document.getElementById('glance-desc-modal');
            if (glanceDescModal) glanceDescModal.classList.remove('hidden');
            const publishBtn = document.getElementById('glance-publish-btn');
            if (publishBtn) publishBtn.style.display = 'block';
        }
    };
}
// Função para publicação de vídeo
export function handleVideoPublish() {
    const inputVideo = document.getElementById('glance-upload-video');
    if (!inputVideo) return;
    inputVideo.value = '';
    inputVideo.click();
    inputVideo.onchange = function() {
        if (inputVideo.files && inputVideo.files[0]) {
            const file = inputVideo.files[0];
            const url = URL.createObjectURL(file);
            const previewContainer = document.getElementById('glance-preview-container');
            if (previewContainer) previewContainer.innerHTML = `<video src='${url}' controls class='w-full max-w-xs rounded-xl mb-2'></video>`;
            window.uploadedFileData = url;
            window.uploadedFileType = 'video';
            window.uploadedTextContent = null;
            let catSelect = document.getElementById('glance-video-category');
            if (!catSelect) {
                catSelect = document.createElement('select');
                catSelect.id = 'glance-video-category';
                catSelect.className = 'w-full mt-2 mb-2 p-2 rounded-xl border-2 border-blue-400 bg-white text-black font-semibold';
                catSelect.required = true;
                catSelect.innerHTML = `<option value='' disabled selected hidden>Escolha a categoria</option>
                    <option value='Viagem'>Viagem</option>
                    <option value='Tecnologia'>Tecnologia</option>
                    <option value='Arte'>Arte</option>
                    <option value='Música'>Música</option>
                    <option value='Humor'>Humor</option>
                    <option value='Educação'>Educação</option>
                    <option value='Vlog'>Vlog</option>
                    <option value='Outro'>Outro</option>`;
                previewContainer.parentNode.insertBefore(catSelect, previewContainer.nextSibling);
            } else {
                catSelect.style.display = '';
            }
            const glanceDescModal = document.getElementById('glance-desc-modal');
            if (glanceDescModal) glanceDescModal.classList.remove('hidden');
            const publishBtn = document.getElementById('glance-publish-btn');
            if (publishBtn) publishBtn.style.display = 'block';
        }
    };
}
// Função para publicação de texto
export function handleTextPublish() {
    let textArea = document.getElementById('glance-text-area');
    if (!textArea) {
        textArea = document.createElement('textarea');
        textArea.id = 'glance-text-area';
        textArea.className = 'w-full p-3 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-black dark:text-white mt-4';
        textArea.placeholder = 'Digite seu texto aqui...';
        const parent = document.getElementById('btn-pub-text').parentElement.parentElement;
        parent.appendChild(textArea);
    }
    textArea.classList.remove('hidden');
    textArea.focus();
}
// Função para publicação de áudio
export function handleAudioPublish() {
    const audioArea = document.getElementById('audio-record-area');
    if (audioArea) audioArea.classList.remove('hidden');
}

// Inicializa os eventos dos botões
document.addEventListener('DOMContentLoaded', initPublishButtons);
// Removido: inicialização dos botões. Use um arquivo separado para isso.
