import nodemailer from "nodemailer";

const config = {
    service: "gmail",
    auth: {
        user: "PostmanExpressInc@gmail.com",
        pass: "xudldnfwgsfwiffi",
    },
};
const transporter = nodemailer.createTransport(config);

const sendEmail = async (receiver_email, subject, location, pins) => {
    let messageTitle = "";
    let lockerLocation = "";
    let parcelId = "";

    const message = {
        from: "PostmanExpressInc@gmail.com",
        to: receiver_email,
        subject,
        html: `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; box-sizing: border-box;">
    <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 20px;">
                <table width="600" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                    <tr>
                        <td style="text-align: center; padding: 20px;">
                            <h1 style="font-size: 20px; font-weight: 700; color: #000000; margin: 0;">Parcel is ready for pick up</h1>
                            <p style="font-size: 16px; color: #000000; margin: 20px 0 0 0;">ID: 62dda164-8e11-498f-9526-2e104f083971</p>
                            <p style="font-size: 16px; color: #000000; margin: 10px 0 0 0;">You can pick up the parcel at:</p>
                            <p style="font-size: 16px; color: #000000; margin: 0;"><a href="https://maps.app.goo.gl/4etSSuSpJBmAHjXs9" style="color: #0000EE; text-decoration: underline;">Oulu Torikatu 38</a></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center; padding: 20px;">
                            <div style="border: 2px solid #374D6F; border-radius: 20px; display: inline-block; padding: 32px 48px; margin-bottom: 20px;">
                                <span style="font-size: 24px; font-weight: 700; color: #000000;">${pins.delivery_pin}</span>
                            </div>
                            <p style="font-size: 16px; color: #000000; margin: 20px 0;">Please get familiar with cabinet instructions <a href="Link to instructions" style="color: #0000EE; text-decoration: underline;">here</a>.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`,
    };

    const success = await transporter
        .sendMail(message)
        .then(() => {
            console.log("success");
            return true;
        })
        .catch((error) => {
            console.log(error);
            return false;
        });

    return success;
};

export default sendEmail;
