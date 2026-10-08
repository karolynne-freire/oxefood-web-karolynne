import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";
import {
  atualizar,
  buscarPorId,
  cadastrar,
  listar,
} from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_PRODUTO } from "../service/produtoService";
import { MAPPING_CONTROLLER_EMPRESA } from "../../empresa/service/empresaService";

export default function ProdutoForm() {
  const { idProduto } = useParams();
  const [empresas, setEmpresas] = useState([]);
  const [produto, setProduto] = useState({
    id: null,
    idEmpresa: "",
    codigo: "",
    titulo: "",
    descricao: "",
    valorUnitario: "",
    tempoEntregaMinimo: "",
    tempoEntregaMaximo: "",
  });

  useEffect(() => {
    carregarEmpresas();
    if (idProduto) {
      carregarProduto();
    }
  }, [idProduto]);

  async function carregarEmpresas() {
    try {
      const data = await listar(MAPPING_CONTROLLER_EMPRESA);
      setEmpresas(data);
    } catch (erro) {
      toast.error("Erro ao listar empresas.");
    }
  }

  async function carregarProduto() {
    try {
      const data = await buscarPorId(MAPPING_CONTROLLER_PRODUTO, idProduto);
      setProduto({
        id: data.id,
        idEmpresa: data.empresa ? data.empresa.id : "",
        codigo: data.codigo ?? "",
        titulo: data.titulo ?? "",
        descricao: data.descricao ?? "",
        valorUnitario: data.valorUnitario ?? "",
        tempoEntregaMinimo: data.tempoEntregaMinimo ?? "",
        tempoEntregaMaximo: data.tempoEntregaMaximo ?? "",
      });
    } catch (erro) {
      toast.error("Erro ao carregar produto.");
    }
  }

  async function salvar() {
    try {
      if (idProduto) {
        await atualizar(MAPPING_CONTROLLER_PRODUTO, produto);
        toast.success("Produto alterado com sucesso!");
      } else {
        await cadastrar(MAPPING_CONTROLLER_PRODUTO, produto);
        toast.success("Produto cadastrado com sucesso!");
      }
    } catch (erro) {
      toast.error("Erro ao salvar produto.");
    }
  }

  return (
    <div>
      <Menu />

      <Breadcrumbs
        items={[
          { label: "Produto" },
          { label: idProduto ? "Alterar" : "Cadastrar" },
        ]}
      />

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
            <h1 className="text-3xl font-bold text-gray-800">
              {idProduto ? "Alterar Produto" : "Novo Produto"}
            </h1>
          </div>

          <div className="divider divider-info" />

          <div className="overflow-x-auto" style={{ padding: "30px" }}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex w-full">
                <div
                  className="card rounded-box grid grow p-8"
                  style={{ padding: "30px" }}
                >
                  <fieldset className="fieldset w-full">
                    <label className="fieldset-legend" htmlFor="titulo">
                      Título
                    </label>
                    <input
                      type="text"
                      id="titulo"
                      className="input input-bordered w-full"
                      value={produto.titulo}
                      onChange={(e) =>
                        setProduto({ ...produto, titulo: e.target.value })
                      }
                    />
                  </fieldset>
                </div>
                <div
                  className="card rounded-box grid grow p-8"
                  style={{ padding: "30px" }}
                >
                  <fieldset className="fieldset w-full">
                    <label className="fieldset-legend" htmlFor="codigo">
                      Código
                    </label>
                    <input
                      type="text"
                      id="codigo"
                      className="input input-bordered w-full"
                      value={produto.codigo}
                      onChange={(e) =>
                        setProduto({ ...produto, codigo: e.target.value })
                      }
                    />
                  </fieldset>
                </div>
              </div>

              <div className="flex w-full">
                <div
                  className="card rounded-box grid grow p-8"
                  style={{ padding: "30px" }}
                >
                  <fieldset className="fieldset w-full">
                    <label className="fieldset-legend" htmlFor="idEmpresa">
                      Empresa
                    </label>
                    <select
                      id="idEmpresa"
                      className="select select-bordered w-full"
                      value={produto.idEmpresa}
                      onChange={(e) =>
                        setProduto({ ...produto, idEmpresa: e.target.value })
                      }
                    >
                      <option value="">Selecione a empresa...</option>
                      {empresas.map((emp) => (
                        <option key={emp.id} value={emp.id}>
                          {emp.nomeFantasia || emp.nomeEmpresarial}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                </div>
                <div
                  className="card rounded-box grid grow p-8"
                  style={{ padding: "30px" }}
                >
                  <fieldset className="fieldset w-full">
                    <label className="fieldset-legend" htmlFor="valorUnitario">
                      Valor Unitário (R$)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      id="valorUnitario"
                      className="input input-bordered w-full"
                      value={produto.valorUnitario}
                      onChange={(e) =>
                        setProduto({
                          ...produto,
                          valorUnitario: e.target.value,
                        })
                      }
                    />
                  </fieldset>
                </div>
              </div>

              <div className="flex w-full">
                <div
                  className="card rounded-box grid grow p-8"
                  style={{ padding: "30px" }}
                >
                  <fieldset className="fieldset w-full">
                    <label
                      className="fieldset-legend"
                      htmlFor="tempoEntregaMinimo"
                    >
                      Tempo Entrega Mínimo (min)
                    </label>
                    <input
                      type="number"
                      id="tempoEntregaMinimo"
                      className="input input-bordered w-full"
                      value={produto.tempoEntregaMinimo}
                      onChange={(e) =>
                        setProduto({
                          ...produto,
                          tempoEntregaMinimo: e.target.value,
                        })
                      }
                    />
                  </fieldset>
                </div>
                <div
                  className="card rounded-box grid grow p-8"
                  style={{ padding: "30px" }}
                >
                  <fieldset className="fieldset w-full">
                    <label
                      className="fieldset-legend"
                      htmlFor="tempoEntregaMaximo"
                    >
                      Tempo Entrega Máximo (min)
                    </label>
                    <input
                      type="number"
                      id="tempoEntregaMaximo"
                      className="input input-bordered w-full"
                      value={produto.tempoEntregaMaximo}
                      onChange={(e) =>
                        setProduto({
                          ...produto,
                          tempoEntregaMaximo: e.target.value,
                        })
                      }
                    />
                  </fieldset>
                </div>
              </div>

              {/* Linha 4: Descrição */}
              <div className="flex w-full">
                <div
                  className="card rounded-box grid grow p-8"
                  style={{ padding: "30px" }}
                >
                  <fieldset className="fieldset w-full">
                    <label className="fieldset-legend" htmlFor="descricao">
                      Descrição
                    </label>
                    <textarea
                      id="descricao"
                      rows="3"
                      className="textarea textarea-bordered w-full"
                      value={produto.descricao}
                      onChange={(e) =>
                        setProduto({ ...produto, descricao: e.target.value })
                      }
                    />
                  </fieldset>
                </div>
              </div>

              <div className="flex w-full">
                <div
                  className="card rounded-box grid grow p-8"
                  style={{ padding: "30px" }}
                >
                  <div style={{ marginTop: "50px", textAlign: "left" }}>
                    <BackButton destino="/produto" />
                  </div>
                </div>
                <div
                  className="card rounded-box grid grow p-8"
                  style={{ padding: "30px" }}
                >
                  <div style={{ marginTop: "50px", textAlign: "right" }}>
                    <SaveButton save={() => salvar()} />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
