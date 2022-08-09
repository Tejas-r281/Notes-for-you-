const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const refresh_token = process.env.REFRESH_TOKEN;
const redirect_uri = process.env.REDIRECT_URI;
const user = process.env.SMPT_MAIL;

const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uri
);

oauth2Client.setCredentials({
  refresh_token: refresh_token
});

const sendEmail = async (data) => {

  try {
    const accessToken = await oauth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "no.reply.4328@gmail.com",
        clientId: client_id,
        clientSecret: client_secret,
        refreshToken: refresh_token,
        accessToken: accessToken
      }
    });

    var maillist = [
      { name: "Raushan kumar", address: "rk1178816@gmail.com" },
      { name: "Shyam kumar", address: "raushan.043.kumar@gmail.com" },
    ];



    const mailOptions = {
      from: "Raushan kumar",
      to: data.to,
      // Bcc: maillist,
      subject: data.subject,
      // html: data.html
      text: data.text
    };

    const result = await transport.sendMail(mailOptions);
    // console.log(result);
    return result;
  }
  catch (err) {
    console.log(err);
    return err;
  }




};

module.exports = sendEmail;



// const sendEmail = async (options) => {
//     const transporter = nodeMailer.createTransport({
//         service: "gmail",
//         port: 465,
//         secure: true,
//         secureConnection: false,
//         auth: {
//             user:"raushan.043.kumar@gmail.com",
//             pass: "285870100",
//         },
//         tls: {
//             rejectUnAuthorized: true,
//         },
//     });
//     // console.log(options);
//     // const mailOptions = {
//     //   from: "<raushan.043.kumar@gmail.com>",
//     //   to: options.email,
//     //   subject: options.subject,
//     //   text: options.message,
//     // };
//     // console.log(options);
//     await transporter.sendMail(options);
// };

// module.exports = sendEmail;
