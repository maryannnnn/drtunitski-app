import React from 'react';
import '../scss/app.scss'
import Head from "next/head";
import { useRouter } from 'next/router';
import Header from "../../widgets/header/Header";
import Footer from "../../widgets/footer/Footer";
import { isRTL } from "../../shared/utils/rtl-utils";
import ContactUsBlock from "../../shared/contact-us-block/ContactUsBlock";
import AccessibilityWidget from "../../shared/accessibility-widget/AccessibilityWidget";
import CookieConsentBanner from "../../shared/cookie-consent-banner/CookieConsentBanner";
import logoImage from "../../app/assets/images/logo/logo_3.png";
import STsmall from "../../app/assets/images/logo/st_small.png";

const LeftLayout = ({
                        children,
                        title,
                        description,
                        ogImage,
                        schemaType = "Article"
                    }) => {
    const BASIS_URL_MAIN = process.env.BASIS_URL_MAIN
    const router = useRouter();
    const { locale } = router;

    const canonicalUrl = `${BASIS_URL_MAIN}${router.asPath}`;
    const isRTLDirection = isRTL(locale);

    // Локали для разных языков
    const localeMap = {
        en: 'en_US',
        ru: 'ru_RU',
        he: 'he_IL',
        de: 'de_DE',
        fr: 'fr_FR',
        es: 'es_ES',
        ar: 'ar_SA'
    };

    const languages = ['en', 'ru', 'he', 'de', 'fr', 'es', 'ar'];

    const defaultOgImage = `${BASIS_URL_MAIN}/images/og-image.jpg`;
    const ogImageUrl = ogImage || defaultOgImage;

    return (
        <div className="wrapper" dir={isRTLDirection ? 'rtl' : 'ltr'}>
            <Head>
                <title>{title + ` | Clinic of Dr. Serge Tunitski in Israel`}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />

                <link rel="canonical" href={canonicalUrl} />
                {languages.map(lang => {
                    const langPrefix = lang === 'en' ? '' : `/${lang}`;
                    return (
                        <link
                            key={lang}
                            rel="alternate"
                            hrefLang={lang}
                            href={`${BASIS_URL_MAIN}${langPrefix}${router.pathname}`}
                        />
                    );
                })}
                <link rel="alternate" hrefLang="x-default" href={`${BASIS_URL_MAIN}${router.pathname}`} />

                {/* Favicon */}
                <link rel="icon" href={STsmall?.src || STsmall} />

                {/* ✅ Open Graph - BASIS_URL_MAIN */}
                <meta property="og:title" content={`${title} | Clinic of Dr. Serge Tunitski in Israel`} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:image" content={ogImageUrl} />

                {/* ✅ Twitter Card - BASIS_URL_MAIN */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${title} | Clinic of Dr. Serge Tunitski`} />
                <meta name="twitter:url" content={canonicalUrl} />
                <meta name="twitter:image" content={ogImageUrl} />

                {/* ✅ Schema.org - BASIS_URL_MAIN */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": schemaType,
                            "headline": title,
                            "description": description,
                            "url": canonicalUrl,
                            "image": ogImageUrl,
                            "author": {
                                "@type": "Person",
                                "name": "Dr. Serge Tunitski"
                            },
                            "publisher": {
                                "@type": "Organization",
                                "name": "Clinic of Dr. Serge Tunitski",
                                "logo": `${BASIS_URL_MAIN}${logoImage}` // ← ФРОНТЕНД для лого
                            },
                            "inLanguage": locale
                        })
                    }}
                />

                {/* ✅ Breadcrumb - BASIS_URL_MAIN */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": BASIS_URL_MAIN // ← ФРОНТЕНД
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": title,
                                    "item": canonicalUrl // ← ФРОНТЕНД
                                }
                            ]
                        })
                    }}
                />
            </Head>
            <Header/>
            <div className="main">
                {children}
            </div>
            <ContactUsBlock />
            <AccessibilityWidget />
            <Footer/>
            <CookieConsentBanner />
        </div>
    );
};

export default LeftLayout;