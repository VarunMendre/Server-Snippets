/*
Design the Color model used by a TrafficLight controller. The controller displays one colour at a time and moves through the same repeating cycle: red, green, yellow, then back to red.

- TrafficLight(String startColor) starts on RED, GREEN, or YELLOW, matching the input without regard to case. An unrecognized value defaults to RED.
- String getColor() returns the current colour's name.
- int getDuration() returns the current colour's duration: RED lasts 30 seconds, GREEN lasts 25, and YELLOW lasts 5.
- String next() advances once through the cycle and returns the new colour's name.
- String describe() returns the current colour and duration in the exact format "<COLOR> (<duration>s)", such as "RED (30s)".

Each colour should know both how long it lasts and which colour follows it:
RED (30s) -> GREEN (25s) -> YELLOW (5s) -> RED (30s)
Read the supplied controller carefully to see the exact fields, methods, or lookup tables expected from Color in your language. Do not duplicate the cycle rules inside the controller.
*/

enum Color {
  RED = "RED",
  GREEN = "GREEN",
  YELLOW = "YELLOW",
}

const DURATIONS: Record<Color, number> = {
  [Color.RED]: 30,
  [Color.YELLOW]: 5,
  [Color.GREEN]: 25,
};

const NEXT: Record<Color, Color> = {
  [Color.RED]: Color.GREEN,
  [Color.YELLOW]: Color.RED,
  [Color.GREEN]: Color.YELLOW,
};

class TrafficLight {
  private current: Color;

  constructor(startColor: string) {
    const upper = startColor.toUpperCase();
    this.current = (Object.values(Color) as string[]).includes(upper)
      ? (upper as Color)
      : Color.RED;
  }

  getColor(): string {
    return this.current;
  }

  getDuration(): number {
    return DURATIONS[this.current];
  }

  next(): string {
    this.current = NEXT[this.current];
    return this.current;
  }

  describe(): string {
    return `${this.current} (${DURATIONS[this.current]}s)`;
  }
}
