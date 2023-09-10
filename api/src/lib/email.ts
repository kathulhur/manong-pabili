import * as nodemailer from 'nodemailer';


interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  // create reusable transporter object using SendInBlue for SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_SERVER,
    port: process.env.BREVO_SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.BREVO_SMTP_LOGIN,
      pass: process.env.BREVO_SMTP_KEY,
    },
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Manong Pabili" <${process.env.BREVO_SMTP_LOGIN}>`,
    to: Array.isArray(to) ? to : [to], // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  })

  return info
}

export function sendVerificationEmail(emailAddress: string) {
  const subject = 'Account Verification'
  const text =
    'Congratulations! Your account has been verified.\n\n' +
    'You may now login to your account.' +
    '<a href="https://manongpabili.tech/login">Login</a>'
  const html =
  'Congratulations! Your account has been verified.<br><br>' +
    'You may now login to your account.' +
    '<a href="https://manongpabili.tech/login">Login</a>'
  return sendEmail({ to: emailAddress, subject, text, html })
}