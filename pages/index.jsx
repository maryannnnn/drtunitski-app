import React from 'react';
import '../app/scss/app.scss';
import {SpeedInsights} from "@vercel/speed-insights/next";
import MainLayout from "../app/layouts/MainLayout";
import { useTranslation } from 'next-i18next';
import MainTitle from "@/widgets/main-title/MainTitle";
import MainGynecology from "@/widgets/main-gynecology/MainGynecology";
import MainStories from "@/widgets/main-stories/MainStories";
import MainVideoTestimonials from "@/widgets/main-video-testimonials/MainVideoTestimonials";
import TrustCareBanner from "@/shared/trust-care-banner/TrustCareBanner";
import FooterAssociations from "@/shared/footer-associations/FooterAssociations";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Index = () => {
    const { t } = useTranslation('common');
    
    const PageProps = {
        title: t('common:navigation.home'),
        description: t('common:navigation.home')
    };

    return (
        <MainLayout title={PageProps.title} description={PageProps.description}>
            <TrustCareBanner />
            <MainTitle/>
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
        },
    };
}

export default Index;


