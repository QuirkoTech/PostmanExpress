import Keypad from "./components/Keypad";
import {ArrowLeft} from "lucide-react";
import { useState } from "react";

const App = () => {
    const [pin, setPin] = useState("");

    const handleDigitClick = (digit) => {
        setPin((prevPin) => prevPin + digit);
    };

    const handleClearClick = () => {
        setPin("");
    };

    const handleSubmitClick = () => {
        // Implement your logic to handle the submitted input
        console.log("Submitted input:", pin);
    };

    return (
        <main className="bg-dark-main relative min-h-screen text-slate-gray">
            <div className="max-container pt-32 flex flex-col">
                <input
                    type="text"
                    value={pin}
                    readOnly
                    className="m mb-10 w-1/2 self-center rounded-md border text-center text-black text-xl"
                />
                <Keypad
                    onDigitClick={handleDigitClick}
                    onClearClick={handleClearClick}
                    onSubmitClick={handleSubmitClick}
                />
            </div>
        </main>
    );
};

export default App;
