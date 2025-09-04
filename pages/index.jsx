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
import {useQuery} from "@apollo/client";
import apolloClient from '../app/graphql/apollo-client';
import {GET_HOME_DATA} from "../entities/main/actions/mainActions";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import {mainTitle, testimonialType} from "../app/info/info";


const Index = ({initialData}) => {
    const PageProps = {
        title: 'Главная',
        description: 'Главная'
    };

    const {loading, error, data} = useQuery(GET_HOME_DATA, {
        fetchPolicy: "cache-first",
        nextFetchPolicy: "cache-and-network"
    });

    const displayData = data || initialData;

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
                   {/* {displayData.bonuses?.edges?.length > 0 && (*/}
                    {/*    <MainBanner data={displayData}/>*/}
                    {/*)} */}

                    {/*{mainTitle?.title && (*/}
                    {/*    <MainTitle/>*/}
                    {/*)}*/}

                    {/*{displayData.salons?.edges?.length > 0 && (*/}
                    {/*    <MainCompany data={displayData}/>*/}
                    {/*)}*/}

                    {/*{displayData.bonuses?.edges?.length > 0 && (*/}
                    {/*    <MainBonus data={displayData}/>*/}
                    {/*)}*/}

{/*                    {displayData.massages?.edges?.length > 0 && (
                        <MainMassage data={displayData}/>
                    )}*/}

{/*                    {displayData.courses?.edges?.length > 0 && (
                        <MainCourse data={displayData}/>
                    )}*/}

{/*                    {displayData.testimonials?.edges?.length > 0 && (
                        <MainTestimonial data={displayData} type={testimonialType.main}/>
                    )}*/}

                    {/*{displayData.posts?.edges?.length > 0 && (*/}
                    {/*    <MainPost data={displayData}/>*/}
                    {/*)}*/}
                </>
            )}
            <SpeedInsights/>
        </MainLayout>
    );
};

export async function getStaticProps() {
    const {data} = await apolloClient.query({
        query: GET_HOME_DATA
    });

    console.log("Fetched data:", data);

    return {
        props: {
            initialData: data
        },
       // revalidate: 2592000, // Revalidate every 30 days
    };
}

export default Index;


