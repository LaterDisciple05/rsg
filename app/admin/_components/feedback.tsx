"use client";

import { useEffect, useState, type ReactNode } from "react";

type DismissibleAdminNoticeProps = {
  children: ReactNode;
  className: string;
  removeParams?: string[];
};

export function DismissibleAdminNotice({
  children,
  className,
  removeParams = [],
}: DismissibleAdminNoticeProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsVisible(false);

      if (removeParams.length) {
        const url = new URL(window.location.href);
        removeParams.forEach((param) => url.searchParams.delete(param));
        const query = url.searchParams.toString();
        window.history.replaceState(
          null,
          "",
          `${url.pathname}${query ? `?${query}` : ""}${url.hash}`,
        );
      }
    }, 3600);

    return () => window.clearTimeout(timer);
  }, [removeParams]);

  if (!isVisible) return null;

  return <div className={className}>{children}</div>;
}

export function AdminNotice({
  saved,
  deleted,
  error,
}: {
  saved?: string;
  deleted?: string;
  error?: string;
}) {
  if (saved) {
    return (
      <DismissibleAdminNotice
        removeParams={["saved"]}
        className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm font-bold text-green-800"
      >
        Saved successfully.
      </DismissibleAdminNotice>
    );
  }

  if (deleted) {
    return (
      <DismissibleAdminNotice
        removeParams={["deleted"]}
        className="rounded-md border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-bold text-orange-800"
      >
        Deleted successfully.
      </DismissibleAdminNotice>
    );
  }

  if (error) {
    return (
      <DismissibleAdminNotice
        removeParams={["error"]}
        className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-800"
      >
        Please complete the required fields.
      </DismissibleAdminNotice>
    );
  }

  return null;
}
