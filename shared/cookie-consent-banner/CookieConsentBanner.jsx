import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { 
    Box, 
    Button, 
    Typography, 
    Switch, 
    FormControlLabel,
    Collapse,
    IconButton,
    Paper,
    Stack,
    Divider
} from '@mui/material';
import {
    Cookie as CookieIcon,
    Close as CloseIcon,
    Settings as SettingsIcon,
    Check as CheckIcon
} from '@mui/icons-material';
import { CookieConsentManager } from '../utils/cookie-consent-manager';
import Link from 'next/link';
import './cookie-consent-banner.scss';

const CookieConsentBanner = () => {
    const { t } = useTranslation('common');
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [consent, setConsent] = useState({
        essential: true,
        analytics: false,
        marketing: false,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkConsent();
    }, []);

    const checkConsent = async () => {
        try {
            const hasConsent = await CookieConsentManager.hasConsent();
            if (!hasConsent) {
                setShowBanner(true);
            } else {
                // Применяем сохраненные настройки
                const savedConsent = await CookieConsentManager.getConsent();
                if (savedConsent) {
                    CookieConsentManager.applyCookieSettings(savedConsent);
                }
            }
        } catch (error) {
            console.error('Error checking consent:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAcceptAll = async () => {
        const fullConsent = {
            essential: true,
            analytics: true,
            marketing: true,
        };
        const success = await CookieConsentManager.saveConsent(fullConsent);
        if (success) {
            setShowBanner(false);
        }
    };

    const handleAcceptEssential = async () => {
        const essentialOnly = {
            essential: true,
            analytics: false,
            marketing: false,
        };
        const success = await CookieConsentManager.saveConsent(essentialOnly);
        if (success) {
            setShowBanner(false);
        }
    };

    const handleSaveSettings = async () => {
        const success = await CookieConsentManager.saveConsent(consent);
        if (success) {
            setShowBanner(false);
            setShowSettings(false);
        }
    };

    const handleToggle = (type) => {
        if (type === 'essential') return; // Essential всегда включены
        setConsent(prev => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    if (isLoading || !showBanner) {
        return null;
    }

    return (
        <Box className="cookie-consent-banner">
            <Paper elevation={6} className="cookie-banner-paper">
                <Box className="cookie-banner-header">
                    <CookieIcon className="cookie-icon" />
                    <Typography variant="h6" component="h2">
                        {t('cookieConsent.title')}
                    </Typography>
                    <IconButton 
                        size="small" 
                        onClick={handleAcceptEssential}
                        className="close-button"
                        aria-label={t('cookieConsent.close', 'Close')}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Typography variant="body2" paragraph className="cookie-description">
                    {t('cookieConsent.description')}
                    {' '}
                    <Link href="/privacy-policy" passHref legacyBehavior>
                        <Typography 
                            component="a" 
                            variant="body2" 
                            color="primary"
                            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                        >
                            {t('cookieConsent.readMore')}
                        </Typography>
                    </Link>
                </Typography>

                <Collapse in={showSettings}>
                    <Box className="cookie-settings">
                        <Divider sx={{ my: 2 }} />
                        
                        <FormControlLabel
                            control={
                                <Switch 
                                    checked={consent.essential} 
                                    disabled
                                />
                            }
                            label={
                                <Box>
                                    <Typography variant="subtitle2">
                                        {t('cookieConsent.essential.title')}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {t('cookieConsent.essential.description')}
                                    </Typography>
                                </Box>
                            }
                        />

                        <FormControlLabel
                            control={
                                <Switch 
                                    checked={consent.analytics}
                                    onChange={() => handleToggle('analytics')}
                                />
                            }
                            label={
                                <Box>
                                    <Typography variant="subtitle2">
                                        {t('cookieConsent.analytics.title')}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {t('cookieConsent.analytics.description')}
                                    </Typography>
                                </Box>
                            }
                        />

                        <FormControlLabel
                            control={
                                <Switch 
                                    checked={consent.marketing}
                                    onChange={() => handleToggle('marketing')}
                                />
                            }
                            label={
                                <Box>
                                    <Typography variant="subtitle2">
                                        {t('cookieConsent.marketing.title')}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {t('cookieConsent.marketing.description')}
                                    </Typography>
                                </Box>
                            }
                        />
                    </Box>
                </Collapse>

                <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    spacing={1} 
                    className="cookie-actions"
                >
                    {!showSettings ? (
                        <>
                            <Button 
                                variant="outlined"
                                startIcon={<SettingsIcon />}
                                onClick={() => setShowSettings(true)}
                                fullWidth
                                size="small"
                            >
                                {t('cookieConsent.customize')}
                            </Button>
                            <Button 
                                variant="text"
                                onClick={handleAcceptEssential}
                                size="small"
                            >
                                {t('cookieConsent.essentialOnly')}
                            </Button>
                            <Button 
                                variant="contained"
                                startIcon={<CheckIcon />}
                                onClick={handleAcceptAll}
                                fullWidth
                                size="small"
                            >
                                {t('cookieConsent.acceptAll')}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button 
                                variant="outlined"
                                onClick={() => setShowSettings(false)}
                                size="small"
                            >
                                {t('cookieConsent.cancel')}
                            </Button>
                            <Button 
                                variant="contained"
                                startIcon={<CheckIcon />}
                                onClick={handleSaveSettings}
                                fullWidth
                                size="small"
                            >
                                {t('cookieConsent.save')}
                            </Button>
                        </>
                    )}
                </Stack>
            </Paper>
        </Box>
    );
};

export default CookieConsentBanner;

