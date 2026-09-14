import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import styles from "./page.module.css";
export const metadata: Metadata = { title: 'Request an Academic Review Copy', description: 'Request an identified Academic Review Copy of Evolution of Energy for genuine scholarly or educational examination.', alternates: { canonical: '/academic-review/request' } };
export default function RequestPage(){return <section className={styles.section}><Container reading>
  <p className={styles.eyebrow}>Academic Review</p>
  <h1>Request an Academic Review Copy</h1>
  <p className={styles.lead}>To request a review copy of <em>Evolution of Energy</em>, write a detailed email to <a href="mailto:academicreview@evolutionofenergy.org">academicreview@evolutionofenergy.org</a>.</p>
  <div className={styles.instructions}>
    <h2>What to include in your request</h2>
    <p>Please provide enough information for the request to be assessed for genuine scholarly or educational use:</p>
    <ul>
      <li>Your full name and preferred contact details.</li>
      <li>Your current academic or professional title, institution, department and location.</li>
      <li>Your academic qualifications, credentials and relevant areas of research, teaching or professional experience.</li>
      <li>Links to an institutional profile, published work or another source that helps verify your academic background.</li>
      <li>Why you are interested in reviewing <em>Evolution of Energy</em> and how it relates to your field or current work.</li>
      <li>The themes, arguments or areas of the book you intend to examine.</li>
      <li>How you expect to use the review copy, including any planned review, article, research, teaching, library consideration or academic discussion.</li>
      <li>Your expected review timeframe and the format in which you may provide comments or findings.</li>
    </ul>
    <p>Use the subject line <strong>Academic Review Copy Request — Your Name</strong>. Requests are assessed individually. Sending a request does not guarantee that a review copy will be issued and does not imply approval or endorsement.</p>
    <a className={styles.emailButton} href="mailto:academicreview@evolutionofenergy.org?subject=Academic%20Review%20Copy%20Request%20%E2%80%94%20Your%20Name">Write the Request Email</a>
  </div>
</Container></section>}
