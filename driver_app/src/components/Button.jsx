const Button = ({ className = '', onClick = () => {}, ...props }) => {
    return (
        <button className={`rounded-low bg-green-main self-end px-7 py-1 ${className}`} onClick={onClick} {...props}>
            Apply
        </button>
    );
};

export default Button;
