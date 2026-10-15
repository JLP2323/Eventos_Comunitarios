import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Inicio from "./pages/Inicio";
import Registro from "./pages/Registro";
import Lista from "./pages/Lista";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/lista" element={<Lista />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
export default App;
