import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import Hero from "./Hero";
import Nav from "./Nav";
import Projects from "./Projects";
import Skills from "./Skills";
import WhatsAppFloat from "./WhatsAppFloat";
import type { Dictionary, Lang } from "@/content/en";

export default function Home({ dict, lang }: { dict: Dictionary; lang: Lang }) {
  return (
    <>
      <a className="skip" href="#main">
        {dict.nav.skipLink}
      </a>
      <Nav nav={dict.nav} lang={lang} cvHref={dict.urls.cv} />
      <main id="main">
        <Hero dict={dict} />
        <Projects dict={dict} />
        <Skills dict={dict} />
        <About dict={dict} />
        <Contact dict={dict} />
      </main>
      <Footer dict={dict} lang={lang} />
      <WhatsAppFloat
        href={dict.urls.whatsapp}
        label={dict.whatsAppFloat.ariaLabel}
      />
    </>
  );
}
