import * as dotenv from "dotenv";
dotenv.config();

import cryptoChillAxios from "./cryptoChillAxios";

const invoice =
  "lntb80u1psgpjxtpp5mzlryg5dvxnfezm297mzupdgv590gpxqrgcc56ve7423fae65mdqdqqcqzpgxqyz5vqsp5nwp0ys3fp0c08l8xjatke28vm5x932m4r3vnhk04z5nsjk4qthss9qyyssqudjw6cayg7usznjd2heduya9zyx2gpmv0z70e0vuxra2l2s289h99zzf9r7vm54uxay8g5u9t05kngck5593lx033vm6dm9v5a2q0dqqq6gj26";
const cryptoChillProfile = "";

async function payInvoice(invoice: string) {
  try {
    const paymentResponse = await cryptoChillAxios.post("/payouts/", {
      profile_id: cryptoChillProfile,
      kind: "BTC_LIGHTNING_TO_LIGHTNING",
      recipients: [
        {
          currency: "BTC",
          address: invoice,
        },
      ],
    });

    console.log(paymentResponse.data);
  } catch (error) {
    console.log(error.response.data);
  }
}

payInvoice(invoice);
