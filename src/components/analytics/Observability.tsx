import Script from "next/script";

export function Observability() {
  if (process.env.NEXT_PUBLIC_ENABLE_VERCEL_OBSERVABILITY !== "true") return null;
  return (
    <>
      <Script id="vercel-analytics-bootstrap" strategy="afterInteractive">{`window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments);};`}</Script>
      <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
      <Script id="vercel-speed-bootstrap" strategy="afterInteractive">{`window.si=window.si||function(){(window.siq=window.siq||[]).push(arguments);};`}</Script>
      <Script src="/_vercel/speed-insights/script.js" strategy="lazyOnload" />
    </>
  );
}
