import { Routes, Route } from "react-router-dom";
import {
    Login,
    HomePage,
    NotFoundPage,
    ParcelInfoPage,
    AvailableParcelPage,
} from "./pages";
import { AuthProvider, PrivateRoute, AuthRoute } from "./components/auth";

function App() {
    return (
        <div className="bg-dark-main text-slate-gray relative flex min-h-screen flex-col">
            <AuthProvider>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <AuthRoute>
                                <Login />
                            </AuthRoute>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <HomePage />
                            </PrivateRoute>
                        }
                    ></Route>

                    <Route
                        path="/pending"
                        element={
                            <PrivateRoute>
                                <AvailableParcelPage />{" "}
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/parcels/:parcel_id"
                        element={<ParcelInfoPage />}
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
