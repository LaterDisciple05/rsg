import { connect as connectSocket, type Socket } from "node:net";
import { connect as connectTls, type TLSSocket } from "node:tls";
import { getInquiryEmailSettings } from "@/lib/inquiry-email-settings";

type InquiryEmailData = {
  id: string;
  name?: string | null;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
  country?: string | null;
  material?: string | null;
  quantity?: string | null;
  message?: string | null;
  createdAt?: Date | string;
};

type MailMessage = {
  from: string;
  to: string;
  replyTo?: string | null;
  subject: string;
  text: string;
  html: string;
};

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
};

const defaultAdminEmail = "risingsunglobal.au@gmail.com";

function env(name: string) {
  return process.env[name]?.trim() || "";
}

function isGmailSmtp(host: string) {
  return host.toLowerCase().includes("gmail.com");
}

function normalizeSmtpPassword(pass: string, host: string) {
  return isGmailSmtp(host) ? pass.replace(/\s+/g, "") : pass;
}

async function getSmtpConfig(): Promise<SmtpConfig | null> {
  const user = env("SMTP_USER");
  const rawPass = env("SMTP_PASS");

  if (!user || !rawPass) return null;

  const port = Number(env("SMTP_PORT") || 465);
  const host = env("SMTP_HOST") || "smtp.gmail.com";
  const pass = normalizeSmtpPassword(rawPass, host);
  const emailSettings = await getInquiryEmailSettings();

  if (isGmailSmtp(host) && pass.length !== 16) {
    console.warn(
      "Gmail SMTP usually needs a 16-character App Password. The current SMTP_PASS length does not look like a Gmail App Password.",
    );
  }

  return {
    host,
    port: Number.isFinite(port) ? port : 465,
    secure: env("SMTP_SECURE") !== "false",
    user,
    pass,
    from: env("SMTP_FROM") || user,
    to: emailSettings.receiverEmail || env("INQUIRY_EMAIL_TO") || defaultAdminEmail,
  };
}

