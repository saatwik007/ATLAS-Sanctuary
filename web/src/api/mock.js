const wait = (ms) => new Promise((r) => setTimeout(r, ms));

let token = null;

let zoos = [
  {
    id: "sanct_1",
    name: "City Wildlife Sanctuary",
    address: "Main Road, Your City",
    lat: 18.5204,
    lng: 73.8567,
    mapsUrl: "https://maps.google.com/?q=18.5204,73.8567",
  },
];

let bookings = [
  // sample:
  // { id:"b1", zooId:"zoo_1", date:"2026-02-12", qty:2, status:"PENDING_APPROVAL", total:200 }
];

export const mockApi = {
  async sendEmailOtp(email) {
    await wait(600);
    // dev OTP always 123456
    return { ok: true, devOtp: "123456" };
  },

  async verifyEmailOtp(email, otp) {
    await wait(600);
    if (otp !== "123456") return { ok: false, error: "Invalid OTP" };
    token = "mock_token";
    return { ok: true, token };
  },

  async listZoos() {
    await wait(400);
    return { ok: true, zoos };
  },

  async createBooking({ zooId, date, qty }) {
    await wait(700);

    // simple fake rule for demo:
    // qty <= 2 => confirmed awaiting payment else pending approval
    const autoConfirmed = qty <= 2;
    const status = autoConfirmed ? "CONFIRMED_AWAITING_PAYMENT" : "PENDING_APPROVAL";

    const booking = {
      id: "b_" + Math.random().toString(16).slice(2),
      zooId,
      date,
      qty,
      status,
      total: qty * 100,
      createdAt: new Date().toISOString(),
      paymentLink: autoConfirmed ? "https://rzp.io/i/mock-pay-link" : null,
    };

    bookings = [booking, ...bookings];
    return { ok: true, booking };
  },

  async myBookings() {
    await wait(400);
    return { ok: true, bookings };
  },

  // admin
  async adminListPending() {
    await wait(400);
    return { ok: true, bookings: bookings.filter((b) => b.status === "PENDING_APPROVAL") };
  },

  async adminApprove(bookingId) {
    await wait(500);
    bookings = bookings.map((b) =>
      b.id === bookingId
        ? { ...b, status: "APPROVED_AWAITING_PAYMENT", paymentLink: "https://rzp.io/i/mock-approved-pay" }
        : b
    );
    return { ok: true };
  },

  async adminReject(bookingId) {
    await wait(500);
    bookings = bookings.map((b) => (b.id === bookingId ? { ...b, status: "REJECTED" } : b));
    return { ok: true };
  },
};