import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { prisma } from "@/lib/prisma";

export type SectionVisibilityKey = "projects" | "testimonials" | "whyRsg";

export type SectionVisibilitySettings = Record<SectionVisibilityKey, boolean>;

const sectionVisibilityPath = join(
  process.cwd(),
  "config",
  "section-visibility.json",
);
const sectionVisibilitySettingKey = "sectionVisibility";

const defaultSectionVisibility: SectionVisibilitySettings = {
  projects: true,
  testimonials: true,
  whyRsg: true,
};

async function saveLocalSectionVisibilityBackup(
  settings: SectionVisibilitySettings,
) {
  if (process.env.NODE_ENV === "production") return;

  try {
    await mkdir(dirname(sectionVisibilityPath), { recursive: true });
    await writeFile(
      sectionVisibilityPath,
      `${JSON.stringify(settings, null, 2)}\n`,
      "utf8",
    );
  } catch (error) {
    console.warn("Local section visibility backup could not be saved.", error);
  }
}

export function isSectionVisibilityKey(
  value: string,
): value is SectionVisibilityKey {
  return value === "projects" || value === "testimonials" || value === "whyRsg";
}

export async function getSectionVisibility(): Promise<SectionVisibilitySettings> {
  try {
    const storedSettings = await prisma.siteSetting.findUnique({
      where: { key: sectionVisibilitySettingKey },
    });
    const parsedSettings = storedSettings?.value as
      | Partial<SectionVisibilitySettings>
      | null
      | undefined;

    if (parsedSettings) {
      return normalizeSectionVisibility(parsedSettings);
    }
  } catch (error) {
    console.warn(
      "Database section visibility settings are unavailable. Falling back to local settings.",
      error,
    );
  }

  try {
    const rawSettings = await readFile(sectionVisibilityPath, "utf8");
    const parsedSettings = JSON.parse(rawSettings) as Partial<SectionVisibilitySettings>;

    return normalizeSectionVisibility(parsedSettings);
  } catch {
    return defaultSectionVisibility;
  }
}

function normalizeSectionVisibility(
  settings: Partial<SectionVisibilitySettings>,
): SectionVisibilitySettings {
  return {
    projects:
      typeof settings.projects === "boolean"
        ? settings.projects
        : defaultSectionVisibility.projects,
    testimonials:
      typeof settings.testimonials === "boolean"
        ? settings.testimonials
        : defaultSectionVisibility.testimonials,
    whyRsg:
      typeof settings.whyRsg === "boolean"
        ? settings.whyRsg
        : defaultSectionVisibility.whyRsg,
  };
}

export async function saveSectionVisibility(
  section: SectionVisibilityKey,
  isVisible: boolean,
) {
  const currentSettings = await getSectionVisibility();
  const nextSettings = {
    ...currentSettings,
    [section]: isVisible,
  };

  await prisma.siteSetting.upsert({
    where: { key: sectionVisibilitySettingKey },
    create: {
      key: sectionVisibilitySettingKey,
      value: nextSettings,
    },
    update: {
      value: nextSettings,
    },
  });

  await saveLocalSectionVisibilityBackup(nextSettings);

  return nextSettings;
}
