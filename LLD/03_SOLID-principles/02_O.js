// ═══════════════════════════════════════════════════════════════════════════
// 2. O → OPEN / CLOSED PRINCIPLE — Full Reference
// ═══════════════════════════════════════════════════════════════════════════
//
// "Software entities should be open for extension but closed for modification."
// — Bertrand Meyer
//
// Add new behavior by ADDING code, not by CHANGING stable code.

// ─────────────────────────────────────────────────────────────────────────────
// 📌 WHEN TO USE OCP
// ─────────────────────────────────────────────────────────────────────────────
//
// ✅ USE when:
//   • You repeatedly add if/else or switch branches for new types/behaviors
//   • Adding a feature requires modifying a class that already works in prod
//   • You have a stable interface with multiple possible implementations
//   • The system is plugin-based (IDEs, browsers, payment gateways)
//   • APIs need to evolve without breaking existing clients
//   • Business rules are expected to change frequently (discounts, fees, taxes)
//   • Multiple teams work on the same codebase independently
//
// ❌ DON'T USE when:
//   • The change is purely speculative (YAGNI — You Aren't Gonna Need It)
//   • You're building a one-time script or prototype
//   • There are only 2 fixed options that will never change
//   • The abstraction adds more complexity than the if/else it replaces
//   • You're over-engineering for "future" requirements nobody has asked for
//
// 🚩 RED FLAGS (smell detection):
//   if (type === "A") {}
//   else if (type === "B") {}
//   else if (type === "C") {}
//   else if (type === "D") {}   ← grows every sprint? → OCP violation
//
// ─────────────────────────────────────────────────────────────────────────────
// 📌 DESIGN PATTERNS THAT IMPLEMENT OCP
// ─────────────────────────────────────────────────────────────────────────────
//
//   Pattern          | How it satisfies OCP
//   ──────────────── | ─────────────────────────────────────────────────────
//   Strategy         | Swap algorithms at runtime; add new strategies freely
//   Template Method  | Fix the skeleton, override specific steps in subclasses
//   Factory Method   | Create new objects without modifying the creator
//   Decorator        | Add behavior by wrapping, not modifying the wrapped class
//   Plugin/Observer  | Register new listeners/handlers without touching core
//   Adapter          | Extend third-party code you can't modify
//
// ─────────────────────────────────────────────────────────────────────────────
// 📌 REAL-WORLD USE CASES
// ─────────────────────────────────────────────────────────────────────────────

// ═══════════════════════════════════════════════════════════════════════════
// USE CASE 1: PAYMENT PROCESSING (Strategy Pattern)
// ═══════════════════════════════════════════════════════════════════════════

// ❌ BAD — every new payment method = modify this file
class PaymentProcessorBad {
  process(method, amount) {
    if (method === "credit_card") {
      return { status: "success", fee: amount * 0.02 };
    }
    if (method === "paypal") {
      return { status: "success", fee: amount * 0.035 };
    }
    if (method === "upi") {
      return { status: "success", fee: 0 };
    }
    // ...add Bitcoin? Apple Pay? PhonePe? → modify AGAIN
    throw new Error(`Unsupported: ${method}`);
  }
}

// ✅ GOOD — open for extension, closed for modification
class PaymentMethod {
  process(amount) {
    throw new Error("Subclasses must implement process()");
  }
  get name() {
    throw new Error("Subclasses must implement name");
  }
}

class CreditCardPayment extends PaymentMethod {
  process(amount) {
    return { status: "success", fee: amount * 0.02, method: "credit_card" };
  }
  get name() {
    return "Credit Card";
  }
}

class UPIPayment extends PaymentMethod {
  process(amount) {
    return { status: "success", fee: 0, method: "upi" };
  }
  get name() {
    return "UPI";
  }
}

class PayPalPayment extends PaymentMethod {
  process(amount) {
    return { status: "success", fee: amount * 0.035, method: "paypal" };
  }
  get name() {
    return "PayPal";
  }
}

