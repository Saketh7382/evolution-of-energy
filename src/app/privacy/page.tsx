import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = { title: "Privacy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return <section style={{padding:"120px 0",minHeight:"62vh"}}><Container reading>
    <p style={{fontSize:12,fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:"var(--eoe-gold)"}}>Privacy</p>
    <h1 style={{marginTop:16,fontFamily:"var(--font-editorial)",fontSize:"clamp(42px,5vw,68px)",fontWeight:400,lineHeight:1,color:"var(--eoe-title-navy)"}}>Privacy at Evolution of Energy</h1>
    <p style={{marginTop:28}}>The site is designed to collect as little personal information as practical. Ordinary reading of the public website does not require an account.</p>
    <h2>Academic review requests</h2>
    <p>If you request an Academic Review Copy through GARI, the information you submit is used to assess the request, correspond with you, issue and trace review copies where approved, and maintain an accurate academic-review register. The form asks for professional and scholarly information relevant to that purpose; it does not request identity documents, dates of birth or payment information.</p>
    <h2>Security and abuse prevention</h2>
    <p>The request system may use anti-abuse verification and a one-way technical fingerprint derived from request metadata for rate limiting. Raw network addresses are not intentionally stored in the GARI review-request record by this implementation.</p>
    <h2>Analytics</h2>
    <p>Privacy-oriented aggregate site analytics and performance measurement may be enabled on the production deployment. They are intended to measure page use and technical performance, not to build advertising profiles. Advertising and retargeting pixels are not part of the V1 architecture.</p>
    <h2>Retention and contact</h2>
    <p>Academic-review records should be retained only for legitimate review administration, correspondence, traceability, security and applicable legal obligations. A final operational retention period and confirmed privacy-contact address remain launch-gate items and must be published before the GARI form is activated publicly.</p>
  </Container></section>;
}
