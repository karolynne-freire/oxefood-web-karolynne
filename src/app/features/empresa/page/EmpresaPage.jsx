import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import CrudActions from "../../../shared/components/CrudActions";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import NewButton from "../../../shared/components/NewButton";
import {
  listar,
  remover,
  buscarPorId,
} from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_EMPRESA } from "../service/empresaService";

export default function EmpresaPage() {
  const [lista, setLista] = useState([]);
  const navigate = useNavigate();
  const [empresa, setEmpresa] = useState({
    id: null,
    site: "",
    cnpj: "",
    inscricaoEstadual: "",
    nomeEmpresarial: "",
    nomeFantasia: "",
    fone: "",
    foneAlternativo: "",
  });

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const data = await listar(MAPPING_CONTROLLER_EMPRESA);
    setLista(data);
  }

  function editar(id) {
    navigate(`/empresa-form/${id}`);
  }

  async function confirmarRemover(id) {
    if (!confirm("Deseja realmente excluir esta empresa?")) {
      return;
    }

    try {
      await remover(MAPPING_CONTROLLER_EMPRESA, id);
      await carregar();
      toast.success("Empresa removida com sucesso!");
    } catch (erro) {
      console.error(erro);
      toast.error("Erro ao tentar remover a empresa.");
    }
  }

  async function detalhar(id) {
    try {
      const data = await buscarPorId(MAPPING_CONTROLLER_EMPRESA, id);
      setEmpresa({
        id: data.id,
        site: data.site ?? "",
        cnpj: data.cnpj ?? "",
        inscricaoEstadual: data.inscricaoEstadual ?? "",
        nomeEmpresarial: data.nomeEmpresarial ?? "",
        nomeFantasia: data.nomeFantasia ?? "",
        fone: data.fone ?? "",
        foneAlternativo: data.foneAlternativo ?? "",
      });

      document.getElementById("modal-detalhar-empresa").showModal();
    } catch (erro) {
      toast.error("Erro ao carregar empresa.");
    }
  }

  return (
    <div>
      <Menu />
      <Breadcrumbs items={[{ label: "Empresa" }, { label: "Listar" }]} />

      <div style={{ marginTop: "40px", marginLeft: "10%", marginRight: "10%" }}>
        <div className="overflow-x-auto shadow-sm">
          <div
            className="flex items-center justify-between mb-6"
            style={{
              marginTop: "20px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            <h1 className="text-3xl font-bold text-gray-800">Empresas</h1>
            <NewButton destino="/empresa-form" />
          </div>

          <div className="divider divider-info" />

          <div className="overflow-x-auto" style={{ marginTop: "30px" }}>
            <table className="table table-zebra">
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>Nome Fantasia</th>
                  <th>CNPJ</th>
                  <th>Telefone</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {lista.map((item) => (
                  <tr key={item.id}>
                    <td style={{ width: "40%" }}>
                      {item.nomeFantasia || item.nomeEmpresarial}
                    </td>
                    <td style={{ textAlign: "center" }}>{item.cnpj}</td>
                    <td style={{ textAlign: "center" }}>{item.fone}</td>
                    <td style={{ textAlign: "center" }}>
                      <CrudActions
                        onEdit={() => editar(item.id)}
                        onDelete={() => confirmarRemover(item.id)}
                        onDetail={() => detalhar(item.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <dialog id="modal-detalhar-empresa" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Dados da Empresa</h3>
          <div className="divider" />
          <p className="py-2">
            <strong>Nome Empresarial:</strong> {empresa.nomeEmpresarial}
          </p>
          <p className="py-2">
            <strong>Nome Fantasia:</strong> {empresa.nomeFantasia}
          </p>
          <p className="py-2">
            <strong>CNPJ:</strong> {empresa.cnpj}
          </p>
          <p className="py-2">
            <strong>Inscrição Estadual:</strong> {empresa.inscricaoEstadual}
          </p>
          <p className="py-2">
            <strong>Fone:</strong> {empresa.fone}
          </p>
          <p className="py-2">
            <strong>Fone Alternativo:</strong> {empresa.foneAlternativo}
          </p>
          <p className="py-2">
            <strong>Site:</strong> {empresa.site}
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Fechar</button>
            </form>
          </div>
        </div>
      </dialog>

      <Footer />
    </div>
  );
}
