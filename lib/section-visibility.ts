import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

export type SectionVisibilityKey = "projects" | "testimonials" | "whyRsg";

export type SectionVisibilitySettings = Record<SectionVisibilityKey, boolean>;

const sectionVisibilityPath = join(
  process.cwd(),
  "config",
  "section-visibility.json",
);

const defaultSectionVisibility: SectionVisibilitySettings = {
  projects: true,
  testimonials: true,
  whyRsg: true,
};

export function isSectionVisibilityKey(
  value: string,
): value is SectionVisibilityKey {
  return value === "projects" || value === "testimonials" || value === "whyRsg";
}

export async function getSectionVisibility(): Promise<SectionVisibilitySettings> {
  try {
    const rawSettings = await readFile(sectionVisibilityPath, "utf8");
    const parsedSettings = JSON.parse(rawSettings) as Partial<SectionVisibilitySettings>;

    return {
      projects:
        typeof parsedSettings.projects === "boolean"
          ? parsedSettings.projects
          : defaultSectionVisibility.projects,
      testimonials:
        typeof parsedSettings.testimonials === "boolean"
          ? parsedSettings.testimonials
          : defaultSectionVisibility.testimonials,
      whyRsg:
        typeof parsedSettings.whyRsg === "boolean"
          ? parsedSettings.whyRsg
          : defaultSectionVisibility.whyRsg,
    };
  } catch {
    return defaultSectionVisibility;
  }
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

  await mkdir(dirname(sectionVisibilityPath), { recursive: true });
  await writeFile(
    sectionVisibilityPath,
    `${JSON.stringify(nextSettings, null, 2)}\n`,
    "utf8",
  );

  return nextSettings;
}
