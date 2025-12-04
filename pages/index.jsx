import React from 'react';
import '../app/scss/app.scss';
import {SpeedInsights} from "@vercel/speed-insights/next";
import MainLayout from "../app/layouts/MainLayout";
import MainTitle from "@/widgets/main-title/MainTitle";
import MainGynecology from "@/widgets/main-gynecology/MainGynecology";
import MainStories from "@/widgets/main-stories/MainStories";
import MainVideoTestimonials from "@/widgets/main-video-testimonials/MainVideoTestimonials";
import TrustCareBanner from "@/shared/trust-care-banner/TrustCareBanner";
import FooterAssociations from "@/shared/footer-associations/FooterAssociations";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MainConsultation from "../widgets/main-consultation";
import MedreviewsBlock from "../shared/medreviews-block/MedreviewsBlock";
import { getSeoData } from '../shared/utils/seo-translations';

const Index = ({ seoData }) => {
    return (
        <MainLayout title={seoData?.title} description={seoData?.description}>
            <TrustCareBanner />
            <MainTitle/>
            <MainConsultation />
            <MedreviewsBlock />
            <MainGynecology />
            <MainStories />
            {/*<MainVideoTestimonials />*/}
            <FooterAssociations />
            <SpeedInsights/>
        </MainLayout>
    );
};

export async function getStaticProps({ locale }) {
    // ✅ SEO данные на сервере (для Googlebot)
    const seoData = getSeoData('homePage', locale);
    
    return {
        props: {
            seoData,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default Index;


