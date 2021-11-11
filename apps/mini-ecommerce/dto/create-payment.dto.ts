export interface CreatePaymentDto{
    payment_number: number;
    amount: number;
    amount_paid: number;
    id_card?: number;
    id_salesman: number;
    id_client: number;
    card?:{
        card_number: string;
    }
}