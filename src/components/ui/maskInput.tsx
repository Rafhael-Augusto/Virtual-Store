import { IMaskInput } from "react-imask";

interface Props {
  mask?: string;
  placeholder?: string;
  id?: string;
  required?: boolean;
  maxLength?: number;
}

export default function MaskInput({
  mask,
  placeholder,
  id,
  required,
  maxLength,
}: Props) {
  return (
    <IMaskInput
      mask={mask}
      placeholder={placeholder}
      id={id}
      maxLength={maxLength}
      required={required}
      className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
    />
  );
}
