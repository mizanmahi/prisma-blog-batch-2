import nodemailer from 'nodemailer';

export const emailSender = async (receiverEmail: string, html: string) => {
   const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
         user: 'mizanmahi24@gmail.com',
         pass: 'xyhyuitkpfmadxku',
      },
   });

   // async..await is not allowed in global scope, must use a wrapper

   // send mail with defined transport object
   const info = await transporter.sendMail({
      from: '"Prisma New Blog👻" <mizanmahi24@gmail.com>', // sender address
      to: receiverEmail, // list of receivers
      subject: 'Reset Password Link', // Subject line
      html, // html body
   });

   console.log('Message sent: %s', info.messageId);
};
