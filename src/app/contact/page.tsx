import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
export const metadata: Metadata = { title: "Contact", description: "Contact Evolution of Energy.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  const author = process.env.AUTHOR_EMAIL;
  const academic = process.env.ACADEMIC_REVIEW_EMAIL;
  const general = process.env.CONTACT_EMAIL;
  const rows = [["General enquiries", general], ["Academic review", academic], ["Author correspondence", author]].filter((row): row is [string,string] => Boolean(row[1]));
  return <section style={{padding:"120px 0",minHeight:"62vh"}}><Container reading>
    <p style={{fontSize:12,fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:"var(--eoe-gold)"}}>Contact</p>
    <h1 style={{marginTop:16,fontFamily:"var(--font-editorial)",fontSize:"clamp(42px,5vw,68px)",fontWeight:400,lineHeight:1,color:"var(--eoe-title-navy)"}}>Continue the conversation.</h1>
    {rows.length ? <div style={{marginTop:32,display:"grid",gap:18}}>{rows.map(([label,email])=><p key={label}><strong>{label}</strong><br/><a href={`mailto:${email}`}>{email}</a></p>)}</div> : <p style={{marginTop:28}}>Official domain email addresses will appear here only after they are confirmed and activated.</p>}
  </Container></section>;
}
