export default function PasswordInput({
  value,
  setValue,
  onChange,
  name,
  onBlur,
  onKeyDown,
}: {
  value: string;
  name?: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  setValue?: (val: string, e?: any) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="password"
      name={name}
      onBlur={onBlur}
      onChange={(e) => {
        if (onChange) {
          onChange(e);
        } else if (setValue) {
          setValue(e.target.value, e);
        }
      }}
      className="px-2 bg-base-200 outline-primary rounded border h-10"
      value={value}
      onKeyDown={onKeyDown}
    />
  );
}
