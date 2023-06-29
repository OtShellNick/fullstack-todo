const nodemailer = require('nodemailer');
const { generatePassword } = require('./../helpers/passwordGen');
const { updateUser, hash } = require('./user.actions');

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
        from: '"Fred Foo 👻" <foo@example.com>',
        to: `${userData.email}`,
        subject: "Register confirm",
        text: `To complete register follow the link http://localhost:8088/auth?code=${code || 'test'}`,

    })

    return nodemailer.getTestMessageUrl(mail);
};

const sendRestoreMessage = async (userData, code) => {
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
        from: '"Fred Foo 👻" <foo@example.com>',
        to: `${userData.email}`,
        subject: "Register confirm",
        text: `To restore password follow the link http://localhost:8088/auth?code=${code || 'test'}`,
    })

    return nodemailer.getTestMessageUrl(mail);
};

const sendNewPasswordMessage = async (userData) => {
    const { user, pass, smtp } = await nodemailer.createTestAccount();
    const password = generatePassword(8);

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
        from: '"Fred Foo 👻" <foo@example.com>',
        to: `${userData.email}`,
        subject: "Register confirm",
        text: `
        Your Email: ${userData.email}
        Your Password: ${password}
        `,
    });

    await updateUser(userData, { password: hash(password) });

    return nodemailer.getTestMessageUrl(mail);
};

module.exports = {
    sendLoginMessage,
    sendRestoreMessage,
    sendNewPasswordMessage
}