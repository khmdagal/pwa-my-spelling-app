

const Button = ({ backgroundColor, color, type, label, onClick }) => {

    return (
        <button style={{backgroundColor: backgroundColor,color:color}} type={type} onClick={onClick}>{label}</button>
    )
}
export default Button