function escapeHtml(value?: string | null) {
  return String(value || "Not provided")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sanitizeHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function emailAddress(value: string) {
  const cleanValue = sanitizeHeader(value);
  const wrappedAddress = cleanValue.match(/<([^>]+)>/)?.[1];

  return sanitizeHeader(wrappedAddress || cleanValue).split(",")[0].trim();
}

function encodeHeader(value: string) {
  const cleanValue = sanitizeHeader(value);
  return /^[\x00-\x7F]*$/.test(cleanValue)
    ? cleanValue
    : `=?UTF-8?B?${Buffer.from(cleanValue, "utf8").toString("base64")}?=`;
}

function normalizeNewlines(value: string) {
  return value.replace(/\r?\n/g, "\r\n");
}

function dotStuff(value: string) {
  return normalizeNewlines(value).replace(/^\./gm, "..");
}

function inquirySubject(inquiry: InquiryEmailData) {
  const sender = inquiry.name || inquiry.company || inquiry.email || "Website visitor";
  return `New website inquiry from ${sender}`;
}

function inquiryRows(inquiry: InquiryEmailData) {
  return [
    ["Name", inquiry.name],
    ["Company", inquiry.company],
    ["Email", inquiry.email],
    ["Phone", inquiry.phone],
    ["Country / Location", inquiry.country],
    ["Material", inquiry.material],
    ["Quantity", inquiry.quantity],
    ["Message", inquiry.message],
  ] as const;
}

function buildInquiryMessage(
  inquiry: InquiryEmailData,
  config: Pick<SmtpConfig, "from" | "to">,
): MailMessage {
  const createdAt = inquiry.createdAt
    ? new Date(inquiry.createdAt).toLocaleString("en-AU", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : new Date().toLocaleString("en-AU", {
        dateStyle: "medium",
        timeStyle: "short",
      });
  const rows = inquiryRows(inquiry);
  const text = [
    "New website inquiry received on Rising Sun Global.",
    "",
    ...rows.map(([label, value]) => `${label}: ${value || "Not provided"}`),
    "",
    `CMS inquiry ID: ${inquiry.id}`,
    `Received: ${createdAt}`,
  ].join("\n");
  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;border:1px solid #e6e8eb;font-weight:700;color:#07385c;">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;border:1px solid #e6e8eb;color:#191919;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#191919;line-height:1.55;">
      <h2 style="margin:0 0 12px;color:#07385c;">New Website Inquiry</h2>
      <p style="margin:0 0 18px;color:#66717f;">An inquiry was submitted through the Rising Sun Global website and saved in the CMS.</p>
      <table style="border-collapse:collapse;width:100%;max-width:680px;">${htmlRows}</table>
      <p style="margin-top:18px;color:#66717f;font-size:13px;">CMS inquiry ID: ${escapeHtml(inquiry.id)}<br/>Received: ${escapeHtml(createdAt)}</p>
    </div>`;
  return {
    from: config.from || defaultAdminEmail,
    to: config.to || defaultAdminEmail,
    replyTo: inquiry.email || null,
    subject: inquirySubject(inquiry),
    text,
    html,
  };
}

function connect(config: SmtpConfig) {
  return new Promise<Socket | TLSSocket>((resolve, reject) => {
    const socket = config.secure
      ? connectTls({
          host: config.host,
          port: config.port,
          servername: config.host,
        })
      : connectSocket({
          host: config.host,
          port: config.port,
        });

    socket.once(config.secure ? "secureConnect" : "connect", () => resolve(socket));
    socket.once("error", reject);
    socket.setTimeout(15000, () => {
      socket.destroy(new Error("SMTP connection timed out"));
    });
  });
}

function createSmtpSession(socket: Socket | TLSSocket) {
  let buffer = "";
  const queuedLines: string[] = [];
  const waiters: Array<{
    resolve: (line: string) => void;
    reject: (error: Error) => void;
  }> = [];

  function flushLine(line: string) {
    const waiter = waiters.shift();
    if (waiter) {
      waiter.resolve(line);
      return;
    }

    queuedLines.push(line);
  }

  socket.on("data", (chunk) => {
    buffer += chunk.toString("utf8");
    let newlineIndex = buffer.indexOf("\n");

    while (newlineIndex >= 0) {
      const line = buffer.slice(0, newlineIndex).replace(/\r$/, "");
      buffer = buffer.slice(newlineIndex + 1);
      flushLine(line);
      newlineIndex = buffer.indexOf("\n");
    }
  });

  socket.on("error", (error) => {
    while (waiters.length) {
      waiters.shift()?.reject(error);
    }
  });

  function readLine() {
    const line = queuedLines.shift();
    if (line) return Promise.resolve(line);

    return new Promise<string>((resolve, reject) => {
      waiters.push({ resolve, reject });
    });
  }

  async function readResponse(expectedCodes: number[]) {
    const lines: string[] = [];

    while (true) {
      const line = await readLine();
      lines.push(line);

      if (/^\d{3} /.test(line)) break;
    }

    const code = Number(lines.at(-1)?.slice(0, 3));
    if (!expectedCodes.includes(code)) {
      throw new Error(`SMTP response ${lines.join(" | ")}`);
    }

    return lines;
  }

  async function command(value: string, expectedCodes: number[]) {
    socket.write(`${value}\r\n`);
    return readResponse(expectedCodes);
  }

  return { command, readResponse };
}

async function authenticateSmtp(
  smtp: ReturnType<typeof createSmtpSession>,
  config: SmtpConfig,
) {
  const plainToken = Buffer.from(
    `\0${config.user}\0${config.pass}`,
    "utf8",
  ).toString("base64");

  try {
    await smtp.command(`AUTH PLAIN ${plainToken}`, [235]);
    return;
  } catch (plainError) {
    try {
      await smtp.command("AUTH LOGIN", [334]);
      await smtp.command(Buffer.from(config.user, "utf8").toString("base64"), [
        334,
      ]);
      await smtp.command(Buffer.from(config.pass, "utf8").toString("base64"), [
        235,
      ]);
    } catch (loginError) {
      throw loginError instanceof Error ? loginError : plainError;
    }
  }
}

function buildRawEmail(message: MailMessage) {
  const boundary = `rsg-inquiry-${Date.now()}`;
  const headers = [
    `From: ${sanitizeHeader(message.from)}`,
    `To: ${sanitizeHeader(message.to)}`,
    message.replyTo ? `Reply-To: ${sanitizeHeader(message.replyTo)}` : "",
    `Subject: ${encodeHeader(message.subject)}`,
    `Date: ${new Date().toUTCString()}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ].filter(Boolean);

  return [
    headers.join("\r\n"),
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    message.text,
    "",
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    message.html,
    "",
    `--${boundary}--`,
  ].join("\r\n");
}

async function sendSmtpMail(config: SmtpConfig, message: MailMessage) {
  const socket = await connect(config);
  const smtp = createSmtpSession(socket);
  const fromAddress = emailAddress(config.from);
  const toAddress = emailAddress(config.to);

  await smtp.readResponse([220]);
  await smtp.command("EHLO risingsunglobal.com", [250]);
  await authenticateSmtp(smtp, config);
  await smtp.command(`MAIL FROM:<${fromAddress}>`, [250]);
  await smtp.command(`RCPT TO:<${toAddress}>`, [250, 251]);
  await smtp.command("DATA", [354]);
  socket.write(`${dotStuff(buildRawEmail(message))}\r\n.\r\n`);
  await smtp.readResponse([250]);
  await smtp.command("QUIT", [221]);
  socket.end();
}

export async function sendInquiryNotification(inquiry: InquiryEmailData) {
  const config = await getSmtpConfig();

  if (!config) {
    console.warn(
      "Inquiry email not sent because SMTP_USER and SMTP_PASS are not configured.",
    );
    return "not-configured" as const;
  }

  await sendSmtpMail(config, buildInquiryMessage(inquiry, config));
  return "sent" as const;
}
