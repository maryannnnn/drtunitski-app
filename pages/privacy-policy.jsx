import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSafeTranslation } from '../shared/hooks/useSafeTranslation';
import MainLayout from '../app/layouts/MainLayout';
import { Box, Typography, Container, Paper, Divider, List, ListItem, ListItemText } from '@mui/material';
import { getSeoData } from '../shared/utils/seo-translations';
import './privacy-policy.scss';

const PrivacyPolicy = ({ seoData }) => {
    const { t } = useSafeTranslation('privacyPolicy');

    return (
        <MainLayout
            title={seoData?.title || t('title')}
            description={seoData?.description || t('description')}
        >
            <Container maxWidth="lg" className="privacy-policy-container">
                <Paper elevation={3} className="privacy-policy-paper">
                    {/* Заголовок */}
                    <Box className="privacy-header">
                        <Typography variant="h3" component="h1" className="privacy-title">
                            🛡️ {t('title')}
                        </Typography>
                        <Typography variant="subtitle1" className="privacy-updated">
                            {t('lastUpdated')}
                    </Typography>
                    </Box>
                    
                    <Divider sx={{ my: 3 }} />

                    {/* 1. Введение */}
                    <Box className="privacy-section">
                        <Typography variant="h4" component="h2" className="section-title">
                            1. {t('sections.introduction.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('sections.introduction.content')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('sections.introduction.regulations')}
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary={t('sections.introduction.regulation1')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.introduction.regulation2')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.introduction.regulation3')} />
                            </ListItem>
                        </List>
                        <Typography variant="body1" paragraph>
                            {t('sections.introduction.agreement')}
                        </Typography>
                    </Box>

                    {/* 2. Какие данные мы собираем */}
                    <Box className="privacy-section">
                        <Typography variant="h4" component="h2" className="section-title">
                            2. {t('sections.dataCollection.title')}
                        </Typography>
                        
                        <Typography variant="h6" className="subsection-title">
                            2.1. {t('sections.dataCollection.direct.title')}
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary={t('sections.dataCollection.direct.item1')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.dataCollection.direct.item2')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.dataCollection.direct.item3')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.dataCollection.direct.item4')} />
                            </ListItem>
                        </List>

                        <Typography variant="h6" className="subsection-title">
                            2.2. {t('sections.dataCollection.automatic.title')}
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary={t('sections.dataCollection.automatic.item1')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.dataCollection.automatic.item2')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.dataCollection.automatic.item3')} />
                            </ListItem>
                        </List>

                        <Typography variant="h6" className="subsection-title">
                            2.3. {t('sections.dataCollection.thirdParty.title')}
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary={t('sections.dataCollection.thirdParty.item1')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.dataCollection.thirdParty.item2')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.dataCollection.thirdParty.item3')} />
                            </ListItem>
                        </List>
                    </Box>

                    {/* 3. Как мы используем ваши данные */}
                    <Box className="privacy-section">
                        <Typography variant="h4" component="h2" className="section-title">
                            3. {t('sections.dataUsage.title')}
                        </Typography>
                        
                        <Typography variant="h6" className="subsection-title">
                            3.1. {t('sections.dataUsage.purposes.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('sections.dataUsage.purposes.content')}
                        </Typography>

                        <Typography variant="h6" className="subsection-title">
                            3.2. {t('sections.dataUsage.medical.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('sections.dataUsage.medical.content')}
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary={t('sections.dataUsage.medical.basis1')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.dataUsage.medical.basis2')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.dataUsage.medical.basis3')} />
                            </ListItem>
                        </List>
                    </Box>

                    {/* 4. Передача данных третьим лицам */}
                    <Box className="privacy-section">
                        <Typography variant="h4" component="h2" className="section-title">
                            4. {t('sections.dataSharing.title')}
                        </Typography>
                        
                        <Typography variant="h6" className="subsection-title">
                            4.1. {t('sections.dataSharing.internal.title')}
                        </Typography>
                    <Typography variant="body1" paragraph>
                            {t('sections.dataSharing.internal.content')}
                    </Typography>

                        <Typography variant="h6" className="subsection-title">
                            4.2. {t('sections.dataSharing.external.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('sections.dataSharing.external.content')}
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary={t('sections.dataSharing.external.category1')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.dataSharing.external.category2')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.dataSharing.external.category3')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.dataSharing.external.category4')} />
                            </ListItem>
                        </List>

                        <Typography variant="h6" className="subsection-title">
                            4.3. {t('sections.dataSharing.international.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('sections.dataSharing.international.content')}
                        </Typography>
                    </Box>

                    {/* 5. Конкретные сторонние сервисы */}
                    <Box className="privacy-section">
                        <Typography variant="h4" component="h2" className="section-title">
                            5. {t('sections.thirdPartyServices.title')}
                        </Typography>
                        
                        <Typography variant="h6" className="subsection-title">
                            5.1. {t('sections.thirdPartyServices.communication.title')}
                        </Typography>
                        <List dense>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.communication.whatsapp')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.communication.telegram')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.communication.messenger')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.communication.viber')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.communication.wechat')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.communication.line')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.communication.signal')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.communication.slack')} /></ListItem>
                        </List>

                        <Typography variant="h6" className="subsection-title">
                            5.2. {t('sections.thirdPartyServices.socialMedia.title')}
                        </Typography>
                        <List dense>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.socialMedia.facebook')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.socialMedia.instagram')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.socialMedia.youtube')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.socialMedia.linkedin')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.socialMedia.twitter')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.socialMedia.tiktok')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.socialMedia.pinterest')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.socialMedia.reddit')} /></ListItem>
                        </List>

                        <Typography variant="h6" className="subsection-title">
                            5.3. {t('sections.thirdPartyServices.analytics.title')}
                        </Typography>
                        <List dense>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.analytics.googleAnalytics')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.analytics.yandex')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.analytics.clarity')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.analytics.hotjar')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.analytics.amplitude')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.analytics.mixpanel')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.analytics.adobe')} /></ListItem>
                        </List>

                        <Typography variant="h6" className="subsection-title">
                            5.4. {t('sections.thirdPartyServices.marketing.title')}
                        </Typography>
                        <List dense>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.marketing.googleAds')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.marketing.fbPixel')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.marketing.linkedinTag')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.marketing.tiktokPixel')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.marketing.twitterPixel')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.marketing.pinterestTag')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.marketing.criteo')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.marketing.googleMarketing')} /></ListItem>
                        </List>

                        <Typography variant="h6" className="subsection-title">
                            5.5. {t('sections.thirdPartyServices.technical.title')}
                        </Typography>
                        <List dense>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.technical.gtm')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.technical.cloudflare')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.technical.vercel')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.technical.sentry')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.technical.newRelic')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.technical.googleFonts')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.technical.fontAwesome')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.technical.workspace')} /></ListItem>
                        </List>

                        <Typography variant="h6" className="subsection-title">
                            5.6. {t('sections.thirdPartyServices.crm.title')}
                        </Typography>
                        <List dense>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.crm.hubspot')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.crm.salesforce')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.crm.mailchimp')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.crm.sendgrid')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.crm.calendly')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.crm.acuity')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.crm.typeform')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.crm.jotform')} /></ListItem>
                        </List>

                        <Typography variant="h6" className="subsection-title">
                            5.7. {t('sections.thirdPartyServices.payment.title')}
                        </Typography>
                        <List dense>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.payment.stripe')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.payment.paypal')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.payment.square')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.payment.applePay')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.payment.googlePay')} /></ListItem>
                        </List>

                        <Typography variant="h6" className="subsection-title">
                            5.8. {t('sections.thirdPartyServices.medical.title')}
                        </Typography>
                        <List dense>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.medical.ehr')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.medical.imaging')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.medical.telemedicine')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.medical.billing')} /></ListItem>
                        </List>

                        <Typography variant="h6" className="subsection-title">
                            5.9. {t('sections.thirdPartyServices.additional.title')}
                        </Typography>
                        <List dense>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.additional.zoom')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.additional.teams')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.additional.meet')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.additional.dropbox')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.additional.drive')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.additional.onedrive')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.additional.notion')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.additional.trello')} /></ListItem>
                        </List>

                        <Typography variant="h6" className="subsection-title">
                            5.10. {t('sections.thirdPartyServices.consent.title')}
                        </Typography>
                        <List dense>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.consent.onetrust')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.consent.cookiebot')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.consent.termly')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.consent.iubenda')} /></ListItem>
                        </List>

                        <Typography variant="h4" component="h3" className="subsection-title" sx={{ mt: 3 }}>
                            {t('sections.thirdPartyServices.internationalTransfer.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('sections.thirdPartyServices.internationalTransfer.content')}
                        </Typography>
                        <List dense>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.internationalTransfer.item1')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.internationalTransfer.item2')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.internationalTransfer.item3')} /></ListItem>
                            <ListItem><ListItemText primary={t('sections.thirdPartyServices.internationalTransfer.item4')} /></ListItem>
                        </List>

                        <Typography variant="h4" component="h3" className="subsection-title" sx={{ mt: 3 }}>
                            {t('sections.thirdPartyServices.consentManagement.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('sections.thirdPartyServices.consentManagement.content')}
                        </Typography>
                    </Box>

                    {/* 6. Cookies */}
                    <Box className="privacy-section">
                        <Typography variant="h4" component="h2" className="section-title">
                            6. {t('sections.cookies.title')}
                        </Typography>
                        
                        <Typography variant="h6" className="subsection-title">
                            6.1. {t('sections.cookies.essential.title')}
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary={t('sections.cookies.essential.item1')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.cookies.essential.item2')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.cookies.essential.item3')} />
                            </ListItem>
                        </List>

                        <Typography variant="h6" className="subsection-title">
                            6.2. {t('sections.cookies.analytics.title')}
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary={t('sections.cookies.analytics.item1')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.cookies.analytics.item2')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.cookies.analytics.item3')} />
                            </ListItem>
                        </List>

                        <Typography variant="h6" className="subsection-title">
                            6.3. {t('sections.cookies.marketing.title')}
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary={t('sections.cookies.marketing.item1')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.cookies.marketing.item2')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.cookies.marketing.item3')} />
                            </ListItem>
                        </List>
                        <Typography variant="body1" paragraph>
                            {t('sections.cookies.control')}
                        </Typography>
                    </Box>

                    {/* 7. Безопасность данных */}
                    <Box className="privacy-section">
                        <Typography variant="h4" component="h2" className="section-title">
                            7. {t('sections.security.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('sections.security.intro')}
                        </Typography>
                        
                        <Typography variant="h6" className="subsection-title">
                            7.1. {t('sections.security.technical.title')}
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary={`🔒 ${t('sections.security.technical.item1')}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`🛡️ ${t('sections.security.technical.item2')}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`📊 ${t('sections.security.technical.item3')}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`🔍 ${t('sections.security.technical.item4')}`} />
                            </ListItem>
                        </List>

                        <Typography variant="h6" className="subsection-title">
                            7.2. {t('sections.security.organizational.title')}
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary={t('sections.security.organizational.item1')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.security.organizational.item2')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.security.organizational.item3')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.security.organizational.item4')} />
                            </ListItem>
                        </List>

                        <Typography variant="h6" className="subsection-title">
                            7.3. {t('sections.security.medical.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('sections.security.medical.content')}
                        </Typography>
                    </Box>

                    {/* 8. Сроки хранения */}
                    <Box className="privacy-section">
                        <Typography variant="h4" component="h2" className="section-title">
                            8. {t('sections.retention.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('sections.retention.intro')}
                        </Typography>
                        
                        <Typography variant="h6" className="subsection-title">
                            8.1. {t('sections.retention.medical.title')}
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary={t('sections.retention.medical.item1')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.retention.medical.item2')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.retention.medical.item3')} />
                            </ListItem>
                        </List>

                        <Typography variant="h6" className="subsection-title">
                            8.2. {t('sections.retention.personal.title')}
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary={t('sections.retention.personal.item1')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.retention.personal.item2')} />
                            </ListItem>
                        </List>

                        <Typography variant="h6" className="subsection-title">
                            8.3. {t('sections.retention.technical.title')}
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary={t('sections.retention.technical.item1')} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t('sections.retention.technical.item2')} />
                            </ListItem>
                        </List>
                    </Box>

                    {/* 9. Ваши права */}
                    <Box className="privacy-section">
                        <Typography variant="h4" component="h2" className="section-title">
                            9. {t('sections.rights.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('sections.rights.intro')}
                        </Typography>
                        
                        <Typography variant="h6" className="subsection-title">
                            9.1. {t('sections.rights.basic.title')}
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary={`✅ ${t('sections.rights.basic.item1')}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`✅ ${t('sections.rights.basic.item2')}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`✅ ${t('sections.rights.basic.item3')}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`✅ ${t('sections.rights.basic.item4')}`} />
                            </ListItem>
                        </List>

                        <Typography variant="h6" className="subsection-title">
                            9.2. {t('sections.rights.additional.title')}
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary={`⏸️ ${t('sections.rights.additional.item1')}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`🚫 ${t('sections.rights.additional.item2')}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`❌ ${t('sections.rights.additional.item3')}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`🤖 ${t('sections.rights.additional.item4')}`} />
                            </ListItem>
                        </List>

                        <Typography variant="h6" className="subsection-title">
                            9.3. {t('sections.rights.procedure.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('sections.rights.procedure.content')}
                        </Typography>
                    </Box>

                    {/* 10. Контакты */}
                    <Box className="privacy-section">
                        <Typography variant="h4" component="h2" className="section-title">
                            10. {t('sections.contact.title')}
                        </Typography>
                        
                        <Typography variant="h6" className="subsection-title">
                            10.1. {t('sections.contact.controller')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Dr. Serge Tunitski Medical Clinic
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary="📍 Eli Landau 7, Herzliya, Israel" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="📞 0507377870" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="✉️ drtunitski@gmail.com" />
                            </ListItem>
                        </List>
                    </Box>

                    {/* 11. Изменения политики */}
                    <Box className="privacy-section">
                        <Typography variant="h4" component="h2" className="section-title">
                            11. {t('sections.changes.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('sections.changes.intro')}
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary={`📧 ${t('sections.changes.method1')}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`🌐 ${t('sections.changes.method2')}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`🔔 ${t('sections.changes.method3')}`} />
                            </ListItem>
                        </List>
                        <Typography variant="body1" paragraph>
                            {t('sections.changes.effective')}
                        </Typography>
                    </Box>

                    {/* 12. Юридическая информация */}
                    <Box className="privacy-section">
                        <Typography variant="h4" component="h2" className="section-title">
                            12. {t('sections.legal.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('sections.legal.content')}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    {/* Футер */}
                    <Box className="privacy-footer">
                        <Typography variant="body2" color="text.secondary">
                            {t('footer.effective')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {t('footer.version')}
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </MainLayout>
    );
};

export async function getStaticProps({ locale }) {
    // ✅ SEO данные на сервере - читаем title/description из privacyPolicy.json
    const seoData = getSeoData('', locale, 'privacyPolicy');
    
    return {
        props: {
            seoData,
            ...(await serverSideTranslations(locale, ['common', 'privacyPolicy'])),
        },
    };
}

export default PrivacyPolicy;

