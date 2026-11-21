// Dependency Example

class Alert {
  constructor(
    private readonly messageValue: string,
    private readonly severityValue: string,
  ) {}

  message(): string {
    return this.messageValue;
  }
  severity(): string {
    return this.severityValue;
  }
}

class AlertFormatter {
  format(alert: Alert): string {
    return alert.severity().toUpperCase() + ":" + alert.message();
  }
}

class AlertDesk {
  private count = 0;
  private last = "NONE";

  constructor() {}

  private supported(severity: string): boolean {
    return (
      severity === "info" || severity === "warning" || severity === "critical"
    );
  }

  preview(message: string, severity: string): string {
    if (message === "" || !this.supported(severity)) {
      return "INVALID";
    }
    const alert = new Alert(message, severity);
    const formatter = new AlertFormatter();
    const result = formatter.format(alert);
    this.count++;
    this.last = severity;
    return result;
  }

  previewCount(): number {
    return this.count;
  }

  lastSeverity(): string {
    return this.last;
  }
}
