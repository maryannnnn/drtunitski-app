import apolloClient from '@/app/graphql/apollo-client';
import {GET_ABOUTS_ALL, GET_ABOUT_BY_SLUG} from '@/entities/about/actions/aboutActions';
import LeftLayout from '@/app/layouts/LeftLayout';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import './index.scss';
import './media.scss';
import BlockItemAbouts from '@/shared/block-item-abouts/BlockItemAbouts';
import MainTemplate from '@/widgets/main-template/MainTemplate';
import {useI18n} from '@/shared/hooks/useI18n';

const AboutPage = ({about}) => {
    const {isRTL, direction} = useI18n();

    if (!about) {
        return (
            <LeftLayout>
                <div dir={direction} style={{padding: '60px 0', textAlign: 'center'}}>
                    <h1>Page not found</h1>
                </div>
            </LeftLayout>
        );
    }

    const bannerData = {
        backgroundImage: about.featuredImage?.node?.sourceUrl,
        title: about.AcfAbout?.titleLong || about.title,
        description: about.AcfAbout?.descriptionAnons,
        imageAnons: about.AcfAbout?.imageAnons?.sourceUrl,
    };

    return (
        <LeftLayout>
            <div dir={direction} className={`about-page ${isRTL ? 'rtl' : ''}`}>
                <MainTemplate bannerData={bannerData}>
                    <BlockItemAbouts data={about}/>
                </MainTemplate>
            </div>
        </LeftLayout>
    );
};

export default AboutPage;

export async function getStaticPaths() {
    try {
        const {data} = await apolloClient.query({
            query: GET_ABOUTS_ALL,
        });

        if (!data || !data.abouts || !data.abouts.edges) {
            console.error("No abouts data received from GraphQL");
            return {
                paths: [],
                fallback: 'blocking'
            };
        }

        const paths = data.abouts.edges.map(item => ({
            params: {slug: item.node.slug},
        }));

        console.log("Generated paths: ", paths);

        return {paths, fallback: 'blocking'};
    } catch (error) {
        console.error("Error fetching abouts for static paths:", error);
        return {
            paths: [],
            fallback: 'blocking'
        };
    }
}

export async function getStaticProps({params, locale}) {
    try {
        const {data} = await apolloClient.query({
            query: GET_ABOUT_BY_SLUG,
            variables: {slug: params.slug},
        });

        return {
            props: {
                about: data.about || null,
                ...(await serverSideTranslations(locale, ['common'])),
            },
            revalidate: 2592000, // 30 days in seconds
        };
    } catch (error) {
        console.error(`Error fetching data for about slug ${params.slug}:`, error);
        return {
            props: {
                about: null,
                ...(await serverSideTranslations(locale, ['common'])),
            },
            revalidate: 2592000,
        };
    }
}
