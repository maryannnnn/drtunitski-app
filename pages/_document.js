// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        const { locale } = this.props.__NEXT_DATA__;
        const currentLocale = locale || 'en';

        return (
            <Html lang={currentLocale} translate="no">
                <Head>
                    {/* ← ДОБАВЬТЕ META ТЕГИ ДЛЯ БЛОКИРОВКИ ПЕРЕВОДЧИКА */}
                    <meta name="google" content="notranslate" />
                    <meta name="googlebot" content="notranslate" />

                    {/* ← УЛУЧШЕННЫЙ PRELOAD: ВСЕГДА PRELOAD ТЕКУЩИЙ ЯЗЫК ПЕРВЫМ */}
                    <link
                        rel="preload"
                        href={`/locales/${currentLocale}/common.json`}
                        as="fetch"
                        crossOrigin="anonymous"
                        key={`preload-current-${currentLocale}`}
                    />

                    {/* ← PRELOAD ОСНОВНЫХ ЯЗЫКОВ */}
                    <link
                        rel="preload"
                        href="/locales/ru/common.json"
                        as="fetch"
                        crossOrigin="anonymous"
                        key="preload-ru"
                    />
                    <link
                        rel="preload"
                        href="/locales/he/common.json"
                        as="fetch"
                        crossOrigin="anonymous"
                        key="preload-he"
                    />
                    <link
                        rel="preload"
                        href="/locales/en/common.json"
                        as="fetch"
                        crossOrigin="anonymous"
                        key="preload-en"
                    />

                    {/* ← ДОПОЛНИТЕЛЬНЫЕ META ДЛЯ SEO И ЯЗЫКА */}
                    <meta httpEquiv="Content-Language" content={currentLocale} />
                    <meta property="og:locale" content={currentLocale} />
                </Head>
                <body translate="no">
                <Main />
                <NextScript />

                {/* ← FALLBACK СКРИПТ ДЛЯ ПРЯМЫХ ССЫЛОК */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                                // Экстренная перезагрузка переводов для прямых ссылок
                                (function() {
                                    var startTime = Date.now();
                                    var maxWait = 4000; // 4 секунды
                                    
                                    function checkTranslations() {
                                        // Если i18n доступен и есть переводы
                                        if (window.i18n && 
                                            window.i18n.isInitialized && 
                                            Object.keys(window.i18n.store.data).length > 0) {
                                            return true;
                                        }
                                        
                                        // Если прошло слишком много времени - выходим
                                        if (Date.now() - startTime > maxWait) {
                                            console.log('Translation load timeout');
                                            return false;
                                        }
                                        
                                        // Пытаемся принудительно загрузить
                                        if (window.i18n && !window.i18n.isInitialized) {
                                            var lang = '${currentLocale}' || 'en';
                                            window.i18n.reloadResources([lang], ['common'])
                                                .catch(function(err) {
                                                    console.log('Emergency translation load failed:', err);
                                                });
                                        }
                                        
                                        // Проверяем снова через 200ms
                                        setTimeout(checkTranslations, 200);
                                        return false;
                                    }
                                    
                                    // Запускаем проверку
                                    setTimeout(checkTranslations, 100);
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