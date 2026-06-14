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

export function PageIntro({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <p className="rsg-section-kicker">{kicker}</p>
      <h1 className="mt-3 text-3xl font-black text-rsg-ink">{title}</h1>
      <p className="mt-3 max-w-3xl text-base leading-7 text-rsg-muted">
        {body}
      </p>
    </div>
  );
}

export function TextInput({
  name,
  label,
  defaultValue,
  required,
  type = "text",
}: {
  name: string;
  label: string;
  defaultValue?: string | number | null;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-rsg-charcoal">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
        className="rounded-md border border-rsg-line bg-white px-4 py-3 text-sm text-rsg-ink outline-none focus:border-rsg-orange"
      />
    </label>
  );
}

export function TextArea({
  name,
  label,
  defaultValue,
  rows = 4,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  rows?: number;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-rsg-charcoal">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue ?? ""}
        rows={rows}
        className="rounded-md border border-rsg-line bg-white px-4 py-3 text-sm leading-6 text-rsg-ink outline-none focus:border-rsg-orange"
      />
    </label>
  );
}

export function VisibilitySelect({
  defaultValue = "PUBLIC",
}: {
  defaultValue?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-rsg-charcoal">Visibility</span>
      <select
        name="visibility"
        defaultValue={defaultValue}
        className="rounded-md border border-rsg-line bg-white px-4 py-3 text-sm font-semibold text-rsg-ink outline-none focus:border-rsg-orange"
      >
        <option value="PUBLIC">Public</option>
        <option value="PRIVATE">Private</option>
      </select>
    </label>
  );
}

export function SaveButton({ label = "Save" }: { label?: string }) {
  return (
    <button
      type="submit"
      className="rounded-md bg-rsg-navy px-5 py-3 text-sm font-black text-white hover:bg-rsg-orange-dark"
    >
      {label}
    </button>
  );
}

export function DeleteButton() {
  return (
    <button
      type="submit"
      className="rounded-md border border-red-200 px-4 py-2 text-sm font-black text-red-700 hover:bg-red-50"
    >
      Delete
    </button>
  );
}