// Context — CLOSED. It only knows the contract.
class CheckoutService {
  constructor() {
    this._methods = [];
  }
  register(method) {
    this._methods.push(method);
  }
  pay(methodName, amount) {
    const method = this._methods.find(
      (m) => m.name.toLowerCase().replace(" ", "_") === methodName,
    );
    if (!method) throw new Error(`No payment method: ${methodName}`);
    return method.process(amount);
  }
}

// Usage
const checkout = new CheckoutService();
checkout.register(new CreditCardPayment());
checkout.register(new UPIPayment());
checkout.register(new PayPalPayment());

console.log(checkout.pay("upi", 1000)); // { status: "success", fee: 0, method: "upi" }
console.log(checkout.pay("credit_card", 500)); // { status: "success", fee: 10, method: "credit_card" }

// ➕ Add Apple Pay? Just this:
class ApplePayPayment extends PaymentMethod {
  process(amount) {
    return { status: "success", fee: amount * 0.015, method: "apple_pay" };
  }
  get name() {
    return "Apple Pay";
  }
}
checkout.register(new ApplePayPayment()); // ← no modification to CheckoutService or existing methods
console.log(checkout.pay("apple_pay", 200)); // { status: "success", fee: 3, method: "apple_pay" }

// ═══════════════════════════════════════════════════════════════════════════
// USE CASE 2: NOTIFICATION SERVICE (Strategy Pattern)
// ═══════════════════════════════════════════════════════════════════════════

// ❌ BAD
class NotifierBad {
  send(channel, message) {
    if (channel === "email") {
      console.log(`📧 Email: ${message}`);
    } else if (channel === "sms") {
      console.log(`📱 SMS: ${message}`);
    } else if (channel === "push") {
      console.log(`🔔 Push: ${message}`);
    }
    // WhatsApp? Slack? Teams? → modify again
  }
}

// ✅ GOOD
class NotificationChannel {
  send(message) {
    throw new Error("Implement send()");
  }
}

class EmailChannel extends NotificationChannel {
  send(message) {
    console.log(`📧 [Email] ${message}`);
  }
}

class SMSChannel extends NotificationChannel {
  send(message) {
    console.log(`📱 [SMS] ${message}`);
  }
}

class WhatsAppChannel extends NotificationChannel {
  send(message) {
    console.log(`💬 [WhatsApp] ${message}`);
  }
}

class NotificationService {
  constructor() {
    this._channels = [];
  }
  addChannel(ch) {
    this._channels.push(ch);
  }
  broadcast(message) {
    this._channels.forEach((ch) => ch.send(message));
  }
}

const notifier = new NotificationService();
notifier.addChannel(new EmailChannel());
notifier.addChannel(new SMSChannel());
notifier.broadcast("Order shipped!");
// 📧 [Email] Order shipped!
// 📱 [SMS] Order shipped!

// ➕ Add WhatsApp?
notifier.addChannel(new WhatsAppChannel());
notifier.broadcast("Payment received!");
// 📧 [Email] Payment received!
// 📱 [SMS] Payment received!
// 💬 [WhatsApp] Payment received!

// ═══════════════════════════════════════════════════════════════════════════
// USE CASE 3: DISCOUNT ENGINE (Strategy Pattern)
// ═══════════════════════════════════════════════════════════════════════════

// ❌ BAD
function applyDiscountBad(price, customerType) {
  if (customerType === "regular") return price * 0.9;
  if (customerType === "premium") return price * 0.8;
  if (customerType === "vip") return price * 0.7;
  if (customerType === "student") return price * 0.85;
  // New tier? Modify function.
}

// ✅ GOOD
class DiscountStrategy {
  calculate(price) {
    throw new Error("Implement calculate()");
  }
}

class RegularDiscount extends DiscountStrategy {
  calculate(price) {
    return price * 0.9;
  }
}
class PremiumDiscount extends DiscountStrategy {
  calculate(price) {
    return price * 0.8;
  }
}
class VIPDiscount extends DiscountStrategy {
  calculate(price) {
    return price * 0.7;
  }
}
class StudentDiscount extends DiscountStrategy {
  calculate(price) {
    return price * 0.85;
  }
}

