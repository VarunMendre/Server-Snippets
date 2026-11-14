// 02 Aggregation Object Relationship

/*
 * Aggregation represents a "Has-a" relationship.
 *
 * One object contains or references another object,
 * but the contained object can exist independently.
 *
 * Key idea:
 *
 * A HAS B
 * but
 * B can exist without A
 *
 * Example:
 *
 * Team ────────> Player
 *
 * A Team has Players, but Players are not owned by the Team.
 * If the Team is removed, the Players can still exist
 * and can be assigned to another Team.
 *
 * UML:
 *
 * Team ◇──────── Player
 *      ↑
 *   Aggregation
 */

// ============================================================
// Example 1: Team and Player
// ============================================================

class Player {
  constructor(name, position) {
    this.name = name;
    this.position = position;
  }
}

class Team {
  constructor(name, players) {
    this.name = name;
    this.players = players;
  }

  showPlayers() {
    console.log(`Team: ${this.name}`);

    for (const player of this.players) {
      console.log(`${player.name} - ${player.position}`);
    }
  }
}

// Players are created independently of the Team.
const virat = new Player("Virat", "Batsman");
const bumrah = new Player("Bumrah", "Bowler");
const jadeja = new Player("Jadeja", "All-Rounder");

// The Team receives already-existing Player objects.
// The Team does not create the Players.
const india = new Team("India", [virat, bumrah, jadeja]);

india.showPlayers();

// The Player still exists independently of the Team.
console.log(`\nPlayer still exists: ${virat.name}`);

// ============================================================
// Example 2: Department and Employee
// ============================================================

class Employee {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class Department {
  constructor(name, employees) {
    this.name = name;
    this.employees = employees;
  }

  addEmployee(employee) {
    this.employees.push(employee);
  }

  removeEmployee(employeeId) {
    this.employees = this.employees.filter(
      (employee) => employee.id !== employeeId,
    );
  }

  showEmployees() {
    console.log(`\nDepartment: ${this.name}`);

    for (const employee of this.employees) {
      console.log(`${employee.id} - ${employee.name}`);
    }
  }
}

// Employees exist independently of the Department.
const varun = new Employee(1, "Varun");
const rahul = new Employee(2, "Rahul");
const kumar = new Employee(3, "Kumar");

// The Department receives existing Employee objects.
const backend = new Department("IT", [varun, rahul, kumar]);

backend.showEmployees();

// Removing an Employee from the Department
// does not destroy the Employee object.
backend.removeEmployee(3);

console.log("\nEmployee still exists:");
console.log(kumar);

// ============================================================
// C++ Example
// ============================================================

/*
#include <iostream>
#include <string>
#include <vector>

using namespace std;

class Player {
public:
    string name;

    Player(string name) : name(name) {}
};

class Team {
private:
    string name;
    vector<Player*> players; // References existing Player objects

public:
    Team(string name) : name(name) {}

    void addPlayer(Player* player) {
        players.push_back(player);
    }

    void removePlayer(Player* player) {
        for (auto it = players.begin(); it != players.end(); ++it) {
            if (*it == player) {
                players.erase(it);
                break;
            }
        }
    }

    void showPlayers() {
        cout << "Team: " << name << endl;

        for (Player* player : players) {
            cout << "- " << player->name << endl;
        }
    }
};

int main() {

    // Players exist independently.
    Player virat("Virat");
    Player bumrah("Bumrah");

    // Team does not create or own the Players.
    Team india("India");

    india.addPlayer(&virat);
    india.addPlayer(&bumrah);

    india.showPlayers();

    // Players still exist independently of the Team.
    cout << "\nPlayers still exist:\n";
    cout << virat.name << endl;
    cout << bumrah.name << endl;

    return 0;
}
*/
