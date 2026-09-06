import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return <section style={{padding:"128px 0", minHeight:"60vh"}}><Container reading><h1 style={{fontFamily:"var(--font-editorial)",fontSize:"52px",color:"var(--eoe-title-navy)",lineHeight:1}}>This path does not lead where expected.</h1><p style={{marginTop:24}}>The page may have moved, changed, or no longer exist.</p><p style={{marginTop:24}}><Link href="/">Return home</Link> · <Link href="/explore">Explore EOE</Link></p></Container></section>;
}
