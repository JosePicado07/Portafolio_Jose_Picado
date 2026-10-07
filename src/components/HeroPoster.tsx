import {
  CELL,
  COLS,
  GATE_X,
  TABLE_X0,
  buildRecords,
  tableHeight,
} from "@/lib/conversion-flow";

const PAD = 0.3;

function round(n: number) {
  return Math.round(n * 1000) / 1000;
}

export default function HeroPoster() {
  const records = buildRecords();
  const tableH = tableHeight();
  const tx1 = TABLE_X0 + (COLS - 1) * CELL;

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const rec of records) {
    if (rec.start[0] < minX) minX = rec.start[0];
    if (rec.target[0] > maxX) maxX = rec.target[0];
    if (rec.target[1] > maxY) maxY = rec.target[1];
    if (rec.target[1] < minY) minY = rec.target[1];
  }
  minX -= PAD;
  maxX += PAD;
  maxY += PAD;
  minY -= PAD;

  const ghostParts: string[] = [];
  const rejectParts: string[] = [];
  const cells = new Map<string, number>();
  for (const rec of records) {
    if (rec.kind === 2) {
      ghostParts.push(
        `<circle cx="${round(rec.start[0])}" cy="${round(-rec.start[1])}" r="0.018"/>`,
      );
    } else if (rec.kind === 1) {
      rejectParts.push(
        `<circle cx="${round(rec.target[0])}" cy="${round(-rec.target[1])}" r="0.02"/>`,
      );
    } else {
      const key = `${round(rec.target[0])},${round(rec.target[1])}`;
      if (rec.status > (cells.get(key) ?? 0)) cells.set(key, rec.status);
      else if (!cells.has(key)) cells.set(key, 0);
    }
  }

  const squareParts: string[] = [];
  for (const [key, status] of cells) {
    const [x, y] = key.split(",").map(Number);
    const c = Math.max(0, Math.min(COLS - 1, Math.round((x - TABLE_X0) / CELL)));
    squareParts.push(
      `<rect x="${round(x - 0.025)}" y="${round(-y - 0.025)}" width="0.05" height="0.05" class="${
        status ? "hero__cell is-signal" : "hero__cell"
      }" style="--c:${c}" fill="${
        status ? "var(--color-signal-blue)" : "var(--color-text-secondary)"
      }"/>`,
    );
  }

  const w = round(maxX - minX);
  const h = round(maxY - minY);

  return (
    <div className="hero__poster" aria-hidden="true">
      <svg
        viewBox={`${round(minX)} ${round(-maxY)} ${w} ${h}`}
        preserveAspectRatio="xMidYMid meet"
        focusable="false"
        aria-hidden="true"
      >
        <g
          fill="var(--color-text-muted)"
          opacity="0.16"
          dangerouslySetInnerHTML={{ __html: ghostParts.join("") }}
        />
        <g
          fill="var(--color-text-muted)"
          opacity="0.3"
          dangerouslySetInnerHTML={{ __html: rejectParts.join("") }}
        />
        <g
          opacity="0.95"
          dangerouslySetInnerHTML={{ __html: squareParts.join("") }}
        />
        <g
          style={{
            stroke:
              "color-mix(in srgb, var(--color-border) 86%, var(--color-text-secondary) 14%)",
          }}
          fill="none"
        >
          <line
            x1={GATE_X}
            y1={round(-(tableH / 2 + 0.3))}
            x2={GATE_X}
            y2={round(tableH / 2 + 0.3)}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            className="hero__gate"
          />
          <line
            x1={round(TABLE_X0 - 0.12)}
            y1={round(-(tableH / 2 + 0.18))}
            x2={round(tx1 + 0.12)}
            y2={round(-(tableH / 2 + 0.18))}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            className="hero__gate hero__gate--rule"
          />
        </g>
      </svg>
    </div>
  );
}
