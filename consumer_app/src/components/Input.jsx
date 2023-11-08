const Input = ({ type, placeHolder, register, errorMessage }) => {
    return (
        <>
            <input
                type={type}
                className="bg-dark-secondary rounded-low border-slate-blue placeholder:text-slate-gray placeholder:font-barlow w-full border-2 px-5
        py-1 placeholder:opacity-70 focus:outline-none focus:ring-1"
                placeholder={placeHolder}
                {...register}
            />
            <span role="alert" className="text-danger-main mb-6 self-start text-sm">
                {errorMessage}
            </span>
        </>
    );
};

export default Input;
