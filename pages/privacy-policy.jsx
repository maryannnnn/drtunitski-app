import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import MainLayout from '../app/layouts/MainLayout';
import { Box, Typography, Container, Paper } from '@mui/material';

const PrivacyPolicy = () => {
    const { t } = useTranslation();

    return (
        <MainLayout
            title={t('privacyPolicy:title')}
            description={t('privacyPolicy:description')}
        >
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        {t('privacyPolicy:title')}
                    </Typography>
                    
                    <Typography variant="body1" paragraph>
                        {t('privacyPolicy:lastUpdated')}
                    </Typography>

                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            {t('privacyPolicy:sections.introduction.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('privacyPolicy:sections.introduction.content')}
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            {t('privacyPolicy:sections.dataCollection.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('privacyPolicy:sections.dataCollection.content')}
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            {t('privacyPolicy:sections.dataUsage.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('privacyPolicy:sections.dataUsage.content')}
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            {t('privacyPolicy:sections.dataProtection.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('privacyPolicy:sections.dataProtection.content')}
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            {t('privacyPolicy:sections.contact.title')}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t('privacyPolicy:sections.contact.content')}
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
            ...(await serverSideTranslations(locale, ['common', 'privacyPolicy'])),
        },
    };
}

export default PrivacyPolicy;
