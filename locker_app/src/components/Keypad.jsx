const Keypad = ({ onDigitClick, onClearClick, onSubmitClick }) => {
    const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    return (
        <div className="mx-auto grid w-1/2 grid-cols-3 gap-3">
            {digits.map((digit) => (
                <button
                    className="rounded-md bg-dark-secondary font-bold shadow-md shadow-transparent text-xl "
                    key={digit}
                    onClick={() => onDigitClick(digit)}
                >
                    {digit}
                </button>
            ))}
            <button className="rounded-md bg-red-600 shadow-md shadow-transparent text-xl text-white" onClick={onClearClick}>
                Clear
            </button>
            <button className="rounded-md bg-green-600 shadow-md shadow-transparent text-xl text-white" onClick={onSubmitClick}>
                Submit
            </button>
        </div>
    );
};

export default Keypad;
