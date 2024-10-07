import "./Cadastros.css";
import axios from "axios";
import { useState, useEffect } from "react";

function Cadastros() {
    const [pessoa, setPessoa] = useState(null);
    const [animal, setAnimal] = useState(null);
    const [produto, setProduto] = useState(null);
    const [clientes, setClientes] = useState([]);
    const [animais, setAnimais] = useState([]);
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        getClientes();
        getAnimais();
        getProdutos();
    }, []);

    function getClientes() {
        axios.get("http://localhost:5119/pessoas")
            .then((resposta) => {
                setClientes(resposta.data);
            })
            .catch((error) => console.error("Error fetching clientes:", error));
    }

    function getAnimais() {
        axios.get("http://localhost:5119/animais")
            .then((resposta) => {
                setAnimais(resposta.data);
            })
            .catch((error) => console.error("Error fetching animais:", error));
    }

    function getProdutos() {
        axios.get("http://localhost:5119/produtos")
            .then((resposta) => {
                setProdutos(resposta.data);
            })
            .catch((error) => console.error("Error fetching produtos:", error));
    }

    function novoCadastro(tipo) {
        if (tipo === "cliente") {
            setPessoa({ nome: "", telefone: "", email: "" });
        } else if (tipo === "animal") {
            setAnimal({ nomeAnimal: "", raca: "", porte: "" });
        } else if (tipo === "produto") {
            setProduto({ nomeProduto: "", descricao: "", preco: "" });
        }
    }

    function cancelar(tipo) {
        if (tipo === "cliente") {
            setPessoa(null);
        } else if (tipo === "animal") {
            setAnimal(null);
        } else if (tipo === "produto") {
            setProduto(null);
        }
    }

    function refresh() {
        cancelar("cliente");
        cancelar("animal");
        cancelar("produto");
        getClientes();
        getAnimais();
        getProdutos();
    }

    function onChangeCadastro(campo, valor, tipo) {
        if (tipo === "cliente") {
            setPessoa((prev) => ({ ...prev, [campo]: valor }));
        } else if (tipo === "animal") {
            setAnimal((prev) => ({ ...prev, [campo]: valor }));
        } else if (tipo === "produto") {
            setProduto((prev) => ({ ...prev, [campo]: valor }));
        }
    }

    function salvarCadastro(tipo) {
        const endpoint = `http://localhost:5119/${tipo === 'cliente' ? 'pessoas' : tipo === 'animal' ? 'animais' : 'produtos'}`;
        const id = tipo === 'cliente' ? pessoa?.id : tipo === 'animal' ? animal?.id : produto?.id;
    
        const method = id ? axios.put : axios.post;

        method(`${endpoint}${id ? `/${id}` : ''}`, tipo === 'cliente' ? pessoa : tipo === 'animal' ? animal : produto)
            .then(() => refresh())
            .catch((error) => console.error(`Error saving ${tipo}:`, error));
        
    }

    function getFormulario(tipo) {
        const commonProps = {
            onChangeCadastro,
            cancelar,
            salvarCadastro,
            pessoa,
            animal,
            produto
        };

        return (
            <form>
                {tipo === "cliente" && (
                    <>
                        <label htmlFor="nome">Nome</label>
                        <input type="text" id="nome" name="nome" value={commonProps.pessoa?.nome || ""} onChange={(e) => onChangeCadastro(e.target.name, e.target.value, "cliente")} />
                        <label htmlFor="telefone">Telefone</label>
                        <input type="text" id="telefone" name="telefone" value={commonProps.pessoa?.telefone || ""} onChange={(e) => onChangeCadastro(e.target.name, e.target.value, "cliente")} />
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" value={commonProps.pessoa?.email || ""} onChange={(e) => onChangeCadastro(e.target.name, e.target.value, "cliente")} />
                    </>
                )}
                {tipo === "animal" && (
                    <>
                        <label htmlFor="nomeAnimal">Nome</label>
                        <input type="text" id="nomeAnimal" name="nomeAnimal" value={commonProps.animal?.nomeAnimal || ""} onChange={(e) => onChangeCadastro(e.target.name, e.target.value, "animal")} />
                        <label htmlFor="raca">Raça</label>
                        <input type="text" id="raca" name="raca" value={commonProps.animal?.raca || ""} onChange={(e) => onChangeCadastro(e.target.name, e.target.value, "animal")} />
                        <label htmlFor="porte">Porte</label>
                        <input type="text" id="porte" name="porte" value={commonProps.animal?.porte || ""} onChange={(e) => onChangeCadastro(e.target.name, e.target.value, "animal")} />
                    </>
                )}
                {tipo === "produto" && (
                    <>
                        <label htmlFor="nomeProduto">Nome</label>
                        <input type="text" id="nomeProduto" name="nomeProduto" value={commonProps.produto?.nomeProduto || ""} onChange={(e) => onChangeCadastro(e.target.name, e.target.value, "produto")} />
                        <label htmlFor="descricao">Descrição</label>
                        <input type="text" id="descricao" name="descricao" value={commonProps.produto?.descricao || ""} onChange={(e) => onChangeCadastro(e.target.name, e.target.value, "produto")} />
                        <label htmlFor="preco">Preço</label>
                        <input type="text" id="preco" name="preco" value={commonProps.produto?.preco || ""} onChange={(e) => onChangeCadastro(e.target.name, e.target.value, "produto")} />
                    </>
                )}
                <button type="button" onClick={() => salvarCadastro(tipo)}>Salvar</button>
                <button type="button" onClick={() => cancelar(tipo)}>Cancelar</button>
            </form>
        );
    }

    function excluirCadastro(id, tipo) {
        const endpoint = `http://localhost:5119/${tipo === 'cliente' ? 'pessoas' : tipo === 'animal' ? 'animais' : 'produtos'}/${id}`;
        axios.delete(endpoint)
            .then(() => {
                if (tipo === "cliente") getClientes();
                else if (tipo === "animal") getAnimais();
                else if (tipo === "produto") getProdutos();
            })
            .catch((error) => console.error(`Error deleting ${tipo}:`, error));
    }
    
    function editarCadastro(cadastro, tipo) {
        console.log(`Editando ${tipo} com ID: ${cadastro.id}`, cadastro);
        if (tipo === "cliente") setPessoa(cadastro);
        else if (tipo === "animal") setAnimal(cadastro);
        else if (tipo === "produto") setProduto(cadastro);
    }    
    function getLinha(cadastro, tipo) {
        return (
            <tr key={cadastro.id}>
                {tipo === "cliente" && (
                    <>
                        <td>{cadastro.id}</td>
                        <td>{cadastro.nome}</td>
                        <td>{cadastro.telefone}</td>
                        <td>{cadastro.email}</td>
                    </>
                )}
                {tipo === "animal" && (
                    <>
                        <td>{cadastro.id}</td>
                        <td>{cadastro.nomeAnimal}</td>
                        <td>{cadastro.raca}</td>
                        <td>{cadastro.porte}</td>
                    </>
                )}
                               {tipo === "produto" && (
                    <>
                        <td>{cadastro.id}</td>
                        <td>{cadastro.nomeProduto}</td>
                        <td>{cadastro.descricao}</td>
                        <td>{cadastro.preco}</td>
                    </>
                )}
                <td>
                    <button onClick={() => excluirCadastro(cadastro.id, tipo)}>Excluir</button>
                    <button onClick={() => editarCadastro(cadastro, tipo)}>Editar</button>
                </td>
            </tr>
        );
    }

    return (
        <div>
            <h1>Cadastro de Clientes</h1>
            <button onClick={() => novoCadastro("cliente")}>Novo Cliente</button>
            {pessoa && getFormulario("cliente")}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => getLinha(cliente, "cliente"))}
                </tbody>
            </table>

            <h1>Cadastro de Animais</h1>
            <button onClick={() => novoCadastro("animal")}>Novo Animal</button>
            {animal && getFormulario("animal")}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Raça</th>
                        <th>Porte</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {animais.map((animal) => getLinha(animal, "animal"))}
                </tbody>
            </table>

            <h1>Cadastro de Produtos</h1>
            <button onClick={() => novoCadastro("produto")}>Novo Produto</button>
            {produto && getFormulario("produto")}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto) => getLinha(produto, "produto"))}
                </tbody>
            </table>
        </div>
    );
}

export default Cadastros;
