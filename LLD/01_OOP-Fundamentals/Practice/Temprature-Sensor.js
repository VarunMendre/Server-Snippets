/*
Design a TemperatureSensor class that records whole-number temperature readings while protecting its internal history. The sensor accepts only values within its supported range and provides simple statistics over the readings it has accepted.

Implement the TemperatureSensor class:

- TemperatureSensor() creates a sensor with no readings.
- boolean addReading(int value) records value and returns true when it is between -50 and 150, inclusive. An out-of-range value is rejected: the method returns false and leaves the stored readings unchanged.
- int getReadingCount() returns the number of accepted readings.
- double getAverage() returns the arithmetic mean of the accepted readings. If the sensor is empty, it returns 0.
- int[] getReadings() returns the accepted readings in insertion order. It must return a new collection or array, so changing the result cannot modify the sensor's internal data.

Keep the readings encapsulated. Callers must be able to add values only through addReading, ensuring that the sensor can never store an out-of-range temperature.
*/
class TemperatureSensor {
    static MIN_TEMP = -50;
    static MAX_TEMP = 150;
    reading = [];
    constructor() { }
    addReading(value) {
        if (value < TemperatureSensor.MIN_TEMP ||
            value > TemperatureSensor.MAX_TEMP) {
            return false;
        }
        this.reading.push(value);
        return true;
    }
    getReadingCount() {
        return this.reading.length;
    }
    getAverage() {
        if (this.reading.length === 0) {
            return 0;
        }
        const n = this.reading.length;
        const sum = this.reading.reduce((acc, cur) => (acc += cur), 0);
        return sum / n;
    }
    getReadings() {
        return [...this.reading];
    }
}
export {};
/**
 * Your TemperatureSensor object will be instantiated and called as such:
 * const obj = new TemperatureSensor();
 * const param_1 = obj.addReading(value);
 * const param_2 = obj.getReadingCount();
 * const param_3 = obj.getAverage();
 * const param_4 = obj.getReadings();
 */
