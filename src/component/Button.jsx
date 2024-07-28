

const Button = ({ backgroundColor, color, type, label }) => {

    return (
        <button style={{backgroundColor: backgroundColor,color:color}} type={type}>{label}</button>
    )
}
export default Button