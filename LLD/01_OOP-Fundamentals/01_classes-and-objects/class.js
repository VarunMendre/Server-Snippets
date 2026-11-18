// Class definition
class User {
    name = "";
    age = 0;
    echo() {
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
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    echo() {
        console.log(`Name: ${this.name}, Age: ${this.age}`);
    }
}
// Object creation and usage
const user2 = new UserWithConstructor("Bob", 22);
user2.echo(); // Output: Name: Bob, Age: 22
const user3 = new UserWithConstructor("Charlie", 28);
user3.echo(); // Output: Name: Charlie, Age: 28
// Without Enum
let status = "active";
status = "inactive"; // This is valid, but we can assign any string value, which may lead to errors.
// With Enum
var Status;
(function (Status) {
    Status["PENDING"] = "pending";
    Status["ACTIVE"] = "active";
    Status["INACTIVE"] = "inactive";
})(Status || (Status = {}));
let statusEnum = Status.ACTIVE; // This is valid and type-safe.
statusEnum = Status.INACTIVE; // This is also valid and type-safe.
// statusEnum = "active"; // This would cause a TypeScript error, ensuring type safety.
// Access Modifiers
// Public, Private & Protected
class UserAccount {
    email = "";
    // public because we want to allow access to the email property from outside the class
    getEmail() {
        return this.email;
    }
    // private because we want to restrict access to the email validation logic within the class
    isValidEmail(email) {
        if (email.includes("@"))
            return true;
        return false;
    }
    // public because we want to allow updating the email from outside the class, but with validation
    updateEmail(newEmail) {
        if (!this.isValidEmail(newEmail))
            throw new Error("Invalid email address");
        this.email = newEmail;
    }
    // protected which means a child class could reuse or customize it but not accessible from outside the class
    logChange() {
        console.log(`Acccount email changed to: ${this.email}   `);
    }
}
// use case of protected access modifier
class AdminAccount extends UserAccount {
    // public because we want to allow updating the email from outside the class, but with validation
    updateEmail(newEmail) {
        // super is used to call the parent class properties and methods
        super.updateEmail(newEmail);
        this.logChange();
    }
}
// in Ts we use implements keyword to implement an interface in a class.
// The class must provide implementations for all the properties and methods defined in the interface.
class LocalFileStoage {
    savefile(fileName, data) {
        console.log(`Saving file ${fileName} with data length: ${data.length}`);
    }
}
class CloudFileStorage {
    savefile(fileName, data) {
        console.log(`Uploading file ${fileName} to cloud with data length: ${data.length}`);
    }
}
// rest of application can depend on interface instead of concrete implementations, allowing for flexibility and easier testing.
class BackupService {
    storage;
    constructor(storage) {
        this.storage = storage;
    }
    backupFile(fileName, data) {
        this.storage.savefile(fileName, data);
    }
}
// Abstract Class: class that cannot be instantiated directly. so it provides shared behaviour, methods & properties to be implemented by its subclasses.
// It can also define abstract methods that must be implemented by subclasses.
class ReportGenerator {
    generate(data) {
        const content = this.formatData(data);
        this.saveReport(content);
    }
    saveReport(content) {
        console.log(`Saving report with content: ${content}`);
    }
}
class PDFReportGenerator extends ReportGenerator {
    formatData(data) {
        return `PDF Report: ${data.join(", ")}`;
    }
}
class JSONReportGenerator extends ReportGenerator {
    formatData(data) {
        return `JSON Report: ${JSON.stringify(data)}`;
    }
}
export {};
// generate & saveReport method contains behaviour shared by every report generator
// But the formatData() is abstract because each report type formats it data differently, so it mush be implemented by subclasses.
