import { supabase } from '../../app/config/supabase-client';
import { getUserFingerprint } from './user-fingerprint';

const STORAGE_KEY = 'cookie-consent';
const STORAGE_VERSION = '1.0';

/**
 * Cookie Consent Manager
 * Управляет согласиями пользователя на использование cookies
 * Использует Supabase для хранения и синхронизации между устройствами
 * Использует localStorage для быстрого доступа
 */
export class CookieConsentManager {
  /**
   * Получить текущее согласие пользователя
   */
  static async getConsent() {
    if (typeof window === 'undefined') return null;

    try {
      // Сначала проверяем localStorage (быстрый доступ)
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed.version === STORAGE_VERSION) {
            return parsed.consent;
          }
        } catch (parseError) {
          console.error('Error parsing cached consent:', parseError);
          localStorage.removeItem(STORAGE_KEY);
        }
      }

      // Если нет в кеше и есть Supabase, загружаем из базы
      if (supabase) {
        const fingerprint = await getUserFingerprint();
        if (!fingerprint) return null;

        const { data, error } = await supabase
          .from('cookie_consents')
          .select('*')
          .eq('user_fingerprint', fingerprint)
          .single();

        if (error) {
          // PGRST116 = not found, это нормально для нового пользователя
          if (error.code !== 'PGRST116') {
            console.error('Error fetching consent from Supabase:', error);
          }
          return null;
        }

        if (data) {
          const consent = {
            essential: data.essential,
            analytics: data.analytics,
            marketing: data.marketing,
          };

          // Кешируем в localStorage
          this.cacheConsent(consent);
          return consent;
        }
      }

      return null;
    } catch (error) {
      console.error('Error getting consent:', error);
      return null;
    }
  }

  /**
   * Сохранить согласие пользователя
   */
  static async saveConsent(consent) {
    if (typeof window === 'undefined') return false;

    try {
      const normalizedConsent = {
        essential: consent.essential ?? true,
        analytics: consent.analytics ?? false,
        marketing: consent.marketing ?? false,
      };

      // Сохраняем в Supabase если доступен
      if (supabase) {
        const fingerprint = await getUserFingerprint();
        if (fingerprint) {
          const { error } = await supabase
            .from('cookie_consents')
            .upsert({
              user_fingerprint: fingerprint,
              essential: normalizedConsent.essential,
              analytics: normalizedConsent.analytics,
              marketing: normalizedConsent.marketing,
              updated_at: new Date().toISOString(),
            }, {
              onConflict: 'user_fingerprint'
            });

          if (error) {
            console.error('Error saving consent to Supabase:', error);
            // Продолжаем работу с localStorage даже если Supabase недоступен
          }
        }
      }

      // Обновляем localStorage
      this.cacheConsent(normalizedConsent);

      // Применяем настройки cookies
      this.applyCookieSettings(normalizedConsent);

      return true;
    } catch (error) {
      console.error('Error saving consent:', error);
      return false;
    }
  }

  /**
   * Кеширование согласия в localStorage
   */
  static cacheConsent(consent) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        version: STORAGE_VERSION,
        consent,
        timestamp: Date.now(),
      }));
    } catch (error) {
      console.error('Error caching consent:', error);
    }
  }

  /**
   * Применить настройки cookies
   */
  static applyCookieSettings(consent) {
    if (typeof window === 'undefined') return;

    try {
      if (consent.analytics) {
        this.loadAnalytics();
      } else {
        this.removeAnalytics();
      }

      if (consent.marketing) {
        this.loadMarketing();
      } else {
        this.removeMarketing();
      }

      // Диспатчим событие для других компонентов
      window.dispatchEvent(new CustomEvent('cookieConsentChanged', { 
        detail: consent 
      }));
    } catch (error) {
      console.error('Error applying cookie settings:', error);
    }
  }

  /**
   * Загрузить скрипты аналитики
   */
  static loadAnalytics() {
    if (typeof window === 'undefined') return;

    // Google Analytics
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (gaId && !window.gtag) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', gaId, {
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure'
      });

      console.log('✅ Analytics loaded');
    }
  }

  /**
   * Удалить cookies аналитики
   */
  static removeAnalytics() {
    if (typeof window === 'undefined') return;

    // Удаляем Google Analytics cookies
    const gaCookies = ['_ga', '_gat', '_gid'];
    gaCookies.forEach(name => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    // Удаляем все _ga* cookies
    const allCookies = document.cookie.split(';');
    allCookies.forEach(cookie => {
      const name = cookie.split('=')[0].trim();
      if (name.startsWith('_ga')) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    });

    console.log('🚫 Analytics removed');
  }

  /**
   * Загрузить маркетинговые скрипты
   */
  static loadMarketing() {
    if (typeof window === 'undefined') return;

    // Facebook Pixel
    const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
    if (fbPixelId && !window.fbq) {
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', fbPixelId);
      fbq('track', 'PageView');

      console.log('✅ Marketing loaded');
    }
  }

  /**
   * Удалить маркетинговые cookies
   */
  static removeMarketing() {
    if (typeof window === 'undefined') return;

    // Удаляем Facebook cookies
    const fbCookies = ['_fbp', '_fbc'];
    fbCookies.forEach(name => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    console.log('🚫 Marketing removed');
  }

  /**
   * Проверить есть ли сохраненное согласие
   */
  static async hasConsent() {
    const consent = await this.getConsent();
    return consent !== null;
  }

  /**
   * Удалить все данные о согласии
   */
  static async clearConsent() {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(STORAGE_KEY);

      if (supabase) {
        const fingerprint = await getUserFingerprint();
        if (fingerprint) {
          await supabase
            .from('cookie_consents')
            .delete()
            .eq('user_fingerprint', fingerprint);
        }
      }

      this.removeAnalytics();
      this.removeMarketing();
    } catch (error) {
      console.error('Error clearing consent:', error);
    }
  }
}

