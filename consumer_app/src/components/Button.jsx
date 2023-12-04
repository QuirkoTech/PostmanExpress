const Button = ({ className = "", onClick = () => {}, ...props }) => {
    return (
        <button
            className={`rounded-low hover:bg-green-active active:bg-green-active bg-green-main self-end px-7 py-1 transition ${className} transition duration-300`}
            onClick={onClick}
            {...props}
        >
            Apply
        </button>
    );
};

export default Button;
