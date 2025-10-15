/**
 * Создает уникальный fingerprint пользователя без использования cookies
 * Используется для идентификации пользователя в соответствии с GDPR
 */
export const getUserFingerprint = async () => {
  if (typeof window === 'undefined') return null;

  try {
    // Собираем данные браузера для создания уникального fingerprint
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillStyle = '#333';
      ctx.fillText('fingerprint', 2, 2);
    }
    const canvasData = canvas.toDataURL();

    const fingerprint = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages ? navigator.languages.join(',') : '',
      platform: navigator.platform,
      screenResolution: `${screen.width}x${screen.height}x${screen.colorDepth}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      canvas: canvasData.substring(0, 100), // Используем только первые 100 символов
      hardwareConcurrency: navigator.hardwareConcurrency || 0,
      deviceMemory: navigator.deviceMemory || 0,
      touchSupport: 'ontouchstart' in window,
    };

    // Создаем hash из собранных данных
    const fingerprintString = JSON.stringify(fingerprint);
    
    // Используем Web Crypto API для создания SHA-256 hash
    const hashBuffer = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(fingerprintString)
    );
    
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  } catch (error) {
    console.error('Error generating fingerprint:', error);
    
    // Fallback к более простому fingerprint
    try {
      const simpleFingerprint = `${navigator.userAgent}-${screen.width}x${screen.height}-${navigator.language}`;
      return btoa(simpleFingerprint).replace(/[^a-zA-Z0-9]/g, '');
    } catch (fallbackError) {
      console.error('Fallback fingerprint also failed:', fallbackError);
      return null;
    }
  }
};

