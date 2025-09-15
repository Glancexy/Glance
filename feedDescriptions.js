// Módulo de descrições dos posts do feed
export const FEED_POST_DESCRIPTIONS = {
    viagem: 'Explore destinos incríveis e compartilhe suas aventuras.',
    tecnologia: 'Novidades, tutoriais e gadgets inovadores.',
    arte: 'Criações, técnicas e inspirações artísticas.',
    musica: 'Performances, composições e dicas musicais.',
    humor: 'Piadas, situações engraçadas e memes.',
    educacao: 'Ensine, aprenda e divulgue conhecimento.',
    vlog: 'Compartilhe sua rotina e experiências.',
    outro: 'Conteúdos diversos.'
};

export function getDescription(category) {
    return FEED_POST_DESCRIPTIONS[category] || FEED_POST_DESCRIPTIONS['outro'];
}
