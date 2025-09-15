import React from 'react';
import '../app/scss/app.scss';
import {SpeedInsights} from "@vercel/speed-insights/next";
import MainLayout from "../app/layouts/MainLayout";
import MainBanner from "@/widgets/main-banner/MainBanner";
import MainBonus from "@/widgets/main-bonus/MainBonus";
import MainCompany from "@/widgets/main-company/MainCompany";
import MainMassage from "@/widgets/main-massage/MainMassage";
import MainCourse from "@/widgets/main-course/MainCourse";
import MainTestimonial from "@/widgets/main-testimonial/MainTestimonial";
import MainPost from "@/widgets/main-post/MainPost";
import MainTitle from "@/widgets/main-title/MainTitle";
import TrustCareBanner from "@/shared/trust-care-banner/TrustCareBanner";
import FooterAssociations from "@/shared/footer-associations/FooterAssociations";
import {useQuery} from "@apollo/client";
import apolloClient from '../app/graphql/apollo-client';
import {GET_HOME_DATA} from "../entities/main/actions/mainActions";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import {getMainTitle, getTestimonialType} from "../app/info/info";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { filterByLanguage } from '../shared/utils/language-filter';


const Index = ({initialData}) => {
    const { t } = useTranslation();
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
        salons: {
            ...rawData.salons,
            edges: filterByLanguage(rawData.salons?.edges || [], locale)
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
    const {data} = await apolloClient.query({
        query: GET_HOME_DATA
    });

    console.log("Fetched data:", data);

    return {
        props: {
            initialData: data,
            ...(await serverSideTranslations(locale, ['common'])),
        },
       // revalidate: 2592000, // Revalidate every 30 days
    };
}

export default Index;


