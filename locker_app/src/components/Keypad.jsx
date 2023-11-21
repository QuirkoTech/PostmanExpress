const Keypad = ({ onDigitClick, onClearClick, isSubmitting }) => {
    const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    return (
        <div className="mx-auto grid w-1/3 grid-cols-3 gap-3">
            {digits.map((digit) => (
                <button
                    className="bg-dark-secondary rounded-md text-xl font-bold shadow-md shadow-transparent "
                    key={digit}
                    onClick={(e) => {
                        e.preventDefault();
                        onDigitClick(digit);
                    }}
                >
                    {digit}
                </button>
            ))}
            <button
                className="rounded-md bg-red-600 text-xl text-white shadow-md shadow-transparent "
                onClick={(e) => {
                    e.preventDefault();
                    onClearClick();
                }}
            >
                Clear
            </button>
            <button
                className="rounded-md bg-green-600 text-xl text-white shadow-md shadow-transparent"
                disabled={isSubmitting}
                type="submit"
            >
                Submit
            </button>
        </div>
    );
};

export default Keypad;
