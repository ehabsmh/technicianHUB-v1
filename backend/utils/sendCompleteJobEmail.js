import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "ehabsmh3@gmail.com",
    pass: process.env.GMAIL_PASSWORD,
  },
});


const generateHtmlContent = (token) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333333;
            padding: 20px;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .email-header {
            text-align: center;
            padding: 20px 0;
          }
          .email-content {
            margin: 20px 0;
          }
          .email-button {
            display: block;
            width: 200px;
            margin: 0 auto;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .email-footer {
            text-align: center;
            padding: 10px 0;
            font-size: 12px;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1>Technician HUB</h1>
          </div>
          <div class="email-content">
            <p>
              Thank for using Technician HUB! Your job has been completed. 
              Please mark job as completed by clicking the button below.
            </p>
            <a href="http://localhost:5173/job-completed/${token}" class="email-button"
              ><p style="color: white">Mark as completed</p></a
            >
            <p style="font-size: 13px">
                Make sure this is your official email, because we will contact you here.
            </p>
          </div>
          <div class="email-footer">
            <p>© 2024 Technician HUB. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
    `
}


export async function sendCompleteJobEmail(newUser, token) {
  try {
    await transporter.sendMail({
      from: '"Technician HUB 👷‍♂️" <ehabsmh3@gmail.com>',
      to: newUser.email,
      subject: `Hello ${newUser.firstName}!`,
      html: generateHtmlContent(token)
    });

  } catch (err) {
    console.error("Something went wrong!", err);
    return false;
  }
}
