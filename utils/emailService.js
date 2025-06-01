import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load env variables
dotenv.config();

// Create a test account using Ethereal for development
const createTransporter = async () => {
  // Create a transporter using Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use Gmail service
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address from .env
      pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail App Password from .env
    },
  });
  return transporter;
};

export const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = await createTransporter();
    const info = await transporter.sendMail({
      from: `"LC Sign" <${process.env.GMAIL_USER}>`, // Use your Gmail address as sender
      to: email,
      subject: "Email Verification OTP",
      text: `Your OTP for email verification is: ${otp}. This OTP will expire in 10 minutes.`,
      html: `<p>Your OTP for email verification is: <strong>${otp}</strong></p><p>This OTP will expire in 10 minutes.</p>`,
    });

    console.log("Email sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
