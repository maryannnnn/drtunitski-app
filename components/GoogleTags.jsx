// components/GoogleTags.jsx
import Script from 'next/script';

const GoogleTags = () => {
    return (
        <>
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
        </>
    );
};

export default GoogleTags;