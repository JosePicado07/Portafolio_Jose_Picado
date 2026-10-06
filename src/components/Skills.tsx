import { skillsSection, stages } from "@/content/en";

export default function Skills() {
  return (
    <section className="skills" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <header className="skills__header">
          <p className="label skills__label">{skillsSection.label}</p>
          <h2 className="skills__heading" id="skills-title">
            {skillsSection.heading}
          </h2>
        </header>

        <ol className="pipeline" aria-label="Skills pipeline">
          {stages.map((stage) => (
            <li key={stage.id} className="stage" data-proven={stage.proven ? "true" : "false"}>
              <div className="stage__head">
                <span className="stage__dot" aria-hidden="true" />
                <h3 className="stage__title">
                  {stage.number} · {stage.name}
                  {stage.proven ? (
                    <span className="sr-only">{skillsSection.provenSrText}</span>
                  ) : null}
                </h3>
              </div>
              <p className="stage__desc">{stage.desc}</p>
              <ul className="tools">
                {stage.tools.map((tool) => (
                  <li key={tool.name} className="tool">
                    <span className="tool__name">{tool.name}</span>
                    <span className="tool__projects">
                      {tool.projects.map((project, index) => (
                        <span key={project}>
                          {project}
                          {index < tool.projects.length - 1 ? " · " : ""}
                        </span>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="skills__legend">
          <span className="skills__legend-dot" aria-hidden="true" />
          <p className="skills__legend-text">{skillsSection.legend}</p>
        </div>
      </div>
    </section>
  );
}