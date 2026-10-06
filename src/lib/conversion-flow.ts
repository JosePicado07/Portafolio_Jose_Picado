export const ROWS = 14;
export const COLS = 14;
export const PER_CELL = 2;
export const REJECT_RATE = 0.05;
export const GHOSTS_PER_SOURCE = 70;
export const SRC_X = -3.0;
export const GATE_X = -0.75;
export const TABLE_X0 = 0.2;
export const CELL = 0.24;
export const ROW_H = 0.2;

export const SOURCES = [
  { y: 1.15, spread: [0.75, 0.3] },
  { y: 0.0, spread: [0.9, 0.24] },
  { y: -1.15, spread: [0.65, 0.32] },
] as const;

export type FlowRecord = {
  start: [number, number, number];
  target: [number, number, number];
  kind: 0 | 1 | 2;
  status: 0 | 1;
  delay: number;
};

export function tableHeight() {
  return (ROWS - 1) * ROW_H;
}

export function buildRecords(): FlowRecord[] {
  let seed = 11;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const gauss = () => (rand() + rand() + rand() - 1.5) / 1.5;

  const records: FlowRecord[] = [];
  const tableH = tableHeight();

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      for (let k = 0; k < PER_CELL; k++) {
        const src = SOURCES[(r * 7 + c * 3 + k) % 3];
        const start: [number, number, number] = [
          SRC_X + gauss() * src.spread[0],
          src.y + gauss() * src.spread[1],
          gauss() * 0.8,
        ];
        const target: [number, number, number] = [
          TABLE_X0 + c * CELL,
          tableH / 2 - r * ROW_H,
          (k - 0.5) * 0.04,
        ];
        const reject = rand() < REJECT_RATE;
        if (reject) {
          target[0] = GATE_X + 0.1 + rand() * 0.5;
          target[1] = -tableH / 2 - 0.45 - rand() * 0.3;
          target[2] = gauss() * 0.2;
        }
        const delay = Math.min(
          0.45,
          Math.max(0, (start[0] - (SRC_X - 1.2)) / 2.4) * 0.12 + rand() * 0.33,
        );
        records.push({
          start,
          target,
          kind: reject ? 1 : 0,
          status: !reject && c === COLS - 1 ? 1 : 0,
          delay,
        });
      }
    }
  }

  SOURCES.forEach((src) => {
    for (let g = 0; g < GHOSTS_PER_SOURCE; g++) {
      const q: [number, number, number] = [
        SRC_X + gauss() * src.spread[0] * 1.2,
        src.y + gauss() * src.spread[1] * 1.2,
        gauss() * 0.8,
      ];
      records.push({
        start: q,
        target: [q[0], q[1], q[2]],
        kind: 2,
        status: 0,
        delay: 0,
      });
    }
  });

  return records;
}
