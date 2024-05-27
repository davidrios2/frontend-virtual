// import axios from "axios";

const reservations = [
  {
    id: "R12345",
    flight: { idflight: "FL123", amount: 150.0 },
  },
  {
    id: "R67890",
    flight: { idflight: "FL456", amount: 300.0 },
  },
]

function findReservation(reservation: any, index: Number, id: String) {
  if (reservation.id === id) console.log(index)
  return reservation.id === id
}

export async function GET() {
  return Response.json({ status: "Bienvenido a la API de Pagos" })
}

export async function getAmountByReservation(id: String) {
  let reserv = reservations.find((reservation, index) => findReservation(reservation, index, id))
  return reserv
}

// export async function fetchPayments(reservationId: Number, cardNumber: String, cardCvc: String, cardHolderName: String) {
//   return axios
//     .post("https://codefact.fly.dev/api/payments", {
//       reservationId,
//       cardNumber,
//       cardCvc,
//       cardHolderName
//     })
//     .catch((e) => {
//       console.error(e.message);
//     })
//     .then((res) => res?.data);
// }
