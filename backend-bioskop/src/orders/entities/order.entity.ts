import { OrderStatus } from "@prisma/client";

export class Order {
    id: string;
    user_id: string;
    showtime_id: string;
    seat_numbers: string[];
    total_price: number;
    status: OrderStatus;
    created_at: Date;
}
