// pages/sitemap.xml.js
import { apolloClient } from '../app/graphql/apollo-client';
import { GET_ABOUT_ALL } from '../entities/about/actions/aboutActions';
import { GET_GYNECOLOGY_ALL } from '../entities/gynecology/actions/gynecologyActions';
import { GET_SURGERY_ALL } from '../entities/surgery/actions/surgeryActions';
import { GET_STORY_ALL } from '../entities/story/actions/storyActions';
import { GET_MEDIA_ALL } from '../entities/media/actions/mediaActions';

const SITE_URL = 'https://drtunitski.co.il';

function generateSiteMap(staticPages, dynamicPages) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
     <!-- Статические страницы -->
     ${staticPages
        .map(({ path, priority, changefreq }) => {
            return `
       <url>
           <loc>${SITE_URL}${path}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <changefreq>${changefreq}</changefreq>
           <priority>${priority}</priority>
       </url>
     `;
        })
        .join('')}
     
     <!-- Динамические страницы -->
     ${dynamicPages
        .map(({ slug, modified, type }) => {
            return `
       <url>
           <loc>${SITE_URL}/${type}/${slug}</loc>
           <lastmod>${modified || new Date().toISOString()}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>0.7</priority>
       </url>
     `;
        })
        .join('')}
   </urlset>
 `;
}

// Статические страницы
const staticPages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/gynecology/planned', priority: '0.8', changefreq: 'monthly' },
    { path: '/surgery/important', priority: '0.8', changefreq: 'monthly' },
    { path: '/surgery/cancer', priority: '0.8', changefreq: 'monthly' },
    { path: '/surgery/plastic-surgery', priority: '0.8', changefreq: 'monthly' },
    { path: '/story/main', priority: '0.8', changefreq: 'monthly' },
    { path: '/media/blog', priority: '0.8', changefreq: 'monthly' },
    { path: '/media/expert', priority: '0.8', changefreq: 'monthly' },
    { path: '/media/faq', priority: '0.8', changefreq: 'monthly' },
    { path: '/media/news', priority: '0.8', changefreq: 'monthly' },
    { path: '/media/video', priority: '0.8', changefreq: 'monthly' },
];

export async function getServerSideProps({ res }) {
    try {
        // Запрашиваем ВСЕ материалы из WordPress
        const [aboutData, gynecologyData, surgeryData, storyData, mediaData] = await Promise.all([
            apolloClient.query({ query: GET_ABOUT_ALL }),
            apolloClient.query({ query: GET_GYNECOLOGY_ALL }),
            apolloClient.query({ query: GET_SURGERY_ALL }),
            apolloClient.query({ query: GET_STORY_ALL }),
            apolloClient.query({ query: GET_MEDIA_ALL }),
        ]);

        // Формируем динамические страницы
        const dynamicPages = [
            // About pages
            ...aboutData.data.abouts.edges.map(edge => ({
                slug: edge.node.slug,
                modified: edge.node.modified,
                type: 'about'
            })),

            // Gynecology pages
            ...gynecologyData.data.gynecologies.edges.map(edge => ({
                slug: edge.node.slug,
                modified: edge.node.modified,
                type: 'gynecology'
            })),

            // Surgery pages
            ...surgeryData.data.surgeries.edges.map(edge => ({
                slug: edge.node.slug,
                modified: edge.node.modified,
                type: 'surgery'
            })),

            // Story pages
            ...storyData.data.stories.edges.map(edge => ({
                slug: edge.node.slug,
                modified: edge.node.modified,
                type: 'story'
            })),

            // Media pages
            ...mediaData.data.medias.edges.map(edge => ({
                slug: edge.node.slug,
                modified: edge.node.modified,
                type: 'media'
            })),
        ];

        const sitemap = generateSiteMap(staticPages, dynamicPages);

        res.setHeader('Content-Type', 'text/xml');
        res.write(sitemap);
        res.end();

        return {
            props: {},
        };
    } catch (error) {
        console.error('Sitemap generation error:', error);

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