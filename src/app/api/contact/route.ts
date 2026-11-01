import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import {
  BUDGETS,
  PROJECT_TYPES,
  SOURCES,
  TIMELINES,
  labelFor,
  leadTier,
  type ProjectBrief,
} from '@/utils/projectBrief';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** A human needs well over this long to go through the chat; faster means a bot. */
const MIN_ELAPSED_MS = 3000;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best effort: lives as long as the server instance does.
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const hits = (recentSubmissions.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  hits.push(now);
  recentSubmissions.set(ip, hits);
  return hits.length > RATE_LIMIT;
}

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

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const text = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

const oneOf = (options: readonly { value: string }[], value: string) =>
  options.some((option) => option.value === value);

function parseBrief(body: Record<string, unknown>): ProjectBrief | string {
  const brief: ProjectBrief = {
    projectType: text(body.projectType, 40),
    projectOther: text(body.projectOther, 200),
    budget: text(body.budget, 40),
    timeline: text(body.timeline, 40),
    idea: text(body.idea, 4000),
    name: text(body.name, 120),
    email: text(body.email, 200),
    company: text(body.company, 300),
    source: text(body.source, 40),
  };

  if (!oneOf(PROJECT_TYPES, brief.projectType)) return 'Pick a project type.';
  if (!oneOf(BUDGETS, brief.budget)) return 'Pick a budget range.';
  if (!oneOf(TIMELINES, brief.timeline)) return 'Pick a timeline.';
  if (!brief.idea) return 'Tell us a little about the idea.';
  if (!brief.name) return 'Add your name.';
  if (!EMAIL_PATTERN.test(brief.email)) return 'Add a valid email.';
  if (brief.source && !oneOf(SOURCES, brief.source)) brief.source = '';

  return brief;
}

function renderEmail(brief: ProjectBrief, tier: string) {
  const projectLabel =
    brief.projectType === 'other' && brief.projectOther
      ? `Other: ${brief.projectOther}`
      : labelFor(PROJECT_TYPES, brief.projectType) ?? brief.projectType;

  const rows: [string, string][] = [
    ['Priority', tier],
    ['Project', projectLabel],
    ['Budget', labelFor(BUDGETS, brief.budget) ?? brief.budget],
    ['Timeline', labelFor(TIMELINES, brief.timeline) ?? brief.timeline],
    ['Name', brief.name],
    ['Email', brief.email],
    ['Brand / link', brief.company || '—'],
    ['Found us via', labelFor(SOURCES, brief.source) ?? '—'],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#666;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`
    )
    .join('');

  const idea = escapeHtml(brief.idea).replace(/\n/g, '<br>');

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#111">
      <h2 style="margin:0 0 16px">New project brief</h2>
      <table style="border-collapse:collapse">${tableRows}</table>
      <h3 style="margin:24px 0 8px">The idea</h3>
      <p style="margin:0">${idea}</p>
    </div>`;
}

const TIER_NOTES: Record<string, string> = {
  A: 'A — budget in range, date set: reply within the hour',
  B: 'B — reply personally within 24 h',
  C: 'C — below range: reply with an alternative',
};

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Bots fill the hidden field or submit instantly. Pretend it worked so they don't adapt.
  const elapsed = Number(body.elapsedMs);
  if (text(body.website, 200) || !Number.isFinite(elapsed) || elapsed < MIN_ELAPSED_MS) {
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages', detail: 'Please wait a bit before sending another brief.' },
      { status: 429 }
    );
  }

  const brief = parseBrief(body);
  if (typeof brief === 'string') {
    return NextResponse.json({ error: 'Invalid brief', detail: brief }, { status: 400 });
  }

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

  const port = Number(process.env.SMTP_PORT?.trim() || '465');
  const tier = leadTier(brief);
  const project =
    brief.projectType === 'other'
      ? 'Other'
      : labelFor(PROJECT_TYPES, brief.projectType) ?? brief.projectType;
  const subject = [
    `[${tier}] ${project}`,
    labelFor(BUDGETS, brief.budget),
    labelFor(TIMELINES, brief.timeline),
    brief.name,
  ].join(' · ');

  try {
    const transporter = nodemailer.createTransport({
      host: settings.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: settings.SMTP_USER,
        pass: settings.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: settings.SMTP_USER,
      to: settings.CONTACT_EMAIL,
      replyTo: brief.email,
      subject: subject.replace(/[\r\n]+/g, ' '),
      html: renderEmail(brief, TIER_NOTES[tier]),
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
