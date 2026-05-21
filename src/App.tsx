import { useState, useEffect } from "react";
import "./App.css";
import {useAuth} from './context/AuthContext'
import LoginPage from "./pages/LoginPage";
import PrivateRoute from './components/PrivateRoute'
import MainLayout from './layouts/MainLayout'
import PruebaPage from './pages/PruebaPage'
import SidebarMenu from './components/SidebarMenu'
import TicketPage from "./pages/TicketPage";
import CreateTicketPage from './pages/CreateTicketPage'

function App() {
  const [count, setCount] = useState(0);
  const [page, setPage] = useState("customers")
  const { user, logout } = useAuth()

  const [menuOptions, setMenuOptions] = useState([
    {
      name: "prueba",
      content: "Prueba"
    },
    {
      name: "tickets",
      content: "Tickets"
    },
    {
      name: "crear",
      content: "Crear"
    },
  ])

  function renderContent() {
    switch (page) {
      case "prueba":
        return <PruebaPage />
      case "tickets":
        return <TicketPage />
      case "crear":
        return <CreateTicketPage />
      default:
        return <PruebaPage />
    }
  }

  const sidebar = (
    <div>
      <SidebarMenu current={page} onChange={setPage} menuOptions={menuOptions} />
      <div className="mt-6 border-t pt-4">
        <p className="text-xs text-gray-500 mb-2">Hola, {user?.username}</p>
        <button
          onClick={logout}
          className="text-sm text-red-600 hover:underline"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );

  return (
    <PrivateRoute fallback={<LoginPage onSuccess={() => { }} />}>
      <MainLayout sidebar={sidebar} content={renderContent()} />
    </PrivateRoute>
  );
}

export default App;
