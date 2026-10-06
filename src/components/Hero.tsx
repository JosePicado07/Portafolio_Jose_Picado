import type { Dictionary } from "@/content/en";
import HeroCanvas from "./HeroCanvas";
import HeroPoster from "./HeroPoster";

export default function Hero({ dict }: { dict: Dictionary }) {
  const { hero, urls } = dict;
  return (
    <section className="hero" id={hero.id} data-hero aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="label hero__label">{hero.label}</p>
          <h1 className="hero__title" id="hero-title">
            {hero.title}
          </h1>
          <p className="hero__sub">{hero.sub}</p>
          <div className="hero__ctas">
            <a
              className="btn btn--primary btn--lg"
              href={urls.calendar}
              target="_blank"
              rel="noopener noreferrer"
            >
              {hero.ctaPrimary}
            </a>
            <a className="btn btn--ghost btn--lg" href="#projects">
              {hero.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <HeroPoster />
          <HeroCanvas />
        </div>
      </div>
    </section>
  );
}