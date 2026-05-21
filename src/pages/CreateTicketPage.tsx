import { useState } from 'react';
import { useCreateTicket } from '../api/ticket.query';
import type { CreateTicketRequest } from '../dto/ticket.dto';
//import { useNavigate } from 'react-router-dom';

const CATEGORIAS = [
  { id: 1, nombre: 'Hardware' },
  { id: 2, nombre: 'Software' },
  { id: 3, nombre: 'Red y Conectividad' },
  { id: 4, nombre: 'Seguridad' },
  { id: 5, nombre: 'Mantenimiento Preventivo' },
  { id: 6, nombre: 'Otros' },
];

export default function CreateTicketPage() {
  //const navigate = useNavigate();
  const createTicketMutation = useCreateTicket();

  const [formData, setFormData] = useState<CreateTicketRequest>({
    titulo: '',
    descripcion: '',
    prioridad: 'MEDIA', // Valor por defecto
    categoriaId: 1, // Valor por defecto
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'categoriaId' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTicketMutation.mutate(formData, {
      onSuccess: () => {
        alert('¡Ticket creado exitosamente!');
        //navigate('/'); // redirigir a una lista de tickets
      },
      onError: (error) => {
        console.error('Error al crear ticket:', error);
        alert('Error al crear el ticket. Revisa la consola.');
      },
    });
  };

  return (
    <div className="bg-neutral-950 rounded-2xl p-8 border border-neutral-800 max-w-2xl mx-auto shadow-xl">
      <h2 className="text-2xl font-bold text-neutral-100 mb-6">Nuevo Ticket de Soporte</h2>
      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-1.5">Título</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            maxLength={150}
            className="w-full px-4 py-2.5 bg-neutral-900 text-neutral-100 border border-neutral-700 rounded-lg text-sm placeholder:text-neutral-600 focus:ring-1 focus:ring-neutral-500 focus:border-neutral-500 focus:outline-none transition-colors"
            placeholder="Resumen del problema..."
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-1.5">Categoría</label>
          <select
            name="categoriaId"
            value={formData.categoriaId}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-neutral-900 text-neutral-100 border border-neutral-700 rounded-lg text-sm focus:ring-1 focus:ring-neutral-500 focus:border-neutral-500 focus:outline-none transition-colors"
          >
            {CATEGORIAS.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-1.5">Prioridad</label>
          <select
            name="prioridad"
            value={formData.prioridad}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-neutral-900 text-neutral-100 border border-neutral-700 rounded-lg text-sm focus:ring-1 focus:ring-neutral-500 focus:border-neutral-500 focus:outline-none transition-colors"
          >
            <option value="BAJA">Baja — Sin impacto crítico</option>
            <option value="MEDIA">Media — Impacto moderado</option>
            <option value="ALTA">Alta — Bloqueo de operaciones</option>
            <option value="CRITICA">Crítica — Impacto total</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-1.5">Descripción Detallada</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-2.5 bg-neutral-900 text-neutral-100 border border-neutral-700 rounded-lg text-sm placeholder:text-neutral-600 focus:ring-1 focus:ring-neutral-500 focus:border-neutral-500 focus:outline-none transition-colors resize-none"
            placeholder="Describe el problema con el mayor detalle posible..."
          />
        </div>

        <button
          type="submit"
          disabled={createTicketMutation.isPending}
          className="w-full bg-neutral-100 hover:bg-white disabled:bg-neutral-800 disabled:text-neutral-600 text-neutral-900 font-bold py-2.5 px-4 rounded-lg text-sm transition-colors mt-2"
        >
          {createTicketMutation.isPending ? 'Creando...' : 'Crear Ticket'}
        </button>

      </form>
    </div>

  );
};