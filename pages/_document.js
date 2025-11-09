// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        const { locale } = this.props.__NEXT_DATA__;

        return (
            <Html lang={locale} translate="no">
                <Head>
                    <meta name="google" content="notranslate" />
                </Head>
                <body translate="no">
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;