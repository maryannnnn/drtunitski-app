import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import MainLayout from '../app/layouts/MainLayout';
import { Box, Typography, Container, Paper } from '@mui/material';

const AccessibilityStatement = () => {
    const { t } = useTranslation();

    return (
        <MainLayout
            title={t('accessibilityStatement:title')}
            description={t('accessibilityStatement:description')}
        >
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        {t('accessibilityStatement:title')}
                    </Typography>
                    
                    <Typography variant="body1" paragraph>
                        {t('accessibilityStatement:lastUpdated')}
                    </Typography>

                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            {t('accessibilityStatement:sections.commitment.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('accessibilityStatement:sections.commitment.content')}
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            {t('accessibilityStatement:sections.standards.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('accessibilityStatement:sections.standards.content')}
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            {t('accessibilityStatement:sections.features.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('accessibilityStatement:sections.features.content')}
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            {t('accessibilityStatement:sections.feedback.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('accessibilityStatement:sections.feedback.content')}
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
