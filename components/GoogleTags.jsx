// components/GoogleTags.jsx
import Script from 'next/script';

const GoogleTags = () => {
    return (
        <>
            {/* Google Ads Tag */}
            <Script
                id="google-ads"
                strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=AW-17706912095"
            />
            <Script
                id="google-ads-config"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17706912095');
          `,
                }}
            />

            {/* Google Analytics */}
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=G-V6ZF4RL4ST"
            />
            <Script
                id="google-analytics-config"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V6ZF4RL4ST');
          `,
                }}
            />
        </>
    );
};

export default GoogleTags;