// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        const { locale } = this.props.__NEXT_DATA__;
        const currentLocale = locale || 'en';

        return (
            <Html lang={currentLocale} translate="no">
                <Head>
                    <meta name="google" content="notranslate" />
                    <meta name="googlebot" content="notranslate" />

                    <link
                        rel="preload"
                        href={`/locales/${currentLocale}/common.json`}
                        as="fetch"
                        crossOrigin="anonymous"
                    />

                    <meta httpEquiv="Content-Language" content={currentLocale} />
                    <meta property="og:locale" content={currentLocale} />
                </Head>
                <body translate="no">
                <Main />
                <NextScript />

                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                // РАННЯЯ ИНИЦИАЛИЗАЦИЯ ЯЗЫКА С СОХРАНЕНИЕМ
                (function() {
                  console.log('🚀 Early language setup with persistence');
                  
                  function initLanguage() {
                    if (!window.i18n) return;
                    
                    // Пытаемся восстановить сохраненный язык
                    function getSavedLanguage() {
                      try {
                        var saved = localStorage.getItem('user-language');
                        if (saved) return saved;
                        
                        var cookieMatch = document.cookie.match(/NEXT_LOCALE=([^;]+)/);
                        if (cookieMatch) return cookieMatch[1];
                        
                        return null;
                      } catch(e) {
                        return null;
                      }
                    }
                    
                    var savedLang = getSavedLanguage();
                    var targetLang = '${currentLocale}';
                    
                    // Если есть сохраненный язык И он отличается от текущего
                    if (savedLang && savedLang !== targetLang) {
                      console.log('🔄 Using saved language:', savedLang);
                      window.i18n.changeLanguage(savedLang);
                    } else {
                      // Сохраняем текущий язык
                      console.log('💾 Saving current language:', targetLang);
                      try {
                        localStorage.setItem('user-language', targetLang);
                        localStorage.setItem('user-language-choice', 'true');
                        document.cookie = 'NEXT_LOCALE=' + targetLang + '; path=/; max-age=31536000';
                      } catch(e) {}
                    }
                    
                    // Слушаем будущие изменения языка
                    window.i18n.on('languageChanged', function(lng) {
                      try {
                        localStorage.setItem('user-language', lng);
                        document.cookie = 'NEXT_LOCALE=' + lng + '; path=/; max-age=31536000';
                      } catch(e) {}
                    });
                  }
                  
                  // Запускаем инициализацию
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', initLanguage);
                  } else {
                    initLanguage();
                  }
                  
                  // Дополнительная проверка
                  setTimeout(initLanguage, 100);
                })();
              `,
                    }}
                />
                </body>
            </Html>
        );
    }
}

export default MyDocument;