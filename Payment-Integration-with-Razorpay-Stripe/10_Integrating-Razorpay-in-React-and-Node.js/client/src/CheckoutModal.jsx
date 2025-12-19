import { useEffect, useRef, useState } from "react";

export default function CheckoutModal({ open, onClose, course, onCheckout }) {
  const [name, setName] = useState("Varun");
  const [mobile, setMobile] = useState("7894561230");
  const [touched, setTouched] = useState({ name: false, mobile: false });
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setTouched({ name: false, mobile: false });
      return;
    }
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // click outside to close
  useEffect(() => {
    function handleClickOutside(e) {
      if (open && modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  const nameErr =
    touched.name && name.trim().length < 2
      ? "Please enter your full name."
      : "";
  const mobileErr =
    touched.mobile && !/^[6-9]\d{9}$/.test(mobile.trim())
      ? "Enter a valid 10-digit Indian mobile (starts with 6–9)."
      : "";

  const isValid = name.trim().length >= 2 && /^[6-9]\d{9}$/.test(mobile.trim());

  const handleProceed = async () => {
    if (!isValid) {
      setTouched({ name: true, mobile: true });
      return;
    }
    const user = { name, mobile };
    const payload = {
      id: course.id,
      name: course.name,
      price: course.price,
      user,
    };

    const response = await fetch("http://localhost:4000/create-order", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { orderId } = await response.json();
    openRazorPayPopup({ orderId, course, user, onClose });
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg rounded-2xl bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-800"
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800">
          <h2
            id="checkout-title"
            className="text-xl font-semibold text-gray-900 dark:text-white"
          >
            Proceed to Checkout
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Course summary */}
          <div className="flex items-center gap-4">
            <img
              src={course.image}
              alt={course.name}
              className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-800"
            />
            <div className="flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Selected Course
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {course.name}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
              <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                ₹{course.price}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-lg border text-white border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {nameErr ? (
                <p className="mt-1 text-sm text-red-600">{nameErr}</p>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Mobile Number
              </label>
              <div className="flex gap-2">
                <span className="inline-flex items-center px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  +91
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={mobile}
                  onBlur={() => setTouched((t) => ({ ...t, mobile: true }))}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                  placeholder="10-digit mobile"
                  className="w-full text-white rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              {mobileErr ? (
                <p className="mt-1 text-sm text-red-600">{mobileErr}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-gray-200 dark:border-gray-800 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-11 cursor-pointer rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleProceed}
            disabled={!isValid}
            className={`flex-1 h-11  rounded-lg text-white  transition-colors ${
              isValid
                ? "bg-indigo-600 cursor-pointer hover:bg-indigo-700"
                : "bg-indigo-400 cursor-not-allowed"
            }`}
          >
            Proceed with Payment
          </button>
        </div>
      </div>
    </div>
  );
}

function openRazorPayPopup({ orderId, user, course, onClose }) {
  const rzp = new Razorpay({
    key: "rzp_test_RnAnjbXG3sqHWQ",
    name: "Varun",
    theme: {
      color: "#95e1f2ff",
    },
    description: "Test Transaction",
    order_id: orderId,
    notes: {
      address: "Varun Corporate Office",
    },
    prefill: {
      name: user.name,
      contact: user.mobile,
    },
    image:
      "https://imgs.search.brave.com/LZVvz2m6dEdxABLGXG0gsI8DRnezcqYeh1zPBYF3tc4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/ZnJvbnQuZnJlZXBp/ay5jb20vaG9tZS9h/bm9uLXJ2bXAvY3Jl/YXRpdmUtc3VpdGUv/cGhvdG9ncmFwaHkv/Y2hhbmdlLWxvY2F0/aW9uLndlYnA",
    notes: {
      courseId: course.id,
      courseName: course.name,
    },
    handler: async function (response) {
      console.log(response);
      const orderResponse = await fetch(
        "http://localhost:4000/complete-order",
        {
          method: "POST",
          body: JSON.stringify({
            orderId: response.razorpay_order_id,
            courseId: course.id,
            courseName: course.name,
            userName: user.name,
            userContact: user.mobile,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const orderStatus = await orderResponse.json();
      console.log(orderStatus);
      if (orderStatus.status === "success") {
        onClose("Order Completed");
      } else {
        onClose("Order not completed");
      }
    },
  });

  rzp.on("payment.failed", function (response) {
    console.log(response);
  });
  rzp.open();
}
