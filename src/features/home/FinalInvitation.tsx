import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import styles from "./FinalInvitation.module.css";

export function FinalInvitation() {
  return <section className={styles.section}><Container reading><h2>You do not have to agree.</h2><p>You only have to be willing to observe, question and think.</p><p className={styles.closer}>The conversation continues with you.</p><div className={styles.actions}><Button href="/explore">Explore EOE</Button><Button href="/get-the-book" variant="secondary">Get the Book</Button></div></Container></section>;
}
