import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import MainLayout from '../app/layouts/MainLayout';
import { Box, Typography, Container, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sitemap = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const isRTL = router.locale === 'he' || router.locale === 'ar';

    const sitemapSections = [
        {
            title: t('sitemap:sections.main.title'),
            items: [
                { label: t('sitemap:sections.main.items.home'), path: '/' },
                { label: t('sitemap:sections.main.items.about'), path: '/about' },
                { label: t('sitemap:sections.main.items.gynecology'), path: '/gynecology' },
                { label: t('sitemap:sections.main.items.cancer'), path: '/cancer' },
                { label: t('sitemap:sections.main.items.surgery'), path: '/surgery' },
                { label: t('sitemap:sections.main.items.stories'), path: '/stories' },
                { label: t('sitemap:sections.main.items.media'), path: '/media' },
                { label: t('sitemap:sections.main.items.contact'), path: '/contact' },
            ]
        },
        {
            title: t('sitemap:sections.about.title'),
            items: [
                { label: t('sitemap:sections.about.items.drSergeTunitski'), path: '/about/dr-serge-tunitski' },
                { label: t('sitemap:sections.about.items.clinicTeam'), path: '/about' },
                { label: t('sitemap:sections.about.items.requestAppointment'), path: '/about/request-appointment' },
                { label: t('sitemap:sections.about.items.preparation'), path: '/about/preparation' },
                { label: t('sitemap:sections.about.items.pricesPayment'), path: '/about/prices-payment' },
                { label: t('sitemap:sections.about.items.medicalTourism'), path: '/about/medical-tourism' },
                { label: t('sitemap:sections.about.items.reviewsTestimonials'), path: '/about/reviews-testimonials' },
            ]
        },
        {
            title: t('sitemap:sections.gynecology.title'),
            subsections: [
                {
                    title: t('sitemap:sections.gynecology.subsections.plannedSurgeries.title'),
                    items: [
                        { label: t('sitemap:sections.gynecology.subsections.plannedSurgeries.items.gynecologicalDiseases'), path: '/gynecology' },
                        { label: t('sitemap:sections.gynecology.subsections.plannedSurgeries.items.uterineFibroids'), path: '/gynecology/uterine-fibroids' },
                        { label: t('sitemap:sections.gynecology.subsections.plannedSurgeries.items.endometriosis'), path: '/gynecology/endometriosis' },
                        { label: t('sitemap:sections.gynecology.subsections.plannedSurgeries.items.ovarianDiseases'), path: '/gynecology/ovarian-diseases' },
                        { label: t('sitemap:sections.gynecology.subsections.plannedSurgeries.items.rectoceleCystocele'), path: '/gynecology/rectocele-cystocele' },
                        { label: t('sitemap:sections.gynecology.subsections.plannedSurgeries.items.cinIII'), path: '/gynecology/cin-iii' },
                        { label: t('sitemap:sections.gynecology.subsections.plannedSurgeries.items.uterineProlapse'), path: '/gynecology/uterine-prolapse' },
                        { label: t('sitemap:sections.gynecology.subsections.plannedSurgeries.items.genitalProlapse'), path: '/gynecology/genital-prolapse' },
                    ]
                },
                {
                    title: t('sitemap:sections.gynecology.subsections.moderateRiskSurgeries.title'),
                    items: [
                        { label: t('sitemap:sections.gynecology.subsections.moderateRiskSurgeries.items.chronicHydrosalpinx'), path: '/gynecology/chronic-hydrosalpinx' },
                        { label: t('sitemap:sections.gynecology.subsections.moderateRiskSurgeries.items.adhesiveDisease'), path: '/gynecology/adhesive-disease' },
                        { label: t('sitemap:sections.gynecology.subsections.moderateRiskSurgeries.items.vaginalSeptum'), path: '/gynecology/vaginal-septum' },
                        { label: t('sitemap:sections.gynecology.subsections.moderateRiskSurgeries.items.polyps'), path: '/gynecology/polyps' },
                    ]
                },
                {
                    title: t('sitemap:sections.gynecology.subsections.emergencySurgeries.title'),
                    items: [
                        { label: t('sitemap:sections.gynecology.subsections.emergencySurgeries.items.ovarianCyst'), path: '/gynecology/ovarian-cyst' },
                        { label: t('sitemap:sections.gynecology.subsections.emergencySurgeries.items.uterinePerforation'), path: '/gynecology/uterine-perforation' },
                        { label: t('sitemap:sections.gynecology.subsections.emergencySurgeries.items.pyosalpinx'), path: '/gynecology/pyosalpinx' },
                        { label: t('sitemap:sections.gynecology.subsections.emergencySurgeries.items.tuboOvarianAbscess'), path: '/gynecology/tubo-ovarian-abscess' },
                        { label: t('sitemap:sections.gynecology.subsections.emergencySurgeries.items.ectopicPregnancy'), path: '/gynecology/ectopic-pregnancy' },
                    ]
                }
            ]
        },
        {
            title: t('sitemap:sections.cancer.title'),
            items: [
                { label: t('sitemap:sections.cancer.items.oncologicalSurgeries'), path: '/cancer' },
                { label: t('sitemap:sections.cancer.items.endometrialCancer'), path: '/cancer/endometrial-cancer' },
                { label: t('sitemap:sections.cancer.items.cervicalCancer'), path: '/cancer/cervical-cancer' },
                { label: t('sitemap:sections.cancer.items.uterineSarcoma'), path: '/cancer/uterine-sarcoma' },
                { label: t('sitemap:sections.cancer.items.fallopianTubeCancer'), path: '/cancer/fallopian-tube-cancer' },
                { label: t('sitemap:sections.cancer.items.vaginalCancer'), path: '/cancer/vaginal-cancer' },
                { label: t('sitemap:sections.cancer.items.vulvarCancer'), path: '/cancer/vulvar-cancer' },
                { label: t('sitemap:sections.cancer.items.choriocarcinoma'), path: '/cancer/choriocarcinoma' },
                { label: t('sitemap:sections.cancer.items.metastaticTumors'), path: '/cancer/metastatic-tumors' },
                { label: t('sitemap:sections.cancer.items.molarPregnancy'), path: '/cancer/molar-pregnancy' },
            ]
        },
        {
            title: t('sitemap:sections.surgery.title'),
            subsections: [
                {
                    title: t('sitemap:sections.surgery.subsections.importantSurgeries.title'),
                    items: [
                        { label: t('sitemap:sections.surgery.subsections.importantSurgeries.items.gynecologicalSurgery'), path: '/surgery' },
                        { label: t('sitemap:sections.surgery.subsections.importantSurgeries.items.laparoscopicOvarianCystectomy'), path: '/surgery/laparoscopic-ovarian-cystectomy' },
                        { label: t('sitemap:sections.surgery.subsections.importantSurgeries.items.hysteroscopyPolypRemoval'), path: '/surgery/hysteroscopy-polyp-removal' },
                        { label: t('sitemap:sections.surgery.subsections.importantSurgeries.items.laparoscopicMyomectomy'), path: '/surgery/laparoscopic-myomectomy' },
                        { label: t('sitemap:sections.surgery.subsections.importantSurgeries.items.hysteroscopicResection'), path: '/surgery/hysteroscopic-resection' },
                        { label: t('sitemap:sections.surgery.subsections.importantSurgeries.items.laparoscopicSalpingectomy'), path: '/surgery/laparoscopic-salpingectomy' },
                        { label: t('sitemap:sections.surgery.subsections.importantSurgeries.items.laparoscopicAdhesiolysis'), path: '/surgery/laparoscopic-adhesiolysis' },
                        { label: t('sitemap:sections.surgery.subsections.importantSurgeries.items.diagnosticLaparoscopy'), path: '/surgery/diagnostic-laparoscopy' },
                        { label: t('sitemap:sections.surgery.subsections.importantSurgeries.items.vacuumAspiration'), path: '/surgery/vacuum-aspiration' },
                        { label: t('sitemap:sections.surgery.subsections.importantSurgeries.items.medicalTermination'), path: '/surgery/medical-termination' },
                        { label: t('sitemap:sections.surgery.subsections.importantSurgeries.items.cervicalConization'), path: '/surgery/cervical-conization' },
                    ]
                },
                {
                    title: t('sitemap:sections.surgery.subsections.complexSurgeries.title'),
                    items: [
                        { label: t('sitemap:sections.surgery.subsections.complexSurgeries.items.hysterectomy'), path: '/surgery/hysterectomy' },
                        { label: t('sitemap:sections.surgery.subsections.complexSurgeries.items.ovarianResectionPCOS'), path: '/surgery/ovarian-resection-pcos' },
                        { label: t('sitemap:sections.surgery.subsections.complexSurgeries.items.laparoscopicEndometriosis'), path: '/surgery/laparoscopic-endometriosis' },
                        { label: t('sitemap:sections.surgery.subsections.complexSurgeries.items.sacrocolpopexy'), path: '/surgery/sacrocolpopexy' },
                        { label: t('sitemap:sections.surgery.subsections.complexSurgeries.items.colporrhaphy'), path: '/surgery/colporrhaphy' },
                        { label: t('sitemap:sections.surgery.subsections.complexSurgeries.items.tvtOProcedure'), path: '/surgery/tvt-o-procedure' },
                        { label: t('sitemap:sections.surgery.subsections.complexSurgeries.items.cervicalLaserVaporization'), path: '/surgery/cervical-laser-vaporization' },
                    ]
                },
                {
                    title: t('sitemap:sections.surgery.subsections.specializedSurgeries.title'),
                    items: [
                        { label: t('sitemap:sections.surgery.subsections.specializedSurgeries.items.radicalHysterectomy'), path: '/surgery/radical-hysterectomy' },
                        { label: t('sitemap:sections.surgery.subsections.specializedSurgeries.items.lymphadenectomy'), path: '/surgery/lymphadenectomy' },
                        { label: t('sitemap:sections.surgery.subsections.specializedSurgeries.items.endometrioticCysts'), path: '/surgery/endometriotic-cysts' },
                        { label: t('sitemap:sections.surgery.subsections.specializedSurgeries.items.vaginalScarStrictures'), path: '/surgery/vaginal-scar-strictures' },
                        { label: t('sitemap:sections.surgery.subsections.specializedSurgeries.items.radicalVulvectomy'), path: '/surgery/radical-vulvectomy' },
                    ]
                },
                {
                    title: t('sitemap:sections.surgery.subsections.plasticSurgery.title'),
                    items: [
                        { label: t('sitemap:sections.surgery.subsections.plasticSurgery.items.plasticSurgery'), path: '/surgery/plastic-surgery' },
                        { label: t('sitemap:sections.surgery.subsections.plasticSurgery.items.labiaplasty'), path: '/surgery/labiaplasty-surgery' },
                        { label: t('sitemap:sections.surgery.subsections.plasticSurgery.items.hymenoplasty'), path: '/surgery/hymenoplasty-restoration' },
                    ]
                }
            ]
        },
        {
            title: t('sitemap:sections.media.title'),
            items: [
                { label: t('sitemap:sections.media.items.clinicBlog'), path: '/media' },
                { label: t('sitemap:sections.media.items.news'), path: '/media/news' },
                { label: t('sitemap:sections.media.items.expertArticles'), path: '/media/expert-articles' },
                { label: t('sitemap:sections.media.items.successStories'), path: '/media/success-stories' },
                { label: t('sitemap:sections.media.items.reviewsTestimonials'), path: '/media/reviews-testimonials' },
                { label: t('sitemap:sections.media.items.faq'), path: '/media/faq' },
            ]
        },
        {
            title: t('sitemap:sections.legal.title'),
            items: [
                { label: t('sitemap:sections.legal.items.privacyPolicy'), path: '/privacy-policy' },
                { label: t('sitemap:sections.legal.items.accessibilityStatement'), path: '/accessibility-statement' },
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

export default Sitemap;
