import React from 'react';
import '../scss/app.scss'
import Head from "next/head";
import { useRouter } from 'next/router';
import Header from "../../widgets/header/Header";
import Footer from "../../widgets/footer/Footer";
import {BASIS_URL} from "../config/config.js";
import DrawerLeft from "../../shared/drawer-left/DrawerLeft";
import { isRTL } from "../../shared/utils/rtl-utils";
import ContactUsBlock from "../../shared/contact-us-block/ContactUsBlock";
import AccessibilityWidget from "../../shared/accessibility-widget/AccessibilityWidget";
import CookieConsentBanner from "../../shared/cookie-consent-banner/CookieConsentBanner";

const LeftLayout = ({
           children,
           title,
           description,
           ogImage,
           schemaType = "Article"
       }) => {
    const router = useRouter();
    const { locale } = router;
    const canonicalUrl = `${BASIS_URL}${router.asPath}`;
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

    // Все языки для hreflang
    const languages = ['en', 'ru', 'he', 'de', 'fr', 'es', 'ar'];

    // Open Graph изображение
    const defaultOgImage = `${BASIS_URL}/images/og-image.jpg`;
    const ogImageUrl = ogImage || defaultOgImage;

    return (
        <div className="wrapper" dir={isRTLDirection ? 'rtl' : 'ltr'}>
            <Head>
                {/* Основные мета-теги */}
                <title>{title + ` | Clinic of Dr. Serge Tunitski in Israel`}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="author" content="Dr. Serge Tunitski" />
                {/* Robots: управление индексацией через переменную окружения */}
                <meta name="robots" content={process.env.NEXT_PUBLIC_ENABLE_INDEXING === 'true' ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" : "noindex, nofollow"} />
                
                {/* Canonical и языковые альтернативы */}
                <link rel="canonical" href={canonicalUrl} />
                {languages.map(lang => (
                    <link 
                        key={lang}
                        rel="alternate" 
                        hrefLang={lang} 
                        href={`${BASIS_URL}${router.pathname === '/' ? '' : router.pathname}${lang !== 'en' ? `?lang=${lang}` : ''}`} 
                    />
                ))}
                <link rel="alternate" hrefLang="x-default" href={`${BASIS_URL}${router.pathname}`} />

                {/* Favicon и иконки */}
                <link rel="icon" href="/logo_6.png" />
                <link rel="apple-touch-icon" href="/logo_6.png" />
                <meta name="theme-color" content="#8B4513" />

                {/* Open Graph мета-теги */}
                <meta property="og:title" content={`${title} | Clinic of Dr. Serge Tunitski in Israel`} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="article" />
                <meta property="og:locale" content={localeMap[locale] || 'en_US'} />
                {languages.filter(lang => lang !== locale).map(lang => (
                    <meta key={lang} property="og:locale:alternate" content={localeMap[lang]} />
                ))}
                <meta property="og:site_name" content="Clinic of Dr. Serge Tunitski" />
                <meta property="og:image" content={ogImageUrl} />
                <meta property="og:image:secure_url" content={ogImageUrl} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content={title} />
                <meta property="og:image:type" content="image/jpeg" />

                {/* Twitter Card мета-теги */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${title} | Clinic of Dr. Serge Tunitski`} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:url" content={canonicalUrl} />
                <meta name="twitter:image" content={ogImageUrl} />
                <meta name="twitter:image:alt" content={title} />

                {/* Schema.org JSON-LD для статей и страниц */}
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
                                "logo": {
                                    "@type": "ImageObject",
                                    "url": `${BASIS_URL}/logo_6.png`
                                }
                            },
                            "mainEntityOfPage": {
                                "@type": "WebPage",
                                "@id": canonicalUrl
                            },
                            "inLanguage": locale
                        })
                    }}
                />

                {/* Breadcrumb Schema для навигации */}
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
                                    "item": BASIS_URL
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": title,
                                    "item": canonicalUrl
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