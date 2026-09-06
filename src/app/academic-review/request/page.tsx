import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ReviewRequestForm } from "@/components/gari/ReviewRequestForm";
import styles from "./page.module.css";
export const metadata: Metadata = { title: 'Request an Academic Review Copy', description: 'Request an identified Academic Review Copy of Evolution of Energy for genuine scholarly or educational examination.', alternates: { canonical: '/academic-review/request' } };
export default function RequestPage(){return <section className={styles.section}><Container reading><p className={styles.eyebrow}>Academic Review</p><h1>Request an Academic Review Copy</h1><p className={styles.lead}>Please provide enough information for the request to be assessed for genuine scholarly or educational use. A request does not imply approval, endorsement or guaranteed issue of a copy.</p><ReviewRequestForm/></Container></section>}
