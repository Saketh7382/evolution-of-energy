import type { PropsWithChildren } from "react";
import styles from "./Container.module.css";

type ContainerProps = PropsWithChildren<{ className?: string; reading?: boolean }>;

export function Container({ children, className = "", reading = false }: ContainerProps) {
  return <div className={`${reading ? styles.reading : styles.container} ${className}`}>{children}</div>;
}
