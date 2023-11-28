const compareDriverAndParcelLocations = (
    currentParcelLocation,
    shipToParcelLocation,
    shipFromParcelLocation,
    driverLocation,
) => {
    if (
        (shipFromParcelLocation === driverLocation &&
            currentParcelLocation !== "warehouse" &&
            currentParcelLocation !== null &&
            currentParcelLocation !== shipToParcelLocation) ||
        (shipToParcelLocation === driverLocation &&
            shipToParcelLocation !== currentParcelLocation)
    ) {
        return true;
    }
    return false;
};

export default compareDriverAndParcelLocations;
