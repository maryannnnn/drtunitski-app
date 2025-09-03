import './button.scss'
import React from "react";
import './media.scss'

const Button = (props) => {
    return (
        <button
            type={props.type}
            className={props.className}
            onClick={props.onClick}
        >
            {props.name}
        </button>
    )

}

export default Button;