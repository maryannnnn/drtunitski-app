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
import {useQuery} from "@apollo/client";
import apolloClient from '../app/graphql/apollo-client';
import {GET_HOME_DATA} from "../entities/main/actions/mainActions";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { filterByLanguage } from '../shared/utils/language-filter';


const Index = ({initialData}) => {
    const { t } = useTranslation('common');
    const router = useRouter();
    const { locale } = router;
    
    const PageProps = {
        title: t('common:navigation.home'),
        description: t('common:navigation.home')
    };

    const {loading, error, data} = useQuery(GET_HOME_DATA, {
        fetchPolicy: "cache-first",
        nextFetchPolicy: "cache-and-network"
    });

    const rawData = data || initialData;

    // Filter data by current language
    const displayData = rawData ? {
        ...rawData,
        abouts: {
            ...rawData.abouts,
            edges: filterByLanguage(rawData.abouts?.edges || [], locale)
        },
        massages: {
            ...rawData.massages,
            edges: filterByLanguage(rawData.massages?.edges || [], locale)
        },
        courses: {
            ...rawData.courses,
            edges: filterByLanguage(rawData.courses?.edges || [], locale)
        },
        testimonials: {
            ...rawData.testimonials,
            edges: filterByLanguage(rawData.stories?.edges || [], locale)
        },
        posts: {
            ...rawData.posts,
            edges: filterByLanguage(rawData.medias?.edges || [], locale)
        }
    } : null;

    return (
        <MainLayout title={PageProps.title} description={PageProps.description}>

            {loading && !displayData ? (
                <div>...</div>
            ) : error ? (
                <Stack sx={{width: '100%'}} spacing={2}>
                    <Alert severity="error">
                        {error.graphQLErrors ? error.graphQLErrors.map((err, index) => (
                            <div key={index}>{err.message}</div>
                        )) : 'An error occurred'}
                    </Alert>
                </Stack>
            ) : (
                <>
                    <TrustCareBanner />
                
                    <MainTitle/>

                    <MainGynecology />

                    <MainStories />

                    <MainVideoTestimonials />

                    <FooterAssociations />
                </>
            )}
            <SpeedInsights/>
        </MainLayout>
    );
};

export async function getStaticProps({ locale }) {
    try {
        console.log("GraphQL URL in getStaticProps:", process.env.NEXT_PUBLIC_BACKEND_API_URL);
        
        const {data} = await apolloClient.query({
            query: GET_HOME_DATA
        });

        // Ensure data is not undefined and has proper structure
        const safeData = data || {};

        return {
            props: {
                initialData: {
                    abouts: safeData.abouts || { edges: [] },
                    massages: safeData.massages || { edges: [] },
                    courses: safeData.courses || { edges: [] },
                    stories: safeData.stories || { edges: [] },
                    medias: safeData.medias || { edges: [] }
                },
                ...(await serverSideTranslations(locale, ['common'])),
            },
            revalidate: 3600, // 1 hour for homepage - more frequent updates
        };
    } catch (error) {
        console.error("Error fetching home data:", error);
        console.error("Error details:", error.message);
        console.error("Error network:", error.networkError);
        
        // Return fallback data when GraphQL is unavailable
        return {
            props: {
                initialData: { 
                    abouts: { edges: [] },
                    massages: { edges: [] },
                    courses: { edges: [] },
                    stories: { edges: [] },
                    medias: { edges: [] }
                },
                ...(await serverSideTranslations(locale, ['common'])),
            },
            revalidate: 300, // 5 minutes - retry faster on error
        };
    }
}

export default Index;


