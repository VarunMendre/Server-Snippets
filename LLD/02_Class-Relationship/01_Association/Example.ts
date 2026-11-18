// 1.1.  Unidirectional Association

class PaymentGateway {
  processPayment(amount: number): void {
    console.log(`Processing Payment of $${amount}`);
  }
}

class Order {
  private gateway: PaymentGateway;

  constructor(gateway: PaymentGateway) {
    this.gateway = gateway;
  }

  checkout(): void {
    this.gateway.processPayment(1000);
  }
}

/*
Order holds a reference to PaymentGateway and calls its method. 
But PaymentGateway has no field or reference pointing back to Order. 
This is the simplest and most common form of association. 
When in doubt, start with unidirectional. You can always add the reverse direction later if needed.
*/

// 1.2  Bidirectional Association

class Developer {
  private team?: Team;

  setTeam(team: Team): void {
    this.team = team;
  }
}

class Team {
  private developers?: Developer[] = [];

  addDeveloper(dev: Developer): void {
    this.developers?.push(dev);
  }
}

/*
In a bidirectional association, both references must stay in sync. 
If you add a developer to the team but forget to set the developer's team reference, 
you'll get inconsistent state where the team thinks it has the developer, 
but the developer doesn't know which team it belongs to.

Bidirectional associations are more complex to maintain than unidirectional ones. 
You need to keep both sides synchronized, which means more code and more opportunities for bugs. 
Use them only when both sides genuinely need to navigate to the other.
*/

//  1.3 Based on Multiplicity
// -> Multiplicity defines how many instances of one class can be associated with instances of another class.

// 1.3.1 One-to-One Association
// -> Each object of one class is linked to exactly one object of the other class.

/*
class Profile {
  private user?: User;

  setUser(user: User): void {
    this.user = user;
  }
}

class User {
  private profile?: Profile;

  setProfile(profile: Profile): void {
    this.profile = profile;
  }
}
*/
// 1.3.2 One-to-Many Association
// -> One object of a class is linked to multiple objects of another class

class Project {
  private issues: Issues[] = [];

  addIssue(issue: Issues): void {
    this.issues.push(issue);
    issue.setProject(this);
  }
}

class Issues {
  private project?: Project;

  setProject(project: Project): void {
    this.project = project;
  }
}

/*
Each Project can have many Issues (bug reports, feature requests), 
but each Issue belongs to one Project. 
The project holds a list of issues, and each issue holds a back-reference to its project
*/

// 1.3.3 Many-to-Many Association

class User {
  private name: string;
  private groups: Group[] = [];

  constructor(name: string) {
    this.name = name;
  }

  joinGroup(group: Group): void {
    if (!this.groups.includes(group)) {
      this.groups.push(group);
      group.addUser(this);
    }
  }

  getName(): string {
    return this.name;
  }

  getGroups(): Group[] {
    return this.groups;
  }
}

class Group {
  private name: string;
  private users: User[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addUser(user: User): void {
    if (!this.users.includes(user)) {
      this.users.push(user);
      user.joinGroup(this);
    }
  }

  getName(): string {
    return this.name;
  }

  getUsers(): User[] {
    return this.users;
  }
}

const alice = new User("Alice");
const bob = new User("Bob");

const backend = new Group("Backend");
const devOps = new Group("DevOps");

alice.joinGroup(backend);
alice.joinGroup(devOps);
bob.joinGroup(backend);

console.log(alice.getGroups());
console.log(bob.getGroups());