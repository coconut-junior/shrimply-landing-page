import nodemailer from 'npm:nodemailer'; //might need different module as this requires using npm
import 'dotenv/config';

//MUST SET DENO_TLS_CA_STORE=system for this to work!!

const transporter = nodemailer.createTransport({
  host: 'smtppro.zoho.com',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    ciphers: 'SSLv3',
  },
});

async function send(address: string, link: string) {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: address, // list of receivers
    subject: 'Thank you for your purchase!', // Subject line
    text: 'Your Purchase from prismaprawn.com', // plain text body
    html: `
        <html>
          <head></head>
          <body>
            <h1>Thanks for your purchase!</h1>
            <p>You can download your product by clicking on the link below.</p>
            <a href="${link}">Download</a>
          </body>
        </html>
        `,
  });
  console.log(`Message sent: ${info.messageId}`);
}

send('blanckjm@gmail.com', 'https://deno.com');
