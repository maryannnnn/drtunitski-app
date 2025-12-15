// layouts/MainLayout.jsx - ЕДИНЫЙ ДЛЯ ВСЕХ СТРАНИЦ
import React from 'react';
import '../scss/app.scss';
import Head from "next/head";
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import Header from "../../widgets/header/Header";
import Footer from "../../widgets/footer/Footer";
import LanguageDetectionBanner from "../../shared/language-detection-banner/LanguageDetectionBanner";
import { isRTL } from "../../shared/utils/rtl-utils";
import { useLanguageUrl } from "../../shared/hooks/useLanguageUrl";
import ContactUsBlock from "../../shared/contact-us-block/ContactUsBlock";
import AccessibilityWidget from "../../shared/accessibility-widget/AccessibilityWidget";
import CookieConsentBanner from "../../shared/cookie-consent-banner/CookieConsentBanner";
import WhatsAppWidget from "../../shared/whatsapp-widget/WhatsAppWidget";
import logoImage from "../../app/assets/images/logo/logo_3.png";
import STsmall from "../assets/images/logo/st_small.png";
import GoogleTags from '../../components/GoogleTags';

const MainLayout = ({
                        children,
                        title,
                        description,
                        ogImage,
                        schemaType = "Website", // ← Гибкая настройка типа схемы
                        showLanguageBanner = true // ← Опционально показывать баннер
                    }) => {
    // ✅ Получаем BASIS_URL_MAIN через publicRuntimeConfig (доступен на клиенте)
    const { publicRuntimeConfig } = getConfig() || {};
    const BASIS_URL_MAIN = publicRuntimeConfig?.BASIS_URL_MAIN || 'https://drtunitski.co.il';
    
    const router = useRouter();
    const { locale, pathname, asPath } = router;
    
    // ✅ С включенным i18n в next.config.mjs:
    // - locale содержит текущий язык ('en', 'ru', 'he', и т.д.)
    // - asPath содержит путь БЕЗ префикса локали
    const cleanPath = asPath.split('?')[0].split('#')[0]; // Убираем query и hash
    
    // ✅ Canonical: английский БЕЗ префикса, остальные С префиксом
    const canonicalUrl = locale === 'en' 
        ? `${BASIS_URL_MAIN}${cleanPath}` 
        : `${BASIS_URL_MAIN}/${locale}${cleanPath}`;
    const isRTLDirection = isRTL(locale);
    const isHomePage = pathname === '/';

    useLanguageUrl();

    // Open Graph изображение
    const defaultOgImage = `${BASIS_URL_MAIN}/images/og-image.jpg`;
    const ogImageUrl = ogImage || defaultOgImage;

    // Title и Description (для главной и внутренних страниц)
    // На главной: title/description приходят из getStaticProps через seoData
    // На внутренних: title приходит как prop, добавляем суффикс клиники
    const pageTitle = isHomePage 
        ? (title || "Clinic of Dr. Serge Tunitski - Leading Gynecology and Surgery in Israel")
        : `${title} | Clinic of Dr. Serge Tunitski`;
    const pageDescription = description || "Expert medical care in gynecology and surgery in Israel.";

    return (
        <div className="wrapper" dir={isRTLDirection ? 'rtl' : 'ltr'}>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />

                {/* Canonical */}
                <link rel="canonical" href={canonicalUrl} />
                {/* hreflang временно отключен */}

                {/* Favicon */}
                <link rel="icon" href={STsmall?.src || STsmall} />

                {/* Open Graph */}
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:image" content={ogImageUrl} />
                <meta property="og:type" content={isHomePage ? "website" : "article"} />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={ogImageUrl} />
                <meta name="yandex-verification" content="2fb6a14af61a8c12" />

                {/* Schema.org - динамчиеская схема */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(
                            isHomePage
                                ? {
                                    // СХЕМА ДЛЯ ГЛАВНОЙ
                                    "@context": "https://schema.org",
                                    "@type": "MedicalClinic",
                                    "name": "Clinic of Dr. Serge Tunitski",
                                    "description": pageDescription,
                                    "url": BASIS_URL_MAIN,
                                    "logo": `${BASIS_URL_MAIN}${logoImage}`,
                                    "image": ogImageUrl,
                                    "medicalSpecialty": ["Gynecology", "Surgery"],
                                    "address": { "@type": "PostalAddress", "addressCountry": "IL" }
                                }
                                : {
                                    // СХЕМА ДЛЯ ВНУТРЕННИХ СТРАНИЦ
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
                                        "logo": `${BASIS_URL_MAIN}${logoImage}`
                                    }
                                }
                        )
                    }}
                />
            </Head>

            {/* Условный баннер */}
            {showLanguageBanner && <LanguageDetectionBanner />}
            <GoogleTags />
            <Header />
            <div className="main">
                {children}
            </div>
            <ContactUsBlock />
            <CookieConsentBanner />
            <Footer />
            <WhatsAppWidget />
            <AccessibilityWidget />
        </div>
    );
};

export default MainLayout;



