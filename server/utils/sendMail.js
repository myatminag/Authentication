import nodemailer from "nodemailer";

export const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
            user: process.env.AUTH_EMAIL_USERNAME,
            pass: process.env.AUTH_EMAIL_PASSWORD,
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text
    };

    transporter.sendMail(mailOptions, function (error, indo) {
        if (error) {
            console.log(error);
        } else {
            console.log(info);
        }
    })
};