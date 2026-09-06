import Image from "next/image";
import styles from "./CanonicalCover.module.css";

type Props = { priority?: boolean; className?: string; size?: "hero" | "section" };

export function CanonicalCover({ priority = false, className = "", size = "hero" }: Props) {
  return (
    <figure className={`${styles.figure} ${styles[size]} ${className}`}>
      <Image
        src="/canonical/eoe-canonical-cover.png"
        alt="Cover of Evolution of Energy by Sreedhar G."
        width={992}
        height={1586}
        priority={priority}
        sizes={size === "hero" ? "(max-width: 767px) 78vw, 420px" : "(max-width: 767px) 70vw, 300px"}
        className={styles.image}
      />
    </figure>
  );
}
