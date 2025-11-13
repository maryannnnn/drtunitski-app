// pages/sitemap.xml.js
import { createServerApolloClient } from '../app/graphql/apollo-client';
import { GET_ABOUT_ALL } from '../entities/about/actions/aboutActions';
import { GET_GYNECOLOGY_ALL } from '../entities/gynecology/actions/gynecologyActions';
import { GET_SURGERY_ALL } from '../entities/surgery/actions/surgeryActions';
import { GET_STORY_ALL } from '../entities/story/actions/storyActions';
import { GET_MEDIA_ALL } from '../entities/media/actions/mediaActions';
import {BASIS_URL_MAIN} from "../app/config/config";

// Создаем серверный Apollo Client для каждого запроса
const getApolloClient = () => createServerApolloClient();

// Маппинг WordPress language codes на префиксы URL
// EN - основной язык БЕЗ префикса, остальные - с префиксами
const LANGUAGE_MAP = {
    'RU': 'ru',
    'EN': '', // Английский - БЕЗ префикса (основной язык)
    'HE': 'he',
    'AR': 'ar',
    'DE': 'de',
    'ES': 'es',
    'FR': 'fr'
};

function generateSiteMap(staticPages, dynamicPages) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
     <!-- Статические страницы -->
     ${staticPages
        .map(({ path, priority, changefreq }) => {
            return `
       <url>
           <loc>${BASIS_URL_MAIN}${path}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <changefreq>${changefreq}</changefreq>
           <priority>${priority}</priority>
       </url>
     `;
        })
        .join('')}
     
     <!-- Динамические страницы -->
     ${dynamicPages
        .map(({ slug, type, langCode }) => {
            const langPrefix = LANGUAGE_MAP[langCode] !== undefined ? LANGUAGE_MAP[langCode] : 'he';
            // Для английского (пустой префикс) URL без языка: /about/slug
            // Для других языков URL с префиксом: /ru/about/slug
            const url = langPrefix 
                ? `${BASIS_URL_MAIN}/${langPrefix}/${type}/${slug}`
                : `${BASIS_URL_MAIN}/${type}/${slug}`;
            return `
       <url>
           <loc>${url}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>0.7</priority>
       </url>
     `;
        })
        .join('')}
   </urlset>
 `;
}

// Статические страницы - с префиксами языков (ru, en, he)
const staticPages = [
    // Главная страница для всех языков
    { path: '/ru', priority: '1.0', changefreq: 'daily' },
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/he', priority: '1.0', changefreq: 'daily' },
    
    // Gynecology - основные страницы
    { path: '/ru/gynecology/planned', priority: '0.8', changefreq: 'monthly' },
    { path: '/gynecology/planned', priority: '0.8', changefreq: 'monthly' },
    { path: '/he/gynecology/planned', priority: '0.8', changefreq: 'monthly' },
    
    // Surgery - основные страницы
    { path: '/ru/surgery/important', priority: '0.8', changefreq: 'monthly' },
    { path: '/surgery/important', priority: '0.8', changefreq: 'monthly' },
    { path: '/he/surgery/important', priority: '0.8', changefreq: 'monthly' },
    
    { path: '/ru/surgery/cancer', priority: '0.8', changefreq: 'monthly' },
    { path: '/surgery/cancer', priority: '0.8', changefreq: 'monthly' },
    { path: '/he/surgery/cancer', priority: '0.8', changefreq: 'monthly' },
    
    { path: '/ru/surgery/plastic-surgery', priority: '0.8', changefreq: 'monthly' },
    { path: '/surgery/plastic-surgery', priority: '0.8', changefreq: 'monthly' },
    { path: '/he/surgery/plastic-surgery', priority: '0.8', changefreq: 'monthly' },
    
    // Story - основные страницы
    { path: '/ru/story/main', priority: '0.8', changefreq: 'monthly' },
    { path: '/story/main', priority: '0.8', changefreq: 'monthly' },
    { path: '/he/story/main', priority: '0.8', changefreq: 'monthly' },
    
    // Media - категории
    { path: '/ru/media/blog', priority: '0.8', changefreq: 'weekly' },
    { path: '/media/blog', priority: '0.8', changefreq: 'weekly' },
    { path: '/he/media/blog', priority: '0.8', changefreq: 'weekly' },
    
    { path: '/ru/media/expert', priority: '0.8', changefreq: 'weekly' },
    { path: '/media/expert', priority: '0.8', changefreq: 'weekly' },
    { path: '/he/media/expert', priority: '0.8', changefreq: 'weekly' },
    
    { path: '/ru/media/faq', priority: '0.8', changefreq: 'monthly' },
    { path: '/media/faq', priority: '0.8', changefreq: 'monthly' },
    { path: '/he/media/faq', priority: '0.8', changefreq: 'monthly' },
    
    { path: '/ru/media/news', priority: '0.8', changefreq: 'daily' },
    { path: '/media/news', priority: '0.8', changefreq: 'daily' },
    { path: '/he/media/news', priority: '0.8', changefreq: 'daily' },
    
    { path: '/ru/media/video', priority: '0.8', changefreq: 'weekly' },
    { path: '/media/video', priority: '0.8', changefreq: 'weekly' },
    { path: '/he/media/video', priority: '0.8', changefreq: 'weekly' },
    
    // Дополнительные страницы
    { path: '/ru/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { path: '/he/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    
    { path: '/ru/accessibility-statement', priority: '0.3', changefreq: 'yearly' },
    { path: '/accessibility-statement', priority: '0.3', changefreq: 'yearly' },
    { path: '/he/accessibility-statement', priority: '0.3', changefreq: 'yearly' },
];

export async function getServerSideProps({ res }) {
    try {
        console.log('🔄 Generating sitemap...');
        console.log('📍 WordPress API URL:', process.env.NEXT_PUBLIC_BACKEND_API_URL);
        console.log('🌍 Environment:', process.env.NODE_ENV);

        const client = getApolloClient();
        console.log('✅ Apollo Client created');

        // Запрашиваем ВСЕ материалы из WordPress
        console.log('🔍 Fetching data from WordPress...');
        
        const [aboutData, gynecologyData, surgeryData, storyData, mediaData] = await Promise.all([
            client.query({ query: GET_ABOUT_ALL }).catch(err => {
                console.error('❌ GET_ABOUT_ALL error:', err.message);
                return { data: null, errors: [err] };
            }),
            client.query({ query: GET_GYNECOLOGY_ALL }).catch(err => {
                console.error('❌ GET_GYNECOLOGY_ALL error:', err.message);
                return { data: null, errors: [err] };
            }),
            client.query({ query: GET_SURGERY_ALL }).catch(err => {
                console.error('❌ GET_SURGERY_ALL error:', err.message);
                return { data: null, errors: [err] };
            }),
            client.query({ query: GET_STORY_ALL }).catch(err => {
                console.error('❌ GET_STORY_ALL error:', err.message);
                return { data: null, errors: [err] };
            }),
            client.query({ query: GET_MEDIA_ALL }).catch(err => {
                console.error('❌ GET_MEDIA_ALL error:', err.message);
                return { data: null, errors: [err] };
            }),
        ]);

        console.log('📊 Data fetched:', {
            about: aboutData.data?.abouts?.edges?.length || 0,
            gynecology: gynecologyData.data?.gynecologies?.edges?.length || 0,
            surgery: surgeryData.data?.surgeries?.edges?.length || 0,
            story: storyData.data?.stories?.edges?.length || 0,
            media: mediaData.data?.medias?.edges?.length || 0,
        });

        // Проверяем на ошибки
        if (aboutData.errors) console.error('⚠️ About has errors:', aboutData.errors);
        if (gynecologyData.errors) console.error('⚠️ Gynecology has errors:', gynecologyData.errors);
        if (surgeryData.errors) console.error('⚠️ Surgery has errors:', surgeryData.errors);
        if (storyData.errors) console.error('⚠️ Story has errors:', storyData.errors);
        if (mediaData.errors) console.error('⚠️ Media has errors:', mediaData.errors);

        // Формируем динамические страницы
        const dynamicPages = [];

        // About pages - с учетом языка
        if (aboutData.data?.abouts?.edges) {
            aboutData.data.abouts.edges.forEach(edge => {
                if (edge.node?.slug && edge.node?.language?.code) {
                    dynamicPages.push({
                        slug: edge.node.slug,
                        type: 'about',
                        langCode: edge.node.language.code
                    });
                }
            });
        }

        // Gynecology pages - с учетом языка
        if (gynecologyData.data?.gynecologies?.edges) {
            gynecologyData.data.gynecologies.edges.forEach(edge => {
                if (edge.node?.slug && edge.node?.language?.code) {
                    dynamicPages.push({
                        slug: edge.node.slug,
                        type: 'gynecology',
                        langCode: edge.node.language.code
                    });
                }
            });
        }

        // Surgery pages - с учетом языка
        if (surgeryData.data?.surgeries?.edges) {
            surgeryData.data.surgeries.edges.forEach(edge => {
                if (edge.node?.slug && edge.node?.language?.code) {
                    dynamicPages.push({
                        slug: edge.node.slug,
                        type: 'surgery',
                        langCode: edge.node.language.code
                    });
                }
            });
        }

        // Story pages - с учетом языка
        if (storyData.data?.stories?.edges) {
            storyData.data.stories.edges.forEach(edge => {
                if (edge.node?.slug && edge.node?.language?.code) {
                    dynamicPages.push({
                        slug: edge.node.slug,
                        type: 'story',
                        langCode: edge.node.language.code
                    });
                }
            });
        }

        // Media pages - с учетом языка
        if (mediaData.data?.medias?.edges) {
            mediaData.data.medias.edges.forEach(edge => {
                if (edge.node?.slug && edge.node?.language?.code) {
                    dynamicPages.push({
                        slug: edge.node.slug,
                        type: 'media',
                        langCode: edge.node.language.code
                    });
                }
            });
        }

        console.log('✅ Total dynamic pages:', dynamicPages.length);

        const sitemap = generateSiteMap(staticPages, dynamicPages);

        res.setHeader('Content-Type', 'text/xml');
        res.write(sitemap);
        res.end();

        return {
            props: {},
        };
    } catch (error) {
        console.error('❌ Sitemap generation error:', error);

        // Fallback - только статические страницы при ошибке
        const sitemap = generateSiteMap(staticPages, []);

        res.setHeader('Content-Type', 'text/xml');
        res.write(sitemap);
        res.end();

        return {
            props: {},
        };
    }
}

export default function SiteMap() {
    return null;
}