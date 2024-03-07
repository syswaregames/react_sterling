export default function TextInput({
  value,
  setValue,
  onChange,
  name,
  className,
  onBlur,
}: {
  value: string;
  name?: string;
  className?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  setValue?: (val: string, e?: any) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="text"
      name={name}
      onBlur={onBlur}
      onChange={(e) => {
        if (onChange) {
          onChange(e);
        } else if (setValue) {
          setValue(e.target.value, e);
        }
      }}
      className={className+" px-2 bg-base-200 outline-primary rounded border h-10"}
      value={value}
    />
  );
}
