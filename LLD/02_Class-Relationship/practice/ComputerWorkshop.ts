

class Cpu {
  constructor(
    private readonly model: string,
    private readonly core: number,
  ) {}

  describe(): string {
    return `CPU: ${this.model} (${this.core} cores)`;
  }
}

class Ram {
  constructor(private readonly gigabytes: number) {}

  describe(): string {
    return `RAM: ${this.gigabytes} GB`;
  }
}

class Disk {
  constructor(private readonly gigabytes: number) {}

  describe(): string {
    return `Disk: ${this.gigabytes} GB`;
  }
}

class Computer {
  private readonly cpu: Cpu;
  private readonly ram: Ram;
  private readonly disk: Disk;

  private static readonly DISK_GB = 512;

  constructor(cpuModel: string, cores: number, ramGb: number) {
    this.cpu = new Cpu(cpuModel, cores);
    this.ram = new Ram(ramGb);
    this.disk = new Disk(Computer.DISK_GB);
  }

  describe(): string {
    return `${this.cpu.describe()} | ${this.ram.describe()} | ${this.disk.describe()}`;
  }
}

class ComputerWorkshop {
  private static readonly PARTS_PER_COMPUTER = 3;

  private readonly computers = new Map<number, Computer>();
  private nextId = 0;

  constructor() {}

  build(cpuModel: string, cores: number, ramGb: number): number {
    const id = this.nextId++;
    this.computers.set(id, new Computer(cpuModel, cores, ramGb));
    return id;
  }

  computerCount(): number {
    return this.computers.size;
  }

  partCount(): number {
    return this.computers.size * ComputerWorkshop.PARTS_PER_COMPUTER;
  }

  describe(id: number): string {
    return this.computers.get(id)?.describe() ?? "SCRAPPED";
  }

  scrap(id: number): boolean {
    return this.computers.delete(id);
  }
}
