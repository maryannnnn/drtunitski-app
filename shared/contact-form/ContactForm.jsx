import './contact-form.scss';
import './media.scss';
import { useState } from 'react';
import { useSafeTranslation } from '../hooks/useSafeTranslation';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ButtonBrown from '../button-brown/ButtonBrown';
import { FaWhatsapp, FaTelegram, FaFacebookMessenger } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const ContactForm = () => {
    const { t, isLoading } = useSafeTranslation();
    const router = useRouter();
    const { locale } = router;
    const [showEmailForm, setShowEmailForm] = useState(false);
    const { executeRecaptcha } = useGoogleReCaptcha();

    // Трекинг и уведомления для мессенджеров
    const handleMessengerClick = (type, url) => {
        // Google Analytics
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', `${type}_click`, {
                event_category: 'engagement',
                event_label: 'contact_form',
                url: url
            });
        }

        // Telegram уведомление
        fetch('/api/notify-telegram', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: `${type}_opened`,
                source: 'contact_form',
                url: window.location.href,
                timestamp: new Date().toISOString()
            })
        }).catch(err => console.error('Telegram notification error:', err));

        // Открыть мессенджер
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    // Схема валидации Yup
    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .required(t('common:contact.validation.nameRequired') || 'Name is required')
            .min(2, t('common:contact.validation.nameMin') || 'Name must be at least 2 characters'),
        phone: yup
            .string()
            .required(t('common:contact.validation.phoneRequired') || 'Phone is required')
            .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, 
                t('common:contact.validation.phoneInvalid') || 'Invalid phone format'),
        email: yup
            .string()
            .required(t('common:contact.validation.emailRequired') || 'Email is required')
            .email(t('common:contact.validation.emailInvalid') || 'Invalid email format'),
        consultationType: yup
            .string()
            .required(t('common:contact.validation.consultationRequired') || 'Please select consultation type'),
        message: yup
            .string()
            .max(500, t('common:contact.validation.messageMax') || 'Message must not exceed 500 characters'),
        privacyPolicy: yup
            .boolean()
            .oneOf([true], t('common:contact.validation.privacyPolicyRequired') || 'You must agree to the Privacy Policy')
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur'
    });

    const onSubmit = async (data) => {
        try {
            // Получаем токен reCAPTCHA
            if (!executeRecaptcha) {
                console.log('reCAPTCHA еще не готова');
                alert(t('common:contact.recaptchaNotReady') || 'Security check is loading. Please wait...');
                return;
            }

            const recaptchaToken = await executeRecaptcha('contact_form');
            console.log('reCAPTCHA токен получен');
            
            console.log('Отправка формы...', { ...data, locale: locale || 'en' });
            
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...data,
                    locale: locale || 'en',
                    recaptchaToken // Добавляем токен капчи
                })
            });

            console.log('Статус ответа:', response.status);
            
            const result = await response.json();
            console.log('Ответ сервера:', result);

            if (response.ok) {
                alert(t('common:contact.formSent') || 'Форма успешно отправлена!');
                reset();
                setShowEmailForm(false);
            } else {
                console.error('Ошибка сервера:', result);
                throw new Error(result.error || result.details || 'Server error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            const errorMessage = error.message || t('common:contact.formError') || 'Error sending form';
            alert(`${t('common:contact.formError') || 'Ошибка отправки формы'}\n\nДетали: ${errorMessage}\n\nПроверьте консоль браузера (F12) для подробностей.`);
        }
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="contact-form__title">
                {t('common:contact.formTitle')}
            </h3>
            
            {/*<p className="contact-form__promo">*/}
            {/*    {t('common:contact.formPromo')}*/}
            {/*</p>*/}
            
            {/*<p className="contact-form__disclaimer">*/}
            {/*    * {t('common:contact.formDisclaimer')}*/}
            {/*</p>*/}

            <div className="contact-form__messengers">
                <button
                    type="button"
                    onClick={() => handleMessengerClick('whatsapp', 'https://wa.me/972507377870')}
                    className="contact-form__messenger contact-form__messenger--whatsapp"
                >
                    <FaWhatsapp />
                    WhatsApp
                </button>
                <button
                    type="button"
                    onClick={() => handleMessengerClick('telegram', 'https://t.me/+972507377870')}
                    className="contact-form__messenger contact-form__messenger--telegram"
                >
                    <FaTelegram />
                    Telegram
                </button>
                <button
                    type="button" 
                    onClick={() => setShowEmailForm(!showEmailForm)} 
                    className="contact-form__messenger contact-form__messenger--email"
                >
                    <FiMail />
                    E-mail
                </button>
            </div>

            {showEmailForm && (
                <div className="contact-form__fields">
                    <div className="contact-form__field">
                        <input
                            type="text"
                            placeholder={`${t('common:contact.name')} *`}
                            {...register('name')}
                            className={`contact-form__input ${errors.name ? 'contact-form__input--error' : ''}`}
                        />
                        {errors.name && (
                            <span className="contact-form__error">{errors.name.message}</span>
                        )}
                    </div>

                    <div className="contact-form__field">
                        <input
                            type="tel"
                            placeholder={`${t('common:contact.phone')} *`}
                            {...register('phone')}
                            className={`contact-form__input ${errors.phone ? 'contact-form__input--error' : ''}`}
                        />
                        {errors.phone && (
                            <span className="contact-form__error">{errors.phone.message}</span>
                        )}
                    </div>

                    <div className="contact-form__field">
                        <input
                            type="email"
                            placeholder={`${t('common:contact.email')} *`}
                            {...register('email')}
                            className={`contact-form__input ${errors.email ? 'contact-form__input--error' : ''}`}
                        />
                        {errors.email && (
                            <span className="contact-form__error">{errors.email.message}</span>
                        )}
                    </div>

                    <div className="contact-form__field">
                        <select
                            {...register('consultationType')}
                            className={`contact-form__select ${errors.consultationType ? 'contact-form__select--error' : ''}`}
                        >
                            <option value="">{`${t('common:contact.selectConsultation')} *`}</option>
                            <option value="in-person">{t('common:contact.inPersonConsultation')}</option>
                            <option value="online">{t('common:contact.onlineConsultation')}</option>
                            <option value="second-opinion">{t('common:contact.secondOpinion')}</option>
                        </select>
                        {errors.consultationType && (
                            <span className="contact-form__error">{errors.consultationType.message}</span>
                        )}
                    </div>

                    <div className="contact-form__field">
                        <textarea
                            placeholder={t('common:contact.message')}
                            {...register('message')}
                            className={`contact-form__textarea ${errors.message ? 'contact-form__textarea--error' : ''}`}
                            rows="5"
                        />
                        {errors.message && (
                            <span className="contact-form__error">{errors.message.message}</span>
                        )}
                    </div>

                    <div className="contact-form__field">
                        <label className={`contact-form__privacy ${errors.privacyPolicy ? 'contact-form__privacy--error' : ''}`}>
                            <input
                                type="checkbox"
                                {...register('privacyPolicy')}
                                className="contact-form__checkbox"
                            />
                            <span className="contact-form__checkbox-custom"></span>
                            <span className="contact-form__privacy-text">
                                {t('common:contact.privacyPolicyText')}{' '}
                                <Link href="/privacy-policy" className="contact-form__privacy-link" target="_blank">
                                    {t('common:contact.privacyPolicyLink')}
                                </Link>
                                {t('common:contact.privacyPolicyTextAfter') && ` ${t('common:contact.privacyPolicyTextAfter')}`}
                                <span className="contact-form__required"> *</span>
                            </span>
                        </label>
                        {errors.privacyPolicy && (
                            <span className="contact-form__error">{errors.privacyPolicy.message}</span>
                        )}
                    </div>

                    <ButtonBrown type="submit" disabled={isSubmitting || !executeRecaptcha}>
                        {isSubmitting ? t('common:contact.sending') || 'Sending...' : t('common:contact.send')}
                    </ButtonBrown>
                    
                    <p className="contact-form__recaptcha-notice">
                        {t('common:contact.recaptchaNotice') || 'This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.'}
                    </p>
                </div>
            )}
        </form>
    );
};

export default ContactForm;