class DiscountEngine {
  constructor() {
    this._strategies = new Map();
  }
  register(name, strategy) {
    this._strategies.set(name, strategy);
  }
  apply(customerType, price) {
    const s = this._strategies.get(customerType);
    if (!s) throw new Error(`No discount for: ${customerType}`);
    return s.calculate(price);
  }
}

const engine = new DiscountEngine();
engine.register("regular", new RegularDiscount());
engine.register("premium", new PremiumDiscount());
engine.register("vip", new VIPDiscount());

console.log(engine.apply("premium", 1000)); // 800
console.log(engine.apply("vip", 1000)); // 700

// ➕ Add "student" tier?
engine.register("student", new StudentDiscount());
console.log(engine.apply("student", 1000)); // 850

// ═══════════════════════════════════════════════════════════════════════════
// USE CASE 4: REPORT EXPORT (Template Method Pattern)
// ═══════════════════════════════════════════════════════════════════════════

// ❌ BAD
function generateReportBad(data, format) {
  const content = data.map((d) => `${d.name}: ${d.value}`).join("\n");
  if (format === "pdf") {
    return `PDF:\n${content}`;
  } else if (format === "excel") {
    return `XLSX:\n${content}`;
  } else if (format === "csv") {
    return `CSV:\n${data.map((d) => `${d.name},${d.value}`).join("\n")}`;
  }
  // HTML? JSON? → modify function
}

// ✅ GOOD
class ReportGenerator {
  generate(data) {
    const content = this._buildContent(data);
    return this._export(content);
  }
  _buildContent(data) {
    return data.map((d) => `${d.name}: ${d.value}`).join("\n");
  }
  _export(content) {
    throw new Error("Subclasses must implement _export()");
  }
}

class PDFReport extends ReportGenerator {
  _export(content) {
    return `📄 PDF:\n${content}`;
  }
}
class ExcelReport extends ReportGenerator {
  _export(content) {
    return `📊 Excel:\n${content}`;
  }
}
class CSVReport extends ReportGenerator {
  _export(content) {
    // Override _buildContent for CSV-specific format
    return `CSV:\n${this._rawData.map((d) => `${d.name},${d.value}`).join("\n")}`;
  }
}

const data = [
  { name: "Revenue", value: 50000 },
  { name: "Cost", value: 30000 },
];
console.log(new PDFReport().generate(data));
console.log(new ExcelReport().generate(data));

// ═══════════════════════════════════════════════════════════════════════════
// USE CASE 5: PLUGIN ARCHITECTURE (Observer / Registry Pattern)
// ═══════════════════════════════════════════════════════════════════════════
// This is how VS Code, browsers, and game engines work.

class PluginManager {
  constructor() {
    this._plugins = new Map();
  }
  register(name, plugin) {
    this._plugins.set(name, plugin);
    console.log(`🔌 Plugin registered: ${name}`);
  }
  execute(event, payload) {
    this._plugins.forEach((plugin) => {
      if (plugin.onEvent) plugin.onEvent(event, payload);
    });
  }
}

// Core app — CLOSED. Never modified.
const app = new PluginManager();

// Plugins — OPEN. Anyone can add.
class AutoSavePlugin {
  onEvent(event, payload) {
    if (event === "fileChanged")
      console.log(`💾 Auto-saved: ${payload.filename}`);
  }
}

class LintPlugin {
  onEvent(event, payload) {
    if (event === "fileSaved") console.log(`✅ Linted: ${payload.filename}`);
  }
}

class CloudSyncPlugin {
  onEvent(event, payload) {
    if (event === "fileSaved") console.log(`☁️ Synced: ${payload.filename}`);
  }
}

app.register("autosave", new AutoSavePlugin());
app.register("lint", new LintPlugin());

