/**
 * Утилиты для работы с видео ссылками
 */

/**
 * Определяет тип видео по URL
 * @param {string} url - URL видео
 * @returns {string} - тип видео (youtube, facebook, tiktok, instagram, other)
 */
export const getVideoType = (url) => {
  if (!url) return 'other';
  
  const urlLower = url.toLowerCase();
  
  if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
    return 'youtube';
  }
  if (urlLower.includes('facebook.com') || urlLower.includes('fb.watch')) {
    return 'facebook';
  }
  if (urlLower.includes('tiktok.com')) {
    return 'tiktok';
  }
  if (urlLower.includes('instagram.com')) {
    return 'instagram';
  }
  
  return 'other';
};

/**
 * Извлекает ID видео из YouTube URL
 * @param {string} url - YouTube URL
 * @returns {string|null} - ID видео или null
 */
export const getYouTubeVideoId = (url) => {
  if (!url) return null;
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : null;
};

/**
 * Создает YouTube embed URL
 * @param {string} videoId - ID видео YouTube
 * @returns {string} - embed URL
 */
export const createYouTubeEmbedUrl = (videoId) => {
  return `https://www.youtube.com/embed/${videoId}`;
};

/**
 * Обрабатывает видео URL и возвращает объект с информацией о видео
 * @param {string} videoUrl - URL видео
 * @returns {object} - объект с информацией о видео
 */
export const processVideoUrl = (videoUrl) => {
  if (!videoUrl) {
    return {
      type: 'other',
      url: '',
      embedUrl: '',
      displayUrl: '',
      isValid: false
    };
  }

  // Нормализуем URL - добавляем протокол если его нет
  let normalizedUrl = videoUrl.trim();
  if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
    normalizedUrl = 'https://' + normalizedUrl;
  }

  const type = getVideoType(normalizedUrl);
  
  let embedUrl = '';
  let displayUrl = normalizedUrl;
  
  if (type === 'youtube') {
    const videoId = getYouTubeVideoId(normalizedUrl);
    if (videoId) {
      embedUrl = createYouTubeEmbedUrl(videoId);
    }
  } else {
    // Для других платформ показываем только ссылку
    embedUrl = normalizedUrl;
  }
  
  return {
    type,
    url: normalizedUrl,
    embedUrl,
    displayUrl,
    isValid: true
  };
};

/**
 * Проверяет, является ли URL валидной ссылкой
 * @param {string} url - URL для проверки
 * @returns {boolean} - true, если URL валидный
 */
export const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  
  // Добавляем протокол если его нет
  let testUrl = url;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    testUrl = 'https://' + url;
  }
  
  try {
    new URL(testUrl);
    return true;
  } catch {
    return false;
  }
};
