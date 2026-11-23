/**
 * ═══════════════════════════════════════════════════════════
 * DRY (Don't Repeat Yourself) — The Pragmatic Programmer
 * "Every piece of knowledge must have a single, unambiguous,
 *  authoritative representation within a system."
 *
 * DRY targets KNOWLEDGE duplication, not CODE duplication.
 * ═══════════════════════════════════════════════════════════
 */

/* ──────────────────────────────────────────────
 * 1. THE PROBLEM — Knowledge Duplication
 *
 * Both classes encode the SAME business rules:
 *   - member must be active
 *   - max 5 active loans
 *   - copy must be available
 *
 * If the limit changes 5 → 7, you must edit BOTH.
 * That's a DRY violation: the knowledge has two homes.
 * ────────────────────────────────────────────── */

// ❌ BEFORE: rules duplicated across two workflows

class LibrarianCheckout {
    checkoutAtDesk(memberId: string, copyId: string): Loan {
        const member = this.members.find(memberId);
        if (!member.isActive()) throw new BorrowException("inactive");
        if (member.activeLoans() >= 5) throw new BorrowException("limit reached");
        const copy = this.copies.find(copyId);
        if (!copy.isAvailable()) throw new BorrowException("not available");
        return this.loans.issue(member, copy);
    }
}

class SelfCheckoutKiosk {
    // Same rules, copy-pasted — violates DRY
    checkoutAtKiosk(memberId: string, copyId: string): Loan {
        const member = this.members.find(memberId);
        if (!member.isActive()) throw new BorrowException("inactive");
        if (member.activeLoans() >= 5) throw new BorrowException("limit reached");
        const copy = this.copies.find(copyId);
        if (!copy.isAvailable()) throw new BorrowException("not available");
        return this.loans.issue(member, copy);
    }
}

/* ──────────────────────────────────────────────
 * 2. THE FIX — Single Source of Truth
 *
 * Extract shared rules into CheckoutPolicy.
 * Change the limit ONCE → both workflows update.
 * ────────────────────────────────────────────── */

// ✅ AFTER: one authoritative place for checkout rules

class CheckoutPolicy {
    static readonly MAX_LOANS = 5; // ← single source of truth

    /** Validates all preconditions; throws on first violation. */
    static validate(member: Member, copy: BookCopy): void {
        if (!member.isActive())
            throw new BorrowException("inactive");
        if (member.activeLoans() >= CheckoutPolicy.MAX_LOANS)
            throw new BorrowException("limit reached");
        if (!copy.isAvailable())
            throw new BorrowException("not available");
    }
}

class LibrarianCheckout {
    checkoutAtDesk(memberId: string, copyId: string): Loan {
        const member = this.members.find(memberId);
        const copy   = this.copies.find(copyId);
        CheckoutPolicy.validate(member, copy); // delegate shared rules
        return this.loans.issue(member, copy);
    }
}

class SelfCheckoutKiosk {
    checkoutAtKiosk(memberId: string, copyId: string): Loan {
        const member = this.members.find(memberId);
        const copy   = this.copies.find(copyId);
        CheckoutPolicy.validate(member, copy); // same policy, no duplication
        return this.loans.issue(member, copy);
    }
}

/* ──────────────────────────────────────────────
 * 3. CODE DUPLICATION ≠ KNOWLEDGE DUPLICATION
 *
 * These two loops LOOK similar but answer DIFFERENT questions:
 *   availableTitles → "What can I borrow now?"
 *   overdueTitles   → "What should I chase for returns?"
 *
 * They will evolve independently. Merging them would be
 * a WRONG abstraction. Leave the code duplication alone.
 *
 * Test: "If rule A changes, MUST rule B change too?"
 *   Yes → same knowledge → DRY it.
 *   No  → different knowledge → keep separate.
 * ────────────────────────────────────────────── */

// ✅ These are NOT a DRY violation — leave them as-is
availableTitles(copies: BookCopy[]): string[] {
    const titles: string[] = [];
    for (const copy of copies) {
        if (copy.isAvailable()) titles.push(copy.getTitle());
    }
    return titles;
}

overdueTitles(loans: Loan[]): string[] {
    const titles: string[] = [];
    for (const loan of loans) {
        if (loan.isOverdue()) titles.push(loan.getCopy().getTitle());
    }
    return titles;
}

/* ──────────────────────────────────────────────
 * 4. WHEN DRY CAN GO WRONG — Premature Abstraction
 *
 * Merging code that looks similar today but represents
 * DIFFERENT concepts creates hidden coupling.
 * ────────────────────────────────────────────── */

// ❌ ANTI-PATTERN: forced abstraction of coincidentally similar code
// "age" might later allow 0 (newborns) but "quantity" must stay ≥ 1
function validateNonNegative(value: number, label: string): void {
    if (typeof value !== "number" || value < 0)
        throw new Error(`${label} must be non-negative`);
}
// validateNonNegative(user.age, "Age");
// validateNonNegative(order.quantity, "Quantity");
// → Breaks when rules diverge. Wrong abstraction > duplication.

// ✅ CORRECT: keep separate — they may diverge independently
function validateAge(value: number): void {
    if (typeof value !== "number" || value < 0 || value > 150)
        throw new Error("Age must be between 0 and 150");
}

function validateQuantity(value: number): void {
    if (typeof value !== "number" || value < 1)
        throw new Error("Quantity must be at least 1");
}

/* ──────────────────────────────────────────────
 * 5. FINDING THE RIGHT BALANCE — Quick Reference
 * ──────────────────────────────────────────────
 *
 *  • Rule of Three: extract on the 3rd occurrence
 *    (by then you've seen the real shape of variation)
 *
 *  • Ask "do they change together?"
 *    Yes → DRY it. No → coincidence, leave it.
 *
 *  • Prefer duplication over the WRONG abstraction
 *    (Sandi Metz: a wrong abstraction is harder to
 *     remove than duplicate code)
 *
 *  • ALWAYS DRY constants & config
 *    (even two occurrences of a magic number = bug)
 *
 *  • Let patterns emerge before generalizing
 *    (copy first in prototyping, refactor when stable)
 *
 * BOTTOM LINE: DRY the knowledge, not the code.
 * ────────────────────────────────────────────── */   