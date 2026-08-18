// # 03. Composition

/*
 * Composition represents a strong "Has-a" relationship.
 *
 * The parent object owns the child object, and the child is
 * strongly tied to the lifetime of the parent.
 *
 * Key idea:
 *
 * A OWNS B
 * A is destroyed
 * ↓
 * B is also destroyed / has no independent existence
 *
 * Example:
 *
 * Order ─────◆──── OrderItem
 *
 * The Order creates and owns its OrderItems.
 * An OrderItem belongs to that specific Order.
 *
 * UML:
 *
 * Order ─────◆──── OrderItem
 *              ↑
 *         Composition
 *
 * The important concept is OWNERSHIP.
 *
 * Difference from Aggregation:
 *
 * Aggregation:
 *   A HAS B
 *   B can exist independently of A.
 *
 * Composition:
 *   A OWNS B
 *   B is tied to A's lifetime.
 */


// ============================================================
// Example 1: Order and OrderItem
// ============================================================

class OrderItem {
  constructor(productId, quantity, price) {
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
  }

  getTotal() {
    return this.quantity * this.price;
  }
}

class Order {
  #items = [];

  constructor(orderId) {
    this.orderId = orderId;
  }

  addItem(productId, quantity, price) {
    // Order creates and owns the OrderItem.
    const item = new OrderItem(productId, quantity, price);

    this.#items.push(item);
  }

  getTotal() {
    return this.#items.reduce(
      (total, item) => total + item.getTotal(),
      0
    );
  }

  getItems() {
    // Return a copy so external code cannot directly modify
    // the internal collection.
    return [...this.#items];
  }
}

const order = new Order("ORD-100");

order.addItem("Laptop-1", 1, 90000);
order.addItem("Speaker", 2, 1500);

console.log(`Order Total: ₹${order.getTotal()}`);


// ============================================================
// Example 2: ChessGame and Board
// ============================================================

class Board {
  constructor() {
    this.cells = Array.from(
      { length: 8 },
      () => Array(8).fill(null)
    );
  }

  placePiece(row, col, piece) {
    this.cells[row][col] = piece;
  }

  getPiece(row, col) {
    return this.cells[row][col];
  }
}

class ChessGame {
  #board;

  constructor() {
    // ChessGame creates and owns its Board.
    this.#board = new Board();
  }

  movePiece(fromRow, fromCol, toRow, toCol) {
    const piece = this.#board.getPiece(fromRow, fromCol);

    if (!piece) {
      throw new Error("No piece at source position");
    }

    this.#board.placePiece(toRow, toCol, piece);
    this.#board.placePiece(fromRow, fromCol, null);
  }
}

const game = new ChessGame();


// ============================================================
// C++ Example
// ============================================================

/*
#include <iostream>
#include <string>
#include <vector>

using namespace std;

// ------------------------------------------------------------
// OrderItem
// ------------------------------------------------------------

class OrderItem {
private:
    string productId;
    int quantity;
    double price;

public:
    OrderItem(string productId, int quantity, double price)
        : productId(productId),
          quantity(quantity),
          price(price) {}

    double getTotal() const {
        return quantity * price;
    }
};


// ------------------------------------------------------------
// Order
// ------------------------------------------------------------

class Order {
private:
    string orderId;
    vector<OrderItem> items;

public:
    Order(string orderId)
        : orderId(orderId) {}

    void addItem(
        string productId,
        int quantity,
        double price
    ) {
        // Order creates the OrderItem internally.
        // This demonstrates composition.
        items.emplace_back(
            productId,
            quantity,
            price
        );
    }

    double getTotal() const {
        double total = 0;

        for (const OrderItem& item : items) {
            total += item.getTotal();
        }

        return total;
    }
};


// ------------------------------------------------------------
// Main
// ------------------------------------------------------------

int main() {

    Order order("ORD-100");

    order.addItem("Laptop-1", 1, 90000);
    order.addItem("Speaker", 2, 1500);

    cout << "Order Total: ₹"
         << order.getTotal()
         << endl;

    return 0;
}
*/


/*
 * Why is this Composition?
 *
 * 1. Order creates the OrderItem objects itself.
 *
 * 2. The caller does not create an OrderItem and pass it
 *    into the Order.
 *
 * 3. The Order owns its collection of OrderItems.
 *
 * 4. OrderItems belong to that Order.
 *
 * In C++, the vector<OrderItem> is especially useful for
 * demonstrating composition because the Order directly
 * contains the OrderItem objects.
 *
 * Remember:
 *
 * Aggregation:
 *   Department ─────◇──── Employee
 *   Employee can exist without Department.
 *
 * Composition:
 *   Order ─────◆──── OrderItem
 *   OrderItem belongs to the Order.
 */