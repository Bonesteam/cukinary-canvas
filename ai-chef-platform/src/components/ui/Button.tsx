import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "solid" | "ghost" };

export function Button({ variant = "solid", ...props }: Props) {
  const className = `button ${variant === "ghost" ? "ghost" : ""}`;
  return <button {...props} className={className} />;
}
