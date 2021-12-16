const nodemailer = require("nodemailer");

async function sendMail(email, string) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user: "orbacht@gmail.com", 
            pass: "***GMAIL PASSWORD***",
        },
    });
    
    let info = await transporter.sendMail({
        from: `"Or Bahtari" <foo@example.com>`, 
        to: email, 
        subject:"Email Confirmation", 
        
        html: `Press <a href=http://localhost:4000/verify/${string}> for verification`
    });

    console.log("Message sent: %s", info.messageId);
}

module.exports = {
    sendMail,
}