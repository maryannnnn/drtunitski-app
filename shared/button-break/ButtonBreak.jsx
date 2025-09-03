import './button-break.scss'
import './media.scss'
const ButtonBreak = ({type, name, onClick}) => {
    return (
        <button
            className="button-break"
            type={type}
            onClick={onClick}
        >
            {name}
        </button>
    )
}

export default ButtonBreak