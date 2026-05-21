import {http} from '../api/http';
import type { CreateTicketRequest, TicketResponse } from '../dto/ticket.dto';

export const ticketService = {
    create: (dto: CreateTicketRequest) => http<TicketResponse>("/api/auth/login",
        { method: "POST", body: JSON.stringify(dto) }),
};