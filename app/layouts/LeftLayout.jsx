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

const LeftLayout
    = ({
           children,
           title,
           description
       }) => {
    const router = useRouter();
    const { locale } = router;
    const canonicalUrl = `${BASIS_URL}`;
    const isRTLDirection = isRTL(locale);

    return (
        <div className="wrapper" dir={isRTLDirection ? 'rtl' : 'ltr'}>
            <Head>
            <title>{title + ` | Clinic of Dr. Serge Tunitski in Israel`}</title>
                <meta name="description" content={description}/>
                <meta name="robots" content="index, follow"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="canonical" href={canonicalUrl}/>
                <meta property="og:title" content={title}/>
                <meta property="og:description" content={description}/>
                <meta property="og:url" content={canonicalUrl}/>
                <meta property="og:type" content="article"/>
                <meta name="twitter:card" content="summary"/>
                <meta name="twitter:title" content={title}/>
                <meta name="twitter:description" content={description}/>
                <meta name="twitter:url" content={canonicalUrl}/>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": "${title}",
                        "description": "${description}",
                        "url": "${canonicalUrl}",
                    })}
                </script>
                {/* Скрипт для Accessibility от EqualWeb */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.interdeal = {
                                sitekey: "58a9a5486ebd5e4080d0a10c51b76796",
                                domains: {
                                    js: "https://cdn.equalweb.com/",
                                    acc: "https://access.equalweb.com/"
                                },
                                Position: "left",
                                Menulang: "EN",
                                draggable: true,
                                btnStyle: {
                                    vPosition: ["80%", "80%"],
                                    margin: ["0", "0"],
                                    scale: ["0.5", "0.5"],
                                    color: {
                                        main: "#002680",
                                        second: "#ffffff"
                                    },
                                    icon: {
                                        outline: false,
                                        outlineColor: "#ffffff",
                                        type: 2,
                                        shape: "circle"
                                    }
                                }
                            };

                            (function(doc, head, body){
                                var coreCall = doc.createElement('script');
                                coreCall.src = interdeal.domains.js + 'core/5.2.0/accessibility.js';
                                coreCall.defer = true;
                                coreCall.integrity = 'sha512-fHF4rKIzByr1XeM6stpnVdiHrJUOZsKN2/Pm0jikdTQ9uZddgq15F92kUptMnyYmjIVNKeMIa67HRFnBNTOXsQ==';
                                coreCall.crossOrigin = 'anonymous';
                                coreCall.setAttribute('data-cfasync', true );
                                body ? body.appendChild(coreCall) : head.appendChild(coreCall);
                            })(document, document.head, document.body);
                        `
                    }}
                />
            </Head>
            <Header/>
            <div className="main">
                {children}
            </div>
            <ContactUsBlock />
            <Footer/>
        </div>
    );
};

export default LeftLayout;