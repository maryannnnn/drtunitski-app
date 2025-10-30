// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        const { locale } = this.props.__NEXT_DATA__;

        return (
            <Html lang={locale}>
                <Head>
                    {/* Правильные пути - БЕЗ public/ */}
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

                    {/* Preload текущего языка */}
                    {locale && locale !== 'en' && (
                        <link
                            rel="preload"
                            href={`/locales/${locale}/common.json`}
                            as="fetch"
                            crossOrigin="anonymous"
                            key={`preload-${locale}`}
                        />
                    )}
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;