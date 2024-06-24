import nodemailer from "nodemailer";
import * as fs from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "ehabsmh3@gmail.com",
    pass: process.env.GMAIL_PASSWORD,
  },
});

export async function sendEmail(newUser, fileName, payload) {
  const dirName = path.join(process.cwd(), '/utils');

  try {
    const htmlFilePath = path.resolve(dirName, fileName);
    const htmlContent = await fs.promises.readFile(htmlFilePath, 'utf-8');
    await transporter.sendMail({
      from: '"Technician HUB 👷‍♂️" <ehabsmh3@gmail.com>',
      to: newUser.email,
      subject: `Hello ${newUser.firstName}!`,
      html: htmlContent
    });

    return jwt.sign(payload, process.env.JWT_CONFIRM_EMAIL_SECRET);

  } catch (err) {
    console.error("Something went wrong!", err);
    return false;
  }
}
