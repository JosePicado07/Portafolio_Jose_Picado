import { aboutSection, career } from "@/content/en";

export default function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="container">
        <header className="about__header">
          <p className="label about__label">{aboutSection.label}</p>
          <h2 className="about__heading" id="about-title">
            {aboutSection.heading}
          </h2>
        </header>

        <div className="about__grid">
          <div className="bio">
            {aboutSection.bio.map((paragraph, index) => (
              <p key={index} className={index === 0 ? "bio__lead" : "bio__text"}>
                {paragraph}
              </p>
            ))}
          </div>

          <aside className="arc">
            <h3 className="arc__label">{aboutSection.careerLabel}</h3>
            <ol className="arc__list" aria-label={aboutSection.careerLabel}>
              {career.map((item) => (
                <li key={item.when} className={`arc__item${item.muted ? " arc__item--muted" : ""}`}>
                  <span className="arc__when">{item.when}</span>
                  <div className="arc__role-org">
                    <span className={item.muted ? "arc__role arc__role--muted" : "arc__role"}>
                      {item.role}
                    </span>
                    <span className="arc__org">{item.org}</span>
                  </div>
                  {item.note ? (
                    <p className="arc__note">{item.note}</p>
                  ) : null}
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </div>
    </section>
  );
}