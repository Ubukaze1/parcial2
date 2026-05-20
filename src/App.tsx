import { useState, useEffect } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from './components/PrivateRoute'
import MainLayout from './layouts/MainLayout'
import PruebaPage from './pages/PruebaPage'

function App() {
  const [count, setCount] = useState(0);

  return (
    <PrivateRoute fallback={<LoginPage onSuccess={() => {}} />}>
      <MainLayout content={<PruebaPage/>} />
    </PrivateRoute>
  );
}

export default App;
