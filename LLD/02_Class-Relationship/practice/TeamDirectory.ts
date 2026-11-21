// Aggregation: Team → Employee

class Employee {
  constructor(private readonly empName: string) {}

  getName(): string {
    return this.empName;
  }
}

class Team {
  private teams: Employee[] = [];

  constructor(private readonly teamName: string) {}

  getName(): string {
    return this.teamName;
  }

  add(emp: Employee): boolean {
    if (this.teams.includes(emp)) return false;

    this.teams.push(emp);
    return true;
  }

  contains(emp: Employee): boolean {
    return this.teams.includes(emp);
  }

  size(): number {
    return this.teams.length;
  }
}

// TeamDirectory → Team (and → Employee)

class TeamDirectory {
  private readonly employeesByName = new Map<string, Employee>();
  private readonly teamsByName = new Map<string, Team>();
  private readonly teamsInCreationOrder: Team[] = [];

  constructor() {}

  hire(name: string): boolean {
    if (this.employeesByName.has(name)) {
      return false;
    }
    this.employeesByName.set(name, new Employee(name));
    return true;
  }

  createTeam(name: string): boolean {
    if (this.teamsByName.has(name)) {
      return false;
    }
    const team = new Team(name);
    this.teamsByName.set(name, team);
    this.teamsInCreationOrder.push(team);
    return true;
  }

  assign(teamName: string, employeeName: string): boolean {
    const team = this.teamsByName.get(teamName);
    const employee = this.employeesByName.get(employeeName);
    return team !== undefined && employee !== undefined && team.add(employee);
  }

  dissolveTeam(name: string): boolean {
    const team = this.teamsByName.get(name);
    if (team === undefined) {
      return false;
    }
    this.teamsByName.delete(name);
    const index = this.teamsInCreationOrder.indexOf(team);
    this.teamsInCreationOrder.splice(index, 1);
    return true;
  }

  employeeCount(): number {
    return this.employeesByName.size;
  }

  teamsOf(employeeName: string): string[] {
    const employee = this.employeesByName.get(employeeName);
    if (employee === undefined) {
      return [];
    }
    return this.teamsInCreationOrder
      .filter((team) => team.contains(employee))
      .map((team) => team.getName());
  }

  teamSize(name: string): number {
    return this.teamsByName.get(name)?.size() ?? 0;
  }
}
