import React from 'react';
import { Box, Typography, Container, Paper, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const ErrorFallback = ({ error, resetError }) => {
    const router = useRouter();
    const { t } = useTranslation();

    const handleGoHome = () => {
        router.push('/');
    };

    const handleRetry = () => {
        if (resetError) {
            resetError();
        } else {
            router.reload();
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom color="error">
                    {t('common:error.title', 'Something went wrong')}
                </Typography>
                
                <Typography variant="body1" paragraph>
                    {t('common:error.description', 'We apologize for the inconvenience. The page you are looking for is temporarily unavailable.')}
                </Typography>

                {error && (
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            {t('common:error.details', 'Error details:')} {error.message}
                        </Typography>
                    </Box>
                )}

                <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button 
                        variant="contained" 
                        onClick={handleRetry}
                        sx={{ minWidth: 120 }}
                    >
                        {t('common:error.retry', 'Try Again')}
                    </Button>
                    
                    <Button 
                        variant="outlined" 
                        onClick={handleGoHome}
                        sx={{ minWidth: 120 }}
                    >
                        {t('common:error.goHome', 'Go Home')}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default ErrorFallback;
