import './button-brown.scss'
import './media.scss'
const ButtonBrown = ({type, name, onClick}) => {
    return (
        <button
            className="button-brown"
            type={type}
            onClick={onClick}
        >
            {name}
        </button>
    )
}

export default ButtonBrown