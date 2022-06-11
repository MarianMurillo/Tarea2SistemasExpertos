import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Test from "./pages/Test";
import AdivinaRecinto from "./pages/AdivinaRecinto";
import AdivinaSexo from "./pages/AdivinaSexo";
import AdivinaEstilo from "./pages/AdivinaEstilo";
import TipoProfesor from "./pages/TipoProfesor";
import ClasificaRed from "./pages/ClasificaRed";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Test/>} />
          <Route path="/adivinaRecinto" element={<AdivinaRecinto/>} />
          <Route path="/adivinaSexo" element={<AdivinaSexo/>} />
          <Route path="/adivinaEstilo"element={<AdivinaEstilo/>} />
          <Route path="/tipoProfesor"element={<TipoProfesor/>} />
          <Route path="/clasificaRed"element={<ClasificaRed/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
