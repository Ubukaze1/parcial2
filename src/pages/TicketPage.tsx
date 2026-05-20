import { useState, useEffect } from "react";
import { ticketApi } from "../api/ticketsapi";

const STATUS_LABELS = {
  open: "Abierto",
  in_progress: "En progreso",
  closed: "Cerrado",
  pending: "Pendiente",
  resolved: "Resuelto",
};

const PRIORITY_LABELS = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
  critical: "Crítica",
};

export default function TicketPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await ticketApi.getAll({ status, priority, search });
        setTickets(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [status, priority, search]);

  const filtered = tickets.filter(t =>
    !search || t.title?.toLowerCase().includes(search.toLowerCase()) || String(t.id).includes(search)
  );

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h2 style={{ marginBottom: 16 }}>Tickets</h2>

      {/* Filtros */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar..."
          style={{ padding: "6px 10px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13 }}
        />
        <select value={status} onChange={e => setStatus(e.target.value)}
          style={{ padding: "6px 10px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13 }}>
          <option value="">Estado: Todos</option>
          {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select value={priority} onChange={e => setPriority(e.target.value)}
          style={{ padding: "6px 10px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13 }}>
          <option value="">Prioridad: Todas</option>
          {Object.entries(PRIORITY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        {(search || status || priority) && (
          <button onClick={() => { setSearch(""); setStatus(""); setPriority(""); }}
            style={{ padding: "6px 12px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13, cursor: "pointer" }}>
            Limpiar
          </button>
        )}
      </div>

      {/* Estado de carga / error */}
      {loading && <p style={{ color: "#6b7280" }}>Cargando...</p>}
      {error && <p style={{ color: "#ef4444" }}>⚠️ {error}</p>}

      {/* Tabla */}
      {!loading && !error && (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f3f4f6", textAlign: "left" }}>
              <th style={th}>#</th>
              <th style={th}>Título</th>
              <th style={th}>Estado</th>
              <th style={th}>Prioridad</th>
              <th style={th}>Categoría</th>
              <th style={th}>Asignado a</th>
              <th style={th}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: 24, textAlign: "center", color: "#9ca3af" }}>
                  No se encontraron tickets.
                </td>
              </tr>
            ) : filtered.map((t, i) => (
              <tr key={t.id ?? i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={td}>{t.id}</td>
                <td style={{ ...td, fontWeight: 500 }}>{t.title}</td>
                <td style={td}>{STATUS_LABELS[t.status] || t.status || "—"}</td>
                <td style={td}>{PRIORITY_LABELS[t.priority] || t.priority || "—"}</td>
                <td style={td}>{t.category || "—"}</td>
                <td style={td}>{t.assigned_to || t.assignee || "—"}</td>
                <td style={{ ...td, color: "#6b7280" }}>
                  {t.created_at ? new Date(t.created_at).toLocaleDateString("es-CO") : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const th = { padding: "10px 14px", fontWeight: 600, fontSize: 12, color: "#374151", borderBottom: "1px solid #e5e7eb" };
const td = { padding: "10px 14px", color: "#374151", verticalAlign: "middle" };