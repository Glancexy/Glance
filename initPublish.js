// Inicializa os eventos dos botões de publicação
import { handlePhotoPublish, handleVideoPublish, handleTextPublish, handleAudioPublish } from './publicar.js';

function initPublishButtons() {
    const btnPhoto = document.getElementById('btn-pub-photo');
    const btnVideo = document.getElementById('btn-pub-video');
    const btnText = document.getElementById('btn-pub-text');
    const btnAudio = document.getElementById('btn-pub-audio');
    if (btnPhoto) btnPhoto.onclick = handlePhotoPublish;
    if (btnVideo) btnVideo.onclick = handleVideoPublish;
    if (btnText) btnText.onclick = handleTextPublish;
    if (btnAudio) btnAudio.onclick = handleAudioPublish;
}

document.addEventListener('DOMContentLoaded', initPublishButtons);
