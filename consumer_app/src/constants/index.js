// The simple status color map and Status map are used for active parcels
export const simpleStatusColorMap = {
    "awaiting drop-off": "status-gray", // show status
    "prepared for delivery": "status-gray", // show status
    "en route to the warehouse": "status-orange", // on the way
    "at warehouse": "status-orange", // on the way
    "en route to the pickup location": "status-orange", // on the way
    "ready for pickup": "status-blue", // show status
};

export const statusMap = {
    "awaiting drop-off": "Waiting for delivery",
    "prepared for delivery": "Waiting for delivery",
    "en route to the warehouse": "On the way",
    "at warehouse": "On the way",
    "en route to the pickup location": "On the way",
    "ready for pickup": "Ready for pick up",
};

// In depth colormapping for detailed parcel page
export const statusColorMap = {
    "awaiting drop-off": "status-gray", // show status
    "prepared for delivery": "status-yellow", // show status
    "en route to the warehouse": "status-orange", // on the way
    "at warehouse": "status-white", // on the way
    "en route to the pickup location": "status-orange", // on the way
    "ready for pickup": "status-blue", // show status
    delivered: "status-green", // not available on this page
};
