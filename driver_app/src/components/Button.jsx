import { Spinner } from "./";

const Button = ({
    className = "",
    onClick = () => {},
    text,
    isSubmitting,
    ...props
}) => {
    return (
        <button
            className={`rounded-low hover:bg-green-active active:bg-green-active bg-green-main cursor-pointer self-end px-7 py-2 text-white transition duration-300 ${className}`}
            onClick={onClick}
            {...props}
        >
            {isSubmitting ? <Spinner /> : text || "Apply"}
        </button>
    );
};

export default Button;
