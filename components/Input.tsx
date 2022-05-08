import { ChangeEventHandler } from "react";

export interface InputProps {
  initialValue?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

export function Input({
  initialValue,
  placeholder,
  onChange,
  className,
}: InputProps) {
  return (
    <input
      className={`border-2 border-secondary-100 focus:border-secondary-80 outline-none rounded-xl p-3 transition ${className}`}
      onChange={onChange}
      defaultValue={initialValue}
      placeholder={placeholder}
    ></input>
  );
}
