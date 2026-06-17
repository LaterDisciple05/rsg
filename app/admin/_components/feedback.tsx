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
      <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm font-bold text-green-800">
        Saved successfully.
      </div>
    );
  }

  if (deleted) {
    return (
      <div className="rounded-md border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-bold text-orange-800">
        Deleted successfully.
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-800">
        Please complete the required fields.
      </div>
    );
  }

  return null;
}
