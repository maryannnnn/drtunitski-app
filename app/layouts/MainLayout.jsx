import React from 'react';
import '../scss/app.scss'
import Head from "next/head";
import Header from "../../widgets/header/Header";
import Footer from "../../widgets/footer/Footer";
import {BASIS_URL} from "../config/config.js";

const MainLayout = ({
                        children,
                        title,
                        description
                    }) => {
    const canonicalUrl = `${BASIS_URL}`;

    return (
        <div className="wrapper">
            <Head>
                <title>{title + ` | запись по хорошей стоимости в Израиле`}</title>
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
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": title,
                        "description": description,
                        "url": canonicalUrl,
                    })}
                </script>
                {/* Скрипт для Accessibility от EqualWeb */}
                <script>
                    {`
          window.interdeal = {
              "sitekey": "fcac143859674f824f930ee314d8e2b7",
              "Position": "left",
              "domains": {
                  "js": "https://cdn.equalweb.com/",
                  "acc": "https://access.equalweb.com/"
              },
              "Menulang": "RU",
              "btnStyle": {
                  "vPosition": ["80%", "20%"],
                  "scale": ["0.5", "0.5"],
                  "color": {
                      "main": "#6e7577",
                      "second": "#ffffff"
                  },
                  "icon": {
                      "outline": false,
                      "type": 1,
                      "shape": "circle"
                  }
              }
          };
          (function(doc, head, body){
              var coreCall = doc.createElement('script');
              coreCall.src = interdeal.domains.js + 'core/5.0.13/accessibility.js';
              coreCall.defer = true;
              coreCall.integrity = 'sha512-pk3CeR0KGJu+GfK2x2ybTSZ1o1qfua6XW2PRAxMWOhC85M3+CanPYmvRp6BOiW0/riZjWGerRN7+JH4wEF0wJQ==';
              coreCall.crossOrigin = 'anonymous';
              coreCall.setAttribute('data-cfasync', true );
              body ? body.appendChild(coreCall) : head.appendChild(coreCall);
          })(document, document.head, document.body);
          `}
                </script>
            </Head>
            <Header />
            <div className="main">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;


