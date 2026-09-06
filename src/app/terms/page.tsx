import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
export const metadata: Metadata = { title: 'Terms', description: 'Terms for use of the Evolution of Energy website.', alternates: { canonical: '/terms' } };
export default function Page() { return <section style={{padding:"120px 0",minHeight:"62vh"}}><Container reading><p style={{fontSize:12,fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:"var(--eoe-gold)"}}>Terms</p><h1 style={{marginTop:16,fontFamily:"var(--font-editorial)",fontSize:"clamp(42px,5vw,68px)",fontWeight:400,lineHeight:1,color:"var(--eoe-title-navy)"}}>Terms of Use</h1><p style={{marginTop:28}}>Production terms will be finalized before public launch.</p></Container></section>; }
