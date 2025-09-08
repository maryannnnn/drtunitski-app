import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { 
    FormControl, 
    Select, 
    MenuItem, 
    Box,
    Typography
} from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import './language-switcher.scss';

const languages = [
    { code: 'en', name: 'English', short: 'EN' },
    { code: 'ru', name: 'Русский', short: 'RU' },
    { code: 'he', name: 'עברית', short: 'HE' },
];

const LanguageSwitcher = ({ variant = 'dropdown', showLabel = false }) => {
    const router = useRouter();
    const { t } = useTranslation();
    const { locale } = router;
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const handleLanguageChange = (newLocale) => {
        router.push(router.asPath, router.asPath, { locale: newLocale });
        setOpen(false);
    };

    const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

    // Закрытие при клике вне компонента
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Dropdown variant - компактный с буквами
    if (variant === 'dropdown') {
        return (
            <Box ref={ref} className="language-switcher language-switcher--dropdown">
                {showLabel && (
                    <Typography variant="body2" className="language-switcher__label">
                        {t('common:language')}
                    </Typography>
                )}
                <Box 
                    className="language-switcher__current"
                    onClick={() => setOpen(!open)}
                >
                    <span className="language-switcher__short">{currentLanguage.short}</span>
                </Box>
                {open && (
                    <Box 
                        className="language-switcher__dropdown"
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: '0',
                            right: '0',
                            background: '#ffffff',
                            border: '1px solid #e9ecef',
                            borderRadius: '3px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            zIndex: 99999,
                            marginTop: '2px'
                        }}
                    >
                        {languages.map((language) => (
                            <Box
                                key={language.code}
                                className={`language-switcher__option ${
                                    language.code === locale ? 'language-switcher__option--active' : ''
                                }`}
                                onClick={() => handleLanguageChange(language.code)}
                                title={language.name}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '6px 8px',
                                    cursor: 'pointer',
                                    background: language.code === locale ? '#dee2e6' : '#ffffff',
                                    borderBottom: '1px solid #e9ecef'
                                }}
                            >
                                <span className="language-switcher__short">{language.short}</span>
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
        );
    }

    // Select variant (старый вариант)
    return (
        <Box className="language-switcher">
            {showLabel && (
                <Typography variant="body2" className="language-switcher__label">
                    {t('common:language')}
                </Typography>
            )}
            <FormControl size="small" className="language-switcher__form">
                <Select
                    value={locale}
                    onChange={(event) => handleLanguageChange(event.target.value)}
                    displayEmpty
                    className="language-switcher__select"
                    startAdornment={<LanguageIcon className="language-switcher__icon" />}
                >
                    {languages.map((language) => (
                        <MenuItem key={language.code} value={language.code}>
                            <Box className="language-switcher__option">
                                <span className="language-switcher__flag">{language.flag}</span>
                                <span className="language-switcher__name">{language.name}</span>
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default LanguageSwitcher;
