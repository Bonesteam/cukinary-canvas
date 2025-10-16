import nodemailer from "nodemailer";

export async function sendPlanEmail(to: string, subject: string, text: string, pdf?: { filename: string; data: Buffer }) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    return { sent: false, reason: "SMTP not configured" };
  }
  const transporter = nodemailer.createTransport({ host, port: Number(process.env.SMTP_PORT || 587), secure: false, auth: { user, pass } });
  await transporter.sendMail({ from: user, to, subject, text, attachments: pdf ? [{ filename: pdf.filename, content: pdf.data }] : [] });
  return { sent: true };
}
