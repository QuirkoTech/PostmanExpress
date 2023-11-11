import { Routes, Route } from "react-router-dom";
import { DeliveryPage, PickupPage } from "./pages";

const App = () => {
    return (
        <main className="bg-dark-main text-slate-gray relative min-h-screen">
            <Routes>
                <Route path="delivery" element={<DeliveryPage />} />
                <Route path="pickup" element={<PickupPage />} />
            </Routes>
        </main>
    );
};

export default App;
