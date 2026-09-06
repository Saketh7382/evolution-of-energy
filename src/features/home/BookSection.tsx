import { CanonicalCover } from "@/components/book/CanonicalCover";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import styles from "./BookSection.module.css";

export function BookSection() {
  return <section className={styles.section}><Container className={styles.grid}><CanonicalCover size="section"/><div><p className={styles.eyebrow}>The Book</p><h2>Not a doctrine. An invitation.</h2><p><em>Evolution of Energy</em> brings together questions about reality, understanding, change, human experience, society and our place within existence.</p><p>Written for readers from different backgrounds, it encourages observation, questioning and independent reflection rather than demanding agreement.</p><p className={styles.meta}>Sreedhar G. · First Canonical Edition · Published 9 August 2026</p><div className={styles.actions}><Button href="/book">About the Book</Button><Button href="/get-the-book" variant="secondary">Get the Book</Button></div></div></Container></section>;
}
