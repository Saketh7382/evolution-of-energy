import type { Metadata } from "next";
import { CanonicalCover } from "@/components/book/CanonicalCover";
import { Container } from "@/components/layout/Container";
export const metadata: Metadata = { title: "Get the Book", description: "Publication information and available reading formats for Evolution of Energy.", alternates: { canonical: "/get-the-book" } };

export default function GetBookPage() {
  const retailer = process.env.AMAZON_BOOK_URL;
  return <section style={{padding:"100px 0 128px",minHeight:"70vh"}}><Container reading>
    <p style={{fontSize:12,fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:"var(--eoe-gold)"}}>Get the Book</p>
    <h1 style={{marginTop:16,fontFamily:"var(--font-editorial)",fontSize:"clamp(42px,5vw,68px)",fontWeight:400,lineHeight:1,color:"var(--eoe-title-navy)"}}>Evolution of Energy</h1>
    <div style={{marginTop:36,maxWidth:280}}><CanonicalCover size="section" /></div>
    <p style={{marginTop:28}}><strong>First Canonical Edition</strong><br/>Published 9 August 2026<br/>Sreedhar G.</p>
    {retailer ? <p style={{marginTop:28}}><a href={retailer} style={{display:"inline-block",background:"var(--eoe-gold)",color:"var(--eoe-midnight)",padding:"14px 24px",textDecoration:"none",borderRadius:3,fontWeight:600}}>Read on Amazon Kindle</a></p> : <p style={{marginTop:28}}>The retailer destination is intentionally withheld until the canonical Amazon URL is confirmed.</p>}
  </Container></section>;
}
