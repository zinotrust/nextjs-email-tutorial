import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Resend } from "resend";

export async function POST(req) {
  try {
    const { subject, message, email, emailService } = await req.json();

    // console.log(email, subject, message);
    // Send with gmail & Nodemailer
    if (emailService === "gmail") {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOption = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: message,
        // text: message,
      };

      await transporter.sendMail(mailOption);

      return NextResponse.json(
        { message: "Email Sent Successfully" },
        { status: 200 }
      );
    }

    // Send with Resend
    if (emailService === "resend") {
      const resend = new Resend(process.env.RESEND_KEY);

      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "zinotrust@gmail.com",
        subject: subject,
        html: message,
      });

      return NextResponse.json(
        { message: "Email Sent Successfully" },
        { status: 200 }
      );
    }

    // Send with aws
    if (emailService === "aws") {
      // Create Email Transporter
      const transporter = nodemailer.createTransport({
        // service: "gmail",
        host: process.env.AWS_SMTP_HOST,
        port: 587,
        secure: false,
        auth: {
          user: process.env.AWS_SMTP_USERNAME,
          pass: process.env.AWS_SMTP_PASSWORD,
        },
      });

      const mailOption = {
        from: process.env.AWS_EMAIL_USER,
        to: email,
        subject: subject,
        html: message,
      };

      await transporter.sendMail(mailOption);

      return NextResponse.json(
        { message: "Email Sent Successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Send Email" },
      { status: 500 }
    );
  }
}
