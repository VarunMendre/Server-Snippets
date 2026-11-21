// Composition Example 

class Slide {
  private notes = "";
  constructor(private readonly heading: string = "") {}

  getHeading(): string {
    return this.heading;
  }

  getNotes(): string {
    return this.notes;
  }
  setNotes(note: string): void {
    this.notes = note;
  }
}

class SlideDeck {
  private readonly slides: Slide[] = [];

  constructor() {}

  private slideAt(number: number): Slide | null {
    if (number < 1 || number > this.slides.length) {
      return null;
    }
    return this.slides[number - 1];
  }

  addSlide(heading: string): number {
    if (heading.length === 0) {
      return -1;
    }
    this.slides.push(new Slide(heading));
    return this.slides.length;
  }

  setNotes(number: number, notes: string): boolean {
    const slide = this.slideAt(number);
    if (slide === null || notes.length === 0) {
      return false;
    }
    slide.setNotes(notes);
    return true;
  }

  notesOf(number: number): string {
    const slide = this.slideAt(number);
    if (slide === null || slide.getNotes().length === 0) {
      return "NO NOTES";
    }
    return slide.getNotes();
  }

  removeSlide(number: number): boolean {
    if (this.slideAt(number) === null) {
      return false;
    }
    this.slides.splice(number - 1, 1);
    return true;
  }

  outline(): string[] {
    return this.slides.map((slide) => slide.getHeading());
  }

  slideCount(): number {
    return this.slides.length;
  }
}


