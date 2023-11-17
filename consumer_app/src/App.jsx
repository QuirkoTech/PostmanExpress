import { Routes, Route } from "react-router-dom";
import { SignUp, Login, HomePage, NotFoundPage, NewParcelPage } from "./pages";
import { AuthRoute, Authprovider, PrivateRoute } from "./components/auth";

function App() {
    return (
        <main className="bg-dark-main text-slate-gray relative min-h-screen">
            <Authprovider>
                <Routes>
                    {/* Private routes */}
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

                    {/* Auth routes */}
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

                    {/* 404 */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Authprovider>
        </main>
    );
}

export default App;
