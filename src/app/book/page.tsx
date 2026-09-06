import type { Metadata } from "next";
import { CanonicalCover } from "@/components/book/CanonicalCover";
import { Container } from "@/components/layout/Container";
import { BookJsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import styles from "./page.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/book" }, title: "The Book", description: "Discover Evolution of Energy by Sreedhar G., First Canonical Edition." };

export default function BookPage() {
  return <><BookJsonLd />
    <section className={styles.hero}><Container className={styles.heroGrid}>
      <div><p className={styles.eyebrow}>The Book</p><h1>Not a doctrine.<br/><em>An invitation.</em></h1><p className={styles.lead}>Evolution of Energy brings together questions about reality, understanding, change, human experience and our place within existence. It is written as an invitation to observe, question and reflect—not as a demand for agreement.</p><div className={styles.actions}><Button href="/explore">Explore the Ideas</Button><Button href="/get-the-book" variant="secondary">Get the Book</Button></div></div>
      <div className={styles.cover}><CanonicalCover priority /></div>
    </Container></section>
    <section className={styles.invitation}><Container reading><p className={styles.eyebrow}>Why EOE?</p><h2>Some questions become more important the longer we live with them.</h2><p>What is reality? What can we truly know about it? How do difference, relation and change shape what we experience? How does understanding develop? And what might it mean not merely to exist within reality, but to participate in it consciously and joyfully?</p><p>EOE grew from years of observation, questioning and reflection across philosophy, science, human experience and society. It does not ask the reader to accept a final explanation.</p><p className={styles.lookAgain}>It asks the reader to look again.</p></Container></section>
    <section className={styles.meta}><Container className={styles.metaGrid}><div><span>Author</span><strong>Sreedhar G.</strong></div><div><span>Edition</span><strong>First Canonical Edition</strong></div><div><span>Published</span><strong>9 August 2026</strong></div></Container></section>
  </>;
}
