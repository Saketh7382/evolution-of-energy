import { CanonicalCover } from "@/components/book/CanonicalCover";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.sky} aria-hidden="true">
        <span className={styles.sun} />
        <span className={styles.haze} />
        <span className={styles.mountainFar} />
        <span className={styles.mountainNear} />
      </div>
      <Container className={styles.grid}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Evolution of Energy</p>
          <h1 id="hero-title">A Philosophical Invitation to Reality, Understanding, and Joyful Participation</h1>
          <blockquote>
            <p>Reality is always greater than our understanding,<br />yet it continually invites us to understand more.</p>
            <cite>— Sreedhar G.</cite>
          </blockquote>
          <div className={styles.actions}>
            <Button href="/explore">Explore the Ideas</Button>
            <Button href="/book" variant="secondary">Discover the Book</Button>
          </div>
          <p className={styles.meta}>First Canonical Edition <span aria-hidden="true">·</span> Published 9 August 2026</p>
        </div>
        <div className={styles.coverWrap}>
          <div className={styles.coverGlow} aria-hidden="true" />
          <CanonicalCover priority />
          <p className={styles.coverNote}>First Canonical Edition</p>
        </div>
      </Container>
      <div className={styles.scrollCue} aria-hidden="true"><span />Explore the questions</div>
    </section>
  );
}
