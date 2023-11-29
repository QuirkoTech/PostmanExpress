const driverCanAcceptParcel = (
    parcelObj,
    driverLocation,
    loggedDriverAccepted,
) => {
    if (
        ((parcelObj.ship_from === parcelObj.current_location &&
            driverLocation === parcelObj.current_location) ||
            (parcelObj.current_location === "warehouse" &&
                driverLocation === parcelObj.ship_to)) &&
        !parcelObj.driver_accepted &&
        loggedDriverAccepted === "false"
    ) {
        return true;
    }
    return false;
};

export default driverCanAcceptParcel;
