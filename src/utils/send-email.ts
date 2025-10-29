import nodemailer from "nodemailer";

export type SendEmailOptions = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

export async function sendEmail({ to, subject, text, html }: SendEmailOptions) {
  let transporter;

  // 🧩 Detect local environment
  const isDev =
    process.env.NODE_ENV !== "production" ||
    process.env.SMTP_HOST?.includes("localhost");

  if (isDev) {
    // ✅ Create a test account and use Ethereal for local development
    const testAccount = await nodemailer.createTestAccount();

    transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } else {
    // ✅ Use real SMTP credentials from environment
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  const info = await transporter.sendMail({
    from:
      process.env.MAIL_FROM || process.env.SMTP_USER || "no-reply@example.com",
    to,
    subject,
    text,
    html,
  });

  console.log("✅ Email sent:", info.messageId);

  // 🧪 When using Ethereal (local dev), print preview URL
  if (isDev) {
    console.log("🔗 Preview URL:", nodemailer.getTestMessageUrl(info));
  }

  return {
    messageId: info.messageId,
    previewUrl: isDev ? nodemailer.getTestMessageUrl(info) : undefined,
  };
}
