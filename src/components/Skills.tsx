import type { CSSProperties } from "react";
import type { Dictionary } from "@/content/en";

const DOT_DELAYS = [0, 230, 470, 700];

export default function Skills({ dict }: { dict: Dictionary }) {
  const { skillsSection, stages, aria } = dict;
  return (
    <section className="skills" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <header className="skills__header">
          <p className="label skills__label" data-reveal style={{ "--i": 0 } as CSSProperties}>
            {skillsSection.label}
          </p>
          <h2 className="skills__heading" id="skills-title" data-reveal style={{ "--i": 1 } as CSSProperties}>
            {skillsSection.heading}
          </h2>
        </header>

        <ol className="pipeline" aria-label={aria.skillsPipeline} data-draw-group>
          {stages.map((stage, stageIndex) => (
            <li
              key={stage.id}
              className="stage"
              data-proven={stage.proven ? "true" : "false"}
              style={{ "--i": stageIndex } as CSSProperties}
            >
              <div className="stage__head">
                <span className="stage__dot" aria-hidden="true" />
                <h3
                  className="stage__title"
                  data-reveal
                  style={{ "--rd": `${DOT_DELAYS[stageIndex]}ms` } as CSSProperties}
                >
                  {stage.number} · {stage.name}
                  {stage.proven ? (
                    <span className="sr-only">{skillsSection.provenSrText}</span>
                  ) : null}
                </h3>
              </div>
              <p
                className="stage__desc"
                data-reveal
                style={{ "--rd": `${DOT_DELAYS[stageIndex]}ms` } as CSSProperties}
              >
                {stage.desc}
              </p>
              <ul
                className="tools"
                data-reveal
                style={{ "--rd": `${DOT_DELAYS[stageIndex]}ms` } as CSSProperties}
              >
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