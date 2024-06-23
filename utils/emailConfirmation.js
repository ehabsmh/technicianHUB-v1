import nodemailer from "nodemailer";
import * as fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "ehabsmh3@gmail.com",
    pass: process.env.GMAIL_PASSWORD,
  },
});

export async function sendEmail(user) {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = path.dirname(fileName);

  try {
    const htmlFilePath = path.resolve(dirName, 'sendEmail.html');
    const htmlContent = await fs.promises.readFile(htmlFilePath, 'utf-8');
    await transporter.sendMail({
      from: '"Technician HUB 👷‍♂️" <ehabsmh3@gmail.com>',
      to: user.email,
      subject: `Hello ${user.firstName}!`,
      html: htmlContent
    });

    return jwt.sign({ userId: user._id, email: user.email },
      process.env.JWT_CONFIRM_EMAIL_SECRET,
      { expiresIn: '1d' });

  } catch (err) {
    console.error("Something went wrong!", err);
    return false;
  }
}
