const convertDateFormat = (/** @type {string} */ dateStr) => {
    let parts = dateStr.split(".");
    let year = parts[2];

    if (year.length === 2) {
        year = "20" + year;
    }

    return parts[0] + "." + parts[1] + "." + year;
};

const Timestamps = ({ status_timestamps }) => {
    const reversedStamps = [...status_timestamps].reverse();

    return (
        <div className="timestamps">
            {reversedStamps.map((timestamp, index) => (
                <div key={index} className="timestamp-box">
                    <p
                        className={`status ${
                            index === reversedStamps.length - 1 ? "first" : ""
                        } 
                        ${index === 0 ? "last" : ""} 
                        ${timestamp.status === "delivered" ? "delivered" : ""}`}
                    >
                        <span>
                            {timestamp.status.charAt(0).toUpperCase() +
                                timestamp.status.slice(1)}
                        </span>
                    </p>
                    <p className="timestamp">
                        at {timestamp.time} on{" "}
                        {convertDateFormat(timestamp.date)}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Timestamps;
