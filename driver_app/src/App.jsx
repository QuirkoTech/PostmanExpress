import { Routes, Route } from "react-router-dom";
import {
    Login,
    HomePage,
    NotFoundPage,
    ParcelInfoPage,
    AvailableParcelPage,
} from "./pages";

function App() {
    return (
        <main className="bg-dark-main text-slate-gray relative min-h-screen">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<HomePage />}></Route>
                <Route
                    path="/parcels/:parcel_id"
                    element={<ParcelInfoPage />}
                />
                <Route path="/pending" element={<AvailableParcelPage />} />
                <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
        </main>
    );
}

export default App;
