// Class definition
class User {
  name: string = "";
  age: number = 0;

  echo(): void {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
  }
}

// Object creation and usage
const user1 = new User();
user1.name = "Alice";
user1.age = 30;
user1.echo(); // Output: Name: Alice, Age: 30

// Class + Constructor

class UserWithConstructor {
  // In TypeScript, we've to first declare the properties and then initialize them in the constructor.
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  echo(): void {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
  }
}

// Object creation and usage

const user2 = new UserWithConstructor("Bob", 22);
user2.echo(); // Output: Name: Bob, Age: 22

const user3 = new UserWithConstructor("Charlie", 28);
user3.echo(); // Output: Name: Charlie, Age: 28

// Without Enum

let status: string = "active";
status = "inactive"; // This is valid, but we can assign any string value, which may lead to errors.

// With Enum

enum Status {
  PENDING = "pending",
  ACTIVE = "active",
  INACTIVE = "inactive",
}

let statusEnum: Status = Status.ACTIVE; // This is valid and type-safe.
statusEnum = Status.INACTIVE; // This is also valid and type-safe.
// statusEnum = "active"; // This would cause a TypeScript error, ensuring type safety.

// Access Modifiers

// Public, Private & Protected

class UserAccount {
  private email: string = "";

  // public because we want to allow access to the email property from outside the class
  public getEmail(): string {
    return this.email;
  }

  // private because we want to restrict access to the email validation logic within the class
  private isValidEmail(email: string): boolean {
    if (email.includes("@")) return true;
    return false;
  }

  // public because we want to allow updating the email from outside the class, but with validation
  public updateEmail(newEmail: string): void {
    if (!this.isValidEmail(newEmail)) throw new Error("Invalid email address");
    this.email = newEmail;
  }

  // protected which means a child class could reuse or customize it but not accessible from outside the class
  protected logChange(): void {
    console.log(`Acccount email changed to: ${this.email}   `);
  }
}

// use case of protected access modifier

class AdminAccount extends UserAccount {
  // public because we want to allow updating the email from outside the class, but with validation
  public updateEmail(newEmail: string): void {
    // super is used to call the parent class properties and methods
    super.updateEmail(newEmail);
    this.logChange();
  }
}

// Interface: defines the structure of an object,
//  specifying the properties and methods that an object must have.
//  It is a way to enforce a contract for classes or objects to follow.

interface FileStorage {
  savefile(fileName: string, data: Uint8Array): void;
}

// in Ts we use implements keyword to implement an interface in a class.
// The class must provide implementations for all the properties and methods defined in the interface.
class LocalFileStoage implements FileStorage {
  savefile(fileName: string, data: Uint8Array): void {
    console.log(`Saving file ${fileName} with data length: ${data.length}`);
  }
}

class CloudFileStorage implements FileStorage {
  savefile(fileName: string, data: Uint8Array): void {
    console.log(
      `Uploading file ${fileName} to cloud with data length: ${data.length}`,
    );
  }
}

// rest of application can depend on interface instead of concrete implementations, allowing for flexibility and easier testing.

class BackupService {
  private storage: FileStorage;

  constructor(storage: FileStorage) {
    this.storage = storage;
  }

  backupFile(fileName: string, data: Uint8Array) {
    this.storage.savefile(fileName, data);
  }
}

// Abstract Class: class that cannot be instantiated directly. so it provides shared behaviour, methods & properties to be implemented by its subclasses.
// It can also define abstract methods that must be implemented by subclasses.

abstract class ReportGenerator {
  generate(data: string[]): void {
    const content = this.formatData(data);
    this.saveReport(content);
  }

  saveReport(content: string): void {
    console.log(`Saving report with content: ${content}`);
  }

  abstract formatData(data: string[]): string;
}

class PDFReportGenerator extends ReportGenerator {
  formatData(data: string[]): string {
    return `PDF Report: ${data.join(", ")}`;
  }
}

class JSONReportGenerator extends ReportGenerator {
  formatData(data: string[]): string {
    return `JSON Report: ${JSON.stringify(data)}`;
  }
}

// generate & saveReport method contains behaviour shared by every report generator
// But the formatData() is abstract because each report type formats it data differently, so it mush be implemented by subclasses.


