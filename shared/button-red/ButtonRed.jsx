import './button-red.scss'
import './media.scss'
const ButtonRed = ({type, name, onClick}) => {
    return (
        <button
            className="button-red"
            type={type}
            onClick={onClick}
        >
            {name}
        </button>
    )
}

export default ButtonRed