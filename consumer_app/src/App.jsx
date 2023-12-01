import { Routes, Route } from "react-router-dom";
import {
    SignUp,
    Login,
    HomePage,
    NotFoundPage,
    NewParcelPage,
    ParcelInFoPage,
} from "./pages";
import { AuthRoute, Authprovider, PrivateRoute } from "./components/auth";

function App() {
    return (
        <div className="bg-dark-main text-slate-gray relative flex min-h-screen flex-col">
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

                    <Route
                        path="/parcels/:parcel_id"
                        element={
                            <PrivateRoute>
                                <ParcelInFoPage />
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
        </div>
    );
}

export default App;
