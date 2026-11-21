// Association Example

class Instructor {
  constructor(private readonly instructorName: string) {}

  name(): string {
    return this.instructorName;
  }
}

class Course {
  private instructorName: Instructor | null = null;

  constructor(private readonly courseTitle: string) {}

  title(): string {
    return this.courseTitle;
  }

  instructor(): Instructor | null {
    return this.instructorName;
  }

  setInstructor(name: Instructor): void {
    this.instructorName = name;
  }
}
class CourseRegistry {
  private readonly instructors: Instructor[] = [];
  private readonly courses: Course[] = [];

  constructor() {}

  private findInstructor(name: string): Instructor | null {
    return (
      this.instructors.find((instructor) => instructor.name() === name) ?? null
    );
  }

  private findCourse(title: string): Course | null {
    return this.courses.find((course) => course.title() === title) ?? null;
  }

  addInstructor(name: string): boolean {
    if (this.findInstructor(name) !== null) {
      return false;
    }
    this.instructors.push(new Instructor(name));
    return true;
  }

  addCourse(title: string): boolean {
    if (this.findCourse(title) !== null) {
      return false;
    }
    this.courses.push(new Course(title));
    return true;
  }

  assign(title: string, instructorName: string): boolean {
    const course = this.findCourse(title);
    const instructor = this.findInstructor(instructorName);
    if (course === null || instructor === null) {
      return false;
    }
    course.setInstructor(instructor);
    return true;
  }

  instructorOf(title: string): string {
    const course = this.findCourse(title);
    const instructor = course?.instructor() ?? null;
    return instructor === null ? "NONE" : instructor.name();
  }

  coursesOf(instructorName: string): string[] {
    const instructor = this.findInstructor(instructorName);
    if (instructor === null) {
      return [];
    }
    return this.courses
      .filter((course) => course.instructor() === instructor)
      .map((course) => course.title());
  }

  courseCount(): number {
    return this.courses.length;
  }
}
