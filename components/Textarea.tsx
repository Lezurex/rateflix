import { ChangeEventHandler } from "react";

export interface TextareaProps {
  initialValue?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
}

export function Textarea({
  initialValue,
  placeholder,
  onChange,
  className,
}: TextareaProps) {
  return (
    <textarea
      className={`border-2 border-secondary-100 focus:border-secondary-80 outline-none rounded-xl p-3 transition ${className}`}
      onChange={onChange}
      defaultValue={initialValue}
      placeholder={placeholder}
    ></textarea>
  );
}
