import { Routes, Route } from "react-router-dom";
import { Login, HomePage, NotFoundPage } from "./pages";

function App() {
    return (
        <main className="bg-dark-main text-slate-gray relative min-h-screen">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<HomePage />}></Route>
                <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
        </main>
    );
}

export default App;
