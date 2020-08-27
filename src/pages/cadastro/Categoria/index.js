import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { uuid } from 'uuidv4';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForms';
import config from '../../../config';
import {
  Table, Titulo, Container, Conteudo, MultContainer, ContainerRaiz,
} from '../../../components/Tabela';
import './categoria.css';

function CadastroCategoria() {
  const valoresIniciais = {
    titulo: '',
    descricao: '',
    url: '',
    cor: '#F5DE03',
  };
  const urlTop = `${config.url}/categorias`;
  const { values, handleChange, clearForm } = useForm(valoresIniciais);
  const [categorias, setCategorias] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch(urlTop)
      .then(async (respostaDoServidor) => {
        const resposta = await respostaDoServidor.json();
        setCategorias([
          ...resposta,
        ]);
      });
  // eslint-disable-next-line
  }, []);

  async function handleNewcategoria(e) {
    e.preventDefault();

    try {
      await fetch(urlTop, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert('Erro ao cadastrar categoria, tente novamente');
    }
    setCategorias([...categorias, values]);
    history.push('/');
    clearForm();
  }

  async function handleRemovecategoria(e) {
    const target = String(e.target.getAttribute('target'));
    e.preventDefault();
    const URL_TOP_ID = `${urlTop}/${target}`;
    try {
      await fetch(URL_TOP_ID, {
        method: 'DELETE',
      });
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert('Erro ao deletar caso, tente novamente');
    }
    setCategorias([...categorias, values]);
    history.push('/');
    clearForm();
  }

  return (
    <PageDefault>
      <h1>
        Cadastro de Categorias
      </h1>
      <MultContainer>
        <ContainerRaiz>
          <form onSubmit={handleNewcategoria}>

            <FormField
              label="Titulo da Categoria"
              type="text"
              name="titulo"
              value={values.titulo}
              onChange={handleChange}
            />

            <FormField
              label="Descrição"
              type="textarea"
              name="descricao"
              value={values.descricao}
              onChange={handleChange}
            />

            <FormField
              label="URL"
              type="text"
              name="url"
              value={values.url}
              onChange={handleChange}
            />

            <FormField
              label="Cor"
              type="color"
              name="cor"
              value={values.cor}
              onChange={handleChange}
            />

            <Button className="cadastro">
              Cadastrar
            </Button>
          </form>
        </ContainerRaiz>
        <ContainerRaiz>
          {categorias.length === 0 && (
          <div>
            Loading...
          </div>
          )}
          <Table>
            <Container>
              <Titulo>Titulo</Titulo>
              <Titulo>Descrição</Titulo>
              <Titulo className="ultimo">Remover</Titulo>
            </Container>
            {categorias.lenght === 0 && <div>Loading...</div>}
            {categorias.map((categoria) => (
              <Container key={uuid()}>
                <Conteudo>{categoria.titulo}</Conteudo>
                <Conteudo>{categoria.descricao}</Conteudo>
                <Conteudo>
                  <Conteudo.Paragrafo
                    target={categoria.id}
                    onClick={handleRemovecategoria}
                  >
                    Remover
                  </Conteudo.Paragrafo>
                </Conteudo>
              </Container>
            ))}
          </Table>
        </ContainerRaiz>
      </MultContainer>
      <div className="IrHome">
        <Button>
          <Link to="/">
            Voltar!
          </Link>
        </Button>
      </div>
    </PageDefault>
  );
}

export default CadastroCategoria;
