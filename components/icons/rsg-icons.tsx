import type { ComponentType, ReactNode, SVGProps } from "react";
import {
  ArrowLeftRight,
  ArrowUpRight,
  Container,
  Factory,
  Globe2,
  Hammer,
  Layers3,
  Magnet,
  Mail as MailMark,
  MapPin,
  MessageCircleQuestion,
  MessageSquareQuote,
  PhoneCall,
  Recycle,
  Settings2,
  ShieldCheck,
  Ship,
  type LucideIcon,
} from "lucide-react";

export type RsgIconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
  title?: string;
  strokeWidth?: number;
};

type IconShellProps = RsgIconProps & {
  children: ReactNode;
};

type MarkProps = {
  Icon: LucideIcon;
  x?: number;
  y?: number;
  size?: number;
  strokeWidth?: number;
};

function IconShell({
  children,
  size = 64,
  title,
  strokeWidth = 3,
  ...props
}: IconShellProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      focusable="false"
      role={title ? "img" : undefined}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <rect
        x="4"
        y="4"
        width="56"
        height="56"
        rx="9"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="none"
      />
      {children}
    </svg>
  );
}

function Mark({ Icon, x = 18, y = 18, size = 28, strokeWidth = 3 }: MarkProps) {
  return (
    <Icon
      x={x}
      y={y}
      width={size}
      height={size}
      strokeWidth={strokeWidth}
    />
  );
}

export function ScrapImportExportIcon(props: RsgIconProps) {
  return (
    <IconShell {...props}>
      <Mark Icon={Ship} x={17} y={22} size={30} />
      <path d="M19 45c2.5 1.4 5 1.4 7.5 0s5-1.4 7.5 0 5 1.4 7.5 0" strokeWidth="2.6" />
      <Mark Icon={ArrowLeftRight} x={39} y={17} size={11} strokeWidth={3.1} />
    </IconShell>
  );
}

export function BulkExportIcon(props: RsgIconProps) {
  return (
    <IconShell {...props}>
      <Mark Icon={Container} x={16} y={20} size={31} />
      <Mark Icon={ArrowUpRight} x={40} y={17} size={11} strokeWidth={3.1} />
    </IconShell>
  );
}

export function GlobalTradeIcon(props: RsgIconProps) {
  return (
    <IconShell {...props}>
      <Mark Icon={Globe2} x={17} y={17} size={30} />
      <Mark Icon={ArrowLeftRight} x={37} y={39} size={12} strokeWidth={3.1} />
    </IconShell>
  );
}

export function DemolitionIcon(props: RsgIconProps) {
  return (
    <IconShell {...props}>
      <Mark Icon={Hammer} x={18} y={17} size={30} />
      <path d="M19 47h19M43 47h3" strokeWidth="2.6" />
    </IconShell>
  );
}

export function IndustrialRecyclingIcon(props: RsgIconProps) {
  return (
    <IconShell {...props}>
      <Mark Icon={Factory} x={17} y={20} size={30} />
      <path d="M40 20l4 4 4-4" strokeWidth="2.6" />
      <path d="M48 20v8h-8" strokeWidth="2.6" />
    </IconShell>
  );
}

export function RecyclingIcon(props: RsgIconProps) {
  return (
    <IconShell {...props}>
      <Mark Icon={Recycle} x={18} y={17} size={29} strokeWidth={3.2} />
    </IconShell>
  );
}

export function ScrapMetalIcon(props: RsgIconProps) {
  return (
    <IconShell {...props}>
      <path d="M17 39h30" />
      <path d="M21 39l5-17h14l-5 17" />
      <path d="M33 39l5-17h9l-5 17" />
      <path d="M24 31h21" strokeWidth="2.5" />
    </IconShell>
  );
}

export function MetalRecoveryIcon(props: RsgIconProps) {
  return (
    <IconShell {...props}>
      <Mark Icon={Magnet} x={18} y={16} size={30} />
      <path d="M22 47h8M38 47h8" strokeWidth="2.6" />
    </IconShell>
  );
}

