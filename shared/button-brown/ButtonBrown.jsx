import './button-brown.scss'
import './media.scss'
import { useTranslation } from 'next-i18next';

const ButtonBrown = ({type, onClick, children}) => {
    const { t } = useTranslation();
    
    return (
        <button
            className="button-brown"
            type={type}
            onClick={onClick}
        >
            {children || t('common:buttons.bookAppointment')}
        </button>
    )
}

export default ButtonBrown