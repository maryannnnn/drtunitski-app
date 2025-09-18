import React from 'react';
import '../app/scss/app.scss';
import {SpeedInsights} from "@vercel/speed-insights/next";
import MainLayout from "../app/layouts/MainLayout";
import { useTranslation } from 'next-i18next';
import MainBanner from "@/widgets/main-banner/MainBanner";
import MainBonus from "@/widgets/main-bonus/MainBonus";
import MainCompany from "@/widgets/main-company/MainCompany";
import MainMassage from "@/widgets/main-massage/MainMassage";
import MainCourse from "@/widgets/main-course/MainCourse";
import MainTestimonial from "@/widgets/main-testimonial/MainTestimonial";
import MainPost from "@/widgets/main-post/MainPost";
import MainTitle from "@/widgets/main-title/MainTitle";
import MainGynecology from "@/widgets/main-gynecology/MainGynecology";
import MainStories from "@/widgets/main-stories/MainStories";
import TrustCareBanner from "@/shared/trust-care-banner/TrustCareBanner";
import FooterAssociations from "@/shared/footer-associations/FooterAssociations";
import VideoDisplayTest from "@/shared/video-display/VideoDisplayTest";
import {useQuery} from "@apollo/client";
import apolloClient from '../app/graphql/apollo-client';
import {GET_HOME_DATA} from "../entities/main/actions/mainActions";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import {getMainTitle, getTestimonialType} from "../app/info/info";
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
        bonuses: {
            ...rawData.bonuses,
            edges: filterByLanguage(rawData.bonuses?.edges || [], locale)
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
            edges: filterByLanguage(rawData.testimonials?.edges || [], locale)
        },
        posts: {
            ...rawData.posts,
            edges: filterByLanguage(rawData.posts?.edges || [], locale)
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
                
{/*                    {displayData.bonuses?.edges?.length > 0 && (
                        <MainBanner data={displayData}/>
                    )}*/}

                    <MainTitle/>

                    <MainGynecology />

                    <MainStories />

                    <FooterAssociations />
                    


{/*                    {displayData.salons?.edges?.length > 0 && (
                        <MainCompany data={displayData}/>
                    )}*/}

{/*                    {displayData.bonuses?.edges?.length > 0 && (
                        <MainBonus data={displayData}/>
                    )}

                    {displayData.massages?.edges?.length > 0 && (
                        <MainMassage data={displayData}/>
                    )}

                    {displayData.courses?.edges?.length > 0 && (
                        <MainCourse data={displayData}/>
                    )}

                    {displayData.testimonials?.edges?.length > 0 && (
                        <MainTestimonial data={displayData} type={getTestimonialType(t).main}/>
                    )}*/}

{/*
                    {displayData.posts?.edges?.length > 0 && (
                        <MainPost data={displayData}/>
                    )}*/}
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

        console.log("Fetched data:", data);

        // Ensure data is not undefined and has proper structure
        const safeData = data || {};

        return {
            props: {
                initialData: {
                    category1: safeData.category1 || null,
                    category2: safeData.category2 || null,
                    category3: safeData.category3 || null,
                    category4: safeData.category4 || null,
                    category5: safeData.category5 || null,
                    about: safeData.about || null,
                    abouts: safeData.abouts || { edges: [] },
                    bonuses: safeData.bonuses || { edges: [] },
                    massages: safeData.massages || { edges: [] },
                    courses: safeData.courses || { edges: [] },
                    testimonials: safeData.testimonials || { edges: [] },
                    posts: safeData.posts || { edges: [] }
                },
                ...(await serverSideTranslations(locale, ['common'])),
            },
           // revalidate: 2592000, // Revalidate every 30 days
        };
    } catch (error) {
        console.error("Error fetching home data:", error);
        console.error("Error details:", error.message);
        console.error("Error network:", error.networkError);
        
        // Return fallback data when GraphQL is unavailable
        return {
            props: {
                initialData: { 
                    category1: null,
                    category2: null,
                    category3: null,
                    category4: null,
                    category5: null,
                    about: null,
                    abouts: { edges: [] },
                    bonuses: { edges: [] },
                    massages: { edges: [] },
                    courses: { edges: [] },
                    testimonials: { edges: [] },
                    posts: { edges: [] }
                },
                ...(await serverSideTranslations(locale, ['common'])),
            },
        };
    }
}

export default Index;