export function MaterialsIcon(props: RsgIconProps) {
  return (
    <IconShell {...props}>
      <Mark Icon={Layers3} x={18} y={18} size={29} />
    </IconShell>
  );
}

export function ServicesIcon(props: RsgIconProps) {
  return (
    <IconShell {...props}>
      <Mark Icon={Settings2} x={18} y={17} size={29} />
      <path d="M20 47h24" strokeWidth="2.6" />
    </IconShell>
  );
}

export function InquiryIcon(props: RsgIconProps) {
  return (
    <IconShell {...props}>
      <Mark Icon={MessageCircleQuestion} x={16} y={16} size={32} strokeWidth={3.1} />
    </IconShell>
  );
}

export function SafetyIcon(props: RsgIconProps) {
  return (
    <IconShell {...props}>
      <Mark Icon={ShieldCheck} x={17} y={16} size={31} />
    </IconShell>
  );
}

export function MapPointIcon(props: RsgIconProps) {
  return (
    <IconShell {...props}>
      <Mark Icon={MapPin} x={18} y={15} size={30} />
      <path d="M23 48h18" strokeWidth="2.6" />
    </IconShell>
  );
}

export function QuoteIcon(props: RsgIconProps) {
  return (
    <IconShell {...props}>
      <Mark Icon={MessageSquareQuote} x={16} y={19} size={32} />
    </IconShell>
  );
}

export function MailIcon(props: RsgIconProps) {
  return (
    <IconShell {...props}>
      <Mark Icon={MailMark} x={16} y={20} size={32} />
    </IconShell>
  );
}

export function WhatsappIcon(props: RsgIconProps) {
  return (
    <IconShell {...props}>
      <path d="M20 47l2-6A15 15 0 1 1 29 46l-9 1z" />
      <path d="M27.8 25.8c-1.1.3-2 1.5-2 2.8 0 5.3 4.3 9.6 9.6 9.6 1.3 0 2.5-.9 2.8-2l-2.5-2.1-2 1.2a9.6 9.6 0 0 1-5-5l1.2-2-2.1-2.5z" strokeWidth="2.55" />
    </IconShell>
  );
}

export function CallIcon(props: RsgIconProps) {
  return (
    <IconShell {...props}>
      <Mark Icon={PhoneCall} x={17} y={17} size={30} />
    </IconShell>
  );
}

export function LinkedinIcon(props: RsgIconProps) {
  return (
    <IconShell {...props}>
      <rect x="18.5" y="18.5" width="27" height="27" rx="5.5" />
      <g fill="currentColor" stroke="none">
        <circle cx="25.6" cy="27" r="2.1" />
        <rect x="23.6" y="31.2" width="4.1" height="10.7" rx="1.1" />
        <path d="M31.4 31.2h3.9v1.5c.9-1.2 2.4-1.9 4.2-1.9 3.3 0 5.2 2.2 5.2 6.2v4.9h-4.1v-4.5c0-2.1-.8-3.2-2.4-3.2-1.5 0-2.7 1.1-2.7 3.2v4.5h-4.1V31.2z" />
      </g>
    </IconShell>
  );
}

export const RsgIcons = {
  ScrapImportExport: ScrapImportExportIcon,
  Demolition: DemolitionIcon,
  IndustrialRecycling: IndustrialRecyclingIcon,
  BulkExport: BulkExportIcon,
  Materials: MaterialsIcon,
  Services: ServicesIcon,
  Mail: MailIcon,
  Whatsapp: WhatsappIcon,
  Call: CallIcon,
  Linkedin: LinkedinIcon,
  Inquiry: InquiryIcon,
  Safety: SafetyIcon,
  MapPoint: MapPointIcon,
  Recycling: RecyclingIcon,
  Quote: QuoteIcon,
  ScrapMetal: ScrapMetalIcon,
  MetalRecovery: MetalRecoveryIcon,
  GlobalTrade: GlobalTradeIcon,
};

export type RsgIconName = keyof typeof RsgIcons;

