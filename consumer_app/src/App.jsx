import { Routes, Route } from "react-router-dom";
import { SignUp, Login, HomePage, NotFoundPage } from "./pages";

function App() {
    return (
        <main className="bg-dark-main relative min-h-screen text-slate-gray">
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<HomePage />}></Route>
                <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
        </main>
    );
}

export default App;
