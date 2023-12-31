import { Routes, Route } from "react-router-dom";
import { DeliveryPage, PickupPage, HomePage } from "./pages";
import { useState } from "react";

const App = () => {
    const [selectedLocation, setSelectedLocation] = useState("tampere");

    const updateSelectedLocation = (location) => {
        setSelectedLocation(location);
    };

    return (
        <main className="bg-dark-main text-slate-gray relative min-h-screen">
            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage
                            updateLocation={updateSelectedLocation}
                            selectedLocation={selectedLocation}
                        />
                    }
                />
                <Route
                    path="delivery"
                    element={<DeliveryPage location={selectedLocation} type="delivery" />}
                />
                <Route
                    path="pickup"
                    element={<PickupPage location={selectedLocation} type="pickup" />}
                />
            </Routes>
        </main>
    );
};

export default App;
