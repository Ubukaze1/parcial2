import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ticketService } from '../service/ticket.service';
import type { CreateTicketRequest } from '../dto/ticket.dto';

// Definimos las claves para invalidar cachés cuando sea necesario
export const TICKET_KEYS = {
  all: ['tickets'] as const,
  lists: () => [...TICKET_KEYS.all, 'list'] as const,
  details: () => [...TICKET_KEYS.all, 'detail'] as const,
};

export const useCreateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTicketRequest) => ticketService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TICKET_KEYS.lists() });
    },
  });
};