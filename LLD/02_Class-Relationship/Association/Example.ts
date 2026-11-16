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

// 1.3.1 One-to-One Association
// 1.3.2 One-to-Many Association
// 1.3.3 Many-to-Many Association
