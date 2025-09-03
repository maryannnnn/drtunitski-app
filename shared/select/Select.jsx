import './select.scss'

const Select = (props) => {
    return (
        <select
            name={props.name}
            value={props.value}
            onChange={props.onChange}
        >
            {(props.options).map((e) => {
              return <option value={e.value} key={e.label}>
                    {e.label}
                </option>
            })}
        </select>
    )
}

export default Select;