import './modal.scss'
import { useSafeTranslation } from '../hooks/useSafeTranslation';
import ContactForm from '../contact-form/ContactForm';

const Modal = ({active, setActive, children, title}) => {
    const { t } = useSafeTranslation();
    
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                <button className="modal__close" onClick={() => setActive(false)}>
                    ×
                </button>
                {title && <h2 className="modal__title">{title}</h2>}
                {children || (
                    <div className="modal__form-wrapper">
                        <div className="modal__text">
                            <p>{t('common:modal.appointmentText')}</p>
                        </div>
                        <ContactForm />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Modal;