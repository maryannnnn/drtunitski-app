import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import './accessibility-widget.scss';
import './media.scss';
import { 
    MdAccessibility, 
    MdTextIncrease, 
    MdTextDecrease, 
    MdContrast, 
    MdHighlight, 
    MdFormatLineSpacing,
    MdRefresh,
    MdClose,
    MdFormatSize,
    MdTextFields,
    MdMouse
} from 'react-icons/md';

const AccessibilityWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState({
        textSize: 100,
        contrast: false,
        highlightLinks: false,
        lineHeight: false,
        readableFont: false,
        largeCursor: false,
        grayscale: false
    });
    
    const { locale } = useRouter();
    const panelRef = useRef(null);

    const translations = {
        en: {
            title: 'Accessibility',
            textSize: 'Text Size',
            contrast: 'High Contrast',
            highlightLinks: 'Highlight Links',
            lineHeight: 'Line Spacing',
            readableFont: 'Readable Font',
            largeCursor: 'Large Cursor',
            grayscale: 'Grayscale',
            reset: 'Reset All'
        },
        ru: {
            title: 'Доступность',
            textSize: 'Размер текста',
            contrast: 'Контрастность',
            highlightLinks: 'Выделить ссылки',
            lineHeight: 'Интервал',
            readableFont: 'Читаемый шрифт',
            largeCursor: 'Большой курсор',
            grayscale: 'Ч/Б режим',
            reset: 'Сбросить'
        },
        he: {
            title: 'נגישות',
            textSize: 'גודל טקסט',
            contrast: 'ניגודיות',
            highlightLinks: 'הדגש קישורים',
            lineHeight: 'מרווח',
            readableFont: 'גופן קריא',
            largeCursor: 'סמן גדול',
            grayscale: 'אפור',
            reset: 'אפס'
        },
        ar: {
            title: 'إمكانية الوصول',
            textSize: 'حجم النص',
            contrast: 'تباين',
            highlightLinks: 'إبراز الروابط',
            lineHeight: 'تباعد',
            readableFont: 'خط قابل للقراءة',
            largeCursor: 'مؤشر كبير',
            grayscale: 'رمادي',
            reset: 'إعادة تعيين'
        },
        de: {
            title: 'Barrierefreiheit',
            textSize: 'Textgröße',
            contrast: 'Kontrast',
            highlightLinks: 'Links hervorheben',
            lineHeight: 'Abstand',
            readableFont: 'Lesbare Schrift',
            largeCursor: 'Großer Cursor',
            grayscale: 'Graustufen',
            reset: 'Zurücksetzen'
        },
        fr: {
            title: 'Accessibilité',
            textSize: 'Taille du texte',
            contrast: 'Contraste',
            highlightLinks: 'Surligner les liens',
            lineHeight: 'Espacement',
            readableFont: 'Police lisible',
            largeCursor: 'Grand curseur',
            grayscale: 'Niveaux de gris',
            reset: 'Réinitialiser'
        },
        es: {
            title: 'Accesibilidad',
            textSize: 'Tamaño de texto',
            contrast: 'Contraste',
            highlightLinks: 'Resaltar enlaces',
            lineHeight: 'Espaciado',
            readableFont: 'Fuente legible',
            largeCursor: 'Cursor grande',
            grayscale: 'Escala de grises',
            reset: 'Restablecer'
        }
    };

    const t = translations[locale] || translations.en;
    const isRTL = locale === 'he' || locale === 'ar';

    // Load settings from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('a11y-settings');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setSettings(parsed);
                applySettings(parsed);
            } catch (e) {
                console.error('Error loading accessibility settings:', e);
            }
        }
    }, []);

    // Save settings to localStorage and apply them
    useEffect(() => {
        localStorage.setItem('a11y-settings', JSON.stringify(settings));
        applySettings(settings);
    }, [settings]);

    // Close panel when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && panelRef.current && !panelRef.current.contains(event.target)) {
                const toggleBtn = document.querySelector('.a11y-toggle');
                if (toggleBtn && !toggleBtn.contains(event.target)) {
                    setIsOpen(false);
                }
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const applySettings = (s) => {
        const wrapper = document.querySelector('.wrapper');
        if (!wrapper) return;

        // Text size using zoom (more reliable than fontSize)
        wrapper.style.zoom = `${s.textSize}%`;
        
        // Apply body classes
        document.body.classList.toggle('a11y-contrast', s.contrast);
        document.body.classList.toggle('a11y-highlight', s.highlightLinks);
        document.body.classList.toggle('a11y-line-height', s.lineHeight);
        document.body.classList.toggle('a11y-readable', s.readableFont);
        document.body.classList.toggle('a11y-cursor', s.largeCursor);
        document.body.classList.toggle('a11y-gray', s.grayscale);
    };

    const increaseText = () => {
        if (settings.textSize < 150) {
            setSettings({...settings, textSize: settings.textSize + 10});
        }
    };

    const decreaseText = () => {
        if (settings.textSize > 80) {
            setSettings({...settings, textSize: settings.textSize - 10});
        }
    };

    const toggleSetting = (key) => {
        setSettings({...settings, [key]: !settings[key]});
    };

    const resetSettings = () => {
        const defaults = {
            textSize: 100,
            contrast: false,
            highlightLinks: false,
            lineHeight: false,
            readableFont: false,
            largeCursor: false,
            grayscale: false
        };
        setSettings(defaults);
        const wrapper = document.querySelector('.wrapper');
        if (wrapper) wrapper.style.zoom = '100%';
        localStorage.removeItem('a11y-settings');
    };

    return (
        <>
            <button 
                className={`a11y-toggle ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={t.title}
                aria-expanded={isOpen}
            >
                <MdAccessibility />
            </button>

            {isOpen && (
                <div className="a11y-panel" ref={panelRef} dir={isRTL ? 'rtl' : 'ltr'}>
                    <div className="a11y-header">
                        <h3>{t.title}</h3>
                        <button 
                            onClick={() => setIsOpen(false)} 
                            aria-label="Close"
                            className="a11y-close"
                        >
                            <MdClose />
                        </button>
                    </div>

                    <div className="a11y-content">
                        {/* Text Size */}
                        <div className="a11y-item a11y-text-size">
                            <div className="a11y-label">
                                <MdFormatSize />
                                <span>{t.textSize}</span>
                            </div>
                            <div className="a11y-size-ctrl">
                                <button 
                                    onClick={decreaseText} 
                                    disabled={settings.textSize <= 80}
                                    aria-label="Decrease"
                                >
                                    <MdTextDecrease />
                                </button>
                                <span className="a11y-size-val">{settings.textSize}%</span>
                                <button 
                                    onClick={increaseText} 
                                    disabled={settings.textSize >= 150}
                                    aria-label="Increase"
                                >
                                    <MdTextIncrease />
                                </button>
                            </div>
                        </div>

                        {/* High Contrast */}
                        <div className="a11y-item">
                            <div className="a11y-label">
                                <MdContrast />
                                <span>{t.contrast}</span>
                            </div>
                            <label className="a11y-switch">
                                <input 
                                    type="checkbox" 
                                    checked={settings.contrast}
                                    onChange={() => toggleSetting('contrast')}
                                />
                                <span className="a11y-slider"></span>
                            </label>
                        </div>

                        {/* Highlight Links */}
                        <div className="a11y-item">
                            <div className="a11y-label">
                                <MdHighlight />
                                <span>{t.highlightLinks}</span>
                            </div>
                            <label className="a11y-switch">
                                <input 
                                    type="checkbox" 
                                    checked={settings.highlightLinks}
                                    onChange={() => toggleSetting('highlightLinks')}
                                />
                                <span className="a11y-slider"></span>
                            </label>
                        </div>

                        {/* Line Height */}
                        <div className="a11y-item">
                            <div className="a11y-label">
                                <MdFormatLineSpacing />
                                <span>{t.lineHeight}</span>
                            </div>
                            <label className="a11y-switch">
                                <input 
                                    type="checkbox" 
                                    checked={settings.lineHeight}
                                    onChange={() => toggleSetting('lineHeight')}
                                />
                                <span className="a11y-slider"></span>
                            </label>
                        </div>

                        {/* Readable Font */}
                        <div className="a11y-item">
                            <div className="a11y-label">
                                <MdTextFields />
                                <span>{t.readableFont}</span>
                            </div>
                            <label className="a11y-switch">
                                <input 
                                    type="checkbox" 
                                    checked={settings.readableFont}
                                    onChange={() => toggleSetting('readableFont')}
                                />
                                <span className="a11y-slider"></span>
                            </label>
                        </div>

                        {/* Large Cursor */}
                        <div className="a11y-item">
                            <div className="a11y-label">
                                <MdMouse />
                                <span>{t.largeCursor}</span>
                            </div>
                            <label className="a11y-switch">
                                <input 
                                    type="checkbox" 
                                    checked={settings.largeCursor}
                                    onChange={() => toggleSetting('largeCursor')}
                                />
                                <span className="a11y-slider"></span>
                            </label>
                        </div>

                        {/* Grayscale */}
                        <div className="a11y-item">
                            <div className="a11y-label">
                                <span className="a11y-gray-icon">◐</span>
                                <span>{t.grayscale}</span>
                            </div>
                            <label className="a11y-switch">
                                <input 
                                    type="checkbox" 
                                    checked={settings.grayscale}
                                    onChange={() => toggleSetting('grayscale')}
                                />
                                <span className="a11y-slider"></span>
                            </label>
                        </div>

                        {/* Reset Button */}
                        <button className="a11y-reset" onClick={resetSettings}>
                            <MdRefresh /> {t.reset}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AccessibilityWidget;

