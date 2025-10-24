import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSafeTranslation } from '../hooks/useSafeTranslation';
import { 
    Alert, 
    AlertTitle, 
    Button, 
    Box, 
    Typography,
    IconButton,
    Collapse
} from '@mui/material';
import { 
    Language as LanguageIcon,
    Close as CloseIcon,
    Check as CheckIcon
} from '@mui/icons-material';
import { detectUserLanguage, getLanguageName } from '../utils/language-detection';
import './language-detection-banner.scss';

const LanguageDetectionBanner = () => {
    const router = useRouter();
    const { t } = useSafeTranslation();
    const { locale } = router;
    const [showBanner, setShowBanner] = useState(false);
    const [detectedLanguage, setDetectedLanguage] = useState(null);

    useEffect(() => {
        // Show banner only on first visit and if language was auto-detected
        if (typeof window !== 'undefined') {
            const hasSeenBanner = localStorage.getItem('language-detection-banner-seen');
            const languageSet = localStorage.getItem('language-set');
            
            if (!hasSeenBanner && !languageSet) {
                const detected = detectUserLanguage();
                if (detected !== locale) {
                    setDetectedLanguage(detected);
                    setShowBanner(true);
                }
            }
        }
    }, [locale]);

    const handleAcceptLanguage = () => {
        if (detectedLanguage) {
            router.push(router.asPath, router.asPath, { locale: detectedLanguage });
        }
        setShowBanner(false);
        localStorage.setItem('language-detection-banner-seen', 'true');
        localStorage.setItem('language-set', 'true');
    };

    const handleDismiss = () => {
        setShowBanner(false);
        localStorage.setItem('language-detection-banner-seen', 'true');
    };

    if (!showBanner || !detectedLanguage) {
        return null;
    }

    return (
        <Box className="language-detection-banner">
            <Collapse in={showBanner}>
                <Alert 
                    severity="info" 
                    className="language-detection-banner__alert"
                    icon={<LanguageIcon />}
                    action={
                        <Box className="language-detection-banner__actions">
                            <Button
                                color="inherit"
                                size="small"
                                onClick={handleAcceptLanguage}
                                startIcon={<CheckIcon />}
                                className="language-detection-banner__accept-btn"
                            >
                                {t('common:yes')}
                            </Button>
                            <IconButton
                                size="small"
                                onClick={handleDismiss}
                                className="language-detection-banner__dismiss-btn"
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    }
                >
                    <AlertTitle className="language-detection-banner__title">
                        {t('common:languageDetection.title')}
                    </AlertTitle>
                    <Typography variant="body2" className="language-detection-banner__message">
                        {t('common:languageDetection.message', { 
                            language: getLanguageName(detectedLanguage),
                            currentLanguage: getLanguageName(locale)
                        })}
                    </Typography>
                </Alert>
            </Collapse>
        </Box>
    );
};

export default LanguageDetectionBanner;
