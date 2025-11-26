// components/GoogleTags.jsx
import Script from 'next/script';

const GoogleTags = () => {
    return (
        <>
            {/* Google Tags */}
            <Script
                id="google-tag-manager"
                strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=G-V6ZF4RL4ST"
            />
            <Script
                id="google-tags-config"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        
                        // Конфигурация Google Analytics
                        gtag('config', 'G-V6ZF4RL4ST');
                        
                        // Конфигурация Google Ads
                        gtag('config', 'AW-17706912095');
                    `,
                }}
            />

            {/* Yandex.Metrika */}
            <Script
                id="yandex-metrika"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        (function(m,e,t,r,i,k,a){
                            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                            m[i].l=1*new Date();
                            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                        })(window, document,'script','https://mc.yandex.ru/metrika/tag.js','ym');

                        ym(105509619, 'init', {
                            ssr:true, 
                            webvisor:true, 
                            clickmap:true, 
                            ecommerce:"dataLayer", 
                            accurateTrackBounce:true, 
                            trackLinks:true
                        });
                    `,
                }}
            />

            {/* Noscript для Яндекс.Метрики */}
            <noscript>
                <div>
                    <img
                        src="https://mc.yandex.ru/watch/105509619"
                        style={{position:'absolute', left:'-9999px'}}
                        alt=""
                    />
                </div>
            </noscript>
        </>
    );
};

export default GoogleTags;