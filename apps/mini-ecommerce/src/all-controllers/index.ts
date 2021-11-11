import { ClientController } from "../client/client.controller";
import { PaymentController } from "../payment/payment.controller";
import { SalesmanController } from "../salesman/salesman.controller";

export const controller = [
    ClientController,
    SalesmanController,
    PaymentController,
];