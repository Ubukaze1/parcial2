export type Priority = 'BAJA' | 'MEDIA' | 'ALTA' | 'CRITICA';
export type TicketStatus = 'ABIERTO' | 'EN_PROCESO' | 'PENDIENTE' | 'RESUELTO' | 'CERRADO';

export interface CreateTicketRequest {
  titulo: string;
  descripcion: string;
  prioridad: Priority;
  categoriaId: number;
}

export interface TicketResponse {
  id: number;
  titulo: string;
  descripcion: string;
  status: TicketStatus;
  prioridad: Priority;
  
  categoriaId: number;
  categoriaNombre: string;
  
  creadoPorId: number;
  creadoPorUsername: string;
  
  asignadoAId?: number | null;
  asignadoAUsername?: string | null;
  asignadoANombreCompleto?: string | null;
  
  createdAt: string;
  updatedAt?: string | null;
  closedAt?: string | null;
}