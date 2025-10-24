import './contact-us-block.scss';
import './media.scss';
import ContactInfoBlock from '../contact-info-block/ContactInfoBlock';
import ContactForm from '../contact-form/ContactForm';
import { useSafeTranslation } from '../hooks/useSafeTranslation';

const ContactUsBlock = () => {
    const { t } = useSafeTranslation();

    return (
        <section className="contact-us-block">
            <div className="container">
                <h2 className="contact-us-block__title">{t('common:contact.title')}</h2>
                <div className="contact-us-block__content">
                    <div className="contact-us-block__left">
                        <h3 className="contact-us-block__subtitle">{t('common:contact.contactInfo')}</h3>
                        <ContactInfoBlock />
                    </div>
                    <div className="contact-us-block__right">
                        <h3 className="contact-us-block__subtitle">{t('common:contact.getInTouch')}</h3>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUsBlock;


