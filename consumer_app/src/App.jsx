import { Routes, Route } from "react-router-dom";
import { SignUp, Login, HomePage, NotFoundPage, NewParcelPage } from "./pages";

import Authprovider from "./components/auth/Authprovider";
import PrivateRoute from "./components/auth/PrivateRoute";
import AuthRoute from "./components/auth/AuthRoute";

function App() {
    return (
        <main className="bg-dark-main text-slate-gray relative min-h-screen">
            <Authprovider>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <HomePage />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/new"
                        element={
                            <PrivateRoute>
                                <NewParcelPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <AuthRoute>
                                <SignUp />
                            </AuthRoute>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <AuthRoute>
                                <Login />
                            </AuthRoute>
                        }
                    />

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Authprovider>
        </main>
    );
}

export default App;
