import { Routes, Route } from "react-router-dom";
import { SignUp } from "./pages";

function App() {
    return (
        <main className="bg-dark-main relative h-screen text-slate-gray">
            <Routes>
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </main>
    );
}

export default App;
