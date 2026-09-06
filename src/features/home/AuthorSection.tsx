import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import styles from "./AuthorSection.module.css";

export function AuthorSection() {
  return (
    <section className={styles.section}>
      <Container className={styles.grid}>
        <div className={styles.portraitShell}>
          <Image className={styles.portrait} src="/author/sreedhar-g-cropped.jpg" alt="Sreedhar G., author of Evolution of Energy" width={574} height={861} sizes="(max-width: 800px) 82vw, 420px" />
          <span className={styles.frameLine} aria-hidden="true" />
        </div>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>The Author</p>
          <h2>A lifetime of questions.</h2>
          <p><strong>Sreedhar G.</strong> is a lifelong learner and independent writer whose curiosity has moved across science, mathematics, philosophy, history, society, religion, psychology, economics, language, technology and human experience.</p>
          <p>After serving as a Sub-Divisional Engineer in the Department of Telecommunications, Government of India, he took voluntary retirement with more than seven years of service remaining to devote his time to research, reflection and writing.</p>
          <blockquote>He does not ask readers to agree with him; he invites them to observe, reflect and continue the conversation for themselves.</blockquote>
          <Button href="/author" variant="text">Meet the Author →</Button>
        </div>
      </Container>
    </section>
  );
}
