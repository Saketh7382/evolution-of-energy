import { Container } from "@/components/layout/Container";
import styles from "./FourInvitations.module.css";

const invitations = [
  ["Observe", "Begin with what reality presents before deciding what it must mean."],
  ["Question", "Examine assumptions—including those presented within this book."],
  ["Understand", "Allow understanding to grow through observation, reason, experience and continuing inquiry."],
  ["Participate", "Ask what understanding might mean for the way we live, relate, create and contribute."],
] as const;

export function FourInvitations() {
  return <section className={styles.section}><Container className={styles.grid}>{invitations.map(([title, copy]) => <article key={title}><span aria-hidden="true">◇</span><h2>{title}</h2><p>{copy}</p></article>)}</Container></section>;
}
