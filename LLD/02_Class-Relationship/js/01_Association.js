/*
Object Relationship #1 — Association

Definition: 
Association is a relationship where two independent objects know about each other and can interact, but neither owns the other.

Simple definition:
Two objects work together, but each can exist independently.

The keyword is "Independent" 



Why do we need Association?

- Imagine you're building a university management system.
- A Professor teaches to Student

Question:

Does a Professor own a Student? :- ❌ No.

Question:

Does a Student own a Professor? -> ❌ No.

They simply know about each other. That's Association.


Real World Examples
Doctor  <------->  Patient

Doctor can exist without Patient.

Patient can exist without Doctor.

Teacher <-------> Student

Teacher exists.

Student exists.

Neither depends on the other's lifetime.

Key Characteristics

Association means:

Both objects are independent
No ownership
Separate lifecycles
One object simply uses or references another
*/

class Professor {
  constructor(name) {
    this.name = name;
  }
}

class Student {
  constructor(name, professor) {
    this.name = name;
    this.professor = professor;
  }

  introduce() {
    console.log(`
            ${this.name} studies under Professor ${this.professor.name}    
        `);
  }
}

const professor = new Professor("Dr. John Cena");
const student = new Student("Varun", professor);

student.introduce();

// suppose, now if student = null , then Professor object still exits
// suppose, now if professor = null , then Student object still exists.
// Reference becomes invalid, but conceptually the Student object isn't destroyed. Neither owns the other.

class Bank {
  constructor(name) {
    this.name = name;
  }
}

class Customer {
  constructor(name, bank) {
    this.name = name;
    this.bank = bank;
  }

  showBank() {
    console.log(`${this.name} has an account in ${this.bank.name}`);
  }
}

const hdfc = new Bank("HDFC");

const varun = new Customer("Varun", hdfc);

varun.showBank();

