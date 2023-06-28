const nodemailer = require('nodemailer');

const sendLoginMessage = async (userData, code) => {
    const { user, pass, smtp } = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.secure,
        auth: {
            user: user,
            pass: pass
        }
    });

    const mail = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: `${userData.email}`, // list of receivers
        subject: "Register confirm", // Subject line
        text: `To complete register follow the link http://localhost:8088/auth?code=${code || 'test'}`, // plain text body

    })

    return nodemailer.getTestMessageUrl(mail);
};

module.exports = {
    sendLoginMessage
}