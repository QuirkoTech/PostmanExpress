import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";

function App() {
    return <main className="bg-dark-main relative h-screen">
        <Routes>
            <Route path="/" element={<SignUp />} />
        </Routes>
    </main>;
}

export default App;
