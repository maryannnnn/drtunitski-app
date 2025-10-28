import React from 'react';
import '../app/scss/app.scss';
import {SpeedInsights} from "@vercel/speed-insights/next";
import MainLayout from "../app/layouts/MainLayout";
import { useSafeTranslation } from '@/shared/hooks/useSafeTranslation';
import MainTitle from "@/widgets/main-title/MainTitle";
import MainGynecology from "@/widgets/main-gynecology/MainGynecology";
import MainStories from "@/widgets/main-stories/MainStories";
import MainVideoTestimonials from "@/widgets/main-video-testimonials/MainVideoTestimonials";
import TrustCareBanner from "@/shared/trust-care-banner/TrustCareBanner";
import FooterAssociations from "@/shared/footer-associations/FooterAssociations";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MainConsultation from "../widgets/main-consultation";

const Index = () => {
    const { t } = useSafeTranslation('common');
    
    const PageProps = {
        title: t('common:navigation.home'),
        description: t('common:navigation.home')
    };

    return (
        <MainLayout title={PageProps.title} description={PageProps.description}>
            <TrustCareBanner />
            <MainTitle/>
            <MainConsultation />
            <MainGynecology />
            <MainStories />
            <MainVideoTestimonials />
            <FooterAssociations />
            <SpeedInsights/>
        </MainLayout>
    );
};

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            _timestamp: Date.now(), // ← ДОБАВЬТЕ ЭТУ СТРОЧКУ
        },
        revalidate: 60, // ← ДОБАВЬТЕ ЭТУ СТРОЧКУ (60 секунд)
    };
}

export default Index;


