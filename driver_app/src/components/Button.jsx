const Button = ({ className = "", onClick = () => {}, text, ...props }) => {
    return (
        <button
            className={`rounded-low text-white hover:bg-green-active active:bg-green-active bg-green-main self-end px-7 py-2 transition duration-300 ${className}`}
            onClick={onClick}
            {...props}
        >
            {text ? text : "Apply"}
        </button>
    );
};

export default Button;
