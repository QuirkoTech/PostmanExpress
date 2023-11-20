const compareDriverAndParcelLocations = (
    currentParcelLocation,
    shipToParcelLocation,
    driverLocation,
) => {
    if (
        (currentParcelLocation === driverLocation &&
            shipToParcelLocation !== currentParcelLocation) ||
        (currentParcelLocation === "warehouse" &&
            shipToParcelLocation === driverLocation)
    ) {
        return true;
    }
    return false;
};

export default compareDriverAndParcelLocations;
