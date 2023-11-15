import { Routes, Route } from "react-router-dom";
import { SignUp, Login, HomePage, NotFoundPage, NewParcelPage } from "./pages";

import PrivateRoute from "./components/auth/PrivateRoute";

function App() {
    return (
        <main className="bg-dark-main text-slate-gray relative min-h-screen">
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <HomePage />
                        </PrivateRoute>
                    }
                />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/new" element={<NewParcelPage />} />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </main>
    );
}

export default App;
