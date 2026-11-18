export var BookingStatus;
(function (BookingStatus) {
    BookingStatus["PENDING_PAYMENT"] = "PENDING_PAYMENT";
    BookingStatus["CONFIRMED"] = "CONFIRMED";
    BookingStatus["CANCELLED"] = "CANCELLED";
})(BookingStatus || (BookingStatus = {}));
export class Booking {
    bookingId;
    totalAmount;
    status;
    customer;
    show;
    constructor(bookingId, customer, show, totalAmount) {
        this.bookingId = bookingId;
        this.customer = customer;
        this.show = show;
        this.totalAmount = totalAmount;
        this.status = BookingStatus.PENDING_PAYMENT;
    }
    getBookingId() {
        return this.bookingId;
    }
    getTotalAmount() {
        return this.totalAmount;
    }
    getCustomer() {
        return this.customer;
    }
    getShow() {
        return this.show;
    }
    getStatus() {
        return this.status;
    }
}
