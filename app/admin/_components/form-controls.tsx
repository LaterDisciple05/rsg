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

export function FileUpload({
  name,
  label,
  accept = "image/*",
  required,
  multiple,
}: {
  name: string;
  label: string;
  accept?: string;
  required?: boolean;
  multiple?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-rsg-charcoal">{label}</span>
      <input
        name={name}
        type="file"
        accept={accept}
        required={required}
        multiple={multiple}
        className="rounded-md border border-rsg-line bg-white px-4 py-3 text-sm text-rsg-ink outline-none file:mr-4 file:rounded-md file:border-0 file:bg-rsg-orange-soft file:px-4 file:py-2 file:text-xs file:font-bold file:text-rsg-orange-dark hover:file:bg-rsg-orange focus:border-rsg-orange"
      />
    </label>
  );
}

export function RelationSelect({
  name,
  label,
  options,
  defaultValue,
  required,
}: {
  name: string;
  label: string;
  options: { id: string; name: string }[];
  defaultValue?: string | null;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-rsg-charcoal">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        className="rounded-md border border-rsg-line bg-white px-4 py-3 text-sm font-semibold text-rsg-ink outline-none focus:border-rsg-orange"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
    </label>
  );
}
