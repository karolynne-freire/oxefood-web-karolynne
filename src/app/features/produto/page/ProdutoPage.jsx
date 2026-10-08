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
import { MAPPING_CONTROLLER_PRODUTO } from "../service/produtoService";

export default function ProdutoPage() {
  const [lista, setLista] = useState([]);
  const navigate = useNavigate();
  const [produto, setProduto] = useState({
    id: null,
    codigo: "",
    titulo: "",
    descricao: "",
    valorUnitario: "",
    tempoEntregaMinimo: "",
    tempoEntregaMaximo: "",
    empresa: null,
  });

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const data = await listar(MAPPING_CONTROLLER_PRODUTO);
    setLista(data);
  }

  function editar(id) {
    navigate(`/produto-form/${id}`);
  }

  async function confirmarRemover(id) {
    if (!confirm("Deseja realmente excluir este produto?")) {
      return;
    }

    try {
      await remover(MAPPING_CONTROLLER_PRODUTO, id);
      await carregar();
      toast.success("Produto removido com sucesso!");
    } catch (erro) {
      console.error(erro);
      toast.error("Erro ao tentar remover o produto.");
    }
  }

  async function detalhar(id) {
    try {
      const data = await buscarPorId(MAPPING_CONTROLLER_PRODUTO, id);
      setProduto({
        id: data.id,
        codigo: data.codigo ?? "",
        titulo: data.titulo ?? "",
        descricao: data.descricao ?? "",
        valorUnitario: data.valorUnitario ?? "",
        tempoEntregaMinimo: data.tempoEntregaMinimo ?? "",
        tempoEntregaMaximo: data.tempoEntregaMaximo ?? "",
        empresa: data.empresa ?? null,
      });

      document.getElementById("modal-detalhar-produto").showModal();
    } catch (erro) {
      toast.error("Erro ao carregar produto.");
    }
  }

  return (
    <div>
      <Menu />
      <Breadcrumbs items={[{ label: "Produto" }, { label: "Listar" }]} />

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
            <h1 className="text-3xl font-bold text-gray-800">Produtos</h1>
            <NewButton destino="/produto-form" />
          </div>

          <div className="divider divider-info" />

          <div className="overflow-x-auto" style={{ marginTop: "30px" }}>
            <table className="table table-zebra">
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>Código</th>
                  <th>Título</th>
                  <th>Empresa</th>
                  <th>Valor (R$)</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {lista.map((item) => (
                  <tr key={item.id}>
                    <td style={{ textAlign: "center" }}>{item.codigo}</td>
                    <td style={{ width: "35%" }}>{item.titulo}</td>
                    <td style={{ textAlign: "center" }}>
                      {item.empresa?.nomeFantasia ||
                        item.empresa?.nomeEmpresarial ||
                        "-"}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {item.valorUnitario != null
                        ? Number(item.valorUnitario).toFixed(2)
                        : "0.00"}
                    </td>
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

      <dialog id="modal-detalhar-produto" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Dados do Produto</h3>
          <div className="divider" />
          <p className="py-2">
            <strong>Código:</strong> {produto.codigo}
          </p>
          <p className="py-2">
            <strong>Título:</strong> {produto.titulo}
          </p>
          <p className="py-2">
            <strong>Descrição:</strong> {produto.descricao}
          </p>
          <p className="py-2">
            <strong>Empresa:</strong>{" "}
            {produto.empresa?.nomeFantasia ||
              produto.empresa?.nomeEmpresarial ||
              "-"}
          </p>
          <p className="py-2">
            <strong>Valor Unitário:</strong> R${" "}
            {produto.valorUnitario
              ? Number(produto.valorUnitario).toFixed(2)
              : ""}
          </p>
          <p className="py-2">
            <strong>Tempo de Entrega Mínimo:</strong>{" "}
            {produto.tempoEntregaMinimo} min
          </p>
          <p className="py-2">
            <strong>Tempo de Entrega Máximo:</strong>{" "}
            {produto.tempoEntregaMaximo} min
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