app.execute("fileChanged", { filename: "main.js" }); // 💾 Auto-saved
app.execute("fileSaved", { filename: "main.js" }); // ✅ Linted

// ➕ Add cloud sync without touching core:
app.register("cloudSync", new CloudSyncPlugin());
app.execute("fileSaved", { filename: "app.js" });
// ✅ Linted: app.js
// ☁️ Synced: app.js

// ═══════════════════════════════════════════════════════════════════════════
// USE CASE 6: VEHICLE FEE (your original, cleaned)
// ═══════════════════════════════════════════════════════════════════════════

class ParkingFeeRule {
  calculate(hours) {
    throw new Error("Subclasses must implement calculate()");
  }
}

class CarFee extends ParkingFeeRule {
  calculate(hours) {
    return hours * 50;
  }
}
class BikeFee extends ParkingFeeRule {
  calculate(hours) {
    return hours * 20;
  }
}
class TruckFee extends ParkingFeeRule {
  calculate(hours) {
    return hours * 100;
  }
}
class EVFee extends ParkingFeeRule {
  calculate(hours) {
    return hours * 30;
  }
}

class ParkingCalculator {
  calculate(rule, hours) {
    return rule.calculate(hours);
  }
}

const calc = new ParkingCalculator();
console.log(calc.calculate(new CarFee(), 3)); // 150
console.log(calc.calculate(new BikeFee(), 3)); //  60
console.log(calc.calculate(new TruckFee(), 2)); // 200
console.log(calc.calculate(new EVFee(), 4)); // 120

// ─────────────────────────────────────────────────────────────────────────────
// 📌 KEY TAKEAWAYS
// ─────────────────────────────────────────────────────────────────────────────
//
// 1. PROGRAM TO AN INTERFACE, NOT AN IMPLEMENTATION
//    Your context/calculator should only know the abstract contract.
//
// 2. DEPENDENCY INJECTION
//    Pass the strategy/rule/channel as a parameter or via constructor.
//    Don't `new` concrete classes inside your context.
//
// 3. REGISTRY / FACTORY FOR DISCOVERY
//    Use a Map or DI container to look up implementations by name.
//    This decouples "who creates" from "who uses".
//
// 4. TESTABILITY
//    Each strategy/rule is independently unit-testable.
//    You can mock the strategy in tests without touching the context.
//
// 5. DON'T OVER-ABSTRACT
//    2 fixed options? Just use if/else.
//    5+ options that grow? → OCP.
//    The rule of thumb: apply OCP when a change is EXPECTED, not just possible.
//
// ─────────────────────────────────────────────────────────────────────────────
// 📌 COMPARISON TABLE
// ─────────────────────────────────────────────────────────────────────────────
//
// | Aspect              | Without OCP (if/else)  | With OCP (polymorphism)       |
// | ─────────────────── | ────────────────────── | ────────────────────────────── |
// | Add new type        | Modify existing file   | Create new file/class         |
// | Regression risk     | High (touching old)    | Low (old code untouched)      |
// | Testability         | Hard (all in one)      | Easy (isolated per class)     |
// | Team collaboration  | Merge conflicts        | Parallel work, no conflicts   |
// | Upfront complexity  | Low                    | Slightly higher (more files)  |
// | Best for            | 2-3 fixed options      | 4+ growing options            |
//
// ─────────────────────────────────────────────────────────────────────────────
// 📌 INTERVIEW QUICK ANSWER
// ─────────────────────────────────────────────────────────────────────────────
//
// Q: "What is OCP and when do you apply it?"
//
// A: "OCP says classes/modules should be open for extension but closed for
//     modification. I apply it when I see a growing if/else or switch on a
//     type discriminator, and the set of types is expected to grow. I replace
//     the conditional with a common interface/abstract class, create one
//     concrete class per variant, and inject the right one at runtime via
//     a registry or DI. This keeps existing code stable, makes each variant
//     independently testable, and lets teams add features without merge
//     conflicts. I avoid it for 2-option cases or speculative futures (YAGNI)."
//
