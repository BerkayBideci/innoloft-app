const Button = ({ desc, children, buttonStyle }) => {
    return (
        <button type="button" className={`${buttonStyle} flex items-center gap-2`}>
            {desc}
            {children}
        </button>
    )
}

export default Button