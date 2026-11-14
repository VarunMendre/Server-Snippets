/*
Design a Book class that represents one physical library copy. Its title, author, and ISBN identify the book, while its availability changes as people borrow and return it. A copy is always in one of two states: available on the shelf or currently borrowed.

Implement the Book class:

- Book(String title, String author, String isbn) creates a copy with the given details. Every new copy starts available.
- boolean borrow() checks out an available copy, changes its state to borrowed, and returns true. If the copy is already borrowed, leave it unchanged and return false.
- boolean returnBook() returns a borrowed copy to the shelf, changes its state to available, and returns true. If the copy is already available, leave it unchanged and return false.
- boolean isAvailable() returns true when the copy is on the shelf and false when it is borrowed. It does not change the state.
- String getInfo() returns the copy's current details in the exact format "<title> by <author> (ISBN: <isbn>) - <status>". Use Available or Borrowed for <status> based on the state at the time of the call.

For example, an available copy of Clean Code by Robert Martin with ISBN 978-0132350884 returns "Clean Code by Robert Martin (ISBN: 978-0132350884) - Available".

Keep the book's state encapsulated. Callers may borrow, return, or inspect the copy, but they must not be able to assign its availability directly.
*/

class Book {
  private title: string;
  private author: string;
  private isbn: string;
  private available: boolean;

  constructor(title: string, author: string, isbn: string) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.available = true;
  }

  borrow(): boolean {
    if (!this.available) return false;

    this.available = false;
    return true;
  }

  returnBook(): boolean {
    if (this.available) return false;

    this.available = true;
    return true;
  }

  isAvailable(): boolean {
    return this.available;
  }

  getInfo(): string {
    return `${this.title} by ${this.author} (ISBN: ${this.isbn}) - ${this.available ? "Available" : "Borrowed"}`;
  }
}

/*
 * Your Book object will be instantiated and called as such:
 * var obj = new Book(title, author, isbn)
 * var param_1 = obj.borrow()
 * var param_2 = obj.returnBook()
 * var param_3 = obj.isAvailable()
 * var param_4 = obj.getInfo()
*/
