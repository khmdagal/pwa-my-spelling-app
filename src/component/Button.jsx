

const Button = ({ className, backgroundColor, color, type, label, onClick, hidden }) => {

    return (
        <button className={className} style={{ backgroundColor: backgroundColor, color: color }} type={type} onClick={onClick} hidden={hidden}>{label}</button>
    )
}
export default Button