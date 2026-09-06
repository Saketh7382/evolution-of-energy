import Link from "next/link";
import { Container } from "./Container";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.grid}>
        <div className={styles.identity}>
          <strong>Evolution of Energy</strong>
          <p>A Philosophical Invitation to Reality, Understanding, and Joyful Participation</p>
          <p className={styles.author}>Sreedhar G.</p>
        </div>
        <div><h2>Explore</h2><Link href="/book">The Book</Link><Link href="/explore">Explore EOE</Link><Link href="/get-the-book">Get the Book</Link></div>
        <div><h2>About</h2><Link href="/author">The Author</Link><Link href="/contact">Contact</Link></div>
        <div><h2>Academic</h2><Link href="/academic-review">Global Academic Review Initiative</Link><Link href="/academic-review/request">Academic Review</Link></div>
      </Container>
      <Container className={styles.bottom}>
        <p>© 2026 Sreedhar G. All rights reserved.</p>
        <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
        <p className={styles.signature}>A continuing philosophical conversation.</p>
      </Container>
    </footer>
  );
}
