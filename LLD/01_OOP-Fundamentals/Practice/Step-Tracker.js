// Implement class StepTracker
class StepTracker {
    dailyGoal;
    takenSteps;
    constructor(goal) {
        this.dailyGoal = goal;
        this.takenSteps = 0;
    }
    addSteps(count) {
        if (count < 1)
            return this.takenSteps;
        this.takenSteps += count;
        return this.takenSteps;
    }
    steps() {
        return this.takenSteps;
    }
    goal() {
        return this.dailyGoal;
    }
    remaining() {
        if (this.takenSteps == this.dailyGoal || this.takenSteps > this.dailyGoal)
            return 0;
        const remaining = this.dailyGoal - this.takenSteps;
        return remaining < 0 ? 0 : remaining;
    }
    goalReached() {
        return this.takenSteps >= this.dailyGoal;
    }
    percentComplete() {
        const percent = Math.floor((this.takenSteps * 100) / this.dailyGoal);
        return percent > 100 ? 100 : percent;
    }
    summary() {
        if (this.goalReached()) {
            return `${this.takenSteps} of ${this.dailyGoal} steps, goal reached`;
        }
        return `${this.takenSteps} of ${this.dailyGoal} steps, ${this.remaining()} to go`;
    }
}
export {};
/**
 * Your StepTracker object will be instantiated and called as such:
 * var obj = new StepTracker(goal)
 * var param_1 = obj.addSteps(count)
 * var param_2 = obj.steps()
 * var param_3 = obj.goal()
 * var param_4 = obj.remaining()
 * var param_5 = obj.goalReached()
 * var param_6 = obj.percentComplete()
 * var param_7 = obj.summary()
 */
