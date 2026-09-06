import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import styles from "./GariSection.module.css";

export function GariSection() {
  return <section className={styles.section}><Container className={styles.grid}><div><p className={styles.eyebrow}>Global Academic Review Initiative</p><h2>An invitation to examine EOE critically.</h2><p><em>Evolution of Energy</em> is being made available to scholars, researchers and universities for independent academic review and critical examination.</p><p>No endorsement or predetermined agreement is sought.</p><div className={styles.actions}><Button href="/academic-review">About GARI</Button><Button href="/academic-review/request" variant="secondary">Academic Review Enquiry</Button></div></div><blockquote><p>Examination, not endorsement.</p><p>Criticism, not confirmation.</p><p>Dialogue, not institutional prestige.</p></blockquote></Container></section>;
}
