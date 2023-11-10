import { Routes, Route } from "react-router-dom";
import { SignUp, Login, HomePage, NotFoundPage, NewParcelPage } from './pages'


function App() {
    return (
        <main className="bg-dark-main relative min-h-screen text-slate-gray">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/new" element={<NewParcelPage />} />
                
                <Route path="*" element={<NotFoundPage />} />
            </Routes>

        </main>
    );
}

export default App;
