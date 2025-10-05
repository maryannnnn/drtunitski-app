import apolloClient from '@/app/graphql/apollo-client';
import {GET_ABOUTS_ALL, GET_ABOUT_BY_SLUG} from '@/entities/about/actions/aboutActions';
import LeftLayout from '@/app/layouts/LeftLayout';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import './index.scss';
import './media.scss';
import BlockItemAbouts from '@/shared/block-item-abouts/BlockItemAbouts';
import MainTemplate from '@/widgets/main-template/MainTemplate';
import {useI18n} from '@/shared/hooks/useI18n';
import { filterByLanguage } from '@/shared/utils/language-filter';

const AboutPage = ({about}) => {
    const {isRTL, direction} = useI18n();
    const router = useRouter();

    // Show loading state while page is being generated (ISR fallback)
    if (router.isFallback) {
        return (
            <LeftLayout>
                <div dir={direction} style={{padding: '60px 0', textAlign: 'center'}}>
                    <h1>Loading...</h1>
                </div>
            </LeftLayout>
        );
    }

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

export async function getStaticPaths({ locales }) {
    // TEMPORARY FIX: Skip GraphQL during build, generate pages on-demand
    console.log("⚠️ Skipping GraphQL fetch during build - using fallback: true");
    
    return {
        paths: [], // Пустой массив - страницы будут генерироваться по требованию
        fallback: true // Включаем ISR - страницы генерируются при первом запросе
    };
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
            revalidate: 86400, // 24 hours - страница перегенерируется раз в сутки
        };
    } catch (error) {
        console.error(`Error fetching data for about slug ${params.slug}:`, error);
        return {
            props: {
                about: null,
                ...(await serverSideTranslations(locale, ['common'])),
            },
            revalidate: 3600, // 1 час - повторить попытку быстрее при ошибке
        };
    }
}
