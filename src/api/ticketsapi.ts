import { http } from "./http";

export type Ticket = {
    id: number;
    title: string;
    status: string;
    priority: string;
    category: string;
    assigned_to: string;
    created_at: string;
};

export type TicketFilters = {
    status?: string;
    priority?: string;
    category?: string;
    search?: string;
};

export const ticketApi = {
    getAll: (filters?: TicketFilters) => {
        const params = new URLSearchParams();
        if (filters?.status) params.append("status", filters.status);
        if (filters?.priority) params.append("priority", filters.priority);
        if (filters?.category) params.append("category", filters.category);
        if (filters?.search) params.append("search", filters.search);
        const query = params.toString();
        return http<Ticket[]>(`/api/tickets${query ? "?" + query : ""}`);
    },
};