import nodemailer, { Transporter } from "nodemailer";

interface SendMailOptions {
  to: string;
  name: string;
  subject: string;
  body: string;
}

interface SendMailResult {
  success: boolean;
  error?: string;
}

export async function send({
  to,
  name,
  subject,
  body,
}: SendMailOptions): Promise<SendMailResult> {
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.verify();
  } catch (error) {
    return { success: false, error: "Transporter verification failed" };
  }

  try {
    // Send email
    const sendResult = await transporter.sendMail({
      from: `${name} <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: body,
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Email sending failed" };
  }
}
