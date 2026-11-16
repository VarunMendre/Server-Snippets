// 04. Dependency

/*
 * Dependency represents a "uses" relationship.
 *
 * One object temporarily uses another object to perform
 * a specific operation.
 *
 * Dependency does NOT imply ownership.
 *
 * A does not own B.
 * A does not necessarily store B as a property.
 *
 * Think:
 *
 * A ──────uses──────> B
 *
 * A depends on B to perform some operation.
 *
 * If B changes its interface or behavior, A may also
 * need to change.
 *
 * Key characteristics:
 *
 * - No ownership
 * - Usually temporary usage
 * - B is often passed as a method parameter
 * - A does not need to store B as instance state
 *
 * Common examples:
 *
 * - Email sending
 * - Logging
 * - Payment processing
 * - File generation
 * - Database queries
 * - External API calls
 */


// ============================================================
// Example 1: ReportService → EmailService
// ============================================================

class EmailService {
  send(to, subject, content) {
    console.log(`Email sent to: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content: ${content}`);
  }
}

class ReportService {
  generateReport() {
    return "Monthly Sales Report";
  }

  sendReport(emailService, userEmail) {
    const report = this.generateReport();

    // ReportService temporarily uses EmailService
    // to perform the sending operation.
    emailService.send(
      userEmail,
      "Monthly Report",
      report
    );
  }
}

const emailService = new EmailService();
const reportService = new ReportService();

reportService.sendReport(
  emailService,
  "varun@gmail.com"
);


// ============================================================
// Example 2: OrderProcessor → TaxCalculator
// ============================================================

class TaxCalculator {
  calculate(amount, country) {
    if (country === "India") {
      return amount * 0.18;
    }

    if (country === "USA") {
      return amount * 0.08;
    }

    return 0;
  }
}

class OrderProcessor {
  process(order, taxCalculator) {
    // OrderProcessor temporarily uses TaxCalculator.
    const tax = taxCalculator.calculate(
      order.amount,
      order.country
    );

    const finalAmount = order.amount + tax;

    console.log({
      subtotal: order.amount,
      tax,
      total: finalAmount,
    });
  }
}

const order = {
  amount: 10000,
  country: "India",
};

const taxCalculator = new TaxCalculator();
const processor = new OrderProcessor();

processor.process(order, taxCalculator);


// ============================================================
// C++ Example
// ============================================================

/*
#include <iostream>
#include <string>

using namespace std;


// ------------------------------------------------------------
// EmailService
// ------------------------------------------------------------

class EmailService {
public:
    void send(
        string email,
        string message
    ) {
        cout << "Sending email to "
             << email
             << ": "
             << message
             << endl;
    }
};


// ------------------------------------------------------------
// ReportService
// ------------------------------------------------------------

class ReportService {
public:
    void generateAndSend(
        EmailService& emailService,
        string email
    ) {
        string report = "Monthly Sales Report";

        // ReportService temporarily uses EmailService.
        emailService.send(email, report);
    }
};


// ------------------------------------------------------------
// Main
// ------------------------------------------------------------

int main() {

    EmailService emailService;
    ReportService reportService;

    reportService.generateAndSend(
        emailService,
        "varun@example.com"
    );

    return 0;
}
*/


/*
 * Why is this Dependency?
 *
 * 1. ReportService does not create EmailService.
 *
 * 2. ReportService does not own EmailService.
 *
 * 3. ReportService does not store EmailService as
 *    an instance property.
 *
 * 4. EmailService is simply passed to the method when
 *    it is needed.
 *
 * Therefore:
 *
 * ReportService ─────uses─────> EmailService
 *
 *
 * Quick comparison:
 *
 * Association:
 *   A knows B
 *   A ───────────> B
 *
 * Aggregation:
 *   A has B
 *   B can exist independently.
 *   A ─────◇──── B
 *
 * Composition:
 *   A owns B
 *   B is tied to A's lifetime.
 *   A ─────◆──── B
 *
 * Dependency:
 *   A temporarily uses B.
 *   A ─────uses────> B
 */