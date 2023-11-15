import nodemailer from "nodemailer";

const config = {
    service: "gmail",
    auth: {
        user: "PostmanExpressInc@gmail.com",
        pass: "xudldnfwgsfwiffi",
    },
};
const transporter = nodemailer.createTransport(config);

const lockerLocations = {
    oulu: {
        address: "Oulu Torikatu 38",
        mapLink: "https://maps.app.goo.gl/okTBoAekwmfcGjEEA",
    },
    helsinki: {
        address: "Helsinki Hitsaajanpolku 1",
        mapLink: "https://maps.app.goo.gl/da3cNZELsstDuBAC8",
    },
    espoo: {
        address: "Espoo Smedsintie 16",
        mapLink: "https://maps.app.goo.gl/sXUuCPG4hz7opjkx5",
    },
    turku: {
        address: "Turku Yliopistonkatu 29b",
        mapLink: "https://maps.app.goo.gl/YrWeKMt81G63mArz7",
    },
    tampere: {
        address: "Tampere Tullikatu 6",
        mapLink: "https://maps.app.goo.gl/Zw9oFihuN16Wq35H9",
    },
    warehouse: {
        address: "Helsinki Oskelantie 1",
        mapLink: "https://maps.app.goo.gl/1WkbXZ12cBZqnG7o7",
    },
};

const sendEmail = async (
    receiver_email,
    title,
    parcelInfo,
    userType,
    location,
) => {
    if (
        (title === "Parcel awaiting drop-off" ||
            title === "Parcel ready to be collected") &&
        !parcelInfo.pin
    ) {
        return false;
    }

    let lockerInfo = location ? lockerLocations[location] : {};

    let messageText = ``;
    let pinType = "";

    if (title === "Parcel awaiting drop-off") {
        pinType = "Delivery";
        messageText = `<p style="font-size: 20px; color: #000000; margin: 10px 0 0 0;">Bring the parcel to:</p>`;
    } else if (title === "Parcel ready to be collected") {
        pinType = "Pick up";
        messageText = `<p style="font-size: 20px; color: #000000; margin: 10px 0 0 0;">You can pick up the parcel at:</p>`;
    }

    let parcelNameString = "";

    if (userType === "consumer") {
        parcelNameString = `<p style="font-size: 14px; color: #000000; margin: 10px 0 0 0;">Content: ${parcelInfo.parcel_name}</p>`;
    }

    let lockerInfoBlock = parcelInfo.pin
        ? ` <tr>
                <td style="text-align: center; padding: 0 20px 0 0;">
                    <p style="font-size: 20px; color: #000000;">${pinType} pin:</p>
                    <div style="border: 2px solid #374D6F; border-radius: 20px; display: inline-block; padding: 32px 48px; margin-bottom: 20px;">
                        <span style="font-size: 24px; font-weight: 700; color: #000000;">${parcelInfo.pin}</span>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="text-align: center; padding: 20px;">
                    <p style="font-size: 14px; color: #000000; margin: 0;">${messageText}</p>
                    <p style="font-size: 14px; color: #000000; margin: 10 0 0 0;"><a href="${lockerInfo.mapLink}" style="color: #0000EE; text-decoration: underline;">${lockerInfo.address}</a></p>
                </td>
            </tr>
            <hr />`
        : "";

    let instructionsString = parcelInfo.pin
        ? `<p style="font-size: 14px; color: #000000; margin: 40px 0;">Please get familiar with cabinet instructions <a href="Link to instructions" style="color: #0000EE; text-decoration: underline;">here</a>.</p>`
        : "";

    let html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; box-sizing: border-box;">
        <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
            <tr>
                <td style="text-align: center; padding: 20px;">
                    <h1 style="font-size: 24px; font-weight: 700; color: #000000; margin: 0;">${title}</h1>
                </td>
            </tr>
            ${lockerInfoBlock}
            <tr>
                <td style="text-align: left; padding: 20px;">
                    <p style="font-size: 20px; color: #000000;">Parcel info:</p>
                    <p style="font-size: 14px; color: #000000; margin: 20px 0 0 0;">ID: <a href="https://${userType}-pe.salute-sir.com/parcels/${
                        parcelInfo.parcel_id
                    }">${parcelInfo.parcel_id}</p>
                    ${parcelNameString}
                    <p style="font-size: 14px; color: #000000; margin: 10px 0 0 0;">From: ${
                        parcelInfo.ship_from.charAt(0).toUpperCase() +
                        parcelInfo.ship_from.slice(1)
                    }</p>
                    <p style="font-size: 14px; color: #000000; margin: 10px 0 0 0;">To: ${
                        parcelInfo.ship_to.charAt(0).toUpperCase() +
                        parcelInfo.ship_to.slice(1)
                    }</p>
                    ${instructionsString}
                </td>
            </tr>
        </table>
    </body>
    </html>`;

    const message = {
        from: "PostmanExpressInc@gmail.com",
        to: receiver_email,
        subject: "Parcel status update",
        html,
    };

    const success = await transporter
        .sendMail(message)
        .then(() => {
            return true;
        })
        .catch((error) => {
            console.log(error);
            return false;
        });

    return success;
};

export default sendEmail;

// USAGE EXAMLES

// const emailSent = await sendEmail(
//     email_receiver,
//     "Parcel awaiting drop-off",
//     { ...req.body, parcel_id, pin: delivery_pin },
//     "consumer",
//     location_deliver_to,
// );

// const emailSent = await sendEmail(
//     email_receiver,
//     "Parcel awaiting drop-off",
//     { ...req.body, parcel_id, pin: delivery_pin },
//     "driver",
//     location_deliver_to,
// );

// const emailSent = await sendEmail(
//     email_receiver,
//     "Parcel ready to be collected",
//     { ...req.body, parcel_id, pin: pickup_pin },
//     "consumer",
//     location_to_pick_up_parcel_from,
// );

// const emailSent = await sendEmail(
//     email_receiver,
//     "Parcel ready to be collected",
//     { ...req.body, parcel_id, pin: pickup_pin },
//     "driver",
//     location_to_pick_up_parcel_from,
// );

// const emailSent = await sendEmail(
//     email_receiver,
//     "Parcel on its way",
//     { ...req.body, parcel_id },
//     "consumer",
// );

// const emailSent = await sendEmail(
//     email_receiver,
//     "Parcel delivered",
//     { ...req.body, parcel_id },
//     "consumer",
// );
