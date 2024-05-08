import axios from "axios";

export async function GET() {
  return Response.json({ status: "ok" })
}

export async function fetchPayments(reservationId: Number, cardNumber: String, cardCvc: String, cardHolderName: String) {
  return axios
    .post("https://codefact.fly.dev/api/payments", {
      reservationId,
      cardNumber,
      cardCvc,
      cardHolderName
    })
    .catch((e) => {
      console.error(e.message);
    })
    .then((res) => res?.data);
}
