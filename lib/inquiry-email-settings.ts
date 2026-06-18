import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { prisma } from "@/lib/prisma";

export type InquiryEmailSettings = {
  receiverEmail: string;
};

const defaultAdminEmail = "risingsunglobal.au@gmail.com";
const settingsPath = join(process.cwd(), "config", "inquiry-email.json");
const inquiryEmailSettingKey = "inquiryEmailSettings";

function env(name: string) {
  return process.env[name]?.trim() || "";
}

function defaultInquiryEmailSettings(): InquiryEmailSettings {
  return {
    receiverEmail: env("INQUIRY_EMAIL_TO") || defaultAdminEmail,
  };
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

async function saveLocalInquiryEmailSettingsBackup(
  settings: InquiryEmailSettings,
) {
  if (process.env.NODE_ENV === "production") return;

  try {
    await mkdir(dirname(settingsPath), { recursive: true });
    await writeFile(
      settingsPath,
      `${JSON.stringify(settings, null, 2)}\n`,
      "utf8",
    );
  } catch (error) {
    console.warn("Local inquiry email settings backup could not be saved.", error);
  }
}

export async function getInquiryEmailSettings(): Promise<InquiryEmailSettings> {
  const defaults = defaultInquiryEmailSettings();

  try {
    const storedSettings = await prisma.siteSetting.findUnique({
      where: { key: inquiryEmailSettingKey },
    });
    const parsedSettings = storedSettings?.value as
      | Partial<InquiryEmailSettings>
      | null
      | undefined;

    if (parsedSettings) {
      return normalizeInquiryEmailSettings(parsedSettings, defaults);
    }
  } catch (error) {
    console.warn(
      "Database inquiry email settings are unavailable. Falling back to local settings.",
      error,
    );
  }

  try {
    const rawSettings = await readFile(settingsPath, "utf8");
    const parsedSettings = JSON.parse(rawSettings) as Partial<InquiryEmailSettings>;

    return normalizeInquiryEmailSettings(parsedSettings, defaults);
  } catch {
    return defaults;
  }
}

function normalizeInquiryEmailSettings(
  settings: Partial<InquiryEmailSettings>,
  defaults: InquiryEmailSettings,
): InquiryEmailSettings {
  return {
    receiverEmail: settings.receiverEmail?.trim() || defaults.receiverEmail,
  };
}

export async function saveInquiryEmailSettings(
  settings: InquiryEmailSettings,
) {
  const nextSettings = {
    receiverEmail: settings.receiverEmail.trim(),
  };

  await prisma.siteSetting.upsert({
    where: { key: inquiryEmailSettingKey },
    create: {
      key: inquiryEmailSettingKey,
      value: nextSettings,
    },
    update: {
      value: nextSettings,
    },
  });

  await saveLocalInquiryEmailSettingsBackup(nextSettings);

  return nextSettings;
}