export type RsgIconRegistryItem = {
  key: string;
  label: string;
  category: "Trade" | "Operations" | "Content" | "Contact";
  Icon: ComponentType<RsgIconProps>;
};

export const rsgIconPack: RsgIconRegistryItem[] = [
  { key: "scrap-import-export", label: "Scrap Import Export", category: "Trade", Icon: ScrapImportExportIcon },
  { key: "bulk-export", label: "Bulk Export", category: "Trade", Icon: BulkExportIcon },
  { key: "global-trade", label: "Global Trade", category: "Trade", Icon: GlobalTradeIcon },
  { key: "demolition", label: "Demolition", category: "Operations", Icon: DemolitionIcon },
  { key: "industrial-recycling", label: "Industrial Recycling", category: "Operations", Icon: IndustrialRecyclingIcon },
  { key: "recycling", label: "Recycling", category: "Operations", Icon: RecyclingIcon },
  { key: "scrap-metal", label: "Scrap Metal", category: "Operations", Icon: ScrapMetalIcon },
  { key: "metal-recovery", label: "Metal Recovery", category: "Operations", Icon: MetalRecoveryIcon },
  { key: "materials", label: "Materials", category: "Content", Icon: MaterialsIcon },
  { key: "services", label: "Services", category: "Content", Icon: ServicesIcon },
  { key: "inquiry", label: "Inquiry", category: "Content", Icon: InquiryIcon },
  { key: "safety", label: "Safety", category: "Content", Icon: SafetyIcon },
  { key: "map-point", label: "Map Point", category: "Content", Icon: MapPointIcon },
  { key: "quote", label: "Customer Quote", category: "Content", Icon: QuoteIcon },
  { key: "mail", label: "Mail", category: "Contact", Icon: MailIcon },
  { key: "whatsapp", label: "WhatsApp", category: "Contact", Icon: WhatsappIcon },
  { key: "call", label: "Call", category: "Contact", Icon: CallIcon },
  { key: "linkedin", label: "LinkedIn", category: "Contact", Icon: LinkedinIcon },
];

export const DEFAULT_RSG_ICON_KEY = "services";

const legacyRsgIconAliases: Record<string, string> = {
  boxes: "materials",
  container: "bulk-export",
  factory: "industrial-recycling",
  globe: "global-trade",
  globe2: "global-trade",
  hammer: "demolition",
  mailmark: "mail",
  messagecircle: "whatsapp",
  package: "materials",
  phone: "call",
  phonecall: "call",
  recycle: "recycling",
  scale: "scrap-metal",
  settings2: "services",
  ship: "bulk-export",
  truck: "bulk-export",
};

function slugifyIconValue(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function resolveRsgIconKey(
  value?: string | null,
  fallback = DEFAULT_RSG_ICON_KEY,
) {
  const fallbackKey =
    rsgIconPack.find((icon) => icon.key === fallback)?.key ??
    DEFAULT_RSG_ICON_KEY;
  const rawValue = String(value ?? "").trim();

  if (!rawValue) return fallbackKey;

  const exactMatch = rsgIconPack.find((icon) => icon.key === rawValue);
  if (exactMatch) return exactMatch.key;

  const normalizedValue = rawValue.toLowerCase().replace(/[^a-z0-9]/g, "");
  const legacyMatch = legacyRsgIconAliases[normalizedValue];
  if (legacyMatch) return legacyMatch;

  const slug = slugifyIconValue(rawValue);
  const slugMatch = rsgIconPack.find(
    (icon) => icon.key === slug || slugifyIconValue(icon.label) === slug,
  );

  return slugMatch?.key ?? fallbackKey;
}

export function getRsgIcon(value?: string | null, fallback = DEFAULT_RSG_ICON_KEY) {
  const key = resolveRsgIconKey(value, fallback);
  return rsgIconPack.find((icon) => icon.key === key) ?? rsgIconPack[0];
}

export function getRsgIconComponent(
  value?: string | null,
  fallback = DEFAULT_RSG_ICON_KEY,
) {
  return getRsgIcon(value, fallback).Icon;
}
