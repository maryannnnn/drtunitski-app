import React from 'react';
import '../scss/app.scss';
import Head from "next/head";
import { useRouter } from 'next/router';
import Header from "../../widgets/header/Header";
import Footer from "../../widgets/footer/Footer";
import LanguageDetectionBanner from "../../shared/language-detection-banner/LanguageDetectionBanner";
import { BASIS_URL } from "../config/config.js";
import { isRTL } from "../../shared/utils/rtl-utils";
import { useLanguageUrl } from "../../shared/hooks/useLanguageUrl";
import ContactUsBlock from "../../shared/contact-us-block/ContactUsBlock";
import AccessibilityWidget from "../../shared/accessibility-widget/AccessibilityWidget";

const MainLayout = ({
                        children,
                        title,
                        description
                    }) => {
    const router = useRouter();
    const { locale } = router;
    const canonicalUrl = `${BASIS_URL}`;
    const isRTLDirection = isRTL(locale);
    
    // Автоматически обновляем URL с языковыми суффиксами
    useLanguageUrl();

    return (
        <div className="wrapper" dir={isRTLDirection ? 'rtl' : 'ltr'}>
            <Head>
                <title>{title + ` | Clinic of Dr. Serge Tunitski in Israel`}</title>
                <meta name="description" content={description} />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="canonical" href={canonicalUrl} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="article" />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:site_name" content="Центр Массажа Крылья Ветра" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:url" content={canonicalUrl} />

                <script type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "Article",
                                "headline": title,
                                "description": description,
                                "url": canonicalUrl,
                            })
                        }}
                />
            </Head>
            {/* <LanguageDetectionBanner /> - ОТКЛЮЧЕНО для удобства разработки */}
            <Header />
            <div className="main">
                {children}
            </div>
            <ContactUsBlock />
            <AccessibilityWidget />
            <Footer />
        </div>
    );
};

export default MainLayout;



