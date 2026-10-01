import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function requiredSettings() {
  return {
    SMTP_HOST: process.env.SMTP_HOST?.trim() ?? '',
    SMTP_USER: process.env.SMTP_USER?.trim() ?? '',
    SMTP_PASSWORD: (process.env.SMTP_PASSWORD ?? '').replace(/\s+/g, ''),
    CONTACT_EMAIL: process.env.CONTACT_EMAIL?.trim() ?? '',
  };
}

function mailErrorDetail(error: unknown) {
  if (!(error instanceof Error)) return 'Unknown mail error';

  const smtpError = error as Error & { code?: string; response?: string; responseCode?: number };
  const response = (smtpError.response || smtpError.message).replace(/\s+/g, ' ').slice(0, 300);

  return [smtpError.code, smtpError.responseCode, response].filter(Boolean).join(' — ');
}

export async function POST(request: Request) {
  const settings = requiredSettings();
  const missing = Object.entries(settings)
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length > 0) {
    return NextResponse.json(
      {
        error: 'Failed to send email',
        detail: `Missing on the server: ${missing.join(', ')}`,
      },
      { status: 500 }
    );
  }

  const host = settings.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT?.trim() || '465');
  const user = settings.SMTP_USER;
  const pass = settings.SMTP_PASSWORD;
  const to = settings.CONTACT_EMAIL;

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
