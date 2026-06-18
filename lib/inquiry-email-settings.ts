import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

export type InquiryEmailSettings = {
  senderEmail: string;
  receiverEmail: string;
};

const defaultAdminEmail = "risingsunglobal.au@gmail.com";
const settingsPath = join(process.cwd(), "config", "inquiry-email.json");

function env(name: string) {
  return process.env[name]?.trim() || "";
}

function defaultInquiryEmailSettings(): InquiryEmailSettings {
  return {
    senderEmail: env("SMTP_FROM") || env("SMTP_USER") || defaultAdminEmail,
    receiverEmail: env("INQUIRY_EMAIL_TO") || defaultAdminEmail,
  };
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export async function getInquiryEmailSettings(): Promise<InquiryEmailSettings> {
  const defaults = defaultInquiryEmailSettings();

  try {
    const rawSettings = await readFile(settingsPath, "utf8");
    const parsedSettings = JSON.parse(rawSettings) as Partial<InquiryEmailSettings>;

    return {
      senderEmail: parsedSettings.senderEmail?.trim() || defaults.senderEmail,
      receiverEmail: parsedSettings.receiverEmail?.trim() || defaults.receiverEmail,
    };
  } catch {
    return defaults;
  }
}

export async function saveInquiryEmailSettings(
  settings: InquiryEmailSettings,
) {
  const nextSettings = {
    senderEmail: settings.senderEmail.trim(),
    receiverEmail: settings.receiverEmail.trim(),
  };

  await mkdir(dirname(settingsPath), { recursive: true });
  await writeFile(settingsPath, `${JSON.stringify(nextSettings, null, 2)}\n`, "utf8");

  return nextSettings;
}
