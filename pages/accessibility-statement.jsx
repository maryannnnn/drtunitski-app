import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSafeTranslation } from '../shared/hooks/useSafeTranslation';
import MainLayout from '../app/layouts/MainLayout';
import { Box, Typography, Container, Paper, List, ListItem, ListItemText } from '@mui/material';

const AccessibilityStatement = () => {
    const { t } = useSafeTranslation('accessibilityStatement');

    const renderList = (items) => {
        return (
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
                {items.map((item, index) => (
                    <ListItem key={index} sx={{ display: 'list-item', py: 0.5 }}>
                        <ListItemText primary={item} />
                    </ListItem>
                ))}
            </List>
        );
    };

    return (
        <MainLayout
            title={t('title')}
            description={t('description')}
        >
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        {t('title')}
                    </Typography>
                    
                    <Typography variant="body2" paragraph sx={{ fontWeight: 'bold' }}>
                        {t('lastUpdated')}
                    </Typography>

                    {/* Section 1: Philosophy */}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {t('sections.philosophy.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('sections.philosophy.content')}
                        </Typography>
                    </Box>

                    {/* Section 2: Physical Accessibility */}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {t('sections.physicalAccessibility.title')}
                        </Typography>
                        
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                            {t('sections.physicalAccessibility.generalInfo')}
                        </Typography>
                        {renderList(t('sections.physicalAccessibility.features', { returnObjects: true }))}

                        <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                            {t('sections.physicalAccessibility.specializedServices')}
                        </Typography>
                        {renderList(t('sections.physicalAccessibility.services', { returnObjects: true }))}
                    </Box>

                    {/* Section 3: Web Accessibility */}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {t('sections.webAccessibility.title')}
                        </Typography>
                        
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                            {t('sections.webAccessibility.compliance')}
                        </Typography>
                        {renderList(t('sections.webAccessibility.standards', { returnObjects: true }))}

                        <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 3 }}>
                            {t('sections.webAccessibility.implementedFeatures')}
                        </Typography>

                        {/* Visual Impairment */}
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2, fontSize: '0.95rem' }}>
                            {t('sections.webAccessibility.visualImpairment.title')}
                        </Typography>
                        {renderList(t('sections.webAccessibility.visualImpairment.features', { returnObjects: true }))}

                        {/* Hearing Impairment */}
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2, fontSize: '0.95rem' }}>
                            {t('sections.webAccessibility.hearingImpairment.title')}
                        </Typography>
                        {renderList(t('sections.webAccessibility.hearingImpairment.features', { returnObjects: true }))}

                        {/* Motor Limitations */}
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2, fontSize: '0.95rem' }}>
                            {t('sections.webAccessibility.motorLimitations.title')}
                        </Typography>
                        {renderList(t('sections.webAccessibility.motorLimitations.features', { returnObjects: true }))}

                        {/* Cognitive Impairment */}
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2, fontSize: '0.95rem' }}>
                            {t('sections.webAccessibility.cognitiveImpairment.title')}
                        </Typography>
                        {renderList(t('sections.webAccessibility.cognitiveImpairment.features', { returnObjects: true }))}
                    </Box>

                    {/* Section 4: Language Support */}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {t('sections.languageSupport.title')}
                        </Typography>
                        
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                            {t('sections.languageSupport.fullSupport')}
                        </Typography>
                        {renderList(t('sections.languageSupport.mainLanguages', { returnObjects: true }))}

                        <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                            {t('sections.languageSupport.basicSupport')}
                        </Typography>
                        {renderList(t('sections.languageSupport.additionalLanguages', { returnObjects: true }))}

                        <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                            {t('sections.languageSupport.features')}
                        </Typography>
                        {renderList(t('sections.languageSupport.featuresList', { returnObjects: true }))}

                        <Typography variant="body1" paragraph sx={{ mt: 2, fontStyle: 'italic' }}>
                            {t('sections.languageSupport.note')}
                        </Typography>
                    </Box>

                    {/* Section 5: Technical Info */}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {t('sections.technicalInfo.title')}
                        </Typography>
                        <List sx={{ pl: 2 }}>
                            <ListItem sx={{ py: 0.5 }}>
                                <ListItemText primary={t('sections.technicalInfo.testedIn')} />
                            </ListItem>
                            <ListItem sx={{ py: 0.5 }}>
                                <ListItemText primary={t('sections.technicalInfo.mobileSupport')} />
                            </ListItem>
                            <ListItem sx={{ py: 0.5 }}>
                                <ListItemText primary={t('sections.technicalInfo.recommendedScreenReader')} />
                            </ListItem>
                        </List>
                    </Box>

                    {/* Section 6: Limitations */}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {t('sections.limitations.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('sections.limitations.intro')}
                        </Typography>
                        {renderList(t('sections.limitations.items', { returnObjects: true }))}
                    </Box>

                    {/* Section 7: Alternative Formats */}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {t('sections.alternativeFormats.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('sections.alternativeFormats.intro')}
                        </Typography>
                        {renderList(t('sections.alternativeFormats.formats', { returnObjects: true }))}
                    </Box>

                    {/* Section 8: Feedback */}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {t('sections.feedback.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('sections.feedback.intro')}
                        </Typography>
                        
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                            {t('sections.feedback.contactInfo')}
                        </Typography>
                        <List sx={{ pl: 2 }}>
                            <ListItem sx={{ py: 0.5 }}>
                                <ListItemText primary={t('sections.feedback.email')} />
                            </ListItem>
                            <ListItem sx={{ py: 0.5 }}>
                                <ListItemText primary={t('sections.feedback.phone')} />
                            </ListItem>
                            <ListItem sx={{ py: 0.5 }}>
                                <ListItemText primary={t('sections.feedback.address')} />
                            </ListItem>
                        </List>

                        <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                            {t('sections.feedback.responseTime')}
                        </Typography>
                        {renderList(t('sections.feedback.responseTimes', { returnObjects: true }))}
                    </Box>

                    {/* Section 9: Legal Basis */}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {t('sections.legalBasis.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('sections.legalBasis.intro')}
                        </Typography>
                        {renderList(t('sections.legalBasis.laws', { returnObjects: true }))}
                    </Box>

                    {/* Section 10: Future Improvements */}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {t('sections.futureImprovements.title')}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {t('sections.futureImprovements.plan')}
                        </Typography>
                        {renderList(t('sections.futureImprovements.improvements', { returnObjects: true }))}
                    </Box>

                    {/* Footer */}
                    <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #ddd' }}>
                        <Typography variant="body1" sx={{ fontStyle: 'italic', textAlign: 'center' }}>
                            {t('sections.footer')}
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </MainLayout>
    );
};

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'accessibilityStatement'])),
        },
    };
}

export default AccessibilityStatement;
