import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

function envValue(name: string) {
  return process.env[name]?.trim() ?? '';
}

function mailErrorDetail(error: unknown) {
  if (!(error instanceof Error)) return 'Unknown mail error';

  const smtpError = error as Error & { code?: string; response?: string; responseCode?: number };
  const response = (smtpError.response || smtpError.message).replace(/\s+/g, ' ').slice(0, 300);

  return [smtpError.code, smtpError.responseCode, response].filter(Boolean).join(' — ');
}

export async function POST(request: Request) {
  const host = envValue('SMTP_HOST');
  const port = Number(envValue('SMTP_PORT') || '465');
  const user = envValue('SMTP_USER');
  const pass = envValue('SMTP_PASSWORD').replace(/\s+/g, '');
  const to = envValue('CONTACT_EMAIL');

  if (!host || !user || !pass || !to) {
    return NextResponse.json(
      { error: 'Failed to send email', detail: 'SMTP settings are missing on the server' },
      { status: 500 }
    );
  }

  try {
    const { firstName, lastName, email, phone, subject, description } = await request.json();

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: user,
      to,
      replyTo: typeof email === 'string' ? email : undefined,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${description}</p>
      `,
    });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email', detail: mailErrorDetail(error) },
      { status: 500 }
    );
  }
}
