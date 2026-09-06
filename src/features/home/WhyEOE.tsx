import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import styles from "./WhyEOE.module.css";

export function WhyEOE() {
  return (
    <section className={styles.section} aria-labelledby="why-eoe">
      <Container className={styles.grid}>
        <div className={styles.marker} aria-hidden="true"><span>01</span><i /></div>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Why Does This Book Exist?</p>
          <h2 id="why-eoe">Some questions become more important the longer we live with them.</h2>
          <div className={styles.prose}>
            <p>What is reality? What can we truly know about it? How do difference, relation and change shape what we experience? How does understanding develop? And what might it mean not merely to exist within reality, but to participate in it consciously and joyfully?</p>
            <p><em>Evolution of Energy</em> grew from years of observation, questioning and reflection across philosophy, science, human experience and society.</p>
            <p>It does not ask the reader to accept a final explanation.</p>
          </div>
          <p className={styles.closer}>It asks the reader to look again.</p>
          <Button href="/book#why-eoe" variant="text">Why EOE? →</Button>
        </div>
      </Container>
    </section>
  );
}
