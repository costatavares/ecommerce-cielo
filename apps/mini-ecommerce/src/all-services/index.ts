import { ClientService } from "../client/client.service";
import { PaymentService } from "../payment/payment.service";
import { SalesmanService } from "../salesman/salesman.service";
import { UsersService } from "../users/users.service";

export const services = [
    ClientService,
    SalesmanService,
    PaymentService,
    UsersService,
];