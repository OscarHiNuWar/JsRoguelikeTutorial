export class Entity {
  x: number;
  y: number;
  char: string;
  fg: string;
  bg: string;

  constructor(
    x: number,
    y: number,
    char: string,
    fg: string = "#fff",
    bg: string = "#000",
    public name: string = "<Unnamed>",
    public blocksMovement: boolean = false
  ) {
    this.x = x;
    this.y = y;
    this.char = char;
    this.fg = fg;
    this.bg = bg;
  }

  move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }
}

export function spawnPlayer(x: number, y: number): Entity {
  return new Entity(x, y, "@", "#fff", "#000", "Player", true);
}

export function spawnOrc(x: number, y: number): Entity {
  return new Entity(x, y, "o", "#3f7f3f", "#000", "Orc", true);
}

export function spawnTroll(x: number, y: number): Entity {
  return new Entity(x, y, "T", "#007f00", "#000", "Troll", true);
}
