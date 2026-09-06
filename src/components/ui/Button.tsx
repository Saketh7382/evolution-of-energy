import Link from "next/link";
import type { PropsWithChildren } from "react";
import styles from "./Button.module.css";

type Props = PropsWithChildren<{ href: string; variant?: "primary" | "secondary" | "text"; className?: string }>;

export function Button({ href, variant = "primary", children, className = "" }: Props) {
  return <Link className={`${styles.base} ${styles[variant]} ${className}`} href={href}>{children}</Link>;
}
