"use client";

import Link from "next/link";
import { useRef } from "react";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import styles from "./SiteHeader.module.css";

const nav = [
  ["The Book", "/book"],
  ["Explore", "/explore"],
  ["Author", "/author"],
  ["Academic Review", "/academic-review"],
] as const;

export function SiteHeader() {
  const menuRef = useRef<HTMLDetailsElement>(null);
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Evolution of Energy home">
          <span>Evolution of Energy</span>
        </Link>
        <nav className={styles.nav} aria-label="Primary navigation">
          {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Button href="/get-the-book" className={styles.cta}>Get the Book</Button>
        <details ref={menuRef} className={styles.mobileMenu} onKeyDown={(event) => {
          if (event.key === "Escape" && menuRef.current?.open) {
            menuRef.current.open = false;
            menuRef.current.querySelector("summary")?.focus();
          }
        }}>
          <summary aria-label="Open navigation"><span>Menu</span></summary>
          <nav aria-label="Mobile navigation" onClick={(event) => {
            if ((event.target as HTMLElement).closest("a") && menuRef.current) {
              menuRef.current.open = false;
            }
          }}>
            {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <Link href="/contact">Contact</Link>
            <Link href="/get-the-book" className={styles.mobileCta}>Get the Book</Link>
          </nav>
        </details>
      </Container>
    </header>
  );
}
