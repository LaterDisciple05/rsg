import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";

type SqlValue = string | number | boolean | null | undefined;

let schemaReady = false;

function parseDatabaseUrl() {
  const rawUrl = process.env.DATABASE_URL;

  if (!rawUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const url = new URL(rawUrl);

  return {
    host: url.hostname,
    port: url.port || "5432",
    database: url.pathname.replace(/^\//, ""),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
  };
}

function runPsql(sql: string) {
  const db = parseDatabaseUrl();

  return execFileSync("psql", ["-X", "-q", "-t", "-A", "-v", "ON_ERROR_STOP=1"], {
    input: sql,
    encoding: "utf8",
    env: {
      ...process.env,
      PGHOST: db.host,
      PGPORT: db.port,
      PGDATABASE: db.database,
      PGUSER: db.user,
      PGPASSWORD: db.password,
    },
    maxBuffer: 1024 * 1024 * 10,
  }).trim();
}

export function sqlValue(value: SqlValue) {
  if (value === null || value === undefined || value === "") {
    return "NULL";
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? String(value) : "NULL";
  }

  if (typeof value === "boolean") {
    return value ? "TRUE" : "FALSE";
  }

  return `'${value.replace(/'/g, "''")}'`;
}

function jsonRows<T>(sql: string): T[] {
  ensureCmsSchema();
  const result = runPsql(
    `SELECT COALESCE(json_agg(row_to_json(rows)), '[]'::json)::text FROM (${sql}) rows;`
  );

  return JSON.parse(result || "[]") as T[];
}

function jsonOne<T>(sql: string): T | null {
  const rows = jsonRows<T>(sql);
  return rows[0] ?? null;
}

export function executeSql(sql: string) {
  ensureCmsSchema();
  runPsql(sql);
}

export function createId() {
  return randomUUID();
}

export function ensureCmsSchema() {
  if (schemaReady) {
    return;
  }

  runPsql(`
    CREATE TABLE IF NOT EXISTS "CompanyProfile" (
      "id" TEXT PRIMARY KEY,
      "name" TEXT NOT NULL DEFAULT 'Rising Sun Global',
      "about" TEXT,
      "mission" TEXT,
      "vision" TEXT,
      "email" TEXT,
      "phone" TEXT,
      "whatsapp" TEXT,
      "linkedinUrl" TEXT,
      "address" TEXT,
      "city" TEXT,
      "country" TEXT,
      "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS "Service" (
      "id" TEXT PRIMARY KEY,
      "title" TEXT NOT NULL,
      "slug" TEXT NOT NULL UNIQUE,
      "description" TEXT,
      "icon" TEXT,
      "sortOrder" INTEGER NOT NULL DEFAULT 0,
      "visibility" TEXT NOT NULL DEFAULT 'PUBLIC',
      "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS "Material" (
      "id" TEXT PRIMARY KEY,
      "title" TEXT NOT NULL,
      "slug" TEXT NOT NULL UNIQUE,
      "sortOrder" INTEGER NOT NULL DEFAULT 0,
      "visibility" TEXT NOT NULL DEFAULT 'PUBLIC',
      "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS "Project" (
      "id" TEXT PRIMARY KEY,
      "title" TEXT NOT NULL,
      "slug" TEXT NOT NULL UNIQUE,
      "description" TEXT,
      "category" TEXT,
      "country" TEXT,
      "industry" TEXT,
      "featured" BOOLEAN NOT NULL DEFAULT FALSE,
      "visibility" TEXT NOT NULL DEFAULT 'PRIVATE',
      "status" TEXT NOT NULL DEFAULT 'PLANNED',
      "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS "Testimonial" (
      "id" TEXT PRIMARY KEY,
      "customerName" TEXT,
      "companyName" TEXT,
      "message" TEXT,
      "visibility" TEXT NOT NULL DEFAULT 'PRIVATE',
      "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS "Document" (
      "id" TEXT PRIMARY KEY,
      "title" TEXT NOT NULL,
      "fileUrl" TEXT NOT NULL,
      "description" TEXT,
      "visibility" TEXT NOT NULL DEFAULT 'PRIVATE',
      "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS "Statistic" (
      "id" TEXT PRIMARY KEY,
      "label" TEXT NOT NULL,
      "value" TEXT,
      "suffix" TEXT,
      "isVisible" BOOLEAN NOT NULL DEFAULT FALSE,
      "sortOrder" INTEGER NOT NULL DEFAULT 0,
      "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS "Inquiry" (
      "id" TEXT PRIMARY KEY,
      "name" TEXT,
      "company" TEXT,
      "email" TEXT,
      "phone" TEXT,
      "country" TEXT,
      "material" TEXT,
      "quantity" TEXT,
      "message" TEXT,
      "status" TEXT NOT NULL DEFAULT 'NEW',
      "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  schemaReady = true;
}

export type CompanyProfileRecord = {
  id: string;
  name: string;
  about: string | null;
  mission: string | null;
  vision: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  linkedinUrl: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
};

export type ServiceRecord = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sortOrder: number;
  visibility: "PUBLIC" | "PRIVATE";
};

export type MaterialRecord = {
  id: string;
  title: string;
  slug: string;
  sortOrder: number;
  visibility: "PUBLIC" | "PRIVATE";
};

export type ProjectRecord = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string | null;
  country: string | null;
  industry: string | null;
  featured: boolean;
  visibility: "PUBLIC" | "PRIVATE";
  status: "PLANNED" | "ACTIVE" | "COMPLETED" | "ARCHIVED";
};

export type TestimonialRecord = {
  id: string;
  customerName: string | null;
  companyName: string | null;
  message: string | null;
  visibility: "PUBLIC" | "PRIVATE";
};

export type DocumentRecord = {
  id: string;
  title: string;
  fileUrl: string;
  description: string | null;
  visibility: "PUBLIC" | "PRIVATE";
};

export type StatisticRecord = {
  id: string;
  label: string;
  value: string | null;
  suffix: string | null;
  isVisible: boolean;
  sortOrder: number;
};

export type InquiryRecord = {
  id: string;
  name: string | null;
  company: string | null;
  email: string | null;
  phone: string | null;
  country: string | null;
  material: string | null;
  quantity: string | null;
  message: string | null;
  status: "NEW" | "CONTACTED" | "QUOTED" | "WON" | "LOST" | "ARCHIVED";
  createdAt: string;
};

export function getCompanyProfile() {
  return jsonOne<CompanyProfileRecord>(
    `SELECT * FROM "CompanyProfile" ORDER BY "createdAt" ASC LIMIT 1`
  );
}

export function listServices() {
  return jsonRows<ServiceRecord>(
    `SELECT * FROM "Service" ORDER BY "sortOrder" ASC, "createdAt" DESC`
  );
}

export function listMaterials() {
  return jsonRows<MaterialRecord>(
    `SELECT * FROM "Material" ORDER BY "sortOrder" ASC, "createdAt" DESC`
  );
}

export function listProjects() {
  return jsonRows<ProjectRecord>(
    `SELECT * FROM "Project" ORDER BY "createdAt" DESC`
  );
}

export function listTestimonials() {
  return jsonRows<TestimonialRecord>(
    `SELECT * FROM "Testimonial" ORDER BY "createdAt" DESC`
  );
}

export function listDocuments() {
  return jsonRows<DocumentRecord>(
    `SELECT * FROM "Document" ORDER BY "createdAt" DESC`
  );
}

export function listStatistics() {
  return jsonRows<StatisticRecord>(
    `SELECT * FROM "Statistic" ORDER BY "sortOrder" ASC, "createdAt" DESC`
  );
}

export function listInquiries() {
  return jsonRows<InquiryRecord>(
    `SELECT * FROM "Inquiry" ORDER BY "createdAt" DESC`
  );
}

export function countTable(table: string) {
  ensureCmsSchema();
  const result = runPsql(`SELECT COUNT(*) FROM "${table}";`);
  return Number(result || 0);
}
