

const Button = ({ className, backgroundColor, color, type, label, onClick }) => {

    return (
        <button className={className} style={{backgroundColor: backgroundColor,color:color}} type={type} onClick={onClick}>{label}</button>
    )
}
export default Button