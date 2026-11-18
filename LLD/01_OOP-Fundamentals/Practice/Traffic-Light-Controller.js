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
var Color;
(function (Color) {
    Color["RED"] = "RED";
    Color["GREEN"] = "GREEN";
    Color["YELLOW"] = "YELLOW";
})(Color || (Color = {}));
const DURATIONS = {
    [Color.RED]: 30,
    [Color.YELLOW]: 5,
    [Color.GREEN]: 25,
};
const NEXT = {
    [Color.RED]: Color.GREEN,
    [Color.YELLOW]: Color.RED,
    [Color.GREEN]: Color.YELLOW,
};
class TrafficLight {
    current;
    constructor(startColor) {
        const upper = startColor.toUpperCase();
        this.current = Object.values(Color).includes(upper)
            ? upper
            : Color.RED;
    }
    getColor() {
        return this.current;
    }
    getDuration() {
        return DURATIONS[this.current];
    }
    next() {
        this.current = NEXT[this.current];
        return this.current;
    }
    describe() {
        return `${this.current} (${DURATIONS[this.current]}s)`;
    }
}
export {};
