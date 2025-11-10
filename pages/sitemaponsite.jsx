import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSafeTranslation } from '../shared/hooks/useSafeTranslation';
import MainLayout from '../app/layouts/MainLayout';
import { Box, Typography, Container, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { processMenuUrl } from '../shared/utils/utils-url';

const Sitemaponsite = () => {
    const { t } = useSafeTranslation();
    const router = useRouter();
    const isRTL = router.locale === 'he' || router.locale === 'ar';
    const currentLocale = router.locale || 'en';

    // Функция для обработки путей в sitemap
    const processSitemapPath = (path) => {
        return processMenuUrl(path, currentLocale);
    };

    const sitemapSections = [
        {
            title: t('sitemap:sections.main.title'),
            items: [
                { label: t('sitemap:sections.main.items.home'), path: processSitemapPath('/') },
                { label: t('sitemap:sections.main.items.about'), path: processSitemapPath('/about/clinic') },
                { label: t('sitemap:sections.main.items.gynecology'), path: processSitemapPath('/gynecology/planned') },
                { label: t('sitemap:sections.main.items.cancer'), path: processSitemapPath('/surgery/cancer') },
                { label: t('sitemap:sections.main.items.surgery'), path: processSitemapPath('/surgery/important') },
                { label: t('sitemap:sections.main.items.stories'), path: processSitemapPath('/story/main') },
                { label: t('sitemap:sections.main.items.media'), path: processSitemapPath('/media/blog') },
                { label: t('sitemap:sections.main.items.contact'), path: processSitemapPath('/about/contact') },
            ]
        },
        {
            title: t('sitemap:sections.about.title'),
            items: [
                { label: t('sitemap:sections.about.items.drSergeTunitski'), path: processSitemapPath('/about/dr-serge-tunitski') },
                { label: t('sitemap:sections.about.items.clinicTeam'), path: processSitemapPath('/about/clinic') },
                { label: t('sitemap:sections.about.items.requestAppointment'), path: processSitemapPath('/about/request-appointment') },
                { label: t('sitemap:sections.about.items.preparation'), path: processSitemapPath('/about/preparation') },
                { label: t('sitemap:sections.about.items.pricesPayment'), path: processSitemapPath('/about/prices-payment') },
                { label: t('sitemap:sections.about.items.medicalTourism'), path: processSitemapPath('/about/medical-tourism') },
                { label: t('sitemap:sections.about.items.reviewsTestimonials'), path: processSitemapPath('/about/reviews-testimonials') },
            ]
        },
        {
            title: t('sitemap:sections.gynecology.title'),
            subsections: [
                {
                    title: t('sitemap:sections.gynecology.subsections.plannedSurgeries.title'),
                    items: [
                        { label: t('sitemap:sections.gynecology.subsections.plannedSurgeries.items.gynecologicalDiseases'), path: processSitemapPath('/gynecology/planned') },
                        { label: t('sitemap:sections.gynecology.subsections.plannedSurgeries.items.uterineFibroids'), path: processSitemapPath('/gynecology/uterine-fibroids') },
                        { label: t('sitemap:sections.gynecology.subsections.plannedSurgeries.items.endometriosis'), path: processSitemapPath('/gynecology/endometriosis') },
                        { label: t('sitemap:sections.gynecology.subsections.plannedSurgeries.items.ovarianDiseases'), path: processSitemapPath('/gynecology/ovarian-diseases') },
                        { label: t('sitemap:sections.gynecology.subsections.plannedSurgeries.items.rectoceleCystocele'), path: processSitemapPath('/gynecology/rectocele-cystocele') },
                        { label: t('sitemap:sections.gynecology.subsections.plannedSurgeries.items.cinIII'), path: processSitemapPath('/gynecology/cin-iii') },
                        { label: t('sitemap:sections.gynecology.subsections.plannedSurgeries.items.uterineProlapse'), path: processSitemapPath('/gynecology/uterine-prolapse') },
                        { label: t('sitemap:sections.gynecology.subsections.plannedSurgeries.items.genitalProlapse'), path: processSitemapPath('/gynecology/genital-prolapse') },
                    ]
                },
                // {
                //     title: t('sitemap:sections.gynecology.subsections.moderateRiskSurgeries.title'),
                //     items: [
                //         { label: t('sitemap:sections.gynecology.subsections.moderateRiskSurgeries.items.chronicHydrosalpinx'), path: processSitemapPath('/gynecology/chronic-hydrosalpinx') },
                //         { label: t('sitemap:sections.gynecology.subsections.moderateRiskSurgeries.items.adhesiveDisease'), path: processSitemapPath('/gynecology/adhesive-disease') },
                //         { label: t('sitemap:sections.gynecology.subsections.moderateRiskSurgeries.items.vaginalSeptum'), path: processSitemapPath('/gynecology/vaginal-septum') },
                //         { label: t('sitemap:sections.gynecology.subsections.moderateRiskSurgeries.items.polyps'), path: processSitemapPath('/gynecology/polyps') },
                //     ]
                // },
                // {
                //     title: t('sitemap:sections.gynecology.subsections.emergencySurgeries.title'),
                //     items: [
                //         { label: t('sitemap:sections.gynecology.subsections.emergencySurgeries.items.ovarianCyst'), path: processSitemapPath('/gynecology/ovarian-cyst') },
                //         { label: t('sitemap:sections.gynecology.subsections.emergencySurgeries.items.uterinePerforation'), path: processSitemapPath('/gynecology/uterine-perforation') },
                //         { label: t('sitemap:sections.gynecology.subsections.emergencySurgeries.items.pyosalpinx'), path: processSitemapPath('/gynecology/pyosalpinx') },
                //         { label: t('sitemap:sections.gynecology.subsections.emergencySurgeries.items.tuboOvarianAbscess'), path: processSitemapPath('/gynecology/tubo-ovarian-abscess') },
                //         { label: t('sitemap:sections.gynecology.subsections.emergencySurgeries.items.ectopicPregnancy'), path: processSitemapPath('/gynecology/ectopic-pregnancy') },
                //     ]
                // }
            ]
        },
        // {
        //     title: t('sitemap:sections.cancer.title'),
        //     items: [
        //         { label: t('sitemap:sections.cancer.items.oncologicalSurgeries'), path: processSitemapPath('/surgery/cancer') },
        //         { label: t('sitemap:sections.cancer.items.endometrialCancer'), path: processSitemapPath('/surgery/endometrial-surgery') },
        //         { label: t('sitemap:sections.cancer.items.cervicalCancer'), path: processSitemapPath('/surgery/cervical-surgery') },
        //         { label: t('sitemap:sections.cancer.items.uterineSarcoma'), path: processSitemapPath('/surgery/uterine-sarcoma') },
        //         { label: t('sitemap:sections.cancer.items.fallopianTubeCancer'), path: processSitemapPath('/surgery/fallopian-tube-surgery') },
        //         { label: t('sitemap:sections.cancer.items.vaginalCancer'), path: processSitemapPath('/surgery/vaginal-surgery') },
        //         { label: t('sitemap:sections.cancer.items.vulvarCancer'), path: processSitemapPath('/surgery/vulvar-surgery') },
        //         { label: t('sitemap:sections.cancer.items.choriocarcinoma'), path: processSitemapPath('/surgery/choriocarcinoma') },
        //         { label: t('sitemap:sections.cancer.items.metastaticTumors'), path: processSitemapPath('/surgery/metastatic-tumors') },
        //         { label: t('sitemap:sections.cancer.items.molarPregnancy'), path: processSitemapPath('/surgery/molar-pregnancy') },
        //     ]
        // },
        {
            title: t('sitemap:sections.surgery.title'),
            subsections: [
                {
                    title: t('sitemap:sections.surgery.subsections.importantSurgeries.title'),
                    items: [
                        { label: t('sitemap:sections.surgery.subsections.importantSurgeries.items.gynecologicalSurgery'), path: processSitemapPath('/surgery/important') },
                        { label: t('sitemap:sections.surgery.subsections.importantSurgeries.items.laparoscopicOvarianCystectomy'), path: processSitemapPath('/surgery/laparoscopic-ovarian-cystectomy') },
                        { label: t('sitemap:sections.surgery.subsections.importantSurgeries.items.hysteroscopyPolypRemoval'), path: processSitemapPath('/surgery/hysteroscopy-polyp-removal') },
                        { label: t('sitemap:sections.surgery.subsections.importantSurgeries.items.laparoscopicMyomectomy'), path: processSitemapPath('/surgery/laparoscopic-myomectomy') },
                        { label: t('sitemap:sections.surgery.subsections.importantSurgeries.items.hysteroscopicResection'), path: processSitemapPath('/surgery/hysteroscopic-resection') },
                        { label: t('sitemap:sections.surgery.subsections.importantSurgeries.items.laparoscopicSalpingectomy'), path: processSitemapPath('/surgery/laparoscopic-salpingectomy') },
                        { label: t('sitemap:sections.surgery.subsections.importantSurgeries.items.laparoscopicAdhesiolysis'), path: processSitemapPath('/surgery/laparoscopic-adhesiolysis') },
                        { label: t('sitemap:sections.surgery.subsections.importantSurgeries.items.diagnosticLaparoscopy'), path: processSitemapPath('/surgery/diagnostic-laparoscopy') },
                        { label: t('sitemap:sections.surgery.subsections.importantSurgeries.items.vacuumAspiration'), path: processSitemapPath('/surgery/vacuum-aspiration') },
                        { label: t('sitemap:sections.surgery.subsections.importantSurgeries.items.medicalTermination'), path: processSitemapPath('/surgery/medical-termination') },
                        { label: t('sitemap:sections.surgery.subsections.importantSurgeries.items.cervicalConization'), path: processSitemapPath('/surgery/cervical-conization') },
                    ]
                },
                // {
                //     title: t('sitemap:sections.surgery.subsections.complexSurgeries.title'),
                //     items: [
                //         { label: t('sitemap:sections.surgery.subsections.complexSurgeries.items.hysterectomy'), path: processSitemapPath('/surgery/hysterectomy') },
                //         { label: t('sitemap:sections.surgery.subsections.complexSurgeries.items.ovarianResectionPCOS'), path: processSitemapPath('/surgery/ovarian-resection-pcos') },
                //         { label: t('sitemap:sections.surgery.subsections.complexSurgeries.items.laparoscopicEndometriosis'), path: processSitemapPath('/surgery/laparoscopic-endometriosis') },
                //         { label: t('sitemap:sections.surgery.subsections.complexSurgeries.items.sacrocolpopexy'), path: processSitemapPath('/surgery/sacrocolpopexy') },
                //         { label: t('sitemap:sections.surgery.subsections.complexSurgeries.items.colporrhaphy'), path: processSitemapPath('/surgery/colporrhaphy') },
                //         { label: t('sitemap:sections.surgery.subsections.complexSurgeries.items.tvtOProcedure'), path: processSitemapPath('/surgery/tvt-o-procedure') },
                //         { label: t('sitemap:sections.surgery.subsections.complexSurgeries.items.cervicalLaserVaporization'), path: processSitemapPath('/surgery/cervical-laser-vaporization') },
                //     ]
                // },
                // {
                //     title: t('sitemap:sections.surgery.subsections.specializedSurgeries.title'),
                //     items: [
                //         { label: t('sitemap:sections.surgery.subsections.specializedSurgeries.items.radicalHysterectomy'), path: processSitemapPath('/surgery/radical-hysterectomy') },
                //         { label: t('sitemap:sections.surgery.subsections.specializedSurgeries.items.lymphadenectomy'), path: processSitemapPath('/surgery/lymphadenectomy') },
                //         { label: t('sitemap:sections.surgery.subsections.specializedSurgeries.items.endometrioticCysts'), path: processSitemapPath('/surgery/endometriotic-cysts') },
                //         { label: t('sitemap:sections.surgery.subsections.specializedSurgeries.items.vaginalScarStrictures'), path: processSitemapPath('/surgery/vaginal-scar-strictures') },
                //         { label: t('sitemap:sections.surgery.subsections.specializedSurgeries.items.radicalVulvectomy'), path: processSitemapPath('/surgery/radical-vulvectomy') },
                //     ]
                // },
                {
                    title: t('sitemap:sections.surgery.subsections.plasticSurgery.title'),
                    items: [
                        { label: t('sitemap:sections.surgery.subsections.plasticSurgery.items.plasticSurgery'), path: processSitemapPath('/surgery/plastic-surgery') },
                        // { label: t('sitemap:sections.surgery.subsections.plasticSurgery.items.labiaplasty'), path: processSitemapPath('/surgery/labiaplasty-surgery') },
                        // { label: t('sitemap:sections.surgery.subsections.plasticSurgery.items.hymenoplasty'), path: processSitemapPath('/surgery/hymenoplasty-restoration') },
                    ]
                }
            ]
        },
        {
            title: t('sitemap:sections.media.title'),
            items: [
                { label: t('sitemap:sections.media.items.clinicBlog'), path: processSitemapPath('/media') },
                { label: t('sitemap:sections.media.items.news'), path: processSitemapPath('/media/news') },
                { label: t('sitemap:sections.media.items.expertArticles'), path: processSitemapPath('/media/expert-articles') },
                { label: t('sitemap:sections.media.items.successStories'), path: processSitemapPath('/media/success-stories') },
                { label: t('sitemap:sections.media.items.reviewsTestimonials'), path: processSitemapPath('/media/reviews-testimonials') },
                { label: t('sitemap:sections.media.items.faq'), path: processSitemapPath('/media/faq') },
            ]
        },
        {
            title: t('sitemap:sections.legal.title'),
            items: [
                { label: t('sitemap:sections.legal.items.privacyPolicy'), path: processSitemapPath('/privacy-policy') },
                { label: t('sitemap:sections.legal.items.accessibilityStatement'), path: processSitemapPath('/accessibility-statement') },
            ]
        }
    ];

    return (
        <MainLayout
            title={t('sitemap:title')}
            description={t('sitemap:description')}
        >
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        {t('sitemap:title')}
                    </Typography>
                    
                    <Typography variant="body1" paragraph>
                        {t('sitemap:description')}
                    </Typography>

                    {sitemapSections.map((section, index) => (
                        <Box key={index} sx={{ mt: 3 }}>
                            <Typography 
                                variant="h5" 
                                component="h2" 
                                gutterBottom
                                sx={{ 
                                    textAlign: isRTL ? 'right' : 'left',
                                    direction: isRTL ? 'rtl' : 'ltr'
                                }}
                            >
                                {section.title}
                            </Typography>
                            
                            {section.subsections ? (
                                section.subsections.map((subsection, subIndex) => (
                                    <Box key={subIndex} sx={{ mt: 2, ml: isRTL ? 0 : 2, mr: isRTL ? 2 : 0 }}>
                                        <Typography 
                                            variant="h6" 
                                            component="h3" 
                                            gutterBottom
                                            sx={{ 
                                                textAlign: isRTL ? 'right' : 'left',
                                                direction: isRTL ? 'rtl' : 'ltr',
                                                color: 'text.secondary'
                                            }}
                                        >
                                            {subsection.title}
                                        </Typography>
                                        <List>
                                            {subsection.items.map((item, itemIndex) => (
                                                <React.Fragment key={itemIndex}>
                                                    <ListItem 
                                                        component={Link} 
                                                        href={item.path} 
                                                        sx={{ 
                                                            textDecoration: 'none',
                                                            textAlign: isRTL ? 'right' : 'left',
                                                            direction: isRTL ? 'rtl' : 'ltr'
                                                        }}
                                                    >
                                                        <ListItemText 
                                                            primary={item.label}
                                                            sx={{ 
                                                                '& .MuiListItemText-primary': {
                                                                    color: 'primary.main',
                                                                    textAlign: isRTL ? 'right' : 'left',
                                                                    direction: isRTL ? 'rtl' : 'ltr',
                                                                    '&:hover': {
                                                                        textDecoration: 'underline'
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </ListItem>
                                                    {itemIndex < subsection.items.length - 1 && <Divider />}
                                                </React.Fragment>
                                            ))}
                                        </List>
                                    </Box>
                                ))
                            ) : (
                                <List>
                                    {section.items.map((item, itemIndex) => (
                                        <React.Fragment key={itemIndex}>
                                            <ListItem 
                                                component={Link} 
                                                href={item.path} 
                                                sx={{ 
                                                    textDecoration: 'none',
                                                    textAlign: isRTL ? 'right' : 'left',
                                                    direction: isRTL ? 'rtl' : 'ltr'
                                                }}
                                            >
                                                <ListItemText 
                                                    primary={item.label}
                                                    sx={{ 
                                                        '& .MuiListItemText-primary': {
                                                            color: 'primary.main',
                                                            textAlign: isRTL ? 'right' : 'left',
                                                            direction: isRTL ? 'rtl' : 'ltr',
                                                            '&:hover': {
                                                                textDecoration: 'underline'
                                                            }
                                                        }
                                                    }}
                                                />
                                            </ListItem>
                                            {itemIndex < section.items.length - 1 && <Divider />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            )}
                        </Box>
                    ))}
                </Paper>
            </Container>
        </MainLayout>
    );
};

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'sitemap'])),
        },
    };
}

export default Sitemaponsite;
