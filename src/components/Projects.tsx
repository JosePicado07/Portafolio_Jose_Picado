import { projects, projectsSection } from "@/content/en";

export default function Projects() {
  const featured = projects.filter((project) => project.featured);
  const compact = projects.filter((project) => !project.featured);

  return (
    <section className="projects" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <header className="projects__header">
          <p className="label projects__label">{projectsSection.label}</p>
          <h2 className="projects__heading" id="projects-title">
            {projectsSection.heading}
          </h2>
        </header>

        <div className="projects__grid">
          {featured.map((project) => (
            <article key={project.id} className="case" aria-labelledby={`${project.id}-title`}>
              <div className="case__body">
                <header className="case__header">
                  <h3 className="case__title" id={`${project.id}-title`}>
                    {project.title}
                  </h3>
                </header>
                <p className="case__stack" aria-label="Stack">
                  {project.stack.map((item, index) => (
                    <span key={item}>
                      {item}
                      {index < project.stack.length - 1 ? " · " : ""}
                    </span>
                  ))}
                </p>
                <dl className="case__list">
                  {project.problem ? (
                    <div>
                      <dt className="case__term">Problem</dt>
                      <dd className="case__desc">{project.problem}</dd>
                    </div>
                  ) : null}
                  {project.built ? (
                    <div>
                      <dt className="case__term">Built</dt>
                      <dd className="case__desc">{project.built}</dd>
                    </div>
                  ) : null}
                </dl>
                {project.note ? (
                  <div className="case__note">
                    <span className="case__note-term">{project.note.label}</span>
                    <p className="case__note-desc">{project.note.text}</p>
                  </div>
                ) : null}
              </div>
              {project.proof.length ? (
                <aside className="case__proof" aria-label="Proof">
                  <ul className="proof-list">
                    {project.proof.map((item) => (
                      <li key={item.label} className="proof-item">
                        <span
                          className={
                            item.verified ? "proof-value proof-value--verified" : "proof-value"
                          }
                        >
                          {item.value}
                        </span>
                        <span className="proof-label">{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </aside>
              ) : null}
            </article>
          ))}
        </div>

        <ul className="rows" aria-label="Compact projects">
          {compact.map((project) => (
            <li key={project.id} className="row">
              <h3 className="row__title">{project.title}</h3>
              <p className="row__stack">
                {project.stack.map((item, index) => (
                  <span key={item}>
                    {item}
                    {index < project.stack.length - 1 ? " · " : ""}
                  </span>
                ))}
              </p>
              {project.proof.length ? (
                <div className="row__proof-group" aria-label="Proof">
                  {project.proof.map((item) => (
                    <p
                      key={item.label}
                      className={
                        item.verified ? "row__proof row__proof--verified" : "row__proof"
                      }
                    >
                      {item.value}
                    </p>
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ul>

        <footer className="projects__next">
          <a className="projects__link" href={projectsSection.nextLinkHref}>
            {projectsSection.nextLinkText}
          </a>
        </footer>
      </div>
    </section>
  );
}