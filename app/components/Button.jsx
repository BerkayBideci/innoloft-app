const Button = ({ desc, children, buttonStyle, buttonType, buttonOnClick }) => {
    return (
        <button type={buttonType} className={`${buttonStyle} flex items-center gap-2`} onClick={buttonOnClick}>
            {desc}
            {children}
        </button>
    )
}

export default Button