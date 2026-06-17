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
