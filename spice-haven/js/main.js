// Spice Haven - main.js
// Three small jobs: mobile menu, time slots, and the "please call us" popup.
// Each one checks the element exists first, so this one file works on every page.

// 1. Mobile menu (the burger button)
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
  });

  // Close the menu after tapping a link, otherwise it hides the page
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// 2. Time slots - only one can be selected at a time
const slots = document.querySelectorAll(".slot");

slots.forEach((slot) => {
  slot.addEventListener("click", () => {
    slots.forEach((s) => s.classList.remove("selected"));
    slot.classList.add("selected");
  });
});

// 3. Booking popup
// Online booking isn't live yet, so "Book now" opens a friendly popup with our phone number.
const bookingForm = document.querySelector("#booking-form");
const modal = document.querySelector("#booking-modal");
const closeBtn = document.querySelector("#close-modal");

if (bookingForm && modal) {
  // Stop people picking a date in the past
  const dateInput = document.querySelector("#date");
  if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault(); // don't reload the page
    modal.classList.add("open");
    closeBtn.focus();
  });

  const closeModal = () => modal.classList.remove("open");

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal(); // click on the dark background
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
}
