export default function FormControl({
  label,
  input,
  error
}: {
  label: string;
  input: React.ReactNode;
  error?: string | undefined
}) {
  return (
    <div className="flex gap-1 flex-col justify-start">
      <label className="text-left font-medium">{label}</label>
      {input}
      {error && <div className="text-error text-xs text-left">
        {error}
      </div>}
    </div>
  );
}
