import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientePage from "./features/cliente/page/ClientePage";
import Home from "./features/home/page/Home";
import ClienteForm from "./features/cliente/page/ClienteForm";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cliente" element={<ClientePage />} />
        <Route path="/produto" element={<ProdutoPage />} />
        <Route path="/empresa" element={<EmpresaPage />} />
        <Route path="/cliente-form/:idCliente?" element={<ClienteForm />} />
        <Route path="/produto-form/:idProduto?" element={<ProdutoForm />} />
        <Route path="/empresa-form/:idEmpresa?" element={<EmpresaForm />} />
      </Routes>
    </BrowserRouter>
  );
}